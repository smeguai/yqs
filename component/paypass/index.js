import {
  verifypass
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'

Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    focus: false,
    Length: 6, //输入框个数  
    isFocus: true, //聚焦  
    iptValue: "", //输入的内容  
    iptValue1: '', // 显示的密码
    password_one: '',
    password_oneShow: true,
    Value_tow: "",
    pass_none: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    password_done(e) {
      if (e.detail.value.length != 6) return
    },

    password_input(e) {
      var iptValue = e.detail.value;
      let iptValue1 = []
      for (let i = 0; i < iptValue.length - 1; i++) {
        iptValue1.push('*')
      }
      iptValue1.push(iptValue.charAt(iptValue.length - 1))
      this.setData({
        iptValue,
        iptValue1
      })
    },
    passConfime() {
      promiseRequest(verifypass, 'get', {
        pwd: this.data.iptValue
      }).then(res => {
        if (res.data.code == 0) {
          if (res.data.exactness) {
            this.triggerEvent('verifypass', true)
          } else {
            wx.showToast({
              title: '密码错误',
              icon: 'none'
            })
          }
        }else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      })
    },
    close() {
      this.triggerEvent('close', false)
    },
    Tap() {
      this.setData({
        isFocus: true,
      })
    },

    getFocus() {
      this.setData({
        focus: !this.data.focus
      })
    },
  }
})