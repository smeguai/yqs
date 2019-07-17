import { promiseRequest} from './utils/util.js'
import { xcxloginfcode} from './utils/api.js'
App({
    onLaunch: function() {

        // 登录
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
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })

        //  获取当前地理位置
        wx.getLocation({
            success: (res) => {
                console.log(res.latitude, res.longitude)
            }
        })
    },
    globalData: {
        userInfo: null,
        onLine: false,
        session_key: null,
        openORunion: null
    }
})