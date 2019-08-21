import {
  getgrouplist,
  mygroupbuy
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    list: [],
    mylist: [],
    keys: '',
    pageIndex: 1,
    pageSize: 10,
    merchantId: 0,
    orderby: 0,
    onLine: false
  },
  onLoad: function(options) {
    this.setData({
      onLine: wx.getStorageSync('userInfo') ? true : false
    })
    this.getMyGroupBuy()
    this.getGroupList()
  },
  //  跳转到团购页
  handleTogrouppay(e) {
    wx.navigateTo({
      url: `../../goodsdetail/index?name=group&pid=${e.currentTarget.dataset.pid}`,
    })
  },
  //  继续分享
  handleTopaydone(e) {
    let uid = wx.getStorageSync('userInfo').uid
    wx.navigateTo({
      url: `../../paydone/index?pid=${e.currentTarget.dataset.pid}&group=1&uid=${uid}`,
    })
  },
  //  获取正在拼团的商品
  getMyGroupBuy() {
    if (!this.data.onLine) return
    promiseRequest(mygroupbuy, 'get', {
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
  //  获取团购列表
  getGroupList() {
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      merchantId: this.data.merchantId,
      stationId: app.globalData.station.stationId,
      keys: this.data.keys,
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      orderby: this.data.orderby
    }
    promiseRequest(getgrouplist, 'get', data).then(res => {
      if (res.data.code === 0) {
        this.setData({
          list: [...this.data.list, ...res.data.data]
        })
      }
    })
  },
  //  输入框value
  searchInput(e) {
    this.setData({
      keys: e.detail.value
    })
  },
  //  搜索附近团购商品
  handleSearch() {
    this.setData({
      list: [],
      pageIndex: 1
    })
    this.getGroupList()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.pageIndex * this.data.pageSize <= this.data.list.length) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.getGroupList()
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
    this.getGroupList()
  }
})