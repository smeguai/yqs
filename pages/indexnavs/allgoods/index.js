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
    shoptypeLs: [],
    shoptypeIdx: 0,
    totalCount: null,
    shopMoreLS: true
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
    let arr = [{
        productTypeName: '女装',
        productTypeId: 1,
        recommend: '说点啥？'
      },
      {
        productTypeName: '男装',
        productTypeId: 2,
        recommend: '这是备注'
      },
      {
        productTypeName: '电子',
        productTypeId: 3,
        recommend: '快没了'
      },
      {
        productTypeName: '瓶',
        productTypeId: 4,
        recommend: '没了熬'
      }
    ]
    this.setData({
      shoptypeLs: arr
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
    // let station = wx.getStorageSync('station')
    // promiseRequest(collnavbar, 'get', {
    //   stationId: this.data.stationId,
    //   type: this.data.navIdx
    // }).then(res => {
    //   if (res.data.code == 0) {
    //     this.setData({
    //       shoptypeLs: res.data.data
    //     })
    // if (!res.data.data[this.data.shoptypeIdx]) return
    //     let i = parseInt(this.data.navIdx)
    //     switch (i) {
    //       case 3:
    //         this.getCutList()
    //         break;
    //       case 2:
    //         this.getLimitList()
    //         break;
    //       case 1:
    //         this.getGroupList()
    //         break;
    //       case 0:
    //         this.getOrdinaryList()
    //         break;
    //     }
    //   }
    // })
  },
  //  跳转商品
  handleNavigate(e) {
    let pid = e.currentTarget.dataset.id
    let name = e.currentTarget.dataset.name
    wx.navigateTo({
      url: `../../goodsdetail/index?pid=${pid}&name=${name}`
    })
  },
  //  get ordinary goods
  getOrdinaryList() {
    let shopCurrent = this.data.shoptypeLs[this.data.shoptypeIdx]
    if (!shopCurrent) {
      this.setData({
        notlist: true
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
          if (this.data.shopMoreLS) {
            let arr = []
            this.data.list.map(item => {
              arr.push(...item.list)
            })
            console.log(this.data.list)
            if (arr.length < this.data.pageSize) {
              this.setData({
                shoptypeIdx: this.data.shoptypeIdx + 1,
                pageIndex: 1
              })
              this.getOrdinaryList()
            }
          }
        } else {
          this.setData({
            shoptypeIdx: this.data.shoptypeIdx + 1,
            pageIndex: 1
          })
          this.getOrdinaryList()
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
    if (this.data.shoptypeLs) {
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
    }
  },
  //  get cut goods
  getCutList() {
    console.log(this.data.shoptypeLs[this.data.shoptypeIdx])
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
    this.getNavBar()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let shopCurrent = this.data.shoptypeLs[this.data.shoptypeIdx]
    if (!shopCurrent) {
      this.setData({
        notlist: true
      })
      return
    }
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    let i = parseInt(this.data.navIdx)
    switch (i) {
      case 33:
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