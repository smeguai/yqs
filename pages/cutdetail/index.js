import {
  usercutdesc,
  cutfriendcut,
  paydonerecomment
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
    navindex: 0,
    pid: 0,
    isme: true,
    uid: 0,
    detail: null,
    startcutmode: false,
    loding: true,
    list: null,
    cutprice: 0,
    cutstatus: false
  },

  //  跳转  砍价
  handleCutDesc(e) {
    wx.redirectTo({
      url: `../goodsdetail/index?name=cut&pid=${e.currentTarget.dataset.pid}`
    })
  },
  // 推荐砍价商品
  getRecomment() {
    let location = wx.getStorageSync('location')
    let station = wx.getStorageSync('station')
    promiseRequest(paydonerecomment, 'get', {
      stationId: station.stationId,
      x: location[0],
      y: location[1],
      types: 2
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
      }
    })
  },
  //  下拉刷新
  onPullDownRefresh() {
    this.getCutDesc()
    this.getRecomment()
  },
  //  关闭弹出层  帮他砍一刀
  handleStartCutClose() {
    this.setData({
      startcutmode: false,
      cutstatus: false
    })
  },
  //  跳转 当前价购买
  handleNavigatePay() {
    //  用户是否登录
    let online = wx.getStorageSync('userInfo')
    if (!online) {
      wx.navigateTo({
        url: '../accredit/index',
      })
      return
    }
    wx.navigateTo({
      url: `../../pages/pay/index?productid=${this.data.pid}&classs=cut`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pid: options.pid
    })
    this.getCutDesc()
    this.getRecomment()
  },
  onShow() {
    let userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.setData({
        uid: userinfo.uid
      })
    }
  },
  // 重新发起砍价
  handleTogoodsdetail(e) {
    if (app.globalData.onLine) {
      wx.navigateTo({
        url: `../indexnavs/askedprice/index?pid=${e.currentTarget.dataset.pid}&name=cut`
      }) 
    } else {
      wx.navigateTo({
        url: '../accredit/index',
      })
    }
  },
  //  帮忙砍价
  handleCutfriendcut() {
    console.log(app.globalData.onLine)
    if(app.globalData.onLine) {
    promiseRequest(cutfriendcut, 'get', {
      cutPriceId: this.data.pid
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          cutprice: res.data.data.hadCutPrice,
          startcutmode: true
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
    } else {
      wx.navigateTo({
        url: '../accredit/index'
      })
    }
  },
  //  砍价详情
  getCutDesc() {
    promiseRequest(usercutdesc, 'get', {
      cutPriceId: this.data.pid
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          detail: res.data.data,
          cutstatus: res.data.data.status == 0 ? false : true
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  //   nav item click
  handleNavItemClick(e) {
    let idx = e.currentTarget.dataset.idx
    this.setData({
      navindex: idx
    })
  },
  //  右侧分享 首页
  handleNavigate() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '帮我来砍价',
      path: `/pages/cutdetail/index?pid=${this.data.pid}`
    }
  }
})