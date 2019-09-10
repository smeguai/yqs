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
  //  上传formid
  formSubmit(prepayid) {
      console.log('prepayid===>',prepayid);
    promiseRequest(getformid, 'post', {
      source: 0,
      formid: prepayid,
      isprepayid: 1
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
    if (e.detail) {
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
    let t = /^(\d?)+(\.\d{0,2})?$/.test(e.detail.value) ? e.detail.value : e.detail.value.substring(0, e.detail.value.length - 1)
    this.setData({
      iptval: t,
      closeshow: t ? true : false
    })
  },
  //  清空输入框
  handleClearIptval() {
    this.setData({
      closeshow: false,
      iptval: ''
    })
  }
})