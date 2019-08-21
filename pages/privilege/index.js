import {
  groupbuy,
  limit,
  cut,
  coupon,
  banner
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
    btnList: ['推荐', '热卖'],
    groupCurrent: 0,
    limitCurrent: 0,
    cutCurrent: 0,
    bannerCurrent: 0,
    pageSize: 5,
    pageIndex: 1,
    merchantId: 0,
    bannerList: null,
    groupdata: null,
    limitdata: null,
    cutdata: null,
    stationId: null,
    priviCurrent: 0,
    priviLs: null,
    loding: true,
    location: null
  },
  //  购买代金券
  handleClickPay(e) {
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: `../pay/index?classs=product&productid=${pid}&count=1&skuid=0`,
    })
  },

  //  领取优惠券
  handleClickGet(e) {
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
      wx.hideLoading()
    })
  },
  //  获取banner图
  getBanner() {
    promiseRequest(banner, 'get', {
      id: 1,
      stationId: this.data.stationId || 0
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          bannerList: res.data.data
        })
      }
    })
  },
  //  附近好券
  getCoupon() {
    promiseRequest(coupon, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      x: this.data.location[0],
      y: this.data.location[1],
      merchantId: 0,
      keys: '',
      orderby: this.data.priviCurrent
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          priviLs: res.data.data
        })
      }
    })
  },
  bannerItemChange(e) {
    this.setData({
      bannerCurrent: e.detail.current
    })
  },
  //  秒杀
  getLimitdata() {
    promiseRequest(limit, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: this.data.limitCurrent,
      x: this.data.location[0],
      y: this.data.location[1],
      searchType: 0
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          limitdata: res.data.data
        })
      }
    })
  },
  //  获取免费券
  handleGetPreferential() {

  },
  //  跳转到商品详情
  handleGoodsDetail(e) {
    let name = e.currentTarget.dataset.name
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: `../goodsdetail/index?name=${name}&pid=${pid}`
    })
  },
  //  砍价
  getCutdata() {
    promiseRequest(cut, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: this.data.cutCurrent,
      x: this.data.location[0],
      y: this.data.location[1]
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          cutdata: res.data.data
        })
      }
    })
  },
  //  团购
  getGroupdata() {
    promiseRequest(groupbuy, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: this.data.groupCurrent,
      x: this.data.location[0],
      y: this.data.location[1]
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          groupdata: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      stationId: wx.getStorageSync('station').stationId,
      location: wx.getStorageSync('location')
    })
    Promise.all([this.getBanner(), this.getCoupon(), this.getGroupdata(), this.getCutdata(), this.getLimitdata()]).then(() => {
      this.setData({
        loding: false
      })
    })
  },
  handleTabItemClick(e) {
    let d = e.currentTarget.dataset
    switch (d.t) {
      case 'privilege':
        this.setData({
          priviCurrent: d.idx
        })
        this.getCoupon()
        break;
      case 'group':
        this.setData({
          groupCurrent: d.idx
        })
        this.getGroupdata()
        break;
      case 'limit':
        this.setData({
          limitCurrent: d.idx
        })
        this.getLimitdata()
        break;
      case 'cut':
        this.setData({
          cutCurrent: d.idx
        })
        this.getCutdata()
        break;
    }
  },
  //  下拉刷新
  onPullDownRefresh: function() {
    this.setData({
      loding: true
    })
    Promise.all([this.getBanner(), this.getCoupon(), this.getGroupdata(), this.getCutdata(), this.getLimitdata()]).then(() => {
      this.setData({
        loding: false
      })
    })
  }
})