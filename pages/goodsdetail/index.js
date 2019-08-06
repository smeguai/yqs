import {
  productdetail,
  groupbuydetail,
  cutdetail,
  limitdetail,
  sharegooddes
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
    status: null,
    isproduct: true,
    productId: null,
    popupShow: false,
    aslid_btn: [{
      img: '../../static/img/goods_index.png',
      txt: '首页'
    }, {
      img: '../../static/img/goods_collect.png',
      txt: '分享'
    }, {
      img: '../../static/img/goods_service.png',
      txt: '联系客服'
    }],
    bannerCurrent: 0,
    pays: null,
    paysCurrent: 0,
    detail: null,
    pageIndex: 1,
    pageSize: 10,
    groupPrice: 0,
    groupAlonePrice: 0,
    popupId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.setData({
      status: options.name,
      productId: options.pid
    })
    this.getDetails()
    this.getsharegooddes()
  },
  getDetails() {
    let data = {

    }
    switch (this.data.status) {
      case 'group':
        promiseRequest(groupbuydetail, 'get', {
          Id: this.data.productId
        }).then(res => {
          console.log(res)
          if (res.data.code == 0) {
            this.setData({
              detail: res.data.data
            })
            wx.hideLoading()
          }
        })
        break;
      case 'limit':
        promiseRequest(limitdetail, 'get', data).then(res => {

        })
        break;
      case 'cut':
        promiseRequest(cutdetail, 'get', data).then(res => {

        })
        break;
      case 'product':
        promiseRequest(productdetail, 'get', {
          productId: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            this.setData({
              detail: res.data.data,
              isproduct: false
            })
            wx.hideLoading()
          }
        })
        break;
    }
  },
  //  单独购买 重新获取普通商品详情
  handleGetGoodsDetail(e) {
    // this.setData({
    //   productId: e.currentTarget.dataset.orderid
    // })
    // promiseRequest(productdetail, 'get', {
    //   productId: this.data.productId
    // }).then(res => {
    //   if (res.data.code == 0) {
    //     this.setData({
    //       detail: res.data.data,
    //       status: 'product'
    //     })
    //   }
    // })
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
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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

  },
  handleAslidBtnClick(e) {
    let i = e.currentTarget.dataset.index
    switch (i) {
      case 0:
        wx.switchTab({
          url: '../index/index'
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
      case 'product':
        popupId = this.data.detail.productId
      break;
    }
    this.setData({
      popupShow: true,
      price: e.currentTarget.dataset.price,
      popupId
    })
  }
})