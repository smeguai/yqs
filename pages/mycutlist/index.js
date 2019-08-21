import { mycutlist} from '../../utils/api.js'
import {promiseRequest} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loding: true,
    navlist: [
      { txt: '全部', idx: 0 },
      { txt: '砍价中', idx: 1 },
      { txt: '砍价成功', idx: 2 },
      { txt: '砍价失败', idx: 3 }
    ],
    navCurrent: 0,
    list: [],
    pageIndex: 1,
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMyCutList()
  },
  //  跳转 继续邀请砍价
  handleCutDesc(e) {
    wx.navigateTo({
      url: `../cutdetail/index?pid=${e.currentTarget.dataset.pid}`
    })
  },
  //  我的砍价
  getMyCutList() {
    promiseRequest(mycutlist, 'get', {
      status: this.data.navCurrent,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          list: [...this.data.list, ...res.data.data],
          loding: false
        })
      }
    })
  },
  //  navlist 切换
  handleNavItemClick(e) {
    this.setData({
      navCurrent: e.currentTarget.dataset.idx,
      pageIndex: 1,
      list: []
    })
    this.getMyCutList()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 1,
      loding: true,
      list: []
    })
    this.getMyCutList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageIndex: this.data.pageIndex+ 1
    })
    this.getMyCutList()
  }
})