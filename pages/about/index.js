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
    this.setData({
      ver: app.globalData.versions,
      uid: app.globalData.userInfo.uid
    })
  }
})