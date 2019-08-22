import {
  productdetail,
  groupbuydetail,
  cutdetail,
  limitdetail,
  sharegooddes,
  usercut
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
    loding: true,
    status: null,
    isproduct: true,
    productId: null,
    popupShow: false,
    startcutmode: false,
    cutprice: 0,
    aslid_btn: [{
      img: '../../static/img/goods_index.png',
      txt: '首页'
    }, {
      img: '../../static/img/goods_collect.png',
      txt: '分享'
    }, {
      img: '../../static/img/goods_service.png',
      txt: '联系商家'
    }],
    bannerCurrent: 0,
    pays: null,
    paysCurrent: 0,
    detail: null,
    pageIndex: 1,
    pageSize: 10,
    groupPrice: 0,
    groupAlonePrice: 0,
    popupId: null,
    groupBuyId: 0,
    onLine: false,
    grouppaystatus: false,
    itemDesc: null
  },
  //  进店逛逛
  handleToSeller(e) {
    let pid = e.currentTarget.dataset.pid
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../indexnavs/shop/index?pid=${pid}&title=${title}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({title: options.title})
    this.setData({
      status: options.name,
      productId: options.pid,
      groupBuyId: options.groupBuyId,
      onLine: wx.getStorageSync('userInfo') ? true : false
    })
    this.getDetails()
    this.getsharegooddes()
  },
  //  参与拼团
  handleGroupPay(e){
    this.setData({
      popupShow: true,
      grouppaystatus: false,
      popupId: this.data.productId,
      groupBuyId: e.currentTarget.dataset.pid
    })
  },
  //  弹出参团层
  handleChangeGroupPay(e) {
    this.setData({
      grouppaystatus: true,
      itemDesc: e.currentTarget.dataset.itemdesc
    })
  },
  //  提交订单
  getDetails() {
    switch (this.data.status) {
      case 'group':
        promiseRequest(groupbuydetail, 'get', {
          Id: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            this.setData({
              detail: res.data.data,
              loding: false
            })
          }
        })
        break;
      case 'limit':
        promiseRequest(limitdetail, 'get', {
          Id: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            this.setData({
              detail: res.data.data,
              loding: false
            })
          }
        })
        break;
      case 'cut':
        promiseRequest(cutdetail, 'get', {
          Id: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            let detail = res.data.data
            detail.cutList.map(item => {
              item.receiveTime = item.receiveTime.substr(0, 10)
            })
            this.setData({
              detail,
              loding: false
            })
          }
        })
        break;
      case 'product':
        promiseRequest(productdetail, 'get', {
          productId: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            this.setData({
              detail: res.data.data,
              isproduct: false,
              loding: false
            })
          }
        })
        break;
    }
  },

  //  发起砍价
  handleStartCut() {
    if (!this.data.onLine) {
      wx.navigateTo({
        url: '../accredit/index',
      })
      return
    }
    wx.showLoading({
      title: '砍价中...',
    })
    promiseRequest(usercut, 'get', {
      productCutPriceId: this.data.productId
    }).then(res => {
      if (res.data.code == 1) {
        this.setData({
          startcutmode: true,
          cutprice: res.data.data.hadCutPrice
        })
        wx.redirectTo({
          url: `../cutdetail/index?pid=${this.data.productId}`
        })
      }
    })
  },
  //  关闭发起砍价
  handleStartCutClose() {
    this.setData({
      startcutmode: false
    })
  },
  //  单独购买 重新获取普通商品详情
  handleGetGoodsDetail(e) {
    wx.redirectTo({
      url: `./index?name=product&pid=${e.currentTarget.dataset.orderid}`,
    })
  },
  //  分享过此商品的用户
  getsharegooddes() {
    promiseRequest(sharegooddes, 'get', {
      productId: this.data.productId,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          pays: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.paysCurrent()
  },
  //  购买数
  paysCurrent() {
    let timer = setTimeout(() => {
      let len = this.data.pays.length - 1,
        index = this.data.paysCurrent
      if (index < len) {
        this.setData({
          paysCurrent: index + 1
        })
      } else {
        this.setData({
          pageIndex: this.data.pageIndex + 1
        })
      }
      if (this.data.pays.length != 0) {
        this.getsharegooddes()
      }
      this.paysCurrent()
    }, 4000)
  },
  popupStatus(e) {
    this.setData({
      popupShow: e.detail
    })
  },
  handleAslidBtnClick(e) {
    let i = e.currentTarget.dataset.index
    console.log(i)
    switch (i) {
      case 0:
        wx.switchTab({
          url: '../index/index'
        })
        break;
      case 2:
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.tel
        })
      break;
    }
  },
  //  发起拼团
  handlePayClick(e) {
    let popupId = null
    switch (this.data.status) {
      case 'group':
        popupId = this.data.detail.productGroupBuyId
        break;
      case 'limit':
        popupId = this.data.detail.timeLimitBuyId
        break;
      case 'product':
        popupId = this.data.detail.productId
        break;
    }
    this.setData({
      popupShow: true,
      price: e.currentTarget.dataset.price,
      popupId
    })
  },
  onShareAppMessage: function (ops) {
    if (ops.from === 'button') {
      return {
        title: this.data.detail.productName,
        imageUrl: this.data.detail.imgList[0].fileUrl,
        path: '/pages/index/index?jump=123'
      }
    }
  },
  //  拨打商家电话
  handleTelClick(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  }
})