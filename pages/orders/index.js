import {
  getorder
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
    navList: [{
      txt: '全部',
      id: 0
    }, {
      txt: '待付款',
      id: 1
    }, {
      txt: '待使用',
      id: 2
    }, {
      txt: '待收货',
      id: 3
    }, {
      txt: '待评价',
      id: 4
    }],
    cateMode: {
      0: '待付款',
      1: '待使用',
      2: '待收货',
      3: '退款中'
    },
    navIdx: 0,
    list: [],
    status: 0,
    pageIndex: 1,
    pageSize: 10,
    count: 0,
    loadingText: '加载中...'
  },
  navItemClick(e) {
    let id = e.currentTarget.dataset.id
    if (this.data.navIdx == id) return
    this.setData({
      navIdx: id,
      status: id,
      pageIndex: 1,
      list: [],
      loadingText: '加载中...'
    })
    this.getOrders()
  },
  checkOrderDesc(e) {
    wx.navigateTo({
      url: `../orderdetail/index?orderid=${e.currentTarget.dataset.orderid}`,
    })
  },
  cancelOrder() {
    wx.showModal({
      title: '提示',
      content: '是否要取消当前订单？（确认后无法撤回）',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getOrders()
  },
  getOrders() {
    let data = {
      status: this.data.status,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }
    promiseRequest(getorder, 'get', data).then(res => {
      if (res.data.code == 0) {
        if (res.data.data.length == 0) {
          this.setData({
            loadingText: '空空如也...'
          })
        } else {
          this.setData({
            list: [...this.data.list, ...res.data.data],
            count: res.data.totalCount,
            pageIndex: data.pageIndex + 1
          })
        }
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
    this.setData({
      pageIndex: 1,
      list: [],
      loadingText: '加载中...'
    })
    this.getOrders()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.list.length < this.data.count) {
      this.getOrders()
    } else {
      this.setData({
        loadingText: '到底了~'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})