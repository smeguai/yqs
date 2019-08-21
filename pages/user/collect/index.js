import {
  collection
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [],
    pageSize: 10,
    pageIndex: 1,
    loding: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getCollection()
  },
  //  获取收藏
  getCollection() {
    promiseRequest(collection, 'get', {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          content: [...this.data.content, ...res.data.data],
          loding: false
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    this.setData({
      content: [],
      pageIndex: 1,
      loding: true
    })
    this.getCollection()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.setData({
      pageIndex: this.data.pageIndex+1
    })
    this.getCollection()
  }
})