import {
  comment
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    merchantId: 0,
    pageindex: 1,
    pagesize: 10,
    commentTagIdx: 0,
    commentTagLs: [{
        txt: '全部',
        n: 'totalCount',
        idx: 0
      },
      {
        txt: '无可挑剔',
        n: 'startCount5',
        idx: 5
      },
      {
        txt: '非常满意',
        n: 'startCount4',
        idx: 4
      }, {
        txt: '满意',
        n: 'startCount3',
        idx: 3
      }, {
        txt: '一般',
        n: 'startCount2',
        idx: 2
      }, {
        txt: '很差',
        n: 'startCount1',
        idx: 1
      }
    ],
    data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      merchantId: options.pid
    })
    this.getComment()
  },
  //  获取评论
  getComment() {
    promiseRequest(comment, 'get', {
      merchantId: this.data.merchantId,
      commentid: 0,
      pageindex: this.data.pageindex,
      pagesize: this.data.pagesize,
      startIndex: this.data.startIndex
    }).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          data: res.data
        })
      }
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


  //  用户评价切换
  handleCommentTagClick(e) {
    this.setData({
      commentTagIdx: e.currentTarget.dataset.idx
    })
    // this.getComment()
  }
})