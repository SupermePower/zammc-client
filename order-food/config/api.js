//var NewApiRootUrl = 'http://localhost:8080/api/';
// var NewApiRootUrl = 'http://192.168.0.202:7500';//'http://xh.wanmingqi.com/api/';
// var baseUrl = "http://192.168.0.202:7500";
//var baseUrl = 'http://localhost:8080/order-foods';
var baseUrl = 'https://www.sxmbyd.com/order-foods';
module.exports = {
  receiveCoupon: baseUrl + '/coupon/receiveCoupon',
  queryCouponList: baseUrl + '/coupon/queryCouponList',
  addUser: baseUrl + '/user/addUser',
  queryHomePage: baseUrl + '/home/queryHomePage',
  queryUserOrder: baseUrl + '/order/queryUserOrder',
  placeOrder: baseUrl + '/order/placeOrder',
  goodsType: baseUrl + '/dish/goodsType',
  dishList: baseUrl + '/dish/dishList',
  queryRestaurantProperty: baseUrl + '/restaurant/queryRestaurantProperty',
  queryUserAccount: baseUrl + '/account/queryUserAccount',
  queryActivity: baseUrl + '/activity/queryActivity'
};
