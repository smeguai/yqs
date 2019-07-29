import {
  decrypt,
  bindtel,
  getcode
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_mobile: '',
    codeMode: '',
    input_binding: '1',
    code: ''
  },

  mobile(e) {
    let input_mobile = e.detail.value,
      codeMode = false
    if (e.detail.value.length == 11) {
      codeMode = true
    }
    this.setData({ 
      input_mobile,
      codeMode
    })
  },
  code(e) {
    let code = e.detail.value
    if (code.length == 4) {
      this.setData({
        input_binding: 2,
        code
      })
    }
  },
  //  获取验证码
  handleClickGetCode() {
    let data = {
      action: 'bind',
      mobile: this.data.input_mobile
    }
    promiseRequest(getcode, 'post', data).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  getPhoneNumber(e) {
    console.log(e)
    promiseRequest(decrypt, 'post', {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      sessionKey: '111',
      source: 0
    }).then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  //  绑定手机号
  handleBindTel() {
    promiseRequest(bindtel, 'post', {
      mobile: this.data.mobile,
      validCode: this.data.code
    })
  }
})