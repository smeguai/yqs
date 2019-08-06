import {
  cancellation,
  orderdetail
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iptMode: false,
    inputVal: '',
    btnMode: false,
    orderData: null,
    orderId: null,
    type: null,
    code: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderId: options.orderid,
      type: options.type,
      code: options.code
    })
    this.getOrderDetail()
  },
  //  订单详情
  getOrderDetail() {
    promiseRequest(orderdetail, 'get', {
      orderId: this.data.orderId
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          orderData: res.data.data
        })
        console.log(res.data.data)
      }
    })
  },
  //  密码框呗选中
  handleIptClick() {
    this.setData({
      iptMode: true
    })
  },
  iptchange(e) {
    let inputVal = e.detail.value,
      btnMode = inputVal.length == 4 ? true : false
    this.setData({
      inputVal,
      btnMode
    })
  },
  //  核销
  submit() {
    if (!this.data.btnMode) return
    promiseRequest(cancellation, 'get', {
      codetype: this.data.type,
      code: this.data.code || this.data.orderData.rootCode,
      pwd: this.data.inputVal
    }).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '核销成功!',
          icon: 'none',
          success: () => {
            setTimeout(() => {
              if(this.data.type == 0) {
                wx.redirectTo({
                  url: '../orders/index?pid=2'
                })
              } else {
                wx.navigateBack({
                  delat: -1
                })
              }
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        this.setData({
          inputVal: '',
          btnMode: false
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})