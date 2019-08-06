import {
  orderdetail
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: null,
    data: null,
    codeStatus: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.setData({
      orderid: options.orderid
    })
    this.getOrderDetail()
  },
  //  获取订单详情
  getOrderDetail () {
    promiseRequest(orderdetail, 'get', {
      orderId: this.data.orderid
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          data: res.data.data
        })
        let s = this.data.data.status
        let t = ''
        if (s == 0 || s == 1) {
          t = '未核销'
        } else if (s == 2 || s == 8 || s == 9) {
          t = '已核销'
        } else if (s == 3) {
          t = '退款中'
        } else if (s == 4) {
          t = '已退款'
        } else if (s == 88) {
          t = '已取消'
        }
        this.setData({
          codeStatus: t
        })
        wx.hideLoading()
      }
    })
  },
  //  跳转到自助核销
  handleVerify() {
    wx.navigateTo({
      url: `../myverify/index?orderid=${this.data.orderid}&type=0`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})