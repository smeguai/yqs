import {
  shopdetail,
  getgoodslist,
  groupbuy,
  limit,
  cut,
  comment,
  getreceive,
  addcollection
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
    merchantId: null,
    data: null,
    stationId: null,
    x: null,
    y: null,
    pageIndex: 1,
    pageSize: 5,
    onLine: false,

    productList: null,
    gourpList: null,
    limitList: null,
    cutList: null,
    commentList: null,
    commentScore: null,
    commentTagIdx: 0,
    commentTagLs: [{
      txt: '全部',
      n: 'totalCount',
      idx: 0
    }, {
      txt: '无可挑剔',
        n: 'startCount5',
        idx: 5
    }, {
      txt: '非常满意',
        n: 'startCount4',
        idx: 4
    }, {
      txt: '满意',
        n: 'startCount3',
        idx: 3
    }, {
      txt: '一般',
        n: 'startCount2',
        idx: 2
    }, {
      txt: '很差',
        n: 'startCount1',
        idx: 1
    }],
    loding: true
  },
  //  查看位置
  handleClickAddres(e) {
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.x),
      longitude: parseFloat(e.currentTarget.dataset.y),
      name: e.currentTarget.dataset.name,
      address: e.currentTarget.dataset.subname
    })
  },
  //  跳转  到更多特惠
  handleClickDiscount() {
    wx.navigateTo({
      url: `../../sale/index?pid='${this.data.merchantId}`
    })
  },
  //  跳转  到更多评论
  handleNavigateClick() {
    wx.navigateTo({
      url: `../../commentlist/index?pid=${this.data.merchantId}`
    })
  },
  //  拨打电话
  handleClickTel(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  //  商家付款
  handlepay() {
    wx.navigateTo({
      url: `../../gathering/index?pid=${this.data.merchantId}`
    })
  },
  //  收藏店铺
  handleCollect() {
    promiseRequest(addcollection, 'get' , {
      merchantId: this.data.merchantId
    }).then(res => {
      if (res.data.code == 0) {
        let data = this.data.data
        data.isCollection = res.data.data == '取消收藏成功' ? false : true
        this.setData({
          data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  //  购买代金券
  handleClickPay(e) {
    if (this.data.onLine) {
      let pid = e.currentTarget.dataset.pid
      wx.navigateTo({
        url: `../../pay/index?classs=product&productid=${pid}&count=1&skuid=0`,
      })
    }
  },
  //  用户评价切换
  handleCommentTagClick(e) {
    this.setData({
        commentTagIdx: e.currentTarget.dataset.idx
    })
    this.getComment()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({title: options.title})
    this.setData({
      merchantId: options.pid,
      onLine: wx.getStorageSync('userInfo') ? true : false,
      stationId: wx.getStorageSync('station').stationId,
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    })
    this.getShopDetail()
    this.getProductDes()
    this.getGroupDes()
    this.getLimitDes()
    this.getCutDes()
    this.getComment()
  },
  // 获取评论
  getComment() {
    promiseRequest(comment, 'get', {
      merchantId: this.data.merchantId,
      commentid: 0,
      pageindex: this.data.pageIndex,
      pagesize: this.data.pageSize,
      startIndex: this.data.commentTagIdx
    }).then(res => {
      if (res.data.code == 0) {
        if (this.data.pageIndex == 1) {
          this.setData({
            commentScore: res.data.dataScore
          })
        }
        this.setData({
          commentList: res.data.data
        })
      }
    })
  },
  //  领券
  handleReceive(e) {
    if (this.data.onLine) {
      promiseRequest(getreceive, 'get', {
        couponId: e.currentTarget.dataset.id
      }).then(res => {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        if (res.data.code == 0) {}
      })
    } else {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },
  //  砍价商品
  getCutDes() {
    promiseRequest(cut, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: 0,
      x: app.globalData.location[0],
      y: app.globalData.location[1],
    }).then(res => {
      if (res.data.code == 0 && res.data.data.length > 0) {
        this.setData({
          cutList: res.data.data
        })
      }
    })
  },
  //  获取秒杀商品
  getLimitDes() {
    promiseRequest(limit, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: 0,
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      searchType: 0
    }).then(res => {
      if (res.data.code == 0 && res.data.data.length > 0) {
        this.setData({
          limitList: res.data.data
        })
      }
    })
  },
  //  获取普通商品
  getProductDes() {
    promiseRequest(getgoodslist, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      typeId: 0,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: 0,
      x: this.data.x,
      y: this.data.y
    }).then(res => {
      if (res.data.code == 0 && res.data.data.length > 0) {
        this.setData({
          productList: res.data.data
        })
      }
    })
  },
  //  拼团商品
  getGroupDes() {
    promiseRequest(groupbuy, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: 0,
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    }).then(res => {
      if (res.data.code == 0 && res.data.data.length > 0) {
        this.setData({
          gourpList: res.data.data
        })
      }
    })
  },
  //  获取店铺详情信息
  getShopDetail() {
    let data = {
      merchantId: this.data.merchantId,
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    }
    promiseRequest(shopdetail, 'get', data).then(res => {
      if (res.data.code == 0) {
        let data = res.data.data
        data.couponList.map(item => {
          item.validStartTime = item.validStartTime.substr(0, 10)
          item.validEndTime = item.validEndTime.substr(0, 10)
        })
        data.voucherList.map(item => {
          item.useStartTime = item.useStartTime.substr(0, 10)
          item.useEndTime = item.useEndTime.substr(0, 10)
        })
        this.setData({
          data
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  //  商品详情
  handleToGoodesc(e) {
    let name = e.currentTarget.dataset.mode
    let pid = e.currentTarget.dataset.pid
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../../goodsdetail/index?name=${name}&pid=${pid}&title=${title}`
    })
  }
})