// pages/ShoppingCart/ShoppingCart.js
const app = getApp();
var config = require('../../utils/config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopcat:"",
    nowuser:"",
    userpoint:"",
    nothings:"none",
    showModalStatus:false,
    showPayStatus: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     var that = this 
    //  for (var i= 0;i<100;i++){
    //    that.setData({
    //     x:i
    //    })
    //  }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    if (app.globalData.nowloginusername == null) {
      wx.showToast({
        title: '请登录服务器！',
        icon: '',
        image: '../../images/allimages/sad.png',
        duration: 1500,
        mask: false,
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
      })
    } else {
      that.setData({
        nowuser: app.globalData.nowloginusername
      })
      wx.request({
        url: config.Readshopcaturl,
        data: {
          username: app.globalData.nowloginusername
        },
        header: { 'Accept': 'application/json' },
        method: "GET",
        success: function(res) {
          console.log(res.data)
          that.setData({
            shopcat: res.data,
            userpoint: res.data.length
          })
          // console.log(that.data.shopcat.length)
          // if (that.data.shopcat.length == 0){
          //   that.setData({
          //     nothings: "none"
          //   })
          // }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },
shopcat_delete: function (e) {
    var that = this
    console.log(e.target.dataset)
    wx.showModal({
      title: '提示！',
      content: '是否从购物车删除该商品？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '',
      confirmText: '确定',
      confirmColor: '',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: config.Deleteshopcatthingsurl,
            data: {
              COMMODITYID: e.target.dataset.deletecommodityid
            },
            header: { 'Accept': 'application/json' },
            method: "GET",
            success: function (res) {
              console.log(res.data)
              wx.showToast({
                title: '删除完成！',
                icon: '',
                image: '../../images/allimages/smiley.png',
                duration: 1500,
                mask: false,
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            },
            fail: function (res) { },
            complete: function (res) { },
          })
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
},
powerDrawer: function () {
  var that = this
  that.setData({
    showModalStatus: false,
    showPayStatus: false,
  })
},
shopcat_buybtn: function (e) {
  var that = this
  console.log(e.target.dataset)
  that.setData({
    showModalStatus: true,
    user: app.globalData.nowloginusername,
    address: app.globalData.nowloginuserAddress,
    datasete: e.target.dataset

  })
},
surebtn: function (e) {
  // Joinuserorderurl
  var that = this
  that.setData({
    showPayStatus: true,
    showModalStatus: false,
  })
},
paysurebtn: function (e) {
  var that = this
  console.log(e.target.dataset)
  wx.request({
    url: config.Joinuserorderurl,
    data: {
      username: app.globalData.nowloginusername,
      address: app.globalData.nowloginuserAddress,
      userorder: "购物车订单",
      commodityimg: that.data.datasete.img,
      commodityid: that.data.datasete.id,
      commodityname: that.data.datasete.name,
      commodityintroduces: that.data.datasete.troduce,
      commodityprice: that.data.datasete.prive,
    },
    header: { 'Accept': 'application/json' },
    method: "GET",
    success: function (res) {
      console.log(res.data)
      wx.showToast({
        title: '已加入订单！',
        icon: '',
        image: "../../images/allimages/smiley.png",
        duration: 1500,
        mask: false,
        success: function (res) {

        },
        fail: function (res) { },
        complete: function (res) { },
      })
      that.setData({
        showModalStatus: false,
        showPayStatus: false,
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})