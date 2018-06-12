'use strict';

// 获取全局应用程序实例对象
// const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
   
  },
  /**
   * 领取优惠卷
   */
  getCoupon: function(e) {
    // TODO: onReady
    //this.setNeedDistance();
    console.log("getCoupon")
    var receive = e.currentTarget.dataset.receive;
    var couponid = e.currentTarget.dataset.couponid;
    var expire = e.currentTarget.dataset.expire;
    console.log(receive)
    console.log(expire)
    if(expire==1){//已过期
      console.log("过期")
      this.confirm("领取提示", "该卷已经过期")
      return;
    }
    if(receive==1){//已领取
      this.confirm("领取提示","用户已经领取该卷")
    }else{
      var _this = this;
      wx.request({
        url: 'https://www.sxmbyd.com/order-foods/coupon/receiveCoupon',
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        data: {
          userId: 0,
          couponId: couponid
        },
        success: function (res) {
          console.log(res)
          if (res.data.dealCode == 200){
            _this.confirm("领取提示", "领取成功")
          }else{
            _this.confirm("领取提示", res.data.dealMsg)
          }
          
        }
      })
    }
  },

  confirm: function (title,content){
    wx.showModal({
      title: title,
      content: content,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
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
    // 改变标题栏文字
    //this.setNavigatorText();
    var _this = this;
    console.log("run")
    wx.request({
      url: 'https://www.sxmbyd.com/order-foods/coupon/queryCouponList',
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data:{
        userId:0
      },
      success: function (res) {
        if (res.data.dealCode == 200) {
          console.log(res)
          _this.setData({
            coupons: res.data.dealResult
          });
        }
      }
    })


  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function onReady() {
    // TODO: onReady
    //this.setNeedDistance();
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
