import {
  xcxloginfcode,
  getformid
} from './utils/api.js'
import {
  promiseRequest
} from './utils/util.js'

App({
  onLaunch: function() {
    this.getWXLogin()
    this.getLocation()
    this.globalData.userInfo = wx.getStorageSync('userInfo')
    this.globalData.station = wx.getStorageSync('station')

    if (this.globalData.userInfo) {
      this.globalData.onLine = true
    }
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
            wx.setStorage({
              key: 'session_key',
              data: res.data.session_key
            })
          })
        }
      })
    })
  },
  getLocation() {
    //  获取当前地理位置
    return new Promise((res, rej) => {
      let station = wx.getStorageSync('station')
      let location = wx.getStorageSync('location')
      if (station) {
        this.globalData.station = station
        this.globalData.location = location
      } else {
        wx.getLocation({
          success: (res) => {
            this.globalData.location = [res.latitude, res.longitude]
            wx.setStorage({
              key: 'location',
              data: [res.latitude, res.longitude],
            })
          },
          complete: () => {
            wx.navigateTo({
              url: '../location/index',
            })
          }
        })
      }
    })
  },
  _saveFormId(formid) {
    console.log(formid, this.globalData.onLine)
    if (formid && this.globalData.onLine && formid != 'the formId is a mock one')
      promiseRequest(getformid, 'post', {
        source: 0,
        formid,
        isprepayid: 0
      })
  },
  globalData: {
    userInfo: null,
    onLine: false,
    session_key: null,
    location: null,
    station: null,
    versions: '1.0.0.1'
  }
})