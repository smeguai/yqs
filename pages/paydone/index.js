import {
  groupdetail,
  paydonerecomment
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
    isgroup: false,
    pid: null,
    groupdesc: null,
    uid: null,
    orderid: null,
    price: null,
    list: null,
    loding: true
  },
  //  跳转  团购
  handleGroupDesc(e) {
    wx.redirectTo({
      url: `../goodsdetail/index?name=group&pid=${e.currentTarget.dataset.pid}`
    })
  },
  // 推荐商品
  getRecomment() {
    promiseRequest(paydonerecomment, 'get', {
      stationId: app.globalData.station.stationId,
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  //  参与拼团
  handleGroupPay() {
    wx.redirectTo({
      url: `../goodsdetail/index?groupBuyId=${this.data.pid}&name=group&pid=${this.data.groupdesc.productGroupBuyId}`
    })
  },
  //  查看订单详情
  handleClickOrderDesc() {
    wx.redirectTo({
      url: `../orderdetail/index?orderid=${this.data.orderid}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      isgroup: options.group == 1 ? true:false,
      pid: options.pid,
      uid: wx.getStorageSync('userInfo').uid,
      orderid: options.orderid,
      price: options.price
    })
    if (options.group == 1) {
      this.getGroupDsc()
    }
    this.getRecomment()
  },

//  获取拼团信息
getGroupDsc() {
  promiseRequest(groupdetail, 'get', {
    groupBuyId: this.data.pid
  }).then(res => {
    if (res.data.code == 1) {
      this.setData({
        groupdesc: res.data.data
      })
    }
  })
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '和我来拼团',
    path: `/pages/paydone/index?pid=${this.data.pid}&uid=${this.data.uid}&group=1`
    }
  }
})