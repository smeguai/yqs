import {getorder} from '../../utils/api.js'
import { promiseRequest} from '../../utils/util.js'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [{ txt: '全部', id: 0 }, { txt: '待付款', id: 1 }, { txt: '待使用', id: 2 }, { txt: '待收货', id: 3 }, { txt: '待评价', id: 4 }],
        navIdx: 0,
        list: null,
        status: 0,
        pageIndex: 1,
        pageSize: 10
    },
    navItemClick(e) {
        this.setData({
            navIdx: e.currentTarget.dataset.id
        })
    },
    checkOrderDesc() {
        wx.navigateTo({
            url: '../orderdetail/index',
        })
    },
    cancelOrder() {
        wx.showModal({
            title: '提示',
            content: '是否要取消当前订单？（确认后无法撤回）',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getOrders()
    },
    getOrders() {
        let data = {
            status: this.data.status,
            pageIndex: this.data.pageIndex,
            pageSize: this.data.pageSize
        }
        let token = app.globalData.userInfo.token
        let header = {
            Authorization:  'Bearer ' + token
        }
        promiseRequest(getorder, 'get', data, header).then(res => {
            console.log(res)
        })
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