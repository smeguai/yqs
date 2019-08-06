import {
  coupon
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageIndex: 1,
    pageSize: 10,
    keys: '',
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.getcoupon()
  },
  //  输入keys搜索关键字
  searchInput(e) {
    this.setData({
      keys: e.detail.value
    })
  },
  //  keys  input输入后回车
  handleSearch() {
    this.setData({
      list: [],
      pageIndex: 1
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.getcoupon()
  },
  //   获取附近好券
  getcoupon() {
    promiseRequest(coupon, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: app.globalData.station.stationId,
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      merchantId: 0,
      keys: this.data.keys,
      orderby: 0
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
        console.log(this.data.list)
        wx.hideLoading()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.pageIndex * this.data.pageSize <= this.data.list.length) {
      wx.showLoading({
        title: '加载中',
      })
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.getcoupon()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})