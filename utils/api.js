const configUrl = 'https://yqsapi.oicp.vip'
//  微信code
const xcxloginfcode = configUrl + '/api/wechat/xcxloginfcode',
    //  获取用户信息
    decrypt = configUrl + '/api/wechat/decrypt',
    // 登录用户
    wxlogin = configUrl + '/api/wechat/wxlogin',
    //  首页推荐商家
    shopget = configUrl + '/api/shop/get',
    //  优惠页的拼团/秒杀/砍价
    discount = configUrl + '/api/discount/get'
module.exports = {
    xcxloginfcode,
    decrypt,
    wxlogin,
    shopget,
    discount
}