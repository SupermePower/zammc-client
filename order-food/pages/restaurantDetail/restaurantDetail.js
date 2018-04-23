var app = getApp()
var util = require('../../utils/util')

Page({
  data: {
    bookToastHidden: true,
    navbar: [
      {
        machineName: '推荐',
        image: 'https://machine-1256349011.cos.ap-beijing.myqcloud.com/mstj.jpg',
        displaySequence: 0
      },
      {
        machineName: '酒店概况',
        image: 'https://machine-1256349011.cos.ap-beijing.myqcloud.com/restaurant.jpg',
        displaySequence: 1
      },
      {
        machineName: '饮食文化',
        image: 'https://machine-1256349011.cos.ap-beijing.myqcloud.com/yswh.jpg',
        displaySequence: 2
      }
    ],
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
  }
})