import {
  placeorder,
  producOrder,
  hasbindtel,
  existpaypwd,
  grouporder,
  subgrouporder
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
    telephone: '',
    fullname: '',
    rcouponId: 0,
    cash: 0,
    eleAmount: 0,
    radio1: false,
    radio2: false,
    radio3: false,
    hasPassMode: false,
    hasbindtel: false,
    hasbindpass: false,
    classs: null,
    productid: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      num: options.count,
      productid: options.productid,
      skuid: options.skuid
    })
    this.setData({
      classs: options.classs
    })
    console.log(this.data.classs)
    switch (this.data.classs) {
      case 'group':
        this.getGroupOrder()
        break;
      case 'product':
        this.getPlaceOrder()
        break;
    }
  },
  onShow() {
    this.getExistpaypwd()
    this.getBindTel()
  },
  //  普通商品
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
  //  拼团订单
  getGroupOrder() {
    promiseRequest(grouporder, 'get', {
      productGroupBuyId: this.data.productid,
      skuId: this.data.skuid,
      groupBuyId: 0,
      quantity: this.data.num
    }).then(res => {
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
  // 账户是否开通支付密码
  getExistpaypwd() {
    promiseRequest(existpaypwd, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          hasbindpass: res.data.isPaypwd
        })
      }
    })
  },

  //  是否绑定过手机号
  getBindTel() {
    promiseRequest(hasbindtel, 'get').then(res => {
      if (res.data.code == 0) {
        if (res.data.mobile) {
          this.setData({
            hasbindtel: res.data.mobile
          })
        }
      }
    })
  },
  submitpay() {
    if (this.data.telephone == '' && this.data.fullname == '') {
      wx.showToast({
        title: '请输入姓名及联系电话',
        icon: 'none'
      })
      return
    }
    if (!this.data.hasbindtel) {
      wx.navigateTo({
        url: '../login/index',
      })
      return
    }
    if (!this.data.hasbindpass) {
      wx.navigateTo({
        url: '../user/password/index',
      })
      return
    }
    if (this.data.radio1 || this.data.radio2) {
      this.setData({
        hasPassMode: true
      })
    } else {
      this.verifypass({
        detail: true
      })
    }
  },
  catcountNum(e) {
    this.setData({
      num: e.detail
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
    if (this.data.info.eleCardBalance > 0 && this.data.info.enabledEleCard && this.data.info.eleCardBalance >= total) {
      radio2 = false;
    } else if (this.data.info.cashBalance >= total) {
      radio1 = false
    }
    this.setData({
      radio1,
      radio2,
      radio3
    })
  },
  passclose(e) {
    this.setData({
      hasPassMode: e.detail
    })
  },
  wxPayment(v) {
    wx.requestPayment({
      timeStamp: v.data.timestamp,
      nonceStr: v.data.noncestr,
      package: v.data.partnerid,
      signType: 'MD5',
      paySign: v.data.sign,
      success: (res) => {
        console.log(res)
      }
    })
  },
  verifypass(e) {
    if (e.detail) {
      let info = this.data.info,
        radio1 = this.data.radio1,
        radio2 = this.data.radio2,
        radio3 = this.data.radio3,
        total = this.data.total,
        data = {
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
      if (radio1 && radio2 && info.cashBalance + info.eleCardBalance >= total) {
        data.cash = info.eleCardBalance >= total ? 0 : formatNum(total - info.eleCardBalance)
      }
      if (radio1 && radio2 && info.cashBalance + info.eleCardBalance < total && !radio3) {
        return
      }
      switch (this.data.classs) {
        case 'group':
          data.productGroupBuyId = this.data.productid
          this.submitGrouporder(data)
          break;
        case 'product':
          data.productId = this.data.productid
          this.submitProduct(data)
          break;
      }
      this.setData({
        hasPassMode: false
      })
    }
  },
  //  团购商品提交
  submitGrouporder(data) {
    promiseRequest(subgrouporder, 'post', data).then(res => {
      console.log(res)
    })
  },
  //  普通商品提交
  submitProduct(data) {
    promiseRequest(producOrder, 'post', data).then(res => {
      let v = res.data.value
      if (v && v.code == 0) {
        if (v.order.grandTotal > 0) {
          this.wxPayment(v)
        } else {
          wx.reLaunch({
            url: '../paydone/index',
          })
        }
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
  },
  //  拨打电话
  handlePhoneClick(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  //  查看商家地图位置
  handleSellerAddr() {
    wx.openLocation({
      latitude: 28,
      longitude: 112,
      scale: 18,
      success: () => {

      }
    })
  }
})