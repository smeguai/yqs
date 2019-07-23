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
        currentData: null,
        currentStation: null,
        historyAddrsList: null,
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
    onLoad: function(options) {
        this.setData({
            historyAddrsList: wx.getStorageSync('historyAddrsList'),
            currentStation: wx.getStorageSync('station')
        })
        
    },
    getservice() {
        let data = {
            x: app.globalData.location[0],
            y: app.globalData.location[1]
        }
        promiseRequest(serviceget, 'post', data).then(res => {
            if (res.data.code == 0) {
                this.setData({
                    nearbyData: res.data.nearbyData
                })
            }
        })
    },
    //  附近小区 item  被点击
    nearItemClick(e) {
        let id = e.currentTarget.dataset.id,
            near = this.data.nearbyData,
            hasHistory = true
        near.map(item => {
            if (item.stationId == id) {
                app.globalData.station = item
                wx.setStorage({
                    key: 'station',
                    data: item
                })
                this.setData({
                    currentStation: item
                })
                this.getHistory()
            }
        })
    },
    //  历史记录
    getHistory() {
        let status = true
        let list = this.data.historyAddrsList,
            current = this.data.currentStation
        if (list) {
            list.map(item => {
                if (this.data.currentStation.stationId == current.stationId) {
                    status = false
                }
            })
        }
        if (status) {
            wx.setStorage({
                key: 'historyAddrsList',
                data: [...list, current]
            })
            this.setData({
                historyAddrsList: [...list, current]
            })
        }
    },
    //  点击修改地理位置
    setStation() {
        wx.chooseLocation({
            success: res => {
                this.setData({
                    currentData: res.name
                })
                let location = [res.latitude, res.longitude]
                app.globalData.location = location
                wx.setStorage({
                    key: 'location',
                    data: location,
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