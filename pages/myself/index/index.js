const app = getApp()
// pages/myself/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        OrderCate: [{ icon: '../../../static/img/me_obligation.png', txt: '待付款' }, { icon: '../../../static/img/me_pickup.png', txt: '待使用' }, { icon: '../../../static/img/me_stocks.png', txt: '待收货' }, { icon: '../../../static/img/me_estimate.png', txt: '待评价' }]
    },
    handleClickOrder(e) {
        if (app.globalData.onLine) {
            wx.showToast({
                title: '还未登录账号',
                icon: 'none'
            })
        }
        wx.navigateTo({
            url: '../../orders/index'
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