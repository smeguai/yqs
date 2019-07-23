const configUrl = 'https://yqsapi.bnbn99.com'
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
    limitdetail = configUrl + '/api/shopping/limit/detail'
module.exports = {
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
    limitdetail
}