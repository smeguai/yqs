import {
  banner
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
    imgurl: '',
    tel: ''
  },
  //  复制
  copetxt() {
    wx.setClipboardData({
      data: this.data.tel,
      success: () => {
        wx.showToast({
          title: '复制成功!',
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCodeImg()
  },
  //  获取图片
  getCodeImg() {
    promiseRequest(banner, 'get', {
      id: 3,
      stationId: app.globalData.station.stationId
    }).then(res => {
      if (res.data.code == 0 && res.data.data) {
        this.setData({
          imgurl: res.data.data[0].imgUrl,
          tel: res.data.data[0].remark
        })
      }
    })
  }
})