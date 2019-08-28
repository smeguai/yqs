import {
  groupdetail,
  paydonerecomment,
  shareback
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
  onShow() {
    let location = wx.getStorageSync('location')
    let  station = wx.getStorageSync('station')
    let userinfo = wx.getStorageSync('userInfo')
    this.setData({
      uid: userinfo.uid
    })
    if (!userinfo) {
      wx.navigateTo({
        url: '../accredit/index'
      })
      return
    }
    if (location && station) {
      this.getRecomment()
      //  是团购查询团购详情
      if (this.data.isgroup) {
        this.getGroupDsc()
      }
    } else {
      wx.navigateTo({
        url: '../location/index'
      })
    }
  },
  // 推荐商品
  getRecomment() {
    let location = wx.getStorageSync('location')
    let station = wx.getStorageSync('station')
    promiseRequest(paydonerecomment, 'get', {
      stationId: station.stationId,
      x: location[0],
      y: location[1]
    }).then(res => {
      console.log(res)
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
      isgroup: options.group == 1 ? true : false,
      pid: options.pid,
      orderid: options.orderid,
      price: options.price
    })
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
    let location = wx.getStorageSync('location')
    let station = wx.getStorageSync('station')
    return {
      title: '和我来拼团',
      path: `/pages/paydone/index?pid=${this.data.pid}&group=1`,
      success: () => {
    // promiseRequest(shareback, 'get', {
    //   sharetype: 0,
    //   biztype: 1,
    //   relationid: this.data.groupdesc.productGroupBuyId,
    //   shareurl: ''
    // })
      }
    }
  }
})