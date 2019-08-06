import {
  getsell
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: null,
    pageIndex: 1,
    pageSize: 10,
    x: null,
    y: null,
    stationId: null,
    typeId: null,
    keys: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
    })
    wx.setNavigationBarTitle({
      title: options.title,
      typeId: options.typeid
    })
    let location = wx.getStorageSync('location')
    let stationId = wx.getStorageSync('station').stationId
    this.setData({
      x: location[0],
      y: location[1],
      stationId
    })
    this.getSell()
  },
  //  获取商家店铺
  getSell() {
    promiseRequest(getsell, 'get', {
      stationId: 1 || this.data.stationId,
      x: this.data.x,
      y: this.data.y,
      keys: this.data.keys,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
        wx.hideLoading()
      }
    })
  },
  // 设置搜索关键字
  handleSetkeys(e) {
    this.setData({
      keys: e.detail.value
    })
  },
  //  搜索
  handleKeysDone() {
    this.setData({
      pageIndex: 1
    })
    this.getSell()
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
        title: '加载中...',
      })
      this.setData({
        list: [],
        pageIndex: 1
      })
      this.getSell()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})