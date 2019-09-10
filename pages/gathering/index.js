import {
  userpay,
  shopdetail,
  merchatbalance,
  existpaypwd,
  hasbindtel,
  getformid
} from '../../utils/api.js'
import {
  promiseRequest,
  formatNum
} from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    radio1: false,
    radio2: false,
    radio3: false,
    pid: 0,
    iptval: '',
    cashBalance: 0,
    eleCardBalance: 0,
    desc: null,
    b: null,
    paypass: false,
    hasspass: false,
    hassTel: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pid: options.pid
    })
    this.getsellerdesc()
    this.getmywallet()
  },
  onShow() {
    this.getHasPass()
    this.getHasTel()
  },
  //  是否有支付密码
  getHasPass() {
    promiseRequest(existpaypwd, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          hasspass: res.data.isPaypwd
        })
      }
    })
  },
  //  是否有手机号
  getHasTel() {
    promiseRequest(hasbindtel, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          hassTel: res.data.mobile
        })
      }
    })
  },
  //  获取我的账户余额
  getmywallet() {
    promiseRequest(merchatbalance, 'get', {
      merchantId: this.data.pid
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          cashBalance: res.data.data.cashBalance,
          eleCardBalance: res.data.data.eleCardBalance
        })
      }
    })
  },
  //  获取商家信息
  getsellerdesc() {
    promiseRequest(shopdetail, 'get', {
      merchantId: this.data.pid,
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          desc: res.data.data
        })
      }
    })
  },
  //  支付方式
  handlePayItemClick(e) {
    let i = e.currentTarget.dataset.idx
    let radio1 = this.data.radio1
    let radio2 = this.data.radio2
    let radio3 = this.data.radio3
    switch (i) {
      case '1':
        radio1 = !radio1
        break;
      case '2':
        radio2 = !radio2
        break;
      case '3':
        radio3 = !radio3
        break;
    }
    this.setData({
      radio1,
      radio2,
      radio3
    })
  },
  //  确认支付
  submit() {
    // 充值金额没填写
    if (this.data.iptval == '') {
      wx.showToast({
        title: '请输入充值金额',
        icon: 'none'
      })
      return
    }
    let radio1 = this.data.radio1,
      radio2 = this.data.radio2,
      radio3 = this.data.radio3
    if (!radio1 && !radio2 && !radio3) {
      wx.showToast({
        title: '选择支付方式',
        icon: 'none'
      })
      return
    }
    if (radio1 || radio2) {
      //  手机号没绑定
      if (!this.data.hassTel) {
        wx.navigateTo({
          url: '../login/index',
        })
        return
      }
      //  支付密码不存在
      if (!this.data.hasspass) {
        wx.navigateTo({
          url: '../user/password/index',
        })
        return
      }
      this.setData({
        paypass: true
      })
    } else {
      let e = {
        detail: true
      }
      this.verifypass(e)
    }
  },
  //  付款金额
  handleIptvalChange(e) {
    let iptval = /^(\d?)+(\.\d{0,2})?$/.test(e.detail.value) ? e.detail.value : parseFloat(e.detail.value.substring(0, e.detail.value.length - 1))
    let cash = this.data.cashBalance
    let ele = this.data.eleCardBalance
    this.setData({
      iptval
    })
    console.log(iptval)
    let radio1 = false
    let radio2 = false
    let radio3 = false
    if (ele >= iptval && this.data.desc.enabledEleCard) {
      radio1 = true
    } else if (cash >= iptval) {
      radio2 = true
    } else if (cash + ele >= iptval && this.data.desc.enabledEleCard) {
      radio1 = ele > 0 ? true : false
      radio2 = cash > 0 ? true : false
    } else if (cash + ele < iptval && this.data.desc.enabledEleCard) {
      radio3 = true
      radio1 = ele > 0 ? true : false
      radio2 = cash > 0 ? true : false
    }
    this.setData({
      radio1,
      radio2,
      radio3
    })
  },
  //  关闭输入支付密码
  paypassshow(e) {
    this.setData({
      paypass: e.detail
    })
  },
  //  密码正确后
  verifypass(e) {
    if (e.detail) {
      let radio1 = this.data.radio1,
        radio2 = this.data.radio2,
        radio3 = this.data.radio3,
        eleAmount = 0,
        cash = 0,
        total = this.data.iptval,
        eleCardBalance = this.data.eleCardBalance,
        cashBalance = this.data.cashBalance
      //  电子卡
      if (radio1) {
        eleAmount = eleCardBalance >= total ? total : eleCardBalance
      }
      //  余额
      if (radio2) {
        cash = cashBalance >= total ? total : cashBalance
      }
      //  电子卡+余额 >= 应支付
      if (radio1 && radio2 && cashBalance + eleCardBalance >= total) {
        cash = eleCardBalance >= total ? 0 : formatNum(total - eleCardBalance)
      }
      //  电子卡+余额 <  应支付
      if (radio1 && radio2 && cashBalance + eleCardBalance < total && !radio3) {
        wx.showToast({
          title: '账户余额不足以支付!',
          icon: 'none'
        })
        return
      }
      wx.showLoading({
        title: '发起支付中...',
      })
      //  支付
      promiseRequest(userpay, 'get', {
        merchantId: this.data.pid,
        payTotal: total,
        elecard: eleAmount,
        cash
      }).then(res => {
        if (res.data.code == 0) {
          if (res.data.data) {
            let v = res.data.data
            this.getformid(v.prepayid)
            wx.requestPayment({
              timeStamp: v.timestamp,
              nonceStr: v.noncestr,
              package: 'prepay_id=' + v.prepayid,
              signType: 'MD5',
              paySign: v.sign,
              success: (res) => {
                wx.showToast({
                  title: '付款成功',
                  icon: '',
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
              icon: 'none',
              success: () => {
                setTimeout(() => {
                  wx.navigateBack()
                }, 1000)
              }
            })
          }
        } else if (res.data.code == 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    }
  },
  //  收集formid
  getformid(prepayid) {
    promiseRequest(getformid, 'post', {
      source: 0, formid: prepayid, isprepayid: 1
    })
  }
})