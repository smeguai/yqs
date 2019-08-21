import {
  bindtel,
  hasbindtel,
  getcode
} from '../../../utils/api.js'
import {
  promiseRequest
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
    if (this.data.timer > 0) {
      setTimeout(() => {
        this.setData({
          timer: this.data.timer - 1,
          codetxt: (this.data.timer - 1) + '秒再次获取'
        })
        this.getTimeout()
      }, 100)
    } else {
      this.setData({
        timer: 60,
        codetxt: '发送验证'
      })
    }
  },
  //  发送验证码
  handleGetCode() {
    if (this.data.codetxt == '发送验证' && this.data.timer == 60) {
      this.getcode()
    }
  },
  mobileCode(e) {
    if (this.data.mobile == '') {
      this.setData({
        code_num: ''
      })
      wx.showToast({
        title: '新号码不能为空',
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
      if (this.data.code == 0) {
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
      validCode: 1230
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