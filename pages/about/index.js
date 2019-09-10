const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ver: '',
    uid: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let userinfo = wx.getStorageSync('userInfo') || ''
    this.setData({
      ver: app.globalData.versions,
      uid: userinfo.uid
    })
  }
})