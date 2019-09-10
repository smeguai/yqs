import {
  orderdetail,
  qrcodeimg
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderid: null,
    data: null,
    codeStatus: null,
    imgUrl: '',
    timer: null,
    loding: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderid: options.orderid
    })
  },
  //  获取核销图
  getQCcodeImg(){
    promiseRequest(qrcodeimg, 'get', {
      code: this.data.data.rootCode
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          imgUrl: res.data.data
        })
      }
    })
  },
  //  获取订单详情
  getOrderDetail () {
    promiseRequest(orderdetail, 'get', {
      orderId: this.data.orderid
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          data: res.data.data
        })
        this.getQCcodeImg()
        let s = this.data.data.status
        let t = ''
        if (s == 0 || s == 1) {
          t = '未核销'
        } else if (s == 2 || s == 8 || s == 9) {
          t = '已核销'
        } else if (s == 3) {
          t = '退款中'
        } else if (s == 4) {
          t = '已退款'
        } else if (s == 88) {
          t = '已取消'
        }
        this.setData({
          codeStatus: t
        })
      }
      this.setData({
        loding: false
      })
    })
    this.setData({
      timer: setTimeout(this.getOrderDetail, 2600)
    })
  },
  //  跳转到自助核销
  handleVerify() {
    wx.navigateTo({
      url: `../myverify/index?orderid=${this.data.orderid}&type=0`,
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getOrderDetail()
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.timer)
  }
})