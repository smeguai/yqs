import {
  canceluser
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
    logoutShow: false,
    name: ''
  },

  clauseClick() {
    this.setData({
      logoutShow: !this.data.logoutShow
    })
  },
  backClick() {
    wx.navigateBack({
      delta: 1,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.setData({
        name: userinfo.nickname
      })
    }
  },
  handleLogoutClick() {
    promiseRequest(canceluser, 'get').then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '已成功注销',
          icon: 'none',
          success: () => {
            app.globalData.onLine = false
            wx.clearStorageSync()
            setTimeout(() => {
              wx.switchTab({
                url: '../myself/index'
              })
            }, 1000)
          }
        })
      }
    })
  }
})