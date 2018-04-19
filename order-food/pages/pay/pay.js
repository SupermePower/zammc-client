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
    restaurant: {
      img: 'https://order-foods-img-1256105536.cos.ap-chengdu.myqcloud.com/金掌勺店面图.png',
      name: '金掌勺',
      id: 'remaid'
      }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    // 改变标题栏文字
    // 由跳转链接设置标题
    var operation = params.operation;
    // 设置operation
    this.setData({
      operation: params.operation
    });
    operation = '付款';
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: operation
    });
  },
  bindToastTap: function () {
    this.setData({
      bookToastHidden: false
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
    this.setNeedDistance();
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
