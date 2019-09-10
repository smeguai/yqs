import {
  placeorder,
  producOrder,
  limitOrder,
  hasbindtel,
  existpaypwd,
  grouporder,
  subgrouporder,
  limitsubmit,
  usercoupon,
  orderpay,
  cutsubmit,
  cutOrder,
  getformid,
  getreceive
} from '../../utils/api.js'
import {
  promiseRequest,
  formatNum,
  tel
} from '../../utils/util.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    num: null,
    // orderid: null,
    textareaStyle: 'height: 106rpx;',
    skuid: null,
    info: null,
    total: 0,
    remark: '',
    telephone: '',
    fullname: '',
    cash: 0,
    eleAmount: 0,
    radio1: false,
    radio2: false,
    radio3: false,
    hasPassMode: false,
    hasbindtel: false,
    hasbindpass: false,
    classs: null,
    productid: null,
    time: null,
    groupBuyId: 0,
    ticketupMode: false,

    couponLs: null,
    rcouponId: 0,
    couponMoney: 0,
    couponSpend: 0,
    couponType: 0,
    couponIdx: -1
  },
  //  上传formid
  formSubmit(e) {
    promiseRequest(getformid, 'post', {
      source: 0, formid: e, isprepayid: 1
    })
  },
  //  使用优惠券
  handleCoupontItemClick(e) {
    this.setData({
      rcouponId: e.currentTarget.dataset.pid,
      couponMoney: e.currentTarget.dataset.price,
      couponSpend: e.currentTarget.dataset.spend,
      couponType: e.currentTarget.dataset.type,
      ticketupMode: false,
      couponIdx: e.currentTarget.dataset.idx
    })
  },
  //  领取优惠券
  getCoupontItemClick(e) {
    wx.showLoading({
      title: '领取中...',
    })
    promiseRequest(getreceive, 'get', {
      couponId: e.currentTarget.dataset.pid
    }).then(res => {
      if(res.data.code == 0) {
        this.getUsercoupon()
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      num: options.count,
      productid: options.productid,
      groupBuyId: options.groupbuyid,
      skuid: options.skuid,
      classs: options.classs
    })
    console.log(options.classs)
    switch (this.data.classs) {
      case 'group':
        this.getGroupOrder()
        break;
      case 'limit':
        this.getLimit()
        break;
      case 'product':
        this.getPlaceOrder()
        break;
      case 'cut':
        this.getCutOrder()
        break;
    }
  },
  onShow() {
    this.getExistpaypwd()
    this.getBindTel()
    let userInfo = wx.getStorageSync('userInfo')
    this.setData({
      fullname: userInfo.nickname,
      telephone: userInfo.mobile
    })
  },
  //  获取商品可用优惠券
  getUsercoupon() {
    promiseRequest(usercoupon, 'get', {
      productId: this.data.info.detailList[0].productId
    }).then(res => {
      let coupon = res.data.data
      coupon.map(item => {
        item.validEndTime = item.validEndTime.replace(/-/g, '/').substr(0, 10)
        item.validStartTime = item.validEndTime.replace(/-/g, '/').substr(0, 10)
      })
      this.setData({
        couponLs: coupon
      })
    })
  },
  //  关闭优惠券弹出层
  handleCloseticketup() {
    this.setData({
      ticketupMode: false,
      textareaStyle: 'height: 106rpx;'
    })
  },
  //  打开优惠券弹出层
  handleShowticketup() {
    this.setData({
      ticketupMode: true,
      textareaStyle: 'display: none;'
    })
  },
  //  秒杀商品
  getLimit() {
    let data = {
      TimeLimitBuyId: this.data.productid,
      skuId: this.data.skuid,
      quantity: this.data.num
    }
    promiseRequest(limitsubmit, 'get', data).then(res => {
      if (res.data.code == 0) {
        let total = 0
        res.data.data.detailList.map(item => {
          total += parseInt((this.data.num * item.unitPrice) * 100) / 100
        })
        this.setData({
          info: res.data.data,
          total
        })
        this.isCardPay()
        this.getUsercoupon()
      }
    })
  },
  //  普通商品
  getPlaceOrder() {
    let data = {
      productId: this.data.productid,
      skuId: this.data.skuid,
      quantity: this.data.num
    }
    promiseRequest(placeorder, 'get', data).then(res => {
      if (res.data.code === 0) {
        let total = 0
        res.data.data.detailList.map(item => {
          total += parseInt((this.data.num * item.unitPrice) * 100) / 100
        })
        let time = ''
        let isVouchers = res.data.data.isVouchers
        if (isVouchers) {
          time = res.data.data.useStartTime.substr(0, 10) + ' 至 ' + res.data.data.useEndTime.substr(0, 10)
        }
        this.setData({
          info: res.data.data,
          total,
          time
        })
        this.isCardPay()
        this.getUsercoupon()
      }
    })
  },
  //  砍价商品
  getCutOrder() {
    promiseRequest(cutsubmit, 'get', {
      cutPriceId: this.data.productid
    }).then(res => {
      if (res.data.code == 0) {
        let total = 0
        res.data.data.detailList.map(item => {
          total += parseInt((item.quantity * item.unitPrice) * 100) / 100
        })
        this.setData({
          info: res.data.data,
          total
        })
        this.isCardPay()
        this.getUsercoupon()
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          success: () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: -1
              })
            }, 1400)
          }
        })
      }
    })
  },
  //  拼团订单
  getGroupOrder() {
    promiseRequest(grouporder, 'get', {
      productGroupBuyId: this.data.productid,
      skuId: this.data.skuid,
      groupBuyId: this.data.groupBuyId,
      quantity: this.data.num
    }).then(res => {
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
        this.getUsercoupon()
      }
    })
  },
  // 账户是否开通支付密码
  getExistpaypwd() {
    promiseRequest(existpaypwd, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          hasbindpass: res.data.isPaypwd != '' ? true: false
        })
      }
    })
  },

  //  是否绑定过手机号
  getBindTel() {
    promiseRequest(hasbindtel, 'get').then(res => {
      if (res.data.code == 0) {
        if (res.data.mobile != "") {
          this.setData({
            hasbindtel: true,
            telephone: res.data.mobile
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
    if (this.data.radio1 || this.data.radio2) {
      //  没有绑定支付密码跳转设置支付密码页
      if (!this.data.hasbindpass) {
        wx.navigateTo({
          url: '../user/password/index',
        })
        return
      }
      this.setData({
        hasPassMode: true,
        textareaStyle: 'display: none;'
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
        let total = Math.floor((this.data.num * item.unitPrice) * 100) / 100
        this.setData({
          total,
          couponMoney: this.data.rcouponId ? this.data.couponMoney : 0
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

  // 微信支付
  wxPayment(v) {
    wx.requestPayment({
      timeStamp: v.data.timestamp,
      nonceStr: v.data.noncestr,
      package: 'prepay_id=' + v.data.prepayid,
      signType: 'MD5',
      paySign: v.data.sign,
      success: (res) => {
        let cate = this.data.classs
        let isgroup = this.data.classs == 'group' ? 1 : 0
        let pid = this.data.productid
        switch (cate) {
          case 'group':
            pid = v.order.groupbuyId
          case 'limit':
          case 'product':
          let total = this.data.total
            if (this.data.couponType == 2) {
              total = Math.floor((total * this.data.couponMoney) * 100) / 100
            } else {
              total = total - this.data.couponMoney
            }
            wx.redirectTo({
              url: `../paydone/index?group=${isgroup}&pid=${pid}&price=${total}&orderid=${v.order.orderId}&name=${this.data.classs}`
            })
            break;
          case 'cut':
            wx.redirectTo({
              url: `../cutdetail/index?pid=${this.data.productid}`
            })
            break;
        }
      }
    })
  },
  verifypass(e) {
    if (e.detail) {
      let info = this.data.info,
        radio1 = this.data.radio1,
        radio2 = this.data.radio2,
        radio3 = this.data.radio3,
        total = this.data.total - this.data.couponMoney,
        paytotal = this.data.paytotal,
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
      //  电子卡
      if (radio1) {
        data.eleAmount = info.eleCardBalance >= total ? total : info.eleCardBalance
      }
      //  余额
      if (radio2) {
        data.cash = info.cashBalance >= total ? total : info.cashBalance
      }
      //  电子卡+余额 >= 应支付
      if (radio1 && radio2 && info.cashBalance + info.eleCardBalance >= total) {
        data.cash = info.eleCardBalance >= total ? 0 : formatNum(total - info.eleCardBalance)
      }
      //  电子卡+余额 <  应支付
      if (radio1 && radio2 && info.cashBalance + info.eleCardBalance < total && !radio3) {
        wx.showToast({
          title: '账户余额不足以支付!',
          icon: 'none'
        })
        return
      }
      switch (this.data.classs) {
        case 'group':
          data.productGroupBuyId = this.data.productid
          data.groupBuyId = this.data.groupBuyId
          this.subOrder(subgrouporder, data)
          break;
        case 'limit':
          data.timeLimitBuyId = this.data.productid
          this.subOrder(limitOrder, data)
          break;
        case 'product':
          data.productId = this.data.productid
          this.subOrder(producOrder, data)
          break;
        case 'cut':
          data.cutPriceId = this.data.productid
          this.subOrder(cutOrder, data)
          break;
      }
      this.setData({
        hasPassMode: false,
        textareaStyle: 'height: 106rpx;'
      })
    }
  },
  //  提交订单
  subOrder(url, data) {
    promiseRequest(url, 'post', data).then(res => {
      let v = res.data.value
      if (v && v.code == 0) {
        if (v.order.grandTotal > 0) {
          this.wxPayment(v)
          this.formSubmit(v.data.prepayid)
        } else {
          let cate = this.data.classs
          let isgroup = this.data.classs == 'group' ? 1 : 0
          let pid = this.data.productid
          switch (cate) {
            case 'group':
              pid = v.order.groupbuyId
            case 'limit':
            case 'product':
            case 'cut':
              wx.redirectTo({
                url: `../paydone/index?group=${isgroup}&pid=${pid}&price=${this.data.total}&orderid=${v.order.orderId}&name=${this.data.classs}`
              })
              break;
            case 'cut':
              wx.redirectTo({
                url: `../cutdetail/index?pid=${this.data.productid}`
              })
              break;
          }
        }
      } else if (res.data.value && res.data.value.code == 1) {
        wx.showToast({
          title: res.data.value.msg,
          duration: 3000,
          icon: 'none'
        })
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          duration: 3000,
          icon: 'none'
        })
      }
    })
  },
  //  输入用户信息 , 备注信息
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
  //  支付方式
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
  handleSellerAddr(e) {
    let addr = e.currentTarget.dataset.addr
    wx.openLocation({
      latitude: app.globalData.location[0],
      longitude: app.globalData.location[1],
      address: addr
    })
  }
})