var app = getApp()
var util = require('../../utils/util')
var api = require('../../config/api.js');
Page({
  data: {
    bookToastHidden: true,
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  onLoad: function (options) {
    this.setData({
      artype: options.artype
    });
    var _this=this;
    wx.request({
      url: 'https://www.sxmbyd.com/order-foods/restaurant/queryRestaurantProperty',
      url: api.queryRestaurantProperty,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        if (res.data.dealCode == 200) {
          _this.setData({
            navbar: res.data.dealResult.navbar,
          });
        }
      }
    });
    wx.setNavigationBarTitle({
      title: '店铺详情'
    });
  }
})