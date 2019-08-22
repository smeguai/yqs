import {
  getsell,
  getgoodslist
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
    keys: '',
    recommentKeys: [],
    historyKeys: [],
    pageIndex: 1,
    pageSize: 10,
    stationId: null,
    typeId: 0,
    x: null,
    y: null,
    merchantId: 0,
    orderby: 0,
    sellerList: null,
    goodsList: null,
    inputFocus: true
  },
  //  跳转
  handleClickGoods(e) {
    let pid = e.currentTarget.dataset.pid
    let title = e.currentTarget.dataset.title
    let type = 'product'
    wx.navigateTo({
      url: `../../goodsdetail/index?pid=${pid}&title=${title}&name=${type}`
    })
  },
  handleSellerClick(e) {
    let pid = e.currentTarget.dataset.pid
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../../indexnavs/shop/index?pid=${pid}&title=${title}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      stationId: app.globalData.station.stationId,
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      historyKeys: wx.getStorageSync('historyKeys')
    })
  },
  //  输入框获取焦点
  handleInputFocus() {
    this.setData({
      inputFocus: true
    })
  },
  //  输入框
  handleinput(e) {
    this.setData({
      keys: e.detail.value
    })
  },
  handlesearch() {
    this.setData({
      inputFocus: false
    })
    this.setHistoryKeys()
    this.getSeller()
    this.getGoods()
  },
  //  清除输入框内容
  handleSearchInputClear() {
    this.setData({
      keys: ''
    })
  },
  // 
  historyItemClick(e) {
    console.log(e.currentTarget.dataset.keys)
    this.setData({
      keys: e.currentTarget.dataset.keys,
      inputFocus: false
    })
    this.getSeller()
    this.getGoods()
  },
  //  保存搜索记录
  setHistoryKeys() {
    if (this.data.key == '') return
    let list = this.data.historyKeys || []
    let hasItem = false
    list.map(item => {
      if (item == this.data.keys) {
        hasItem = true
      }
    })
    if (hasItem) return
    if (list.length < 10) {
      list.unshift(this.data.keys)
    } else {
      list.pop()
      list.unshift(this.data.keys)
    }
    this.setData({
      historyKeys: list
    })
  },
  //  清除历史搜索记录
  hisoryclear() {
    wx.clearStorage('historyKeys')
  },
  //  搜索商品
  getGoods() {
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      typeId: this.data.typeId,
      merchantId: this.data.merchantId,
      keys: this.data.keys,
      orderby: this.data.orderby,
      x: this.data.x,
      y: this.data.y
    }
    promiseRequest(getgoodslist, 'get', data).then(res => {
      if (res.data.code == 0) {
        this.setData({
          goodsList: res.data.data
        })
      }
    })
  },
  //  搜索商家
  getSeller() {
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      typeId: this.data.typeId,
      x: this.data.x,
      y: this.data.y,
      keys: this.data.keys
    }
    promiseRequest(getsell, 'get', data).then(res => {
      if (res.data.code == 0) {
        this.setData({
          sellerList: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
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
    wx.setStorage({
      key: 'historyKeys',
      data: this.data.historyKeys
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})