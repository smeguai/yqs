import {
  recharge,
  getformid
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({


  /**
   * 页面的初始数据
   */
  data: {
    iptval: '',
    closeshow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  //  上传formid
  formSubmit(prepayid) {
    promiseRequest(getformid, 'post', {
      source: 0, formid: prepayid, isprepayid: 1
    })
  },
  //  支付
  handlePaypassVerifypass(e) {
    if (!this.data.iptval) {
      wx.showToast({
        title: '请输入充值金额',
        icon: 'none'
      })
      return
    }
    if(e.detail) {
      wx.showLoading({
        title: '充值中...',
        mask: true
      })
      promiseRequest(recharge, 'post', {
        fee: this.data.iptval
      }).then(res => {
        if (res.data.code == 0) {
          let v = res.data.data
          this.formSubmit(v.prepayid)
          wx.requestPayment({
            timeStamp: v.timestamp,
            nonceStr: v.noncestr,
            package: 'prepay_id=' + v.prepayid,
            signType: 'MD5',
            paySign: v.sign,
            success: (res) => {
              wx.showToast({
                title: '充值成功',
                icon: 'none',
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: -1
                    })
                  }, 1000)
                }
              })
            },
            complete: () => {
              wx.hideLoading()
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    }
  },
  //  输入充值金额
  iptchange(e) {
    let t = e.detail.value.length > 0 ? true : false
    this.setData({
      iptval: e.detail.value,
      closeshow: t
    })
  },
  //  清空输入框
  handleClearIptval() {
    this.setData({
      closeshow: false,
      iptval: ''
    })
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