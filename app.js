import {
    promiseRequest
} from './utils/util.js'
import {
    xcxloginfcode
} from './utils/api.js'
App({
    onLaunch: function() {
        this.getWXLogin()
        this.getLocation()
        this.globalData.station = wx.getStorageSync('station')
        this.globalData.userInfo = wx.getStorageSync('userInfo')
    },
    getWXLogin() {
        // 登录
        return new Promise((res, rej) => {
            wx.login({
                success: res => {
                    // 发送 res.code 到后台换取 openId, sessionKey, unionId
                    let data = {
                        code: res.code
                    }
                    promiseRequest(xcxloginfcode, 'post', data).then(res => {
                        this.globalData.session_key = res.data.session_key
                    })
                }
            })
        })
    },
    getLocation() {
        //  获取当前地理位置
        return new Promise((res, rej) => {
            let location = wx.getStorageSync('location')
            if (location) {
                this.globalData.location = location
                return
            }
            wx.getLocation({
                success: (res) => {
                    this.globalData.location = [res.latitude, res.longitude]
                    wx.setStorage({
                        key: 'location',
                        data: [res.latitude, res.longitude],
                    })
                }
            })
        })
    },
    globalData: {
        userInfo: null,
        onLine: false,
        session_key: null,
        openORunion: null,
        location: null,
        station: null
    }
})