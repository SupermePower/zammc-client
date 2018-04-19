'use strict';

// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: 'order',
    operation: '我的订单',
    currentCouponTab: 0,
    orderNumber: ['待支付', '全部'],
    orderList: {
      pay: [{
        img: 'https://order-foods-img-1256105536.cos.ap-chengdu.myqcloud.com/金掌勺店面图.png',
        name: '金掌勺',
        code: 'No1110110',
        time: '2017-03-26 17:26',
        money: '238'
      }],
      finish: [{
        img: 'https://order-foods-img-1256105536.cos.ap-chengdu.myqcloud.com/金掌勺店面图.png',
        name: '金掌勺',
        code: 'No12312312',
        time: '2017-03-26 17:26',
        money: '238',
        delMoney: '23',
        actMoney: '215',
        restaurantId: 'No123123',
        waiterId: 'waiter123123'
      }],
      cancel: [{
        img: 'https://order-foods-img-1256105536.cos.ap-chengdu.myqcloud.com/金掌勺店面图.png',
        name: '金掌勺',
        code: 'No12312312',
        time: '2017-03-26 17:26',
        money: '238'
      }]
    },
    index: 0,
    showMessage: null
  },
 
  /**
   * 设置couponTab
   * @param e
   */
  chooseCouponTab: function chooseCouponTab(e) {
    this.setData({
      currentCouponTab: e.currentTarget.dataset.tabid
    });
  },

  /**
   * 去支付
   * @param e
   */
  goPay: function goPay(e) {
    wx.navigateTo({
      url: '../payorder/payorder?id=' + e.currentTarget.dataset.id
    });
  },

  /**
   * 去打分或者打赏
   * @param e
   */
  goGratuity: function goGratuity(e) {
    var restaurantId = e.currentTarget.dataset.restaurantid;
    var waiterId = e.currentTarget.dataset.waiterid;
    var kind = e.currentTarget.dataset.kind;
    var url = '';
    if (kind === 'shop') {
      url = '../grade/grade?restaurantId=' + restaurantId;
    } else {
      url = '../gratuity/gratuity?waiterId=' + waiterId;
    }
    wx.navigateTo({
      url: url
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad(params) {
    // 由跳转链接设置标题
    var operation = params.operation;
    // 设置operation
    this.setData({
      operation: params.operation
    });
    operation = '我的订单';
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: operation
    });
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
//# sourceMappingURL=useroperation.js.map
