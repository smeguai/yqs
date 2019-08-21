import {
  search,
  serviceget
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
    add: null,
    record: [],
    searchItem: false,
    searchContent: '',
    location: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNearby()
  },
  //  获取附近小区
  getNearby() {
    promiseRequest(serviceget, 'post', {
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          add: res.data.nearbyData
        })
      }
    })
  },
  //  进入小区
  nearItemBtnClick(e) {
    let id = e.currentTarget.dataset.id
    let near = this.data.record.length > 0 ? this.data.record : this.data.add
    let hasHistory = true
      console.log(near)
    near.map(item => {
      if (item.stationId == id) {
        app.globalData.station = item
        wx.setStorage({
          key: 'station',
          data: item,
          success: () => {
            wx.switchTab({
              url: '../../index/index'
            })
          }
        })
      }
    })
  },
  clearIptValue() {
    this.setData({
      searchContent: ''
    })
    console.log(1)
  },
  getSearch() {
    let data = {
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      keys: this.data.searchContent
    }
    promiseRequest(search, 'post', data).then(res => {
      if (res.data.code == 0 && res.data.keyData) {
        this.setData({
          record: res.data.keyData,
          searchItem: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  setsearchContent(e) {
    this.setData({
      searchContent: e.detail.value
    })
  }
})