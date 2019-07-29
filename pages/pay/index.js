import {
  placeorder,
  producOrder,
  existpaypwd
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
    num: null,
    orderid: null,
    skuid: null,
    info: null,
    total: 0,
    remark: '',
    telephone: '111',
    fullname: 'aaa',
    rcouponId: 0,
    cash: 0,
    eleAmount: 0,
    radio1: false,
    radio2: false,
    radio3: false,
    hasPassMode: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData({
      num: options.count,
      productid: options.productid,
      skuid: options.skuid
    })
    this.getPlaceOrder()
  },
  // 账户是否开通支付密码
  getExistpaypwd() {
    promiseRequest(existpaypwd, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          hasPassMode: res.data.isPaypwd
        })
      }
    })
  },
  submitpay() {
    //  账户是否开通支付密码
    this.getExistpaypwd()
    //  跳转 设置支付密码页面
    if (!this.data.hasPassMode) {
      wx.navigateTo({
        url: '../user/password/index',
      })
    }
    return
    if (this.data.telephone == '' && this.data.fullname == '') {
      wx.showToast({
        title: '请输入姓名及联系电话',
        icon: 'none'
      })
      return
    }
    let info = this.data.info,
      radio1 = this.data.radio1,
      radio2 = this.data.radio2,
      radio3 = this.data.radio3,
      total = this.data.total,
      data = {
        productId: info.detailList[0].productId,
        skuid: info.detailList[0].productSkuid,
        quantity: this.data.num,
        rcouponId: this.data.rcouponId,
        Remark: this.data.remark,
        fullname: this.data.fullname,
        telephone: this.data.telephone,
        stationId: app.globalData.station.stationId,
        cash: 0,
        eleAmount: 0
      }
    if (!radio1 && !radio2 && !radio3) {
      wx.showToast({
        title: '选择支付方式',
        icon: 'none'
      })
      return
    }
    if (radio1) {
      data.eleAmount = info.eleCardBalance >= total ? total : info.eleCardBalance
    }
    if (radio2) {
      data.cash = info.cashBalance >= total ? total : info.cashBalance
    }
    if (radio1 && radio2) {
      data.cash = info.eleCardBalance >= total ? 0 : formatNum(total - info.eleCardBalance)
    }
    let header = {
      Authorization: 'Bearer ' + app.globalData.userInfo.token
    }
    promiseRequest(producOrder, 'post', data, header).then(res => {
      if (res.data.value && res.data.value.code == 0) {
        wx.reLaunch({
          url: '../paydone/index',
        })
      } else if (res.data.value && res.data.value.code == 1) {
        wx.showToast({
          title: res.data.value.msg,
          icon: 'none'
        })
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  catcountNum(e) {
    this.setData({
      num: e.detail
    })
  },
  getPlaceOrder() {
    let data = {
      productId: this.data.productid,
      skuId: this.data.skuid,
      quantity: this.data.num
    }
    promiseRequest(placeorder, 'get', data).then(res => {
      console.log(res)
      if (res.data.code === 0) {
        let total = 0
        res.data.data.detailList.map(item => {
          total += parseInt((this.data.num * item.unitPrice) * 100) / 100
        })
        this.setData({
          info: res.data.data,
          total
        })
        this.isCardPay()
      }
    })
  },
  handleCatIndex(e) {
    let idx = e.currentTarget.dataset.index
    this.data.info.detailList.map((item, index) => {
      if (index == idx) {
        let total = parseInt((this.data.num * item.unitPrice) * 100) / 100
        this.setData({
          total
        })
        this.isCardPay()
      }
    })
  },
  isCardPay() {
    let radio1 = false,
      radio2 = false,
      radio3 = false,
      total = this.data.total
    if (this.data.info.eleCardBalance > 0 && this.data.info.enabledEleCard) {
      radio1 = true
    }
    if (this.data.info.cashBalance > 0) {
      radio2 = true
    }
    let temptotal = this.data.info.cashBalance + this.data.info.eleCardBalance;
    if (temptotal < total) {
      radio3 = true;
    }
    if (this.data.info.cashBalance >= total) {
      radio1 = false
    }
    if (this.data.info.eleCardBalance > 0 && this.data.info.enabledEleCard && this.data.info.eleCardBalance >= total) {
      radio2 = false;
    }
    this.setData({
      radio1,
      radio2,
      radio3
    })
  },
  verifypass(e) {
    this.setData({
      hasPassMode: e.detail
    })
  },
  handleIptName(e) {
    this.setData({
      fullname: e.detail.value
    })
  },
  handleIptTel(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  handleIptRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  handleCardItemClick(e) {
    let i = e.currentTarget.dataset.idx,
      info = this.data.info,
      radio1 = this.data.radio1,
      radio2 = this.data.radio2,
      radio3 = this.data.radio3
      //  radio1 2 3 电子卡 现金余额 微信支付
      //  total 总价

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
  }
})