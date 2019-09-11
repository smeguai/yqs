import {
  hasbindtel,
  telecombusorder,
  telecombusiness
} from '../../utils/api.js'
import {
  promiseRequest,
  tel
} from '../../utils/util.js'
const app = getApp()
Page({
  data: {
    name: '',
    tel: '',
    nottel: false,
    remark: '',
    stationId: 0,
    telecomId: 0,
    shareUid: 0,
    info: null
  },
  onLoad: function(options) {
    wx.setStorageSync('station', {stationId: options.stationId})
    this.setData({
      stationId: options.stationId,
      telecomId: options.telecomId,
      shareUid: options.shareUid
    })
  },
  //  获取营业厅信息
  gettelecom() {
    promiseRequest(telecombusiness, 'get', {
      telecomId: this.data.telecomId
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          info: res.data.data
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  onShow() {
    let userinfo = wx.getStorageSync('userInfo')
    if (!userinfo) {
      wx.navigateTo({
        url: '../accredit/index',
      })
    } else {
      this.setData({
        name: userinfo.nickname
      })
      this.gettelecom()
      this.hasBindMobile()
    }
  },
  //  是否登录账号
  hasLogin() {

  },
  //  是否绑定手机号
  hasBindMobile() {
    promiseRequest(hasbindtel, 'get').then(res => {
      if (res.data.code == 0) {
        if (res.data.mobile) {
          this.setData({
            tel: res.data.mobile,
            nottel: true
          })
        } else {
          wx.navigateTo({
            url: '../login/index',
          })
        }
      }
    })
  },
  //  业务办理
  submitpay() {
    if (!this.data.name) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      })
      return
    }
    if (!this.data.nottel) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      })
      return
    }
    promiseRequest(telecombusorder, 'post', {
      stationId: this.data.stationId,
      Remark: this.data.remark,
      fullname: this.data.name,
      telephone: this.data.tel,
      telecomId: this.data.telecomId,
      merchantId: this.data.shareUid
    }).then(res => {
      if (res.data.value && res.data.value.code == 0) {
        let orderid = res.data.value.order.orderId
        wx.showModal({
          title: '申请成功',
          confirmColor: '#FF6600',
          cancelColor: '#999999',
          confirmText: '查看详情',
          cancelText: '去首页',
          content: '恭喜您前往营业厅办理业务,可获得一张价值最高2880元现金电子卡，可至订单列表查看核销码 ',
          success: res => {
            console.log(res)
            if (res.confirm) {
              wx.navigateTo({
                url: `../orders/index?idx=0`
              })
            } else {
              wx.reLaunch({
                url: '../index/index'
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  //  拨打电话
  handlePhoneClick() {
    wx.makePhoneCall({
      phoneNumber: this.data.info.contactMobile
    })
  },
  //  跳转 去首页
  handleNavigateToIndex() {
    wx.reLaunch({
      url: '../index/index',
    })
  },
  //  分享
  onShareAppMessage: function () {
    let userinfo = wx.getStorageSync('userInfo')
    let shareUid = this.data.shareUid
    if (userinfo) {
      shareUid = userinfo.uid
    }
    return {
      title: '电信业务办理申请',
      path: `../teleservice/index?stationId=${this.data.stationId}&telecomId=${this.data.telecomId}&shareUid=${shareUid}`
    }
  },
  //  打开地图
  handleSellerAddr() {
    let info = this.data.info
    wx.openLocation({
      latitude: parseFloat(info.x),
      longitude: parseFloat(info.y),
      name: info.merchantName,
      address: info.addr
    })
  },
  handleIptName(e) {
    let val = e.detail.value
    this.setData({
      name: val
    })
  },
  handleIptTel(e) {
    let isTel = tel(e.detail.value)
    let val = e.detail.value
    this.setData({
      tel: val,
      nottel: isTel
    })
  },
  handleIptRemark(e) {
    this.setData({
      remark: e.detail.value
    })
  }
})