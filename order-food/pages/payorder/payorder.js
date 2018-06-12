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
    order: {
      restaurant: '金掌勺',
      count: 5,
      number: '20170326122',
      time: '2017/3/26 13:23:02',
      goods: [{
        name: '锅包肉',
        count: 1,
        money: '23.00'
      }, {
        name: '杀猪菜',
        count: 1,
        money: '23.00'
      }, {
        name: '西红柿鸡蛋汤',
        count: 1,
        money: '23.00'
      }, {
        name: '米饭',
        count: 3,
        money: '23.00'
      }],
      allMoney: '118.00'
    }
  },
  /**
   * 支付货款
   */
  payMoney: function payMoney() {
    console.log("微信支付");
    // todo 付款流程
    // wx.requestPayment({
    //   'timeStamp': '',
    //   'nonceStr': '',
    //   'package': '',
    //   'signType': 'MD5',
    //   'paySign': '',
    //   'success':function(res){
    //   },
    //   'fail':function(res){
    //   }
    // })
  },
  /**
  * 现金支付
  */
  payMoney2: function payMoney2() {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {

    // wx.setStorageSync('chooseGoods', this.data.chooseGoods);
    //wx.setStorageSync('shopCar', this.data.shopCar);
    var _this=this;
    var choseGoods=wx.getStorageSync('chooseGoods');
    var shopCar=wx.getStorageSync('shopCar');
    console.log(choseGoods);
    console.log(shopCar);
    _this.setData({
      allMoney: choseGoods.money,
      allCount: choseGoods.allCount,
      shopCar:shopCar
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
