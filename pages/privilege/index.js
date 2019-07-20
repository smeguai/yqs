import {
    groupbuy,
    limit,
    cut
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
        btnList: ['推荐', '热卖'],
        groupCurrent: 0,
        limitCurrent: 0,
        cutCurrent: 0,
        bannerCurrent: 0,
        stationId: 1,
        pageSize: 3,
        pageIndex: 1,
        merchantId: 0,
        bannerList: [{
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=115048785,2693865241&fm=27&gp=0.jpg',
            id: 0
        }, {
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4103562629,1178676710&fm=27&gp=0.jpg',
            id: 1
        }, {
            img: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3463632868,3775004076&fm=27&gp=0.jpg',
            id: 2
        }],
        list: [{
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3393805308,1492477291&fm=27&gp=0.jpg',
            name: '张三疯欧式奶茶铺',
            score: 5,
            genre: '甜品饮品',
            moods: 566,
            tag: ['长沙市连锁', '第一奶茶店'],
            ticket: [{
                price: 5,
                txt: '满30元可用',
                title: '优惠券'
            }, {
                price: 19,
                txt: '满30元可用|可叠加',
                title: '100元代金券'
            }, {
                price: 19,
                txt: '周六至周日可用|可叠加',
                title: '100元代金券'
            }, {
                price: 19,
                txt: '周六至周日可用|可叠加',
                title: '100元代金券'
            }, {
                price: 19,
                txt: '周六至周日可用|可叠加',
                title: '100元代金券'
            }]
        }],
        groupdata: null,
        limitdata: null,
        cutdata: null,
        stationId: null
    },
    bannerItemChange(e) {
        this.setData({
            bannerCurrent: e.detail.current
        })
    },
    _initData() {
        let data = {
            stationId: this.data.stationId,
            pageSize: this.data.pageSize,
            pageIndex: this.data.pageIndex,
            merchantId: 0
        }
        return data
    },

    getLimitdata() {
        let data = this._initData()
        promiseRequest(limit, 'get', data).then(res => {
            if (res.data.code == 0) {
                this.setData({
                    limitdata: res.data.data
                })
            }
        })
    },
    getCutdata() {
        let data = this._initData()
        promiseRequest(cut, 'get', data).then(res => {
            if (res.data.code == 0) {
                this.setData({
                    cutdata: res.data.data
                })
            }
        })
    },
    getGroupdata() {
        let data = this._initData()
        promiseRequest(groupbuy, 'get', data).then(res => {
            if (res.data.code == 0) {
                this.setData({
                    groupdata: res.data.data
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            stationId: app.globalData.station.stationId
        })
        this.getGroupdata()
        this.getCutdata()
        this.getLimitdata()
    },
    handleTabItemClick(e) {
        let d = e.currentTarget.dataset
        console.log(d.t)
        switch (d.t) {
            case 'group':
                this.setData({
                    groupCurrent: d.idx
                })
                break;
            case 'limit':
                this.setData({
                    limitCurrent: d.idx
                })
                break;
            case 'cut':
                this.setData({
                    cutCurrent: d.idx
                })
                break;
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

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