const app = getApp()
import {
    decrypt,
    wxlogin
} from '../../utils/api.js'
import {
    promiseRequest
} from '../../utils/util.js'

Page({

    data: {},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {},

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {},

    onGotUserInfo(e) {
        console.log(e)
        let data = {
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            sessionKey: app.globalData.session_key
        }
        promiseRequest(decrypt, 'post', data).then(res => {
            let data = {
                openId: res.data.openId,
                unionId: res.data.unionId
            }
            wx.setStorage({
                key: 'openORunion',
                data,
                success: (r) => {
                    app.globalData.openORunion = data
                    this._login(res.data)
                }
            })
        })
    },
    _login(d) {
        let data = {
            unionid: d.unionId,
            openid: d.openId,
            headimgurl: d.avatarUrl,
            nickname: d.nickName,
            sex: d.gender,
            province: d.province,
            city: d.city
        }
        promiseRequest(wxlogin, 'post', data).then(res => {
            if (res.data.code == 0) {
                wx.setStorage({
                    key: 'userInfo',
                    data: res.data.data,
                    success: () => {
                        wx.switchTab({
                            url: '../myself/index',
                        })
                    }
                })
            }
        })
    },
    handleClickToIndex() {
        wx.switchTab({
            url: '../index/index'
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