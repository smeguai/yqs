import {
  placeorder,
  producOrder
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
    radio3: false
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
  submitpay() {
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
    if (!radio1 && !radio2 && !radio3)
      wx.showToast({
        title: '选择支付方式',
        icon: 'none'
      })
    // data.eleAmount = radio1 ? info.eleCardBalance : 0
    // data.cash = radio1 ? info.cashBalance : 0

    if (radio1 && radio2 && radio3) {
      data.eleAmount = info.eleCardBalance
      data.cash = info.cashBalance
      console.log(`电子卡${data.eleAmount}, 余额${data.cash},微信`)
    } else if (radio1 && radio2) {
      data.eleAmount = info.eleCardBalance
      data.cash = total - info.eleCardBalance
      console.log(`电子卡${data.eleAmount}, 余额${data.cash}`)
    } else if (radio1 && radio3) {
      data.eleAmount = info.eleCardBalance
      console.log(`电子卡${data.eleAmount}, 微信`)
    } else if (radio2 && radio3) {
      data.cash = info.cashBalance
      console.log(`余额${data.eleAmount}, 微信`)
    } else if (radio1) {
      data.eleAmount = total
      console.log(`电子卡`)
    } else if (radio2) {
      data.cash = total
      console.log(`余额`)
    } else if (radio3) {

      console.log(`微信`)
    }


    console.log('-------------支付-----------------')
    let header = {
      Authorization: 'Bearer ' + app.globalData.userInfo.token
    }
    promiseRequest(producOrder, 'post', data, header).then(res => {
      if (res.data.value && res.data.value.code == 0) {
        wx.reLaunch({
          url: '../paydone/index',
        })
      } else {

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
      radio3 = this.data.radio3,
      total = this.data.total

    switch (i) {
      case '1':
        radio1 = !radio1
        if (info.eleCardBalance >= total || info.cashBalance >= total) {
          radio2 = radio3 = false
        }
        if (radio1 && radio2 && info.cashBalance + info.eleCardBalance >= total) {
          radio3 = false
        }
        break;
      case '2':
        radio2 = !radio2
        if (info.eleCardBalance >= total || info.cashBalance >= total) {
          radio1 = radio3 = false
        }
        if (radio1 && radio2 && info.cashBalance + info.eleCardBalance >= total) {
          radio3 = false
        }
        break;
      case '3':
        if (info.eleCardBalance >= total) {
          radio1 = false
        }
        if (info.cashBalance >= total) {
          radio2 = false
        }
        if (radio1 && radio2 && info.cashBalance + info.eleCardBalance >= total) {
          radio1 = radio2 = false
        }
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