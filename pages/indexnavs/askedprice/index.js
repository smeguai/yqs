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
    y: null,
    onLine: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      stationId: wx.getStorageSync('station').stationId,
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      onLine: wx.getStorageSync('userInfo') ? true : false
    })
    this.getCutList()
    this.getMycut()
  },
  //  继续砍价
  handleCuting(e) {
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: `../../cutdetail/index?pid=${pid}`
    })
  },
  //  获取我的砍价
  getMycut() {
    if (!this.data.onLine) return
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
    this.getCutList()
  },
  //  获取砍价列表
  getCutList() {
    promiseRequest(cut, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: this.data.keys,
      orderby: this.data.orderby,
      x: this.data.x,
      y: this.data.y
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: [...this.data.list, ...res.data.data]
        })
      }
    })
  },
  //  砍价
  handleCutprice(e) {
    wx.navigateTo({
      url: `../../goodsdetail/index?name=cut&pid=${e.currentTarget.dataset.pid}`,
    })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.pageIndex * this.data.pageSize <= this.data.list) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.getCutList()
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1,
      list: []
    })
    this.getCutList()
  }
})