'use strict';

// 获取全局应用程序实例对象
var app = getApp();
var api = require('../../config/api.js');
// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'user',
    userInfo: null,
    userList: [{
      icon: 'iconfont icon-xiaoxi',
      title: '我的钱包',
      id: 'number'
    }, {
      icon: 'iconfont icon-lingdang',
      title: '代金券',
      id: 'message'
    }]
  },

  /**
   * 跳转到用户充值
   */
  toRecharge: function toRecharge() {
    wx.navigateTo({
      url: '../recharge/recharge',
    })
  },

  /**
   * 跳转到交易流水
   */
  toAccountWater: function toAccountWater() {
    wx.navigateTo({
      url: '../accountWater/accountWater',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var that = this;
    var user = wx.getStorageSync('user') || {};
    wx.request({
<<<<<<< HEAD
      url: 'https://www.sxmbyd.com/order-foods/account/queryUserAccount',
=======
      url: api.queryUserAccount,
>>>>>>> cf3fc1d79f5986ad4f3f3d9f73b7777b9ce20ac7
      header: {
        "Content-Type": "application/json"
      },
      data: {
        userId:user.openid
      },
      method: 'POST',
      success: function (res) {
        console.log(res.data.dealCode == 200);
        if (res.data.dealCode == 200) {
          that.setData({
            amount: res.data.dealResult.amount
          });
        }
        console.log(res);
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
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
  }
});
//# sourceMappingURL=user.js.map
