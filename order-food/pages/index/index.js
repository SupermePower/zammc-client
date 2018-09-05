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
    show: '',
    title: 'index',
    userInfo: null,
    userSite: '定位中',
    navList: [{
      navTitle: '预约',
      navIcon: '../../images/yuyue.png',
      type: '0'
    }, {
      navTitle: '点餐',
      navIcon: '../../images/diancan.png',
      type: '1'
    }, {
      navTitle: '收银台',
      navIcon: '../../images/shouyintai.png',
      type: '2'
    }, {
      navTitle: '会员充值',
      navIcon: '../../images/chongzhi.png',
      type: '3'
    }, {
      navTitle: '优惠券',
      navIcon: '../../images/youhuiquan.png',
      type: '4'
    }, {
      navTitle: '店铺详情',
      navIcon: '../../images/dianpuxiangqing.png',
      type: '5'
    }]
  },
  /**
   * 用户选择位置
   * @returns {boolean}
   */
  chooseLocation: function chooseLocation() {
    // console.log(1)
    var that = this;
    wx.chooseLocation({
      success: function success(res) {
        console.log(res);
        if (res.name.length <= 0) {
          return that.setData({
            userSite: res.address
          });
        }
        that.setData({
          userSite: res.name
        });
      }
    });
  },

  /**
   * 用户搜索
   */
  goSearch: function goSearch() {
    wx.navigateTo({
      url: '../search/search'
    });
  },

  toOperate: function toOperate(e) {
    var type = e.target.id;
    console.log(type);
    if (type == '0') {//预约
      wx.navigateTo({
        url: '../reserve/reserve'
      });
    }
    //点餐
    if (type == '1') {
      wx.navigateTo({
        url: '../ordering/ordering'
      });
      // var that = this;
      // var show;
      // wx.scanCode({
      //   success: (res) => {
      //     this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
      //     that.setData({
      //       show: this.show
      //     })
      //     wx.showToast({
      //       title: '成功',
      //       icon: 'success',
      //       duration: 2000
      //     })
      //   },
      //   fail: (res) => {
      //     wx.showToast({
      //       title: '失败',
      //       icon: 'success',
      //       duration: 2000
      //     })
      //   },
      //   complete: (res) => {
      //   }
      // })
    }
    //收银台
    if (type == '2') {
      wx.switchTab({
        url: '../pay/pay'
      });
    }
    //充值
    if (type == '3') {
      wx.navigateTo({
        url: '../recharge/recharge'
      });
    }
    //优惠券
    if (type == '4') {
      wx.navigateTo({
        url: '../coupon/coupon'
      });
    }

    if (type == '5') {
      wx.navigateTo({
        url: '../restaurantDetail/restaurantDetail'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    console.log("当前用户信息-----" + app.data.userInfo);
    var that = this;
    wx.request({
      url: api.queryHomePage,
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.dealCode == 200) {
          that.setData({
            notice: res.data.dealResult.notice,
            imgUrls: res.data.dealResult.imgUrls,
            restaurantName: res.data.dealResult.restaurantName,
            restaurantStatus: res.data.dealResult.restaurantStatus
          });
        }
      },
      fail: function () {
        wx.showToast({
          title: '失败',
          icon: 'fail',
          duration: 1000
        });
      }
    })

    wx.getLocation({
      success: function success(res) {
        console.log(res);
      }
    });
    console.log(' ---------- onLoad ----------');
    // console.dir(app.data)
    app.getUserInfo().then(function (info) {
      return _this.setData({ userInfo: info });
    }).catch(console.info);
  },

  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'success',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },
  // 分享
  onShareAppMessage: function () {
    var user = getApp().globalData.userInfo;
    return {
      title: '最爱妈妈菜',
      path: '/pages/index/index?id=' + user.id,
      // 分享成功
      success: function (res) {
        wx.request({
          url: app.d.hostUrl + '/api/user/share',
          method: 'get',
          data: {},
          header: app.getHeader(),
          success: function (res) {
          },
          fail: function (e) {
            app.toast('网络异常！');
          },
        })
      },
      // 分享失败
      fail: function (res) {
        wx.request({
          url: app.d.hostUrl + '/api/user/share',
          method: 'get',
          data: {

          },
          header: app.getHeader(),
          success: function (res) {

          },
          fail: function (e) {
            app.toast('网络异常！');
          },
        })
      }
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    console.log(' ---------- onReady ----------');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function onShow() {
    console.log(' ---------- onShow ----------');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function onHide() {
    console.log(' ---------- onHide ----------');
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    console.log(' ---------- onUnload ----------');
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    console.log(' ---------- onPullDownRefresh ----------');
  }
});
//# sourceMappingURL=index.js.map
