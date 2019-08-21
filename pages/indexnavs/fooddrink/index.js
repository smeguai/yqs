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
    list: [],
    pageIndex: 1,
    pageSize: 10,
    x: null,
    y: null,
    stationId: null,
    typeId: null,
    keys: '',
    loding: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: options.title
    })
    let location = wx.getStorageSync('location')
    let stationId = wx.getStorageSync('station').stationId
    this.setData({
      typeId: options.typeid,
      x: location[0],
      y: location[1],
      stationId
    })
    this.getSell()
  },
  //  跳转 商品详情
  handleTogoodsDetail(e) {
    let type = e.currentTarget.dataset.type
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: `../../goodsdetail/index?name=${type}&pid=${pid}`
    })
  },
  //  推荐商家 被点击
  handleSellerClick(e) {
    wx.navigateTo({
      url: `../../indexnavs/shop/index?pid=${e.currentTarget.dataset.pid}`,
    })
  },
  //  获取商家店铺
  getSell() {
    promiseRequest(getsell, 'get', {
      stationId: this.data.stationId,
      x: this.data.x,
      y: this.data.y,
      keys: this.data.keys,
      typeId: parseInt(this.data.typeId),
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      let list = res.data.data || []
      if (res.data.code == 0) {
        this.setData({
          list: [...this.data.list, ...list],
          loding: false
        })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1,
      list: []
    })
    this.getSell()
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.pageIndex * this.data.pageSize <= this.data.list.length) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.getSell()
    }
  }
})