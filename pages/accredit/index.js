const app = getApp()
import {
  decrypt,
  wxlogin
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'

Page({
  data: {
    tel: null,
  },
  //  用户登录
  onGotUserInfo(e) {
    wx.showLoading({
      title: '登陆中...',
    })
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
          wx.showLoading({
            title: '登陆中...',
          })
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
      city: d.city,
      source: "0"
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
            app.globalData.onLine = true
          }
        })
      }
    })
  },
  handleClickToIndex() {
    wx.switchTab({
      url: '../index/index'
    })
  }
})