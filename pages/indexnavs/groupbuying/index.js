import { getgrouplist} from '../../../utils/api.js'
import { promiseRequest } from '../../../utils/util.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: null,
        pageIndex: 1,
        pageSize: 10,
        merchantId: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getGroupList()
    },
    getGroupList() {
        let data = {
            pageIndex: this.data.pageIndex,
            pageSize: this.data.pageSize,
            merchantId: this.data.merchantId,
            stationId: app.globalData.station.stationId
        }
        promiseRequest(getgrouplist, 'get', data).then(res => {
            console.log(res)
            if (res.data.code === 0) {
                this.setData({
                    list: res.data.data
                })
            }
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