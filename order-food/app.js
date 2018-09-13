'use strict';

/**
 * API module
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
var wechat = require('./utils/wechat');
var Promise = require('./utils/bluebird');

App({
  /**
   * Global shared
   * 可以定义任何成员，用于在整个应用中共享
   */
  data: {
    name: 'WeApp Boilerplate',
    version: '0.1.0',
    userInfo: null
  },

  // 不是只能定义`data`，别的也可以
  other: 'other variables',

  /**
   * 获取用户信息
   * @return {Promise} 包含获取用户信息的`Promise`
   */
  getUserInfo: function getUserInfo() {
    var _this = this;
    return new Promise(function (resolve, reject) {
      if (_this.data.userInfo) return reject(_this.data.userInfo);
      wechat.login().then(function () {
        return wechat.getUserInfo();
      }).then(function (res) {
        return res.userInfo;
      }).then(function (info) {
        return _this.data.userInfo = info;
      }).then(function (info) {
        return resolve(info);
      }).catch(function (error) {
        return console.error('failed to get user info, error: ' + error);
      });
    });
  },

  globalData: {
    appid: 'wxfc61b3daa2d95647',
    secret: 'b89e881163d43de3e7c5868dbb496d62'
  },

  /**
   * 生命周期函数--监听小程序初始化
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function onLaunch() {
    console.log(' ========== Application is launched ========== ');
    var that = this
    var user = wx.getStorageSync('user') || {};
    var userInfo = wx.getStorageSync('userInfo') || {};
    if ((!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) && (!userInfo.nickName)) {
      wx.login({
        success: function (res) {
          wx.getUserInfo({
            withCredentials: true,
            success: function (res) {
              console.log("userInfo------->", res.userInfo);
              var objz = {};
              objz.avatarUrl = res.userInfo.avatarUrl;
              objz.nickName = res.userInfo.nickName;
              console.log("加载小程序-------------->", objz);
              wx.setStorageSync('userInfo', objz);//存储userInfo
            },
            error: function() {
              console.log("获取用户信息失败");
            }
          });
          console.log("调用获取用户信息结束");
          var d = that.globalData;//这里存储了appid、secret、token串
          var l = 'https://www.sxbhyc.com/order-foods/login/login/' + res.code;
          wx.request({
            url: l,
            dataType: 'json',
            method:'GET',
            success: function (data) {
              var obj = {};
              obj.openid = data.data.dealResult.openid;
              console.log("获取的openid----->", data.data.dealResult.openid);
              wx.setStorageSync('user', obj);//存储openid  
            }
          });
        }
      });
    }
  },

  /**
   * 生命周期函数--监听小程序显示
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function onShow() {
    console.log(' ========== Application is showed ========== ');
  },

  /**
   * 生命周期函数--监听小程序隐藏
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function onHide() {
    console.log(' ========== Application is hid ========== ');
  }
});
//# sourceMappingURL=app.js.map
