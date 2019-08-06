const app = getApp()
Page({
  data: {

  },
  getOpenSetting(e) {
    if (e.detail.authSetting['scope.userLocation']) {
      wx.getLocation({
        success: (res) => {
          app.globalData.location = [res.latitude, res.longitude]
          wx.setStorage({
            key: 'location',
            data: [res.latitude, res.longitude],
            success: () => {
              wx.navigateBack({
                delta: -1
              })
            }
          })
        }
      })
    }
  },
})