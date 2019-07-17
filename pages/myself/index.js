const app = getApp()
// pages/myself/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        onLine: false,
        userInfo: null,
        OrderCate: [{
            icon: '../../static/img/me_obligation.png',
            txt: '待付款'
        }, {
            icon: '../../static/img/me_pickup.png',
            txt: '待使用'
        }, {
            icon: '../../static/img/me_stocks.png',
            txt: '待收货'
        }, {
            icon: '../../static/img/me_estimate.png',
            txt: '待评价'
        }],
        more: [{
                txt: '优惠券',
                icon: '../../static/img/yhq.png',
                id: 0
            },
            {
                txt: '我的砍价',
                icon: '../../static/img/wdkj.png',
                id: 1
            },
            {
                txt: '切换小区',
                icon: '../../static/img/xq.png',
                id: 2
            },
            {
                txt: '我的收藏',
                icon: '../../static/img/wdsc.png',
                id: 3
            },
            {
                txt: '联系客服',
                icon: '../../static/img/lxkf.png',
                id: 4
            },
            {
                txt: '关于我们',
                icon: '../../static/img/gywm.png',
                id: 5
            },
            {
                txt: '设置',
                icon: '../../static/img/sz.png',
                id: 6
            },
            {
                txt: '浏览记录',
                icon: '../../static/img/lljl.png',
                id: 7
            }
        ]
    },
    handleClickOrder(e) {
        if (app.globalData.onLine) {
            wx.showToast({
                title: '还未登录账号',
                icon: 'none'
            })
        }
        wx.navigateTo({
            url: '../orders/index'
        })
    },
    handleClickMore(e) {
        let id = e.currentTarget.dataset.id
        console.log(id)
        switch (id) {
            case 0:

                break;
            case 1:

                break;
            case 2:
                wx.navigateTo({
                    url: '../location/index',
                })
                break;
            case 3:
                break;
            case 4:
                wx.navigateTo({
                    url: '../contactus/index',
                })
                break;
            case 5:
                wx.navigateTo({
                    url: '../about/index',
                })
                break;
            case 6:
                wx.navigateTo({
                    url: '../setting/index',
                })
                break;
            case 7:

                break;
        }
    },
    handleSign() {
        wx.navigateTo({
            url: '../accredit/index',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this.setData({
        //     onLine: app.data.globalData.onLine
        // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (this.data.onLine) return
        let userInfo = wx.getStorageSync('userInfo')
        if (userInfo) {
            this.setData({
                userInfo,
                onLine: true
            })
        }
        console.log(userInfo)
    },
    handleToWallet() {
        wx.navigateTo({
            url: '../wallet/index',
        })
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