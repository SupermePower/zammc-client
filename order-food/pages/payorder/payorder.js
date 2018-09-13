'use strict';

// 获取全局应用程序实例对象
// const app = getApp()
var api = require('../../config/api.js');
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'payorder',
    payWay: "",
    orderId:"",
    order: {
      restaurant: '北海渔村',
      count: 5,
      number: '20170326122',
      goods: [],
      allMoney: ''
    },
    model: [
      {
        image: '../../images/xianjinzhifu.png',
        title: '现金支付',
        sub_title: '前台付款，与服务员确认',
        selectImage: false
      },
      {
        image: '../../images/zaixianzhifu.png',
        title: '在线支付',
        sub_title: '使用微信，在线付款',
        selectImage: true
      }
    ]
  },
  /**
   * 支付货款
   */
  payMoneyWX: function payMoneyWX() {
    console.log("微信支付");
    var payOrderData = {
      orderId:this.orderId,
      payWay:this.payWay
    };
    // todo 付款流程
    wx.request({
      url: 'https://www.sxbhyc.com/order-foods/order/payOrder',
      header: {
        "Content-Type": "application/json"
      },
      method: 'PUT',
      data: payOrderData,
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
  /**
  * 现金支付
  */
  payMoneyRMB: function payMoneyRMB() {
    console.log("现金支付");
    wx.showModal({
      title: "现金支付",
      content: "请到前台支付",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.switchTab({
            url: '../index/index',
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  payOrder: function payOrder() {
    var payWay = this.payWay;
    console.log("您选择的支付方式->" + payWay)
    if (payWay == 0) {
      this.payMoneyWX();
    } else if (payWay == 1) {
      this.payMoneyRMB();
    } else {
      return wx.showToast({
        title: '请选择支付方式',
        icon: 'success',
        mask: true
      });
    }
  },
  /**
   * 选择支付方式
   */
  selectClick: function (event) {
    for (var i = 0; i < this.data.model.length; i++) {
      if (event.currentTarget.id == i) {
        this.data.model[i].selectImage = true;
        this.payWay = 0;
      } else {
        this.payWay = 1;
        this.data.model[i].selectImage = false
      }
    }
    this.setData(this.data)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(data) {
    // TODO: onLoad
    var that = this;
    this.payWay = '0';
    this.orderId = data.orderId;
    console.log("orderId--------", data.orderId);
    console.log("payWay", that.payWay);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {

    // wx.setStorageSync('chooseGoods', this.data.chooseGoods);
    //wx.setStorageSync('shopCar', this.data.shopCar);
    var _this = this;
    var choseGoods = wx.getStorageSync('chooseGoods');
    var shopCar = wx.getStorageSync('shopCar');
    console.log(choseGoods);
    console.log(shopCar);
    _this.setData({
      allMoney: choseGoods.money,
      allCount: choseGoods.allCount,
      shopCar: shopCar
    })
    // TODO: onReady
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    // TODO: onShow
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  },
  confirm: function (title, content) {
    wx.showModal({
      title: title,
      content: content,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          return true;
        } else if (res.cancel) {
          console.log('用户点击取消')
          return false;
        }
      }
    })
  }

});

//# sourceMappingURL=payorder.js.map
