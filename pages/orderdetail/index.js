import {
  orderdetail,
  receiving,
  canceorder,
  deleteorder,
  cancelrefund
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
    listTotal: 0,
    orderId: 0,
    info: null,
    loding: true,
    modeList: {
      0: {
        strong: '等待买家付款',
        sub: '订单24小时后将自动关闭'
      },
      1: {
        strong: '电子凭证待使用',
        sub: '到店向店员出示电子凭证，凭凭证取商品'
      },
      2: {
        strong: '电子凭证已核销',
        sub: '商凭证已使用，确认下收货吧~'
      },
      3: {
        strong: '申请退款中',
        sub: '商家已收到退款申请，会尽快处理的'
      },
      4: {
        strong: '订单已退款完成',
        sub: '订单已完成退款，需要还可以再商城重新购买哦~'
      },
      8: {
        strong: '订单已确认收货',
        sub: '感谢你的购买，给您购买的商品一个评价吧~'
      },
      9: {
        strong: '已完成',
        sub: '订单24小时后将自动关闭'
      },
      88: {
        strong: '订单已取消',
        sub: '订单已关闭，可在商城继续购买哦~'
      }
    },
    vierifyshow: false,
    code: null,
    total: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderId: options.orderid
    })
  },
  //  复制单号
  handleCloneOrderNo(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.txt,
      success: () => {
        wx.showToast({
          title: '复制成功!',
          icon: 'none'
        })
      }
    })
  },
  //  跳转到退款页
  handleRefund(e) {
    wx.navigateTo({
      url: `../refund/index?orderid=${e.currentTarget.dataset.orderid}`
    })
  },
  //  去核销 弹出层
  handleVierifyShow(e) {
    let code = e.currentTarget.dataset.code
    this.setData({
      vierifyshow: true,
      code
    })
  },
  //  一键核销
  handleVerifyClick() {
    let orderid = this.data.orderId
    wx.navigateTo({
      url: `../verify/index?orderid=${orderid}`,
    })
  },
  //  单个核销码得自助核销
  handleBtnClick(e) {
    let orderid = this.data.orderId
    let code = e.currentTarget.dataset.code
    wx.navigateTo({
      url: `../myverify/index?orderid=${orderid}&type=1&code=${code}`,
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
                icon: 'none',
                success: () => {
                  this.getOrderDetail()
                }
              })
            }
          })
        }
      }
    })
  },
  //  打商家电话
  handleTelClick(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  //  查看商家地理位置
  handleOpenLocation() {
    wx.openLocation({
      latitude: parseFloat(this.data.info.x),
      longitude: parseFloat(this.data.info.y),
      address: this.data.info.addr
    })
  },
  //  获取订单详情
  getOrderDetail() {
    let data = {
      orderId: this.data.orderId
    }
    promiseRequest(orderdetail, 'get', data).then(res => {
      if (res.data.code == 0) {
        let info = res.data.data
        let total = parseInt(info.eleCardPayTotal * 10 + info.cashPayTotal * 10 + info.payTotal * 10) / 10
        this.setData({
          info,
          total
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  //  取消订单
  handleCanceOrder() {
    wx.showModal({
      content: '确认取消订单吗?',
      success: (r) => {
        if (r.confirm) {
          promiseRequest(canceorder, 'get', {
            orderId: this.data.orderId
          }).then(res => {
            if (res.data.code == 1) {
              wx.showToast({
                title: '已取消订单',
                icon: 'none'
              })
              this.getOrderDetail()
            }
          })
        }
      }
    })

  },
  //  取消退款
  handleCancelRefund() {
    promiseRequest(cancelrefund, 'get', {
      orderId: this.data.orderId
    }).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        wx.showToast({
          title: '操作成功',
          icon: 'none',
          success: () => {
            setTimeout(() => {
              this.getOrderDetail()
            }, 1000)
          }
        })
      }
    })
  },
  //  删除订单
  handleDeleteOrder() {
    wx.showModal({
      content: '确定删除订单吗?',
      success: r => {
        if (r.confirm) {
          promiseRequest(deleteorder, 'get', {
            orderId: this.data.orderId
          }).then(res => {
            if (res.data.code == 0) {
              wx.showToast({
                title: '已删除订单',
                icon: 'none',
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: -1
                    })
                  }, 1500)
                }
              })
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      loding: true
    })
    this.getOrderDetail()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  }
})