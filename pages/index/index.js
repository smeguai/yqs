import {
  shopget,
  indexNav,
  indexdiscount,
  banner,
  collection,
  decrypt,
  wxlogin
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    tipsShow: true,
    bannerCurrent: 0,
    pageIndex: 1,
    pageSize: 10,
    location: null,
    stationId: null,
    station: null,
    typeId: 0,
    navList: null,
    swiperList: null,
    shareImg: '',
    collection: null,
    navDefList: [{
      imgUrl: '../../static/img/index_sys.png',
      txt: '精选',
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

    // ,signShow: false
  },
  //  用户登录
  onGotUserInfo(e) {
    let data = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      sessionKey: app.globalData.session_key
    }
    promiseRequest(decrypt, 'post', data).then(res => {
      let data = {
        openId: res.data.openId,
        unionId: res.data.unionId
      }
      wx.setStorage({
        key: 'openORunion',
        data
      })
      app.globalData.openORunion = data
      this._login(res.data)
    })
  },
  _login(d) {
    wx.showLoading({
      title: '登陆中...',
    })
    let data = {
      unionid: d.unionId,
      openid: d.openId,
      headimgurl: d.avatarUrl,
      nickname: d.nickName,
      sex: d.gender,
      province: d.province,
      city: d.city,
      source: "0",
      stationId: this.data.station.stationId,
      x: this.data.location[0],
      y: this.data.location[1]
    }
    promiseRequest(wxlogin, 'post', data).then(res => {
      if (res.data.code == 0) {
        wx.setStorage({
          key: 'userInfo',
          data: res.data.data,
          success: () => {
            app.globalData.onLine = true
            wx.navigateBack({
              delta: -1
            })
          }
        })
        this.getCollction()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  //  获取formid  用户登录
  // formsubmit(e) {
  //   this.setData({
  //     signShow: false
  //   })
  //   app._saveFormId(e.detail.formId)
  // },
  //  banner 点击
  handleNavItemClick(e) {
    let t = e.currentTarget.dataset.type
    let url = e.currentTarget.dataset.url
    let title = e.currentTarget.dataset.title
    switch (t) {
      case 0:
        wx.navigateTo({
          url: url + `?title=${title}`
        })
        break;
      case 1:
        wx.navigateTo({
          url: `../indexnavs/webview/index?url=${url}&title=${title}`
        })
        break;
      case 2:
        //  不做任何处理
        break;
    }
  },
  //  跳转  到特惠 查看更多页
  handleNavigate() {
    wx.navigateTo({
      url: '../indexnavs/allgoods/index'
    })
  },
  //  推荐商家 被点击
  handleSellerClick(e) {
    let pid = e.currentTarget.dataset.pid
    wx.navigateTo({
      url: `../indexnavs/shop/index?pid=${pid}`,
    })
  },
  // 我的关注  跳转
  handleConllection() {
    wx.navigateTo({
      url: '../user/collect/index',
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
        console.log(res)
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
  //  隐藏 添加到小程序碳层
  handleTogoole() {
    this.setData({
      tipsShow: false
    })
  },
  //  获取分享海报
  getShareImg() {
    if (this.data.shareImg) return
    promiseRequest(banner, 'get', {
      id: 5,
      stationId: this.data.stationId
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          shareImg: res.data.data[0].imgUrl
        })
      }
    })
  },
  onLoad() {
    //  隐藏提示添加小程序弹出
    setTimeout(() => {
      this.setData({
        tipsShow: false
      })
    }, 8000)
    this.getBanner()
    let userinfo = wx.getStorageSync('userInfo')
    // if (!userinfo) {
    //   this.setData({
    //     signShow: true
    //   })
    // }
  },
  //  关闭 用户登录
  // handleHideSign() {
  //   this.setData({
  //     signShow: false
  //   })
  // },
  //  分享给好友
  onShareAppMessage() {
    return {
      title: '翼省钱go',
      path: `/pages/index/index`,
      imageUrl: this.data.shareImg
    }
  },
  //  我的关注
  getCollction() {
    promiseRequest(collection, 'get', {
      pageIndex: 1,
      pageSize: 10
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          collection: res.data.data
        })
      }
    })
  },
  onShow() {
    let station = wx.getStorageSync('station')
    let location = wx.getStorageSync('location')
    let userinfo = wx.getStorageSync('userInfo')
    if (userinfo && !this.data.collection) {
      this.getCollction()
    } else if (!userinfo) {
      this.setData({
        collection: null
      })
    }
    if (location && !station) {
      wx.navigateTo({
        url: '../location/index',
      })
      wx.getSetting({
        success: res => {
          console.log(res)
        }
      })
      return
    }
    if (station.stationId == this.data.stationId) return
    this.setData({
      station: station,
      stationId: station.stationId,
      location: location,
      recommendList: []
    })
    if (station) {
      this.getindexNav()
      this.getDiscount()
      this.getShop()
      this.getShareImg()
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
    wx.getStorage({
      key: 'userInfo',
      success: (res) => {
        if (res.errMsg == "getStorage:ok") {
          this.getCollction()
        }
      },
      fail: err => {
        this.setData({
          collection: null
        })
      }
    })
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
        wx.navigateTo({
          url: '../sale/index',
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
          url: `../indexnavs/shop/index?&pid=${e.currentTarget.dataset.pid}`
        })
        break;
      case 'type':
        wx.navigateTo({
          url: `../indexnavs/fooddrink/index?&typeid=${e.currentTarget.dataset.pid}`
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