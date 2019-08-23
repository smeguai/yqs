import {
  cash,
  elecard,
  mywallet
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
    currentIndex: 0,
    pageIndex: 1,
    pageSize: 10,
    list: [],
    mywallet: null,
    loding: true
  },
  //  充值
  handleNavigate() {
    wx.navigateTo({
      url: '../user/recharge/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getWallet()
    this.getcash()
  },
  //  获取现金收支明细
  getcash() {
    switch (this.data.currentIndex) {
      case 0:
        promiseRequest(cash, 'get', {
          pageIndex: this.data.pageIndex,
          pageSize: this.data.pageSize
        }).then(res => {
          if (res.data.code === 0) {
            this.setData({
              list: [...this.data.list, ...res.data.data],
              pageIndex: this.data.pageIndex,
              loding: false
            })
          }
        })
        break;
        case 1:
        promiseRequest(elecard, 'get', {
          pageIndex: this.data.pageIndex,
          pageSize: this.data.pageSize
        }).then(res => {
          if (res.data.code === 0) {
            this.setData({
              list: [...this.data.list, ...res.data.data],
              pageIndex: this.data.pageIndex,
              loding: false
            })
          }
        })
        break;
    }
  },
  //  获取电子卡收支明细
  //  获取我的现金/ 电子卡余额
  getWallet() {
    promiseRequest(mywallet, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          mywallet: res.data.data
        })
      }
    })
  },
  //  nav 切换
  navClick(e) {
    this.setData({
      currentIndex: parseInt(e.currentTarget.dataset.idx),
      pageIndex: 1,
      list: [],
      loding: true
    })
    this.getcash()
  },
  //  上拉加载
  onReachBottom: function () {
    if (this.data.pageIndex * this.data.pageSize <= this.data.list.length) {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      this.getcash() 
    }
  }
})