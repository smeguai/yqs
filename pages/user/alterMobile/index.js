import {
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
    mobile: '',
    code: false,
    code_num: '',
    confirm: false,
    hasbindtel: false
  },

  newMobile(e) {
    this.setData({
      mobile: e.detail.value
    })
    this.data.mobile == '' ? this.setData({
      code: false
    }) : this.setData({
      code: true
    })
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
      code_num: e.detail.value
    })
    this.data.code_num == '' ? this.setData({
      confirm: false
    }) : this.setData({
      confirm: true
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
    // promiseRequest(bindtel, 'post', {
    //   pwd: 
    // })
  }
})