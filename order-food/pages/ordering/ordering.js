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
    sizeIndex: 0,
    title: 'ordering',
    //是否展示弹框
    showModalStatus: false,
    // 当前的tab
    currentmenu: 0,
    // 当前的left栏
    currentleftmenu: 0,
    // 侧边栏联动当前值
    currentmenuid: 'list1',
    // 设置scroll-view的高度
    scrollHeight: 880,
    needDistance: 0,
    scrollHeight2: 815,
    showShopCarContent: false,
    showMask: false,
    chooseGoods: {
      // 饭店id
      restaurant_id: 'renmaid',

      // 选择的商品数量
      goods: {},
      // 总金额
      money: 0,
      // 总数
      allCount: 0
    },
    sizeIndex: {},
    shopCar: {},
    goodsItem: {
      id: 0,
      num: 0,
      name: "",
      price: 0,
      memo: ""
    },
  },
  /**
   * 确认订单
   */
  goCheckOrder: function goCheckOrder() {
    if (this.data.chooseGoods.allCount <= 0) {
      return wx.showToast({
        title: '您还没有点餐',
        icon: 'success',
        mask: true
      });
    }
    var chooseGoods = this.data.chooseGoods;
    var shopCar = this.data.shopCar;
    var msgArrys = new Array();
    Object.keys(shopCar).forEach(function (key) {
      msgArrys.unshift(shopCar[key]);
    });
    console.log(msgArrys)
    var userInfo = wx.getStorageSync('user') || {};
    var userId = userInfo.openid;
    console.log("点餐人的openid------>", userId);
    wx.request({
      url: api.placeOrder,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: {          //参数为json格式数据
        userId: userId,
        goodMsg: msgArrys,
        allCount: chooseGoods.allCount,
        allMoney: chooseGoods.money,
        tableNumber: 10
      },
      success: function (res) {
        if (res.data.dealCode == 200) {
          // todo 提交订单信息，然后去到确认页面
          wx.navigateTo({
            url: '../payorder/payorder?operation=checkOrder&orderId=' + res.data.dealResult.orderId
          });
        }
      }
    })
  },


  /**
   * 显示购物车内容
   */
  showContent: function showContent() {
    if (this.data.chooseGoods.money <= 0) return;
    console.log(this.data.showShopCarContent)
    console.log(this.data.chooseGoods)
    this.setData({
      showShopCarContent: !this.data.showShopCarContent,
      showMask: !this.data.showMask
    });
  },

  /**
   * 获取优惠券
   * @param e
   */
  getCoupon: function getCoupon(e) {
    wx.showToast({
      title: '领取优惠券',
      icon: 'success',
      duration: 2000,
      mask: true
    });
  },

  /**
   * 设置右侧滚动栏的位置
   */
  setNeedDistance: function setNeedDistance() {
    if (!this.data.restaurant.coupon.id) return;
    this.setData({
      needDistance: 142
    });
  },

  /**
   * 改变menu选择
   * @param e
   */
  choose: function choose(e) {
    this.setData({
      currentmenu: e.currentTarget.dataset.tab
    });
  },

  /**
   * 改变left menu选择
   * @param e
   */
  leftChoose: function leftChoose(e) {
    this.setData({
      currentleftmenu: e.currentTarget.dataset.menu,
      currentmenuid: e.currentTarget.dataset.menulistid
    });
  },



  /**
   * 修改标题栏文字
   */
  setNavigatorText: function setNavigatorText() {
    var that = this;
    wx.setNavigationBarTitle({
      title: that.data.restaurant.name
    });
  },

  /**
   * 添加商品
   * @param e
   */
  addorder: function addorder(e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    var goodsPrice = e.currentTarget.dataset.goodsprice;
    var goodsName = e.currentTarget.dataset.goodsname;
    var goodsType = e.currentTarget.dataset.goodstype;
    if (!goodsId) {
      return wx.showModal({
        title: '抱歉',
        content: '您选的菜品暂时无法提供',
        showCancel: false,
        confirmText: '我知道了'
      });
    }
    if (goodsType == 1) {
      //声明临时变量存储信息
      var cache = new Object;
      cache.id = goodsId;
      cache.price = goodsPrice;
      cache.name = goodsName;
      cache.num = 1;
      cache.memo = '';
      console.log(cache)
      wx.setStorageSync('cache', cache)
      this.chooseType(goodsId);
    } else {
      console.log("addorder else run")
      var chooseGoods = this.data.chooseGoods;
      var goods = chooseGoods.goods;
      var count = goods[goodsId];

      //购物车信息
      var car = this.data.shopCar;
      var goodItem = this.data.goodsItem;
      // 已有该商品
      if (count) {
        //购物车操作
        car[goodsId].num += 1;
        //原有逻辑
        goods[goodsId] = ++count;
        goods.money += goodsPrice
      } else {
        //购物车操作
        goodItem.id = goodsId;
        goodItem.price = goodsPrice;
        goodItem.name = goodsName;
        goodItem.num = 1
        car[goodsId] = goodItem;
        //原有逻辑
        goods[goodsId] = 1;
        goods[goodsName] = goodsName;
        goods.money = goodsPrice
      }
      chooseGoods.goods = goods;
      this.setData({
        chooseGoods: chooseGoods
      });
      ++chooseGoods.allCount;
      var money = chooseGoods.money + goodsPrice;
      chooseGoods.money = money;
      // 增加计数
      this.setData({
        chooseGoods: chooseGoods,
        shopCar: car
      });
      console.log(this.data.shopCar)
      wx.setStorageSync('chooseGoods', this.data.chooseGoods);
      wx.setStorageSync('shopCar', this.data.shopCar);
    }
  },

  /**
   * 删除商品
   * @param e
   */
  delorder: function delorder(e) {
    var goodsId = e.currentTarget.dataset.goodsid;
    var goodsPrice = e.currentTarget.dataset.goodsprice;
    var goodsName = e.currentTarget.dataset.goodsname;


    var chooseGoods = this.data.chooseGoods;
    var goods = chooseGoods.goods;
    var count = goods[goodsId];

    var car = this.data.shopCar;
    car[goodsId].num -= 1;
    if (car[goodsId].num == 0) {
      delete car[goodsId]
    }
    goods[goodsId] = --count;
    goods.money -= goodsPrice
    chooseGoods.goods = goods;
    this.setData({
      chooseGoods: chooseGoods,
      shopCar: car
    });
    var money = chooseGoods.money - goodsPrice //this.calculateMoney();
    chooseGoods.money = money;
    // 减少计数
    --chooseGoods.allCount;
    if (chooseGoods.allCount <= 0) {
      this.setData({
        showMask: false,
        showShopCarContent: false
      });
    }
    this.setData({
      chooseGoods: chooseGoods
    });
    console.log(this.data.shopCar)
    wx.setStorageSync('chooseGoods', this.data.chooseGoods);
    wx.setStorageSync('shopCar', this.data.shopCar);
  },

  /**
   * 选择规格
   */
  chooseType: function (id) {
    wx.setStorageSync('goodsId', id)
    console.log("goodsId----->" + id);
    var _this = this;
    wx.request({
      url: api.goodsType,
      method: 'POST',
      data: {
        goodsId: id
      },
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        if (res.data.dealCode == 200) {
          _this.setData({
            showModalStatus: true,
            typeMsg: res.data.dealResult,
          });
        }
      }
    })
  },
  addToCart: function (e) {
    var goodsId = wx.getStorageSync('goodsId');
    var typeMsg = wx.getStorageSync('typeMsg');
    var cache = wx.getStorageSync('cache');
    console.log("cache" + cache)
    console.log(goodsId);
    var car = this.data.shopCar;
    console.log(car)
    var item = car[goodsId];
    console.log(item);
    if (item == null) {
      cache.memo = typeMsg
      car[goodsId] = cache;
      console.log("if  ----->run");
    } else {
      //存在 给数量+1
      item.num += 1;
      item.memo += "|" + typeMsg
      car[goodsId] = item;
      console.log("else  ----->run");
    }
    console.log(car)
    //构建chooseGoods
    var chooseGoods = this.data.chooseGoods;
    var goods = chooseGoods.goods;
    if (goods[goodsId] == undefined) {
      goods[goodsId] = 1;
      goods.money = cache.price;
    } else {
      goods[goodsId] += 1;
      goods.money += cache.price
    }
    ++chooseGoods.allCount;
    chooseGoods.money += cache.price;
    console.log(chooseGoods)
    this.setData({
      chooseGoods: chooseGoods,
      shopCar: car,
      showModalStatus: false
    });
    wx.removeStorageSync('typeMsg');
    wx.setStorageSync('shopCar', this.data.shopCar);
    wx.setStorageSync('chooseGoods', this.data.chooseGoods);
  },

  chooseSE: function (e) {
    console.log("选规格");
    var index = e.currentTarget.dataset.index;
    var name = e.currentTarget.dataset.name;
    var findex = e.currentTarget.dataset.findex;
    var chooseIndex = this.data.sizeIndex;
    chooseIndex[findex] = name;
    this.setData({
      sizeIndex: chooseIndex
    });
    var typeMsg = "";
    var arr = Object.keys(chooseIndex)
    for (var j = 0, len = arr.length; j < len; j++) {
      console.log(j)
      if (j == len - 1) {
        typeMsg += chooseIndex[arr[j]];
      } else {
        typeMsg += chooseIndex[arr[j]] + "-";
      }

    }
    console.log(typeMsg)
    wx.setStorageSync('typeMsg', typeMsg)
  },

  selectInfo: function (e) {
    console.log("++++++？？？？？？")
    wx.removeStorageSync("cache");
    wx.removeStorageSync('typeMsg');
    // 增加计数
    this.setData({
      showModalStatus: false,
    });
    console.log("oveer");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function onLoad() {
    // TODO: onLoad
    // 改变标题栏文字
    var _this = this;
    console.log("-----------onLoad run");
    wx.request({
      url: api.dishList,
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      success: function (res) {
        console.log(res);
        if (res.data.dealCode == 200) {
          _this.setData({
            menuList: res.data.dealResult.dishList,
            notice: res.data.dealResult.notice,
            restaurant: res.data.dealResult.restaurant
          });
        }
      }
    })
    this.setNavigatorText();
    // 设置导航栏标题
    wx.setNavigationBarTitle({
      title: '点餐'
    });
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
    console.log("页面 隐藏")
    // TODO: onHide
  },


  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function onUnload() {
    // TODO: onUnload
    console.log("页面 卸载")
  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
});
//# sourceMappingURL=ordering.js.map
