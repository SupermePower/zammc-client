// pages/booking/booking.js
const app = getApp();
const util = require('../../utils/util.js');
Page({
  data: {
    chosens: false,
    options: false,
    userChosen: ''
  },
  choosePackage: function (res) {
    var chosen = res.currentTarget.dataset.chosen;
    var mark = res.currentTarget.dataset.mark;
    if (!chosen) {
      console.log("------------------" + chosen);
      this.setData({
        userChosen: mark
      });
    };
  },

  customRechargeAmount: function customRechargeAmount(res) {
    this.setData({
      userChosen: ""
    });
  },

  recharge: function recharge(e) {
    console.log("------------------->" + this.data.rechargePackage);
  },

  onLoad: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/order-foods/recharge/queryRechargePackage',
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