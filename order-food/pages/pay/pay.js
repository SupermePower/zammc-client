'use strict';

// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'pay',
    bookToastHidden: true,
    hiddenName: false,
    isForbidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    var that = this;
    wx.request({
      url: 'https://www.sxbhyc.com/order-foods/restaurant/queryRestaurant',
      // url:api.queryHomePage,
      header: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      success: function (res) {
        if (res.data.dealCode == 200) {
          that.setData({
            restaurantImg: res.data.dealResult.restaurantImg,
            restaurantName: res.data.dealResult.restaurantName
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

    });
    // TODO: onLoad
    // 改变标题栏文字
    // 由跳转链接设置标题
    // 设置operation
    var operation = '付款';
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: operation
    });
  },
  clickMe: function (e) {
    this.setData({
      hiddenName: !this.data.hiddenName
    })
  },
  clickbg: function () {
    this.setData({
      hiddenName: false
    })
  },
  bindToastTap: function () {
    this.setData({
      bookToastHidden: false
    })
  },
  // clickInput:function(e){
  //   var inputData = e.detail.value;
  //   if (inputData.length>0){
  //     this.setData({
  //       isForbidden: true
  //     })
  //   }
  // },
  focus: function (e) {
    this.setData({
      isForbidden: false
    })
  },
  /* 文本框失焦时更改状态*/
  blur: function (e) {
    this.setData({
      isForbidden: true
    })
  },
  hideToast: function () {
    this.setData({
      bookToastHidden: true
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
//# sourceMappingURL=ordering.js.map