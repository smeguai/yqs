import {
  setcomment
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
    score: 0,
    content: '',
    orderId: null,
    imgs: [],
    formid: ''
  },

  onLoad: function(options) {},
  //  提交评论
  handleCommentClick() {
    promiseRequest(setcomment, 'post', {
      content: this.data.content,
      starIndex: this.data.score,
      orderId: this.data.orderId,
      imgs: this.data.imgs,
      formid: this.data.formid
    }).then(res => {
      if(res.data.code == 0) {
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
  //  获取分数
  getscore(e) {
    this.setData({
      score: e.detail
    })
  }
})