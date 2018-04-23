// pages/booking/booking.js
const app = getApp();
const util = require('../../utils/util.js');
Page({
  data: {
    chosens: false,
    options: false,
    package: {
      room: [{
        id: "10001",
        title: "400.00元",
        title1:"售价300元",
        chosen: false,
      }, {
        id: "10002",
        title: "400.00元",
        title1: "售价300元",
        chosen: false,
      }, {
        id: "10003",
        title: "400.00元",
        title1: "售价300元",
        chosen: false,
      }]
    },
    userChosen: ''
  },
  choosePackage: function (res) {
    var chosen = res.currentTarget.dataset.chosen;
    var mark = res.currentTarget.dataset.mark;
    if (!chosen) {
      console.log("------------------" + chosen);
      var rooms = this.data.regionDataRoom;
      this.setData({
        userChosen: mark,
        regionDataRoom: rooms
      });
    };
  },

  customRechargeAmount: function customRechargeAmount(res) {
    this.setData({
      userChosen: ""
    });
  },

  onLoad: function (options) {
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