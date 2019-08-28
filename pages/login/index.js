import {
  changebindtel,
  bindtel,
  decrypt,
  getcode
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
    input_mobile: '',
    codeMode: '',
    input_binding: '1',
    code: '',
    timer: 60,
    codetxt: '获取验证码'
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
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        this.timerout()
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  //  60秒倒计时
  timerout() {

    if (this.data.timer > 0) {
      setTimeout(() => {
        this.setData({
          timer: this.data.timer - 1,
          codeMode: false,
          codetxt: this.data.timer + '秒再次获取'
        })
        this.timerout()
      }, 1000)
    } else {
      this.setData({
        codeMode: true,
        timer: 60
      })
    }
  },
  getPhoneNumber(e) {
    promiseRequest(decrypt, 'post', {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      sessionKey: app.globalData.session_key,
      source: 0
    }).then(res => {
      let openORunion = wx.getStorageSync('openORunion')
      //  一键绑定
      // let 

      promiseRequest(changebindtel, 'post', {
        mobile: res.data.purePhoneNumber,
        unionId: openORunion.unionId,
        openId: openORunion.openId,
      }).then(res => {
        console.log(res)
      })
      wx.showToast({
        title: '绑定成功',
        icon: 'none',
        success: () => {
          setTimeout(() => {
            wx.navigateBack({
              delta: -1
            })
          }, 2000)
        }
      })
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
      mobile: this.data.input_mobile,
      validCode: this.data.code,
      codeMode: false
    }).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '绑定成功',
          icon: 'none',
          success: () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: -1
              })
            }, 1000)
          }
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  }
})