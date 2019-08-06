import {
  existpaypwd,
  getcode,
  setpaypass
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pass: '',
    pass_2: '',
    code: false,
    code_num: '',
    confirm: false,
    haspaypwd: false,
    hasbindtel: false,
    tel: '',
    timer: 60,
    codetxt: '获取验证码',
    t: null,
    alert: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getExistpaypwd()
  },
  //  发送验证码
  handleQAcode() {
    if (this.data.timer != 60) return
    let userInfo = wx.getStorageSync('userInfo')
    promiseRequest(getcode, 'post', {
      mobile: userInfo.mobile,
      action: 'paypwd'
    }).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          success: () => {
            this.getTimeout()
          }
        })
      }
    })

  },
  //  倒计时
  getTimeout() {
    let t = null
    if (this.data.timer > 0) {
      clearTimeout(this.data.t)
      t = setTimeout(() => {
        this.setData({
          timer: this.data.timer - 1,
          codetxt: (this.data.timer - 1) + '秒再次获取'
        })
        this.getTimeout()
      }, 1000)
    } else {
      this.setData({
        timer: 60,
        codetxt: '获取验证码'
      })
    }
    this.setData({
      t
    })
  },
  //  是否有支付密码
  getExistpaypwd() {
    promiseRequest(existpaypwd, 'get').then(res => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          haspaypwd: res.data.isPaypwd
        })
      }
    })
  },
  newPassword(e) {
    if (this.data.password_num.length < 6) {
      this.setData({
        newPassword_num: '',
      })
      wx.showToast({
        title: '密码长度不能小于6位数',
        icon: 'none',
      })
      return;
    }
    this.setData({
      newPassword_num: e.detail.value,
    })
    this.data.newPassword_num == '' || this.data.password_num == '' ? this.setData({
      code: false
    }) : this.setData({
      code: true
    })
  },
  //  第一个密码 不足6位数时
  ipt1_blur(e) {
    let len = e.detail.cursor
    if (len < 6 && len != '') {
      this.setData({
        alert: '密码必须为6位数'
      })
    }
  },
  password(e) {
    let pass = e.detail.value,
      code_num = '',
      pass_2 = '',
      code = false,
      alert = '',
      confirm = false
    this.setData({
      pass,
      pass_2,
      code,
      alert,
      code_num,
      confirm
    })
  },
  //  第二个密码
  newpassword(e) {
    let pass = e.detail.value,
      code = false,
      confirm = false,
      code_num = ''
    if (pass == this.data.pass && pass.length == 6) {
      code = true
      alert = ''
    } else if (pass != this.data.pass && pass.length == 6) {
      code = false
      alert = '两次密码不一致'
    }
    this.setData({
      code,
      pass_2: pass,
      alert,
      confirm,
      code_num
    })
  },
  //  验证码
  code(e) {
    let v = e.detail.value,
      confirm = false
    if (v.length == 4 && this.data.pass && this.data.pass == this.data.pass_2) {
      confirm = true
    }
    this.setData({
      confirm,
      code_num: v
    })
  },
  //  设置密码
  setPass() {
    promiseRequest(setpaypass, 'get', {
      pwd: this.data.pass,
      validcode: this.data.code_num
    }).then(res => {
      if (res.data.code == 0) {
        wx.navigateBack({
          delat: -1
        })
      } else if (res.data.code == 1) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  }
})