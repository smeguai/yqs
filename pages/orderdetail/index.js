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
    listTotal: 0,
    orderId: 0,
    info: null,
    modeList: {
      0: {strong: '等待买家付款', sub: '订单24小时后将自动关闭'},
      1: { strong: '电子凭证待使用', sub: '到店向店员出示电子凭证，凭凭证取商品' },
      2: { strong: '电子凭证已核销', sub: '商凭证已使用，确认下收货吧~' },
      3: { strong: '申请退款中', sub: '商家已收到退款申请，会尽快处理的' },
      4: { strong: '订单已退款完成', sub: '订单已完成退款，需要还可以再商城重新购买哦~' },
      8: { strong: '订单已确认收货', sub: '感谢你的购买，给您购买的商品一个评价吧~' },
      9: { strong: '已完成', sub: '订单24小时后将自动关闭' },
      88: { strong: '订单已取消', sub: '订单已关闭，可在商城继续购买哦~' }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderId: options.orderid
    })
    this.getOrderDetail()
  },
  getOrderDetail() {
    let data = {
      orderId: this.data.orderId
    }
    promiseRequest(orderdetail, 'get', data).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          info: res.data.data
        })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})