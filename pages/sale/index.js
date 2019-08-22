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
    pageSize: 10
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      stationId: wx.getStorageSync('station').stationId,
      merchantId: options.pid
    })
  },
  //  获取特惠商品
  getgoodslist(){
    promiseRequest(getgoodslist, 'get', {
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      merchantId: this.data.merchantId,
      keys: '',
      typeId: 0,
      stationId: this.data.stationId,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      console.log(res)
      if (res.data.code == 0) {
        
      }
    })
  },
  //  NavBar 
  handleNavItemClick(e) {
    let idx = e.currentTarget.dataset.idx
    this.setData({
      navcurrent: idx
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})