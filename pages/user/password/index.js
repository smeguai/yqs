import {
  existpaypwd,
  bindtel,
  hasbindtel
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password_num: '',
    newPassword_num: '',
    code: false,
    code_num: '',
    confirm: false,
    haspaypwd: false,
    hasbindtel: false,
    tel: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getBindTel()
    if (!this.data.hasbindtel) return
    this.getExistpaypwd()
  },
  //  发送验证码
  handleQAcode() {

  },
  //  是否绑定过手机号
  getBindTel() {
    promiseRequest(hasbindtel, 'get').then(res => {
      if (res.data.code == 0) {
        if (res.data.mobile) {
          this.setData({
            hasbindtel: res.data.mobile
          })
        } else {
          wx.navigateTo({
            url: '../../login/index'
          })
        }
      }
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
  Password(e) {
    this.setData({
      password_num: e.detail.value,
    })
    this.data.password_num == '' || this.data.newPassword_num == '' ? this.setData({
      code: false
    }) : this.setData({
      code: true
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

  code(e) {
    if (this.data.newPassword_num == '' || this.data.password_num == '') {
      this.setData({
        code_num: '',
      })
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
      })
      return;
    }
    if (this.data.newPassword_num != this.data.password_num) {
      this.setData({
        code_num: '',
      })
      wx.showToast({
        title: '请输入相同密码',
        icon: 'none',
      })
      return;
    }
    this.setData({
      code_num: e.detail.value,
    })
    this.data.code_num == '' ? this.setData({
      confirm: false
    }) : this.setData({
      confirm: true
    })
  }
})