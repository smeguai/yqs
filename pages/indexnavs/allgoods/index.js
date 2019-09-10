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
        txt: '砍价',
        idx: 3
      },
      {
        txt: '秒杀',
        idx: 2
      },
      {
        txt: '拼团',
        idx: 1
      },
      {
        txt: '普通',
        idx: 0
      },
    ],
    navIdx: 3,
    list: [],
    notlist: false,
    loding: true,
    pageIndex: 1,
    pageSize: 10,
    stationId: null,
    merchantId: 0,
    x: null,
    y: null,
    location: null,
    shoptypeLs: null,
    shoptypeIdx: 0
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
    this.data.list[id].map(item => {
      if (item.list.productId == e.currentTarget.dataset.id) {
        let pid = null
        let name = null
        switch (this.data.navIdx) {
          case 3:
            pid = item.list.productCutPriceId
            name = 'cut'
            break;
          case 2:
            pid = item.list.timeLimitBuyId
            name = 'limit'
            break;
          case 1:
            pid = item.list.productGroupBuyId
            name = 'group'
            break;
          case 0:
            pid = item.list.productId
            name = 'product'
            break;
        }
        wx.navigateTo({
          url: `../../goodsdetail/index?pid=${pid}&name=${name}`
        })
      }
    })
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
        if (res.data.data.length < this.data.pageSize) {
          let shopCurrent = this.data.shoptypeLs[this.data.shoptypeIdx]
          console.log(shopCurrent)
          this.setData({
            shoptypeIdx: this.data.shoptypeIdx + 1,
            list: [...this.data.list, {
              title: shopCurrent && shopCurrent.productTypeName,
              id: shopCurrent && shopCurrent.productTypeId,
              recommend: shopCurrent && shopCurrent.recommend,
              list: res.data.data
            }]
          })
        }
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
        if (res.data.data.length < this.data.pageSize) {
          let shopCurrent = this.data.shoptypeLs[this.data.shoptypeIdx]
          this.setData({
            shoptypeIdx: this.data.shoptypeIdx + 1,
            list: [...this.data.list, {
              title: shopCurrent.productTypeName,
              id: shopCurrent.productTypeId,
              recommend: shopCurrent.recommend,
              list: res.data.data
            }]
          })
        }
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
        if (res.data.data.length < this.data.pageSize) {
          let shopCurrent = this.data.shoptypeLs[this.data.shoptypeIdx]
          this.setData({
            shoptypeIdx: this.data.shoptypeIdx + 1,
            list: [...this.data.list, {
              title: shopCurrent.productTypeName,
              id: shopCurrent.productTypeId,
              recommend: shopCurrent.recommend,
              list: res.data.data
            }]
          })
        }
      }
    })
  },
  //  get cut goods
  getCutList() {
    console.log(this.data.shoptypeIdx)
    if (this.data.shoptypeLs) {
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
        if (res.data.code == 0) {
          if (res.data.data.length < this.data.pageSize) {
            let shopCurrent = this.data.shoptypeLs[this.data.shoptypeIdx]
            this.setData({
              shoptypeIdx: this.data.shoptypeIdx + 1,
              list: [...this.data.list, {
                title: shopCurrent.productTypeName,
                id: shopCurrent.productTypeId,
                recommend: shopCurrent.recommend,
                list: res.data.data
              }]
            })
          } else {
            let list = this.data.list[this.data.list.length - 1].list
            this.setData({
              [list]: list.push(res.data.data)
            })
          }
          console.log(this.data.list)
        }
        this.setData({
          loding: false
        })
      })
    }
  },
  //  nav click
  handleNavItemClick(e) {
    let navIdx = e.currentTarget.dataset.idx
    if (this.data.navIdx == navIdx) return
    this.setData({
      navIdx,
      list: [],
      pageIndex: 1,
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
      pageIndex: 1,
      notlist: false,
      shoptypeIdx: 0
    })
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
    setTimeout(() => {
      console.log(this.data.list)
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.list.length < this.data.pageIndex * this.data.pageSize && this.data.shoptypeLs.length > this.data.shoptypeIdx) {
      this.setData({
        notlist: true,
        shoptypeIdx: this.data.shoptypeIdx + 1
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