import {
  cut,
  mycut
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
    list: [],
    mylist: [],
    pageIndex: 1,
    pageSize: 10,
    stationId: null,
    merchantId: 0,
    keys: '',
    orderby: 0,
    x: null,
    y: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    this.setData({
      stationId: app.globalData.station.stationId,
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    })
    this.getCutList()
    this.getMycut()
  },
  //  获取我的砍价
  getMycut() {
    promiseRequest(mycut, 'get', {
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          mylist: res.data.data
        })
      }
    })
  },
  //  输入框内容
  searchInput(e) {
    this.setData({
      keys: e.detail.value
    })
  },
  //  搜索
  handleSearch() {
    this.setData({
      list: [],
      pageIndex: 1
    })
    wx.showLoading({
      title: '加载中',
    })
    this.getCutList()
  },
  //  获取砍价列表
  getCutList() {
    promiseRequest(cut, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize + 1,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: this.data.keys,
      orderby: this.data.orderby,
      x: this.data.x,
      y: this.data.y
    }).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
      }
      wx.hideLoading()
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
    if (this.data.pageIndex * this.data.pageSize <= this.data.list) {
      wx.showLoading({
        title: '加载中...',
      })
      this.getCutList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})