import {
    cash,
    elecard
} from '../../utils/api.js'
import {
    promiseRequest
} from '../../utils/util.js'
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentIndex: 0,
        cashData: null,
        elecardData: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getcash()
    },
    //  获取现金收支明细
    getcash() {
        promiseRequest(cash, 'get').then(res => {
            console.log(res)
            if (res.data.code === 0) {
                this.setData({
                    cashData: res.data.data
                })
            }
        })
    },
    //  获取电子卡收支明细
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },
    navClick(e) {
        let currentIndex = e.currentTarget.dataset.idx
        this.setData({
            currentIndex
        })
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})