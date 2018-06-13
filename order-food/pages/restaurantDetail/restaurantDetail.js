var app = getApp()
var util = require('../../utils/util')
var api = require('../../config/api.js');
Page({
  data: {
    bookToastHidden: true,
    // navbar: [
    //   {
    //     machineName: '推荐',
    //     image: 'https://machine-1256349011.cos.ap-beijing.myqcloud.com/mstj.jpg',
    //     msg:'测试萨垛佛啊使得肌肤',
    //     displaySequence: 0
    //   },
    //   {
    //     machineName: '酒店概况',
    //     image: 'https://machine-1256349011.cos.ap-beijing.myqcloud.com/restaurant.jpg',
    //     msg: '测试萨垛佛啊使得肌肤',
    //     displaySequence: 1
    //   },
    //   {
    //     machineName: '饮食文化',
    //     image: 'https://machine-1256349011.cos.ap-beijing.myqcloud.com/yswh.jpg',
    //     msg: '测试萨垛佛啊使得肌肤',
    //     displaySequence: 2
    //   }
    // ],
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
    })
  }
})