import {
  openedcity
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city: null,
    cityname: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let cityname = wx.getStorageSync('cityname')
    this.setData({
      cityname
    })
    this.getOpenedcity()
  },
  //  开通城市
  getOpenedcity() {
    promiseRequest(openedcity, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          city: res.data.data
        })
      }
    })
  },
  //  已开通城市 被点击
  handleCityItemClick(e) {
    this.setData({
      cityname: e.currentTarget.dataset.name
    })
    wx.setStorageSync('cityname', e.currentTarget.dataset.name)
  }
})