import {
  bindtel,
  hasbindtel,
  getcode
} from '../../../utils/api.js'
import {
  promiseRequest,
  tel
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    code: false,
    code_num: '',
    confirm: false,
    hasbindtel: false,

    timeout: null,
    timer: 60,
    codetxt: '发送验证'
  },

  newMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
    let code = this.data.mobile.length == 11 ? true : false
    this.setData({
      code,
      code_num: '',
      confirm: false
    })
  },

  //  倒计时
  getTimeout() {
    clearTimeout(this.data.timeout)
    if (this.data.timer > 0) {
      let t = setTimeout(() => {
        this.setData({
          timer: this.data.timer - 1,
          codetxt: (this.data.timer - 1) + '秒再次获取',
          timeout: t
        })
        this.getTimeout()
      }, 1000)
    } else {
      this.setData({
        timer: 60,
        codetxt: '发送验证'
      })
      clearTimeout(this.data.timeout)
    }
  },
  //  发送验证码
  handleGetCode() {
    let hastel = tel(this.data.mobile)
    if (this.data.code && hastel && this.data.codetxt == '发送验证' && this.data.timer == 60) {
      this.getcode()
    }
  },
  mobileCode(e) {
    let hastel = tel(this.data.mobile)
    if (!hastel) {
      this.setData({
        code_num: ''
      })
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
      })
      return;
    }
    this.setData({
      code_num: e.detail.value,
      confirm: e.detail.value.length == 4 && this.data.code ? true: false
    })
  },
  //  获取验证码
  getcode() {
    promiseRequest(getcode, 'post', {
      action: 'bind',
      mobile: this.data.mobile
    }).then(res => {
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
      if (res.data.code == 0) {
        this.getTimeout()
      }
    })
  },
  /* 生命周期函数--监听页面加载 */
  onLoad: function(options) {
    this.getBindTel()
  },
  //  是否绑定了手机号
  getBindTel() {
    promiseRequest(hasbindtel, 'get').then(res => {
      if (res.data.code == 0 && res.data.mobile) {
        this.setData({
          hasbindtel: res.data.mobile
        })
      }
    })
  },
  //  绑定手机号
  handleBindTel() {
    promiseRequest(bindtel, 'post', {
      mobile: this.data.mobile,
      validCode: this.data.code_num
    }).then(res => {
      console.log(res)
      wx.showToast({
        title: res.data.msg,
        icon: 'none'
      })
      if (res.data.code == 0) {
        setTimeout(()=> {
          wx.navigateBack({
            delta: -1
          })
        }, 1000)
      }
    })
  }
})