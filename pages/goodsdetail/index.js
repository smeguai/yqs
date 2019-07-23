import {
    productdetail,
    groupbuydetail,
    cutdetail,
    limitdetail
} from '../../utils/api.js'
import {
    promiseRequest
} from '../../utils/util.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        status: null,
        productId: null,
        popupShow: false,
        aslid_btn: [{
            img: '../../static/img/goods_index.png',
            txt: '首页'
        }, {
            img: '../../static/img/goods_collect.png',
            txt: '分享'
        }, {
            img: '../../static/img/goods_service.png',
            txt: '联系客服'
        }],
        bannerCurrent: 0,
        pays: [{
            name: '张三',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1290832790,1643168179&fm=27&gp=0.jpg'
        }, {
            name: '李四',
            img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2961748425,612527933&fm=27&gp=0.jpg'
        }, {
            name: '王五',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1290832790,1643168179&fm=27&gp=0.jpg'
        }],
        paysCurrent: 0,
        detail: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            status: options.status,
            productId: options.productId
        })
        this.getDetails()
    },
    getDetails() {
        let data = {
            productId: this.data.productId
        }
        switch (this.data.status) {
            case 'group':
                promiseRequest(groupbuydetail, 'get', data).then(res => {

                })
                break;
            case 'limit':
                promiseRequest(limitdetail, 'get', data).then(res => {

                })
                break;
            case 'cut':
                promiseRequest(cutdetail, 'get', data).then(res => {

                })
                break;
            default:
                promiseRequest(productdetail, 'get', data).then(res => {
                    console.log(res)
                    if (res.data.code == 0) {
                        this.setData({
                            detail: res.data.data
                        })
                    }
                })
                break;
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.paysCurrent()
    },
    paysCurrent() {
        let timer = null
        timer = setTimeout(() => {
            let len = this.data.pays.length - 1,
                index = this.data.paysCurrent
            this.setData({
                paysCurrent: index < len ? index + 1 : 0
            })
            this.paysCurrent()
        }, 4000)
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

    },
    handleAslidBtnClick(e) {
        let i = e.currentTarget.dataset.index
        switch (i) {
            case 0:
                wx.switchTab({
                    url: '../index/index'
                })
                break;
        }
    },
    handlePayClick() {
        this.setData({
            popupShow: !this.data.popupShow
        })
    }
})