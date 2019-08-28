// pages/setting/feedback/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['无法打开小程序', '小程序闪退', '卡顿', '黑屏白屏', '死机', '界面加载慢', '其他异常', '意见与建议']
  },

  
  onLoad: function (options) {

  },
  handleItemClick(e) {
    wx.navigateTo({
      url: `../subfeedback/index?txt=${e.currentTarget.dataset.txt}`
    })
  }
})