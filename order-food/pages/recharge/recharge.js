// pages/booking/booking.js
const app = getApp();
const util = require('../../utils/util.js');
Page({
  data: {
    chosens: false,
    options: false,
    userChosen: '',
    customAcmount:''
  },
  choosePackage: function (res) {
    this.setData({
      customAcmount: ""
    });
    var chosen = res.currentTarget.dataset.chosen;
    var packageid = res.currentTarget.dataset.packageid;
    console.log(res.currentTarget.dataset);
    if (!chosen) {
      this.setData({
        userChosen: packageid
      });
    };
  },

  customRechargeAmount: function customRechargeAmount(e) {
    this.setData({
      userChosen: ""
    });
    var amount = e.detail.value;
    console.log(amount);
    this.setData({
      customAcmount:amount
    });
  },

  recharge: function recharge(e) {
    var user = wx.getStorageSync('user') || {};
    var userId = user.openid;
    if (userId == '' || userId == 'undefined') {
      wx.showToast({
        title: '请先授权',
        icon: 'fail',
        duration: 1000
      });
      return;
    } 
    var rechargeData = {}
    if (this.data.userChosen == '' && this.data.customAcmount == '') {
      wx.showToast({
        title: '请选择充值方式',
        icon: 'fail',
        duration: 1000
      });
      return;
    }
    if (this.data.userChosen != '' && this.data.customAcmount == '') {
      rechargeData = {
        userId: userId,
        packageId: this.data.userChosen,
        rechargeMoney: 0,
        isPackage: 1
      }
    } else if (this.data.userChosen == '' && this.data.customAcmount != '') {
      rechargeData = {
        userId: userId,
        packageId: "",
        rechargeMoney: this.data.customAcmount,
        isPackage: 0
      }
    }
    wx.request({
      url: 'https://www.sxbhyc.com/order-foods/recharge/recharge',
        header: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        data: rechargeData,
        success: function (res) {
          if (res.data.dealCode == 200) {
            wx.requestPayment(
              {
                'timeStamp': res.data.dealResult.timeStamp,
                'nonceStr': res.data.dealResult.nonceStr,
                'package': res.data.dealResult.package,
                'signType': 'MD5',
                'paySign': res.data.dealResult.paySign,
                'success': function (res) {
                  console.log(res)
                 },
                'fail': function (res) { },
                'complete': function (res) { }
              })
          }
          console.log(res.data.dealResult);
        },
        fail: function () {
          wx.showToast({
            title: '失败',
            icon: 'fail',
            duration: 1000
          });
        }
      })
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'https://www.sxbhyc.com/order-foods/recharge/queryRechargePackage',
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data.dealCode == 200);
        if (res.data.dealCode == 200) {
          that.setData({
            rechargePackage:res.data.dealResult
          });
        }
        console.log(res);
      },
      fail: function() {
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 1000
        });
      }
    })
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: '充值'
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  getScanning: function () {
    app.getScanning()
  },
})