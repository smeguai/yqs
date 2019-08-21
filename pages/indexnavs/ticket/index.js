import {
  coupon,
  getreceive
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
    pageIndex: 1,
    pageSize: 10,
    keys: '',
    list: [],
    onLine: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      onLine: wx.getStorageSync('userInfo') ? true : false
    })
    this.getcoupon()
  },
  //  输入keys搜索关键字
  searchInput(e) {
    this.setData({
      keys: e.detail.value
    })
  },
  //  购买代金券
  handleClickPay(e) {
    if (this.data.onLine) {
      wx.navigateTo({
        url: `../../pay/index?classs=product&productid=${e.currentTarget.dataset.pid}&count=1&skuid=0`,
      })
    } else {
      wx.showToast({
        title: '请先登录!',
        icon: 'none'
      })
    }
  },
  //  领取优惠券
  handleClickGet(e) {
    if (this.data.onLine) {
      wx.showLoading({
        title: '领取中...',
        mask: true
      })
      promiseRequest(getreceive, 'get', {
        couponId: e.currentTarget.dataset.id
      }).then(res => {
        if (res.data.code == 0) {
          wx.showToast({
            title: '领取成功!',
            icon: 'none'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    } else {
      wx.showToast({
        title: '请先登录!',
        icon: 'none'
      })
    }
  },
  //  keys  input输入后回车
  handleSearch() {
    this.setData({
      list: [],
      pageIndex: 1
    })
    this.getcoupon()
  },
  //   获取附近好券
  getcoupon() {
    promiseRequest(coupon, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: app.globalData.station.stationId,
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      merchantId: 0,
      keys: this.data.keys,
      orderby: 0
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
      }
    })
  },
  onReachBottom: function() {
    if (this.data.pageIndex * this.data.pageSize <= this.data.list.length) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.getcoupon()
    }
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 1,
      list: []
    })
    this.getcoupon()
  }
})