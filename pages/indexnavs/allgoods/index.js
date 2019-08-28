import {
  getgoodslist,
  getgrouplist,
  limit,
  cut
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLs: ['砍价', '秒杀', '拼团', '普通'],
    navIdx: 0,
    list: [],
    notlist: false,
    loding: true,
    pageIndex: 1,
    pageSize: 10,
    stationId: null,
    merchantId: 0,
    x: null,
    y: null,
    location: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let stationId = wx.getStorageSync('station').stationId
    let location = wx.getStorageSync('location')
    this.setData({
      stationId,
      location
    })
    this.getCutList()
  },
  //  get ordinary goods
  getOrdinaryList() {
    promiseRequest(getgoodslist, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      x: this.data.location[0],
      y: this.data.location[1],
      typeId: 0,
      keys: '',
      orderby: 0
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: [...this.data.list, ...res.data.data]
        })
      }
    })
  },
  //  get group goods
  getGroupList() {
    promiseRequest(getgrouplist, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: 0,
      x: this.data.location[0],
      y: this.data.location[1]
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: [...this.data.list, ...res.data.data]
        })
      }
    })
  },
  //  get limit goods
  getLimitList() {
    promiseRequest(limit, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: 0,
      x: this.data.location[0],
      y: this.data.location[1],
      searchType: 0
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: [...this.data.list, ...res.data.data]
        })
      }
    })
  },
  //  get cut goods
  getCutList() {
    promiseRequest(cut, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: 0,
      x: this.data.location[0],
      y: this.data.location[1]
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: [...this.data.list, ...res.data.data]
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  //  nav click
  handleNavItemClick(e) {
    let navIdx = e.currentTarget.dataset.idx
    if (this.data.navIdx == navIdx) return
    this.setData({
      navIdx,
      list: [],
      pageIndex: 1,
      notlist: false
    })
    let i = parseInt(navIdx)
    switch (i) {
      case 0:
        this.getCutList()
        break;
      case 1:
        this.getLimitList()
        break;
      case 2:
        this.getGroupList()
        break;
      case 3:
        this.getOrdinaryList()
        break;
    }
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      list: [],
      pageIndex: 1,
      notlist: false
    })
    let i = parseInt(this.data.navIdx)
    switch (i) {
      case 0:
        this.getCutList()
        break;
      case 1:
        this.getLimitList()
        break;
      case 2:
        this.getGroupList()
        break;
      case 3:
        this.getOrdinaryList()
        break;
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(this.data.list.length, this.data.pageIndex * this.data.pageSize)
    if (this.data.list.length < this.data.pageIndex * this.data.pageSize) {
      this.setData({
        notlist: true
      })
    } else {
      this.setData({
        pageIndex: this.data.pageIndex + 1
      })
      let i = parseInt(this.data.navIdx)
      switch (i) {
        case 0:
          this.getCutList()
          break;
        case 1:
          this.getLimitList()
          break;
        case 2:
          this.getGroupList()
          break;
        case 3:
          this.getOrdinaryList()
          break;
      }
    }
  }
})