const configUrl = 'https://yqsapi.bnbn99.com'
// const configUrl = 'https://yqsapi.oicp.vip'
//  微信code
const xcxloginfcode = configUrl + '/api/wechat/xcxloginfcode',
  //  v解密微信小程序的加密数据
  decrypt = configUrl + '/api/wechat/decrypt',
  // 登录用户
  wxlogin = configUrl + '/api/wechat/wxlogin',
  //  首页推荐商家
  shopget = configUrl + '/api/shop/get',
  //  优惠页的拼团/秒杀/砍价
  groupbuy = configUrl + '/api/shopping/groupbuy/get',
  limit = configUrl + '/api/shopping/limit/get',
  cut = configUrl + '/api/shopping/cut/get',
  //  商品详情评论
  comment = configUrl + '/api/comment/load',
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
  //  按条件获取普通商品
  getgoodslist = configUrl + '/api/shopping/get',
  //  首页特惠商品
  indexdiscount = configUrl + '/api/shopping/discount/index',
  //  附近好券
  coupon = configUrl + '/api/coupon/get',
  //  我的钱包
  cash = configUrl + '/api/user/cash/get',
  elecard = configUrl + '/api/user/elecard/get',
  //  商品详情
  productdetail = configUrl + '/api/shopping/product/detail',
  groupbuydetail = configUrl + '/api/shopping/groupbuy/detail',
  cutdetail = configUrl + '/api/shopping/cut/detail',
  limitdetail = configUrl + '/api/shopping/limit/detail',
  //  提交订单[普通 团购 秒杀 砍价商品订单]
  producOrder = configUrl + '/api/product/order/submitted',
  limitOrder = configUrl + '/api/limit/order/submitted',
  subgrouporder = configUrl + '/api/group/order/submitted',
  cutOrder = configUrl +'/api/cut/order/submitted',
  //  秒杀商品下单页
  limitsubmit = configUrl + '/api/limit/order/get',
  //  砍价下单页
  cutsubmit = configUrl + '/api/cut/order/get',
  //  发起砍价
  usercut = configUrl + '/api/shopping/cut/submitted',
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
  bindtel = configUrl + '/api/user/mobile/bind',
  //  发送验证码
  getcode = configUrl + '/api/user/sendvalidcode',
  //  微信一键授权
  changebindtel = configUrl + '/api/user/wechant/changebind',
  //  设置支付密码
  setpaypass = configUrl + '/api/user/setpaypwd',
  //  我的页面订单数统计
  ordercount = configUrl + '/api/order/getcount',
  //  继续支付
  orderpay = configUrl + '/api/order/pay',
  // 删除订单
  deleteorder = configUrl + '/api/order/delete',
  //  核销订单
  cancellation = configUrl + '/api/order/cancellation',
  //  确认收货
  receiving = configUrl + '/api/order/receiving',
  //  申请退款
  refund = configUrl + '/api/order/refund',
  //  banner
  banner = configUrl + '/api/img/getbychannelid',
  //  首页4类商家
  getsell = configUrl + '/api/shop/get',
  //  拼团详细信息
  groupdetail = configUrl + '/api/group/detail',
  //  商品详情页 购买,分享过商品的用户信息
  sharegooddes = configUrl + '/api/shopping/order/get',
  //  团购订单页
  grouporder = configUrl + '/api/group/order/get',
  //  我正在拼团中的商品
  mygroupbuy = configUrl + '/api/shopping/groupbuy/myget',
  //  我正在砍价得商品
  mycut = configUrl + '/api/shopping/cut/myget',
  //  我的钱包
  mywallet = configUrl + '/api/user/balance',
  //  用户领券
  getreceive = configUrl + '/api/coupon/receive',
  //  砍价详情
  usercutdesc = configUrl + '/api/shopping/usercut/detail',
  //  我的优惠券
  mycoupon = configUrl + '/api/coupon/my/get',
  freecoupon = configUrl + '/api/freecoupon/get',
  businessrecord = configUrl + '/api/record/shop/get',
  goodsrecord = configUrl +'/api/record/product/get',
  //  返回核销图
qrcodeimg = configUrl + '/api/wechat/qrcode/get',
cancelrefund = configUrl +'/api/order/cancelrefund',
//  帮忙砍价
cutfriendcut = configUrl + '/api/shopping/cut/friendcut',
  //  根据经纬度获取地区（高德地图)
nowloction = configUrl + '/api/region/get',
collection = configUrl +'/api/collection/shop/get',
addcollection = configUrl + '/api/collection/shop/add',
// 我的砍价
mycutlist = configUrl + '/api/shopping/cut/my',
//  商品中 可用的优惠券
  usercoupon = configUrl + '/api/producr/usercoupon',
  //  服务协议
  serviceagreement = configUrl + '/api/article/serviceagreement',
  //  隐私政策
  privacypolicy = configUrl + '/api/article/privacypolicy',
  //  帮助中心
  helpcenter = configUrl + '/api/article/helpcenter',
  //  商家付款
  userpay = configUrl + '/api/shop/userpay',
  //  商家付款 可用金额
  merchatbalance = configUrl + '/api/user/shopbalance',
  //  充值
  recharge = configUrl + '/api/wechat/cash/charge',
  //  支付成功后推荐的商品
  paydonerecomment = configUrl + '/api/shopping/groupbuy/fine',
  //  评价
  setcomment = configUrl + '/api/order/comment',
  // 上传图片
  getsigna = configUrl + '/api/img/getsigna',
  //  用户反馈
  feedback = configUrl + '/api/user/user/feedback',
  //  分享回调
  shareback = configUrl + '/api/user/sharecallback',
  //  收集小程序
  getformid = configUrl + '/api/getformid'
module.exports = {
  getformid,
  shareback,
  feedback,
  merchatbalance,
  getsigna,
  cutOrder,
  cutsubmit,
  setcomment,
  paydonerecomment,
  recharge,
  userpay,
  helpcenter,
  privacypolicy,
  serviceagreement,
  usercoupon,
  mycutlist,
  addcollection,
  collection,
  nowloction,
  cutfriendcut,
  cancelrefund,
  qrcodeimg,
  businessrecord,
  goodsrecord,
  usercutdesc,
  mycoupon,
  freecoupon,
  usercut,
  comment,
  limitsubmit,
  getreceive,
  limitOrder,
  mywallet,
  getgoodslist,
  mycut,
  mygroupbuy,
  subgrouporder,
  grouporder,
  sharegooddes,
  groupdetail,
  getsell,
  banner,
  refund,
  receiving,
  cancellation,
  deleteorder,
  orderpay,
  ordercount,
  setpaypass,
  getcode,
  changebindtel,
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