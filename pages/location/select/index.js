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
    notrecord: false,
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
  },
  getSearch() {
    let data = {
      x: app.globalData.location[0],
      y: app.globalData.location[1],
      keys: this.data.searchContent
    }
    promiseRequest(search, 'post', data).then(res => {
      if (res.data.code == 0 && res.data.keyData.length > 0) {
        this.setData({
          record: res.data.keyData,
          searchItem: true
        })
      } else {
        this.setData({
          notrecord: true
        })
      }
    })
  },
  setsearchContent(e) {
    this.setData({
      searchContent: e.detail.value
    })
  }
})