import {
  getgrouplist,
  mygroupbuy
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
    keys: '',
    pageIndex: 1,
    pageSize: 10,
    merchantId: 0,
    orderby: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
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
  //  获取正在拼团的商品
  getMyGroupBuy() {
    promiseRequest(mygroupbuy, 'get').then(res => {
      console.log(res)
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
  //  输入框value
  searchInput(e) {
    this.setData({
        keys: e.detail.value
    })
  },
  //  搜索附近团购商品
  handleSearch() {
    wx.showLoading({
      title: '加载中',
    })
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
      wx.showLoading({
        title: '加载中...',
      })
      this.getGroupList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})