const app = getApp()
import {
    serviceget
} from '../../utils/api.js'
import {
    promiseRequest
} from '../../utils/util.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        data: null,
        add: [{
                name: '黄鹤小区5片',
                num: '距离200米',
                add: '长沙市岳麓区',
            },
            {
                name: '麓枫和苑',
                num: '距离500米',
                add: '长沙市岳麓区',
            },
            {
                name: '万事家景小区',
                num: '距离1.23公里',
                add: '长沙市岳麓区',
            }
        ],
        record: [{
                name: '万顺家园小区',
                record: '长沙市芙蓉区',
            },
            {
                name: '金科佳苑小区',
                record: '长沙市芙蓉区',
            },
            {
                name: '万顺家园小区',
                record: '长沙市岳麓区',
            }
        ]
    },

    cityClick() {
        wx.navigateTo({
            url: 'city/index',
        })
    },
    selectClick() {
        wx.navigateTo({
            url: 'select/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},
    getservice() {
        let data = {
            x: app.globalData.location[0],
            y: app.globalData.location[1]
        }
        promiseRequest(serviceget, 'post', data).then(res => {
            if (res.data.code == 0) {
                this.setData({
                    data: res.data.data
                })
                app.globalData.station = res.data.data
                wx.setStorage({
                    key: 'station',
                    data: res.data.data,
                })
            } else if (res.data.code == 201) {
                wx.showToast({
                    title: res.data.msg,
                    icon: 'none'
                })
            }
        })
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
        let location = app.globalData.location
        if (location) {
            this.getservice()
        } else {
            wx.navigateTo({
                url: './accredit/index',
            })
        }
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