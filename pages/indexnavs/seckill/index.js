import {
  limit
} from '../../../utils/api.js'
import {
  promiseRequest
} from '../../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navCurrent: 0,
    navList: [{
      id: 0,
      txt: '正在进行中'
    }, {
      id: 1,
      txt: '即将开始'
    }],
    list: [],
    pageIndex: 1,
    pageSize: 10,
    x: null,
    y: null,
    orderby: 0,
    keys: '',
    merchantId: 0,
    stationId: null,
    searchType: 0
  },
  //  切换秒杀商品
  navClick(e) {
    this.setData({
      navCurrent: e.currentTarget.dataset.id,
      searchType: e.currentTarget.dataset.id,
      pageIndex: 1,
      list: []
    })
    this.getlimitlist()
  },
  //  输入搜索关键词
  searchInput(e) {
    this.setData({
      keys: e.detail.value
    })
  },
  //  跳转到商品详情
  handleTogoodsdetail(e) {
    wx.navigateTo({
      url: `../../goodsdetail/index?name=limit&pid=${e.currentTarget.dataset.pid}`,
    })
  },
  //  确定搜索
  handleSearch() {
    this.setData({
      list: [],
      pageIndex: 1
    })
    this.getlimitlist()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getlimitlist()
  },
  //  获取秒杀列表
  getlimitlist() {
    let data = {
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize,
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      orderby: this.data.orderby,
      keys: this.data.keys,
      merchantId: this.data.merchantId,
      stationId: app.globalData.station.stationId,
      searchType: this.data.searchType
    }
    promiseRequest(limit, 'get', data).then(res => {
      if (res.data.code == 0) {
        this.setData({
          pageIndex: this.data.pageIndex + 1,
          list: [...this.data.list, ...res.data.data]
        })
      }
    })
  },
  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    this.setData({
      pageIndex: 1,
      list: []
    })
    this.getlimitlist()
  }
})