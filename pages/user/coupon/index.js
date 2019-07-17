// pages/user/coupon/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nav: [
            {name: '我的优惠券',id:0},
            {name: '免费领券',id:1}
        ],
        index: 0,
        activeIndex: 0,

        coupon_my: [
            {
                pay: '10',
                price: '38',
                title: '安特鲁美味成真烘焙店',
                day: '3',
                text: '本券只限普通商品使用，不可用于拼团、秒杀、砍价商品，每次只限使用1张，不可叠加。',
                type: '1',
            },
            {
                pay: '10',
                price: '38',
                title: '安特鲁美味成真烘焙店',
                day2: '2019.08.18',
                text: '本券只限普通商品使用，不可用于拼团、秒杀、砍价商品，每次只限使用1张，不可叠加。',
                type: '0',
            },
            {
                pay: '10',
                price: '38',
                title: '安特鲁美味成真烘焙店',
                day2: '2019.08.18',
                text: '本券只限普通商品使用，不可用于拼团、秒杀、砍价商品，每次只限使用1张，不可叠加。',
                type: '0',
            }
        ],
    },

    navClick(event) {
        this.setData({
            activeIndex: event.currentTarget.dataset.index
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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