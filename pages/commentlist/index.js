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
    loding: true,
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
    data: null,
    startIndex: 0
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
      let commentList = res.data.data
      commentList.map(item => {
        item.createTime = item.createTime.split('.')[0]
      })
      let data = Object.assign({ dataScore: res.data.dataScore }, { data: commentList})
      if (res.data.code == 0) {
        this.setData({
          data
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  //  用户评价切换
  handleCommentTagClick(e) {
    this.setData({
      startIndex: e.currentTarget.dataset.idx
    })
  }
})