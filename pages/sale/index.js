import { getgoodslist} from '../../utils/api.js'
import {promiseRequest} from '../../utils/util.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navlist: ['综合', '销量', '价格', '上新'],
    navcurrent: 0,
    merchantId: 0,
    pageIndex: 1,
    pageSize: 10,
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      stationId: wx.getStorageSync('station').stationId,
      merchantId: options.pid
    })
    this.getgoodslist()
  },
  //  获取特惠商品
  getgoodslist(){
    promiseRequest(getgoodslist, 'get', {
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      merchantId: this.data.merchantId,
      keys: '',
      typeId: 0,
      orderby: this.data.navcurrent + 2,
      stationId: this.data.stationId,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        this.setData({
          list: [...this.data.list, ...res.data.data]
        })
      }
    })
  },
  //  NavBar 
  handleNavItemClick(e) {
    let idx = e.currentTarget.dataset.idx
    this.setData({
      navcurrent: idx,
      list: []
    })
    this.getgoodslist()
  },
  //  商品跳转
  handleNavigate(e) {
    wx.navigateTo({
      url: `../goodsdetail/index?name=product&pid=${e.currentTarget.dataset.id}&groupBuyId=0`
    })
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.setData({
      list: [],
      pageIndex: 1
    })
    this.getgoodslist()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageIndex: this.data.pageIndex + 1
    })
    this.getgoodslist()
  }
})