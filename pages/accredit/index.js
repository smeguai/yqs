import {
  decrypt,
  wxlogin
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    tel: null,
    formid: '',
    station: null,
    location: null
  },
  //  获取formid
  formSubmit(e) {
    this.setData({
      formid: e.detail.formId
    })
  },
  //  拒绝授权
  handleCancel() {
    wx.navigateBack({
      delta: -1
    })
  },
  //  用户登录
  onGotUserInfo(e) {
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
        data
      })
      app.globalData.openORunion = data
      this._login(res.data)
    })
  },
  onLoad() {
    let station = wx.getStorageSync('station')
    let location =wx.getStorageSync('location')
    this.setData({
      station,
      location
    })
  },
  _login(d) {
    wx.showLoading({
      title: '登陆中...',
    })
    let data = {
      unionid: d.unionId,
      openid: d.openId,
      headimgurl: d.avatarUrl,
      nickname: d.nickName,
      sex: d.gender,
      province: d.province,
      city: d.city,
      source: "0",
      stationId: this.data.station.stationId,
      x: this.data.location[0],
      y: this.data.location[1]
    }
    promiseRequest(wxlogin, 'post', data).then(res => {
      if (res.data.code == 0) {
        wx.setStorage({
          key: 'userInfo',
          data: res.data.data,
          success: () => {
            app.globalData.onLine = true
            console.log(this.route, app.globalData.onLine)
            app._saveFormId(this.data.formid)
            wx.navigateBack({
              delta: -1
            })
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
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