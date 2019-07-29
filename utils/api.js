const configUrl = 'https://yqsapi.bnbn99.com'
// const configUrl = 'https://yqsapi.oicp.vip'
//  微信code
const xcxloginfcode = configUrl + '/api/wechat/xcxloginfcode',
  //  获取用户信息
  decrypt = configUrl + '/api/wechat/decrypt',
  // 登录用户
  wxlogin = configUrl + '/api/wechat/wxlogin',
  //  首页推荐商家
  shopget = configUrl + '/api/shop/get',
  //  优惠页的拼团/秒杀/砍价
  groupbuy = configUrl + '/api/shopping/groupbuy/get',
  limit = configUrl + '/api/shopping/limit/get',
  cut = configUrl + '/api/shopping/cut/get',
  //  经纬度定位小区
  serviceget = configUrl + '/api/user/service/get',
  //  首页navList
  indexNav = configUrl + '/api/type/index',
  //  关键词搜索小区
  search = configUrl + '/api/user/service/search',
  //  获取店铺详情
  shopdetail = configUrl + '/api/shop/detail',
  //  获取订单列表
  getorder = configUrl + '/api/order/get',
  //  按条件获取拼团列表
  getgrouplist = configUrl + '/api/shopping/groupbuy/get',
  //  首页特惠商品
  indexdiscount = configUrl + '/api/shopping/discount/index',
  //  首页/附近好券
  coupon = configUrl + '/api/coupon/get',
  //  我的钱包
  cash = configUrl + '/api/user/cash/get',
  elecard = configUrl + '/api/user/elecard/get',
  //  商品详情
  productdetail = configUrl + '/api/shopping/product/detail',
  groupbuydetail = configUrl + '/api/shopping/groupbuy/detail',
  cutdetail = configUrl + '/api/shopping/cut/detail',
  limitdetail = configUrl + '/api/shopping/limit/detail',
  //  提交订单
  producOrder = configUrl + '/api/product/order/submitted',
  //  普通商品下单页面
  placeorder = configUrl + '/api/shopping/placeorder/get',
  //  订单详情
  orderdetail = configUrl + '/api/order/detail',
  //  取消订单
  canceorder = configUrl + '/api/order/cancel',
  //  验证支付密码是否正确
  verifypass = configUrl + '/api/user/verificapaypwd',
  //  是否有支付密码
  existpaypwd = configUrl + '/api/user/existpaypwd',
  //  是否绑定手机
  hasbindtel = configUrl + '/api/user/getmobile',
  //  绑定手机号
  bindtel = configUrl + '/api/user/mobile/changebind',
  //  发送验证码
  getcode = configUrl + '/api/user/sendvalidcode'



module.exports = {
  getcode,
  hasbindtel,
  bindtel,
  existpaypwd,
  xcxloginfcode,
  decrypt,
  wxlogin,
  shopget,
  groupbuy,
  limit,
  cut,
  serviceget,
  indexNav,
  search,
  shopdetail,
  getorder,
  getgrouplist,
  indexdiscount,
  coupon,
  cash,
  elecard,
  productdetail,
  groupbuydetail,
  cutdetail,
  limitdetail,
  producOrder,
  placeorder,
  orderdetail,
  canceorder,
  verifypass
}