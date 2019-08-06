import {
  shopget,
  indexNav,
  indexdiscount,
  banner
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    bannerCurrent: 0,
    pageIndex: 1,
    pageSize: 10,
    stationId: 1,
    typeId: 0,
    navList: null,
    station: null,
    swiperList: null,
    navDefList: [{
      imgUrl: '../../static/img/index_sys.png',
      txt: '扫一扫',
      id: 0
    }, {
      imgUrl: '../../static/img/index_yhtg.png',
      txt: '优惠团购',
      id: 1
    }, {
      imgUrl: '../../static/img/index_fjhq.png',
      txt: '附近好券',
      id: 2
    }, {
      imgUrl: '../../static/img/index_ms.png',
      txt: '秒杀',
      id: 3
    }, {
      imgUrl: '../../static/img/index_kj.png',
      txt: '砍价',
      id: 4
    }],
    groupdata: null,
    cutdata: null,
    limitdata: null,
    recommendList: null,
    loding: 0
  },
  //  推荐商品
  getDiscount() {
    let data = {
      StationId: app.globalData.station && app.globalData.station.stationId || this.data.stationId
    }
    promiseRequest(indexdiscount, 'get', data).then(res => {
      if (res.data.code === 0) {
        this.setData({
          groupdata: res.data.groupdata,
          cutdata: res.data.cutdata,
          limitdata: res.data.limitdata
        })
      }
    })
  },
  //  获取轮播
  getBanner() {
    promiseRequest(banner, 'get', {
      id: 0
    }).then(res => {
      if (res.data.code == 0) {  
        this.setData({
          swiperList: res.data.data
        })
      }
    })
  },
  //  推荐商家
  getShop() {
    let stationId = wx.getStorageSync('station').stationId
    let location = wx.getStorageSync('location')
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      typeId: this.data.typeId,
      stationId,
      x: location[0],
      y: location[1]
    }
    promiseRequest(shopget, 'get', data).then(res => {
      if (res.data.code == 0) {
        this.setData({
          recommendList: res.data.data
        })
      }
    })
  },
  //  navList
  getindexNav() {
    promiseRequest(indexNav, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          navList: res.data.data
        })
        wx.hideLoading()
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
    this.getindexNav()
    this.getBanner()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let station = wx.getStorageSync('station')
    if (station) {
      this.setData({
        station
      })
      this.getDiscount()
      this.getShop()
    }
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

  },

  bannerChange(e) {
    this.setData({
      bannerCurrent: e.detail.current
    })
  },
  navNavigate(e) {
    let i = e.currentTarget.dataset.id
    switch (i) {
      case 0:
        wx.scanCode({
          onlyFromCamera: true,
          scanType: 'qrCode',
          success: () => {
            console.log('done')
          },
          fail: () => {
            console.log('err')
          }
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../indexnavs/groupbuying/index',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../indexnavs/ticket/index',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../indexnavs/seckill/index'
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../indexnavs/askedprice/index'
        })
        break;
      case 15:
        wx.navigateTo({
          url: '../indexnavs/shop/index',
        })
        break;
      default:
        wx.navigateTo({
          url: `../indexnavs/fooddrink/index?title=${e.currentTarget.dataset.title}&typeid=${i}`
        })
        break;
    }
  },

  goodsItemClick(e) {
    wx.navigateTo({
      url: `../goodsdetail/index?pid=${e.currentTarget.dataset.pid}&name=${e.currentTarget.dataset.name}`,
    })
  },

  locationClick() {
    wx.navigateTo({
      url: '../location/index',
    })
  }
})