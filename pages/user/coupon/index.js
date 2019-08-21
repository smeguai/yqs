import {
  mycoupon,
  freecoupon,
  getreceive
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
const app = getApp()

Page({
  data: {
    loding: true,
    nav: [{
        name: '我的优惠券',
        id: 0
      },
      {
        name: '免费领券',
        id: 1
      }
    ],
    index: 0,
    activeIndex: 0,

    coupon_my: null,
    pageIndex: 1,
    pageSize: 10,
    stationId: null,
    x: null,
    y: null,

    free_coupon_list: []
  },
  //  领取券
  handleGetCoupon(e) {
    promiseRequest(getreceive, 'get', {
      couponId: e.currentTarget.dataset.id
    }).then(res => {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
    })
  },
  onLoad() {
    this.setData({
      stationId: wx.getStorageSync('station').stationId
    })
  },
  navClick(event) {
    this.setData({
      activeIndex: event.currentTarget.dataset.index,
      loding: true
    })
    this._getlist()
  },
  onShow: function() {
    this._getlist()
  },
  _getlist() {
    switch (this.data.activeIndex) {
      case 0:
        this.getmyCoupon()
        break;
      case 1:
        this.getfreeCoupon()
        break;
    }
  },

  //  免费券
  getfreeCoupon(){
    promiseRequest(freecoupon, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    }).then(res => {
      let list = res.data.data
      list.map(item => {
        item.validStartTime = item.validStartTime.substr(0, 10)
        item.validEndTime = item.validEndTime.substr(0, 10)
      })
      if (res.data.code == 0) {
        this.setData({
          free_coupon_list: [...this.data.free_coupon_list, ...res.data.data]
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  //  我的券
  getmyCoupon() {
    promiseRequest(mycoupon, 'get').then(res => {
      if (res.data.code == 0 && res.data.data) {
        let list = res.data.data
        list.map(item => {
          item.validStartTime = item.validStartTime.substr(0, 10)
          item.validEndTime = item.validEndTime.substr(0, 10)
        })
        this.setData({
          coupon_my: list
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  onPullDownRefresh: function() {
    this.setData({
      loding: true,
      pageIndex: 1,
      free_coupon_list: []
    })
    this._getlist()
  },
  onReachBottom: function() {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.getfreeCoupon()
  }
})