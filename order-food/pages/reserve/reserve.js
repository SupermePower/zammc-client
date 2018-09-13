var app = getApp()
var util = require('../../utils/util')

Page({
  data: {
    bookToastHidden: true,
    navbar: [
      {
        image: 'https://order-foods-img-1256105536.cos.ap-chengdu.myqcloud.com/加盟广告图.png',
        displaySequence: 0,
        startDate: '2018-03-20',
        endDate: '2918-06-20'
      }
    ],
    currentTab: 0
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  submitForm: function(e) {
    var formData = e.detail.value;
    console.log(formData);
    wx.request({
      url: 'https://www.sxbhyc.com/order-foods/reserve/userReserve',
      method: 'POST',
      data: formData,
      header: { 'Content-Type': 'application/json' },
      success: function(res) {
        if (res.data.dealCode == 200) {
          wx.navigateTo({
            url: '../reserve/reserve'
          });
          wx.showToast({
            title: '预约成功',
            icon: 'success',
            duration: 1000
          });
        } else {
          console.log(res.data);
          wx.showToast({
            title: res.data.dealMsg,
            icon: 'fail',
            duration: 1000
          });
        }
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      artype: options.artype
    });
    var currentDate = this.getCurrentDate();
    var currentTime = this.getCurrentTime()
    this.setData({
      currentDate: currentDate,
      currentTime: currentTime
    });
  },
  // 地址选择
  bindAddrPickerChange: function (e) {
    console.log('Addrpicker发送选择改变，携带值为', e.detail.value)
    this.setData({
      addrIndex: e.detail.value
    })
  },
  bindToastTap: function () {
    console.log('预定成功')
    this.setData({
      bookToastHidden: false
    })
  },
  hideToast: function () {
    this.setData({
      bookToastHidden: true
    })
  },
  // 日期选择
  bindDateChange: function (e) {
    console.log('date picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currentDate: e.detail.value
    })
  },
  // 时间选择
  bindTimeChange: function (e) {
    console.log('time picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      currentTime: e.detail.value
    })
  },
  //获取当前时间(年月日)
  getCurrentDate: function () {
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();
    var currentHour = currentDate.getHours;
    if (currentMonth >= 1 && currentMonth <= 9) {
      currentMonth = "0" + currentMonth;
    }
    if (currentDay >= 0 && currentDay <= 9) {
      currentDay = "0" + currentDay;
    }
    return currentYear + '-' + currentMonth + '-' + currentDay;
  },
  //获取当前时间（时分）
  getCurrentTime: function () {
    var currentDate = new Date();
    return currentDate.getHours() + ':00';
  }
})