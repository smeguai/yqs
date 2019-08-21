import {
  getorder,
  canceorder,
  orderpay,
  receiving,
  deleteorder
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
    orderId: null,
    navList: [{
      txt: '全部',
      id: 0
    }, {
      txt: '待付款',
      id: 1
    }, {
      txt: '待使用',
      id: 2
    }, {
      txt: '待收货',
      id: 3
    }, {
      txt: '待评价',
      id: 4
    }],
    cateMode: {
      0: '待付款',
      1: '待使用',
      2: '待收货',
      3: '退款中',
      4: '已退款',
      8: '待评论',
      9: '已完成',
      88: '已取消'
    },
    navIdx: 0,
    list: [],
    status: 0,
    pageIndex: 1,
    pageSize: 10,
    count: 0,
    loding: true
  },
  navItemClick(e) {
    let id = e.currentTarget.dataset.id
    if (this.data.navIdx == id) return
    this.setData({
      navIdx: id,
      status: id,
      pageIndex: 1,
      list: [],
      loding: true
    })
    this.getOrders()
  },
  checkOrderDesc(e) {
    wx.navigateTo({
      url: `../orderdetail/index?orderid=${e.currentTarget.dataset.orderid}`,
    })
  },
  //  确认收货
  consignee(e) {
    wx.showModal({
      content: '是否确认收货?',
      success: r => {
        if (r.confirm) {
          promiseRequest(receiving, 'get', {
            orderId: e.currentTarget.dataset.orderid
          }).then(res => {
            console.log(res)
            if (res.data.code == 0) {
              wx.showToast({
                title: '收货成功!',
                icon: 'none'
              })
              let list = this.data.list
              list.map((item, index) => {
                list.splice(index, 1)
              })
              this.setData({
                list
              })
            }
          })
        }
      }
    })
  },
  //  一键核销
  handleVerifyClick(e) {
    let orderid = e.currentTarget.dataset.orderid
    wx.navigateTo({
      url: `../verify/index?orderid=${orderid}`,
    })
  },
  //  删除订单
  deleteOrder(e) {
    wx.showModal({
      content: '是否要删除此订单?（确认后无法撤回）',
      success: (r) => {
        if (r.confirm) {
          let orderId = e.currentTarget.dataset.orderid
          promiseRequest(deleteorder, 'get', {
            orderId
          }).then(res => {
            console.log(res)
            if (res.data.code == 0) {
              wx.showToast({
                title: '已删除订单',
                icon: 'none'
              })
              let list = this.data.list
              list.map((item, index) => {
                if (item.orderId == orderId) {
                  list.splice(index, 1)
                }
              })
              this.setData({
                list
              })
            }
          })
        }
      }
    })

  },
  //  取消订单
  cancelOrder(e) {
    wx.showModal({
      title: '提示',
      content: '是否要取消当前订单？（确认后无法撤回）',
      success: r => {
        // 
        if (r.confirm) {
          promiseRequest(canceorder, 'get', {
            orderId: e.currentTarget.dataset.orderid
          }).then(res => {
            console.log(res)
            if (res.data.code == 1) {
              wx.showToast({
                title: res.data.msg,
                icon: 'none',
                success: () => {
                  let list = this.data.list
                  list.map((item, index) => {
                    if (item.orderId == e.currentTarget.dataset.orderid) {
                      item.status = 88
                    }
                  })
                  this.setData({
                    list
                  })
                }
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      navIdx: options.pid,
      status: options.pid
    })
  },
  getOrders() {
    let data = {
      status: this.data.status,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }
    promiseRequest(getorder, 'get', data).then(res => {
      if (res.data.code == 0) {
        if (res.data.data.length != 0) {
          this.setData({
            list: [...this.data.list, ...res.data.data],
            count: res.data.totalCount,
            pageIndex: data.pageIndex + 1,
          })
        }
        this.setData({
          loding: false
        })
      }
    })
  },

  //  微信支付
  wxPayment(e) {
    promiseRequest(orderpay, 'get', {
      orderId: e.currentTarget.dataset.orderid
    }).then(res => {
      if (res.data.code == 0) {
        let v = res.data.data
        wx.requestPayment({
          timeStamp: v.timestamp,
          nonceStr: v.noncestr,
          package: 'prepay_id=' + v.prepayid,
          signType: 'MD5',
          paySign: v.sign,
          success: (res) => {
            console.log(res)
          }
        })
      }
    })

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      list: [],
      pageIndex: 1,
      loding: true
    })
    this.getOrders()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      pageIndex: 1,
      list: [],
    })
    this.getOrders()
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.list.length < this.data.count) {
      this.getOrders()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})