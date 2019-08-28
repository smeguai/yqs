import {
  setcomment,
  orderdetail
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
    score: -1,
    content: '',
    orderId: null,
    imgs: [],
    formid: '',
    scoreTxt: ['“很差”', '“一般”', '“满意”', '“非常满意”', '“无可挑剔”'],
    info: null
  },
  onLoad: function(options) {
    this.setData({
      orderId: options.pid
    })
    this.getOrderDesc()
  },
  formSubmit(e) {
    this.setData({
      formid: e.detail.formid
    })

    promiseRequest(setcomment, 'post', {
      content: this.data.content,
      starIndex: this.data.score,
      orderId: this.data.orderId,
      imgs: this.data.imgs,
      formid: this.data.formid
    }).then(res => {
      if (res.data.code == 0) {
        wx.showToast({
          title: '评论成功',
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
  //  订单信息
  getOrderDesc() {
    promiseRequest(orderdetail, 'get', {
      orderId: this.data.orderId
    }).then(res => {
      if( res.data.code == 0) {
        this.setData({
          info: res.data.data
        })
      }
    })
  },
  //  获取分数
  getscore(e) {
    this.setData({
      score: e.detail
    })
  },
  //  图片
  handleGotImgurl(e){
    this.setData({
      imgs: e.detail.img2
    })
  },
  //  输入内容
  handleTextIpt(e) {
    this.setData({
      content: e.detail.value
    })
  }
})