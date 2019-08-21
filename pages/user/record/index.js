import {
  businessrecord,
  goodsrecord
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav: [{
      name: '已浏览商家'
    }, {
      name: '已浏览商品'
    }],
    index: 0,
    navIndex: 0,
    sellerLs: [],
    goodsLs: [],
    sellerIndex: 1,
    goodsIndex: 1,
    pageSize: 10
  },

  navClick(e) {
    this.setData({
      navIndex: e.currentTarget.dataset.index
    })
  },
  //  跳转 店铺详情
  handleSellerItemClick(e) {
    wx.navigateTo({
      url: `../../indexnavs/shop/index?pid=${e.currentTarget.dataset.id}`
    })
  },
  //  跳转 商品详情
  handleGoodsClick(e) {
    wx.navigateTo({
      url: `../../goodsdetail/index?name=product&pid=${e.currentTarget.dataset.pid}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getSellrecord()
    this.getGoodsrecord()
  },
  //  获取商家浏览记录
  getSellrecord() {
    promiseRequest(businessrecord, 'get', {
      pageIndex: this.data.sellerIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      if (res.data.code == 0 && res.data.data) {
        this.setData({
          sellerLs: res.data.data
        })
      }
    })
  },
  //  获取浏览过的商品
  getGoodsrecord() {
    promiseRequest(goodsrecord, 'get', {
      pageIndex: this.data.goodsIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      if (res.data.code == 0 && res.data.data) {
        this.setData({
          goodsLs: [...this.data.goodsLs, ...res.data.data]
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    if (this.data.navIndex == 0) {
      this.setData({
        sellerIndex: 1,
        sellerLs: [],
      })
      this.getSellrecord()
    } else {
      this.setData({
        goodsIndex: 1,
        goodsLs: [],
      })
      this.getGoodsrecord()
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.navIndex == 0) {
      this.setData({
        sellerIndex: this.data.sellerIndex + 1
      })
      this.getSellrecord()
    } else {
      this.setData({
        goodsIndex: this.data.goodsIndex + 1
      })
      this.getGoodsrecord()
    }
  }
})