import {
  ordercount
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
const app = getApp()

Page({
  data: {
    onLine: false,
    userInfo: null,
    tencentshow:false,
    OrderCate: [{
      icon: '../../static/img/me_obligation.png',
      txt: '待付款',
      pid: 1
    }, {
      icon: '../../static/img/me_pickup.png',
      txt: '待使用',
      pid: 2
    }, {
      icon: '../../static/img/me_stocks.png',
      txt: '待收货',
      pid: 3
    }, {
      icon: '../../static/img/me_estimate.png',
      txt: '待评价',
      pid: 4
    }],
    more: [{
        txt: '优惠券',
        icon: '../../static/img/yhq.png',
        id: 0
      },
      {
        txt: '我的砍价',
        icon: '../../static/img/wdkj.png',
        id: 1
      },
      {
        txt: '切换小区',
        icon: '../../static/img/xq.png',
        id: 2
      },
      {
        txt: '我的收藏',
        icon: '../../static/img/wdsc.png',
        id: 3
      },
      {
        txt: '联系客服',
        icon: '../../static/img/lxkf.png',
        id: 4
      },
      {
        txt: '关于我们',
        icon: '../../static/img/gywm.png',
        id: 5
      },
      {
        txt: '设置',
        icon: '../../static/img/sz.png',
        id: 6
      },
      {
        txt: '浏览记录',
        icon: '../../static/img/lljl.png',
        id: 7
      }
    ],
    navCountNum: null
  },
  //  客服消息
  handleContactClick(e) {
    this.setData({
      tencentshow: true
    })
  },
  //  关闭客服消息弹出
  handleTencentClick() {
    this.setData({
      tencentshow: false
    })
  },
  handleClickOrder(e) {
    this.hasSign()
    wx.navigateTo({
      url: `../orders/index?pid=${e.currentTarget.dataset.pid}`
    })
  },
  handleClickMore(e) {
    this.hasSign()
    let id = e.currentTarget.dataset.id
    switch (id) {
      case 0:
        wx.navigateTo({
          url: '../user/coupon/index',
        })
        break;
      case 1:
        wx.navigateTo({
          url: '../mycutlist/index',
        })
        break;
      case 2:
        wx.navigateTo({
          url: '../location/index',
        })
        break;
      case 3:
        wx.navigateTo({
          url: '../user/collect/index',
        })
        break;
      case 4:
        wx.navigateTo({
          url: '../contactus/index',
        })
        break;
      case 5:
        wx.navigateTo({
          url: '../about/index',
        })
        break;
      case 6:
        wx.navigateTo({
          url: '../setting/index',
        })
        break;
      case 7:
        wx.navigateTo({
          url: '../user/record/index',
        })
        break;
    }
  },
  handleSign() {
    wx.navigateTo({
      url: '../accredit/index',
    })
  },
  onLoad: function(options) {},
  //  获取订单类目有多少数据
  getOrderCount() {
    promiseRequest(ordercount, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          navCountNum: res.data.data
        })
      }
    })
  },
  onShow: function () { 
    this.getUserInfo()
  },
  //  获取用户信息
  getUserInfo() {
    let userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo,
        onLine: true
      })
      this.getOrderCount()
    } else {
      this.setData({
        onLine: false,
        userInfo: null,
        navCountNum: null
      })
    }
  },
  handleToWallet() {
    this.hasSign()
    wx.navigateTo({
      url: '../wallet/index',
    })
  },
  //  没登录 跳转登录页
  hasSign() {
    if (!this.data.onLine) {
      wx.navigateTo({
        url: '../accredit/index',
      })
      return
    }
  }
})