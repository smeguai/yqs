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
    stationId: null,
    station: null,
    typeId: 0,
    navList: null,
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
    recommendList: [],
    loding: true
  },
  //  推荐商家 被点击
  handleSellerClick(e) {
    wx.navigateTo({
      url: `../indexnavs/shop/index?pid=${e.currentTarget.dataset.pid}`,
    })
  },
  //  推荐商品
  getDiscount() {
    let data = {
      StationId: this.data.stationId
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
    let location = wx.getStorageSync('location')
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      typeId: this.data.typeId,
      stationId: this.data.stationId,
      x: location[0],
      y: location[1]
    }
    promiseRequest(shopget, 'get', data).then(res => {
      if (res.data.code == 0 && res.data.data) {
        this.setData({
          loding: false,
          recommendList: [...this.data.recommendList, ...res.data.data]
        })
      }
    })
  },
  //  navList
  getindexNav() {
    promiseRequest(indexNav, 'get', {
      stationId: this.data.stationId
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          navList: res.data.data,
          loding: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let station = wx.getStorageSync('station')
    if (station) {
      this.setData({
        station,
        stationId: station.stationId
      })
      if (this.data.recommendList.length == 0) {
        this.getBanner()
        this.getindexNav()
        this.getDiscount()
        this.getShop()
      }
    } else {
      if (app.globalData.location) {
        wx.navigateTo({
          url: `../location/index`
        })
      }
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1,
      recommendList: [],
      loding: true
    })
    this.getBanner()
    this.getindexNav()
    this.getDiscount()
    this.getShop()
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function() {
    if (this.data.pageIndex * this.data.pageSize <= this.data.recommendList.length) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.getShop()
    }
  },
  //  商家商品跳转详情页
  handleTogoodsDetail(e) {
    let type = e.currentTarget.dataset.type
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: `../goodsdetail/index?name=${type}&pid=${pid}`
    })
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
      case 'telecom':
        wx.navigateTo({
          url: `../indexnavs/shop/index?title=${e.currentTarget.dataset.title}&pid=${e.currentTarget.dataset.pid}`
        })
        break;
      case 'type':
        wx.navigateTo({
          url: `../indexnavs/fooddrink/index?title=${e.currentTarget.dataset.title}&typeid=${e.currentTarget.dataset.pid}`
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