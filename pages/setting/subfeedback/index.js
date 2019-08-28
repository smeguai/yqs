import {
  feedback
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({
  data: {
    imglist: [],
    title: '',
    radio: false,
    content: '',
    name: '',
    tel: ''
  },
  onLoad: function(options) {
    let userinfo = wx.getStorageSync('userInfo')
    this.setData({
      title: options.txt,
      tel: userinfo.mobile,
      name: userinfo.nickname
    })
  },
  //  获取图片
  gotImg(e) {
    this.setData({
      imglist: e.detail.img2
    })
  },
  //  radio被点击
  handleRadioClick() {
    this.setData({
      radio: !this.data.radio
    })
  },
  //  提交表单
  handleSubmit() {
    if (!this.data.content) {
      wx.showToast({
        title: '请描述你遇到的问题',
        icon: 'none'
      })
      return
    }
    if (!this.data.name || !this.data.tel) {
      wx.showToast({
        title: '请输入你的联系方式',
        icon: 'none'
      })
      return
    }
    promiseRequest(feedback, 'post', {
      title: this.data.title,
      des: this.data.content,
      fullName: this.data.name,
      mobile: isNaN(Number(this.data.tel)) ? '' : this.data.tel,
      email: isNaN(Number(this.data.tel)) ? this.data.tel : '',
      imgs: this.data.imglist
    }).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          success: () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: -1
              })
            }, 1000)
          }
        })
      }
    })
  },
  //  修改提交内容
  setContent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  //  姓名
  setname(e) {
    this.setData({
      name: e.detail.value
    })
  },
  //  email .tel
  settel(e) {
    this.setData({
      tel: e.detail.value
    })
  }
})