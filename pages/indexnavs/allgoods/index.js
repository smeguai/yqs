import {
  getgoodslist,
  getgrouplist,
  limit,
  cut,
  collnavbar
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   * '砍价', '秒杀', '拼团', '普通'
   */
  data: {
    navLs: [{
        txt: '拼团',
        idx: 1
      },
      {
        txt: '砍价',
        idx: 3
      },
      {
        txt: '秒杀',
        idx: 2
      },
      {
        txt: '精选',
        idx: 0
      },
    ],
    navIdx: 1,
    list: [],
    notlist: false,
    loding: true,
    pageIndex: 1,
    pageSize: 20,
    stationId: null,
    merchantId: 0,
    x: null,
    y: null,
    location: null,
    shoptypeLs: [],
    shoptypeIdx: 0,
    totalCount: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let station = wx.getStorageSync('station')
    let location = wx.getStorageSync('location')
    this.setData({
      stationId: station.stationId || 0,
      location
    })
    this.getNavBar()
  },
  //  获取navbar
  getNavBar() {
    let station = wx.getStorageSync('station')
    promiseRequest(collnavbar, 'get', {
      stationId: this.data.stationId,
      type: this.data.navIdx
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          shoptypeLs: res.data.data
        })
        if (!res.data.data[this.data.shoptypeIdx]) return
        let i = parseInt(this.data.navIdx)
        switch (i) {
          case 3:
            this.getCutList()
            break;
          case 2:
            this.getLimitList()
            break;
          case 1:
            this.getGroupList()
            break;
          case 0:
            this.getOrdinaryList()
            break;
        }
      }
    })
  },
  //  跳转商品
  handleNavigate(e) {
    let pid = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `../../goodsdetail/index?pid=${pid}&name=${name}`
    })
  },
  //  处理list集合
  _list(res) {
    let shopCurrent = this.data.shoptypeLs[this.data.shoptypeIdx]
    if (res.data.code == 0 && shopCurrent) {
      if (res.data.data.length > 0) {
        let list = null
        let newlist = null
        if (this.data.list.length > 0 && this.data.list[this.data.list.length - 1].list.length < this.data.totalCount) {
          list = `list[${this.data.list.length - 1}].list`
          newlist = this.data.list[this.data.list.length - 1].list.concat(res.data.data)
        } else {
          list = 'list'
          newlist = [...this.data.list, {
            title: shopCurrent.productTypeName,
            id: shopCurrent.productTypeId,
            recommend: shopCurrent.recommend,
            list: res.data.data
          }]
        }
        this.setData({
          [list]: newlist,
          totalCount: res.data.totalCount
        })
      }
      this.setData({
        shoptypeIdx: this.data.shoptypeIdx + 1
      })
      this.getOrdinaryList()
    }
  },
  //  get ordinary goods
  getOrdinaryList() {
    if (!this.data.shoptypeLs[this.data.shoptypeIdx]) {
      this.setData({
        loding: false
      })
      return
    }
    promiseRequest(getgoodslist, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      x: this.data.location[0],
      y: this.data.location[1],
      typeId: 0,
      keys: '',
      orderby: this.data.shoptypeLs[this.data.shoptypeIdx].productTypeId
    }).then(res => {
      this._list(res)
    })
  },
  //  get group goods
  getGroupList() {
    if (!this.data.shoptypeLs[this.data.shoptypeIdx]) {
      this.setData({
        loding: false
      })
      return
    }
    promiseRequest(getgrouplist, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: this.data.shoptypeLs[this.data.shoptypeIdx].productTypeId,
      x: this.data.location[0],
      y: this.data.location[1]
    }).then(res => {
      this._list(res)
    })
  },
  //  get limit goods
  getLimitList() {
    if (!this.data.shoptypeLs[this.data.shoptypeIdx]) {
      this.setData({
        loding: false
      })
      return
    }
    promiseRequest(limit, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: this.data.shoptypeLs[this.data.shoptypeIdx].productTypeId,
      x: this.data.location[0],
      y: this.data.location[1],
      searchType: 0
    }).then(res => {
      this._list(res)
    })
  },
  //  get cut goods
  getCutList() {
    if (!this.data.shoptypeLs[this.data.shoptypeIdx]) {
      this.setData({
        loding: false
      })
      return
    }
    promiseRequest(cut, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      stationId: this.data.stationId,
      merchantId: this.data.merchantId,
      keys: '',
      orderby: this.data.shoptypeLs[this.data.shoptypeIdx].productTypeId,
      x: this.data.location[0],
      y: this.data.location[1]
    }).then(res => {
      this._list(res)
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
      loding: true,
      notlist: false,
      shoptypeIdx: 0
    })
    this.getNavBar()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      list: [],
      notlist: false,
      loding: true,
      shoptypeIdx: 0
    })
    this.getNavBar()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    // let shopCurrent = this.data.shoptypeLs[this.data.shoptypeIdx]
    // if (!shopCurrent) {
    //   this.setData({
    //     notlist: true
    //   })
    //   return
    // }
    // this.setData({
    //   shoptypeIdx: this.data.shoptypeIdx + 1
    // })
    // let i = parseInt(this.data.navIdx)
    // switch (i) {
    //   case 33:
    //     this.getCutList()
    //     break;
    //   case 2:
    //     this.getLimitList()
    //     break;
    //   case 1:
    //     this.getGroupList()
    //     break;
    //   case 0:
    //     this.getOrdinaryList()
    //     break;
    // }
  }
})