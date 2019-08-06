const app = getApp()
import {
  serviceget
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: null,
    currentData: null,
    currentStation: null,
    historyAddrsList: null
  },
  cityClick() {
    wx.navigateTo({
      url: 'city/index',
    })
  },
  selectClick() {
    wx.navigateTo({
      url: 'select/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      historyAddrsList: wx.getStorageSync('historyAddrsList'),
      currentStation: wx.getStorageSync('station')
    })

  },
  getservice() {
    let data = {
      x: app.globalData.location[0],
      y: app.globalData.location[1]
    }
    promiseRequest(serviceget, 'post', data).then(res => {
      if (res.data.code == 0) {
        let d = res.data.nearbyData
        d.map(item => {
          item.distance = item.distance >= 1000 ? parseInt(item.distance / 100) / 10 + '公里' : parseInt(item.distance) + '米'
        })
        this.setData({
          nearbyData: d
        })
      }
    })
  },
  //  附近小区 item  被点击
  nearItemClick(e) {
    let id = e.currentTarget.dataset.id,
      near = this.data.nearbyData,
      hasHistory = true
    near.map(item => {
      if (item.stationId == id) {
        app.globalData.station = item
        wx.setStorage({
          key: 'station',
          data: item
        })
        this.setData({
          currentStation: item
        })
        this.getHistory()
      }
    })
  },
  //  进入小区
  nearItemBtnClick(e) {
    let id = e.currentTarget.dataset.id,
      near = this.data.nearbyData,
      hasHistory = true
    near.map(item => {
      if (item.stationId == id) {
        app.globalData.station = item
        wx.setStorage({
          key: 'station',
          data: item,
          success: () => {
            wx.switchTab({
              url: '../index/index'
            })
          }
        })
        this.setData({
          currentStation: item
        })
        this.getHistory()
      }
    })
  },
  //  历史记录
  getHistory() {
    let status = true
    let list = this.data.historyAddrsList,
      current = this.data.currentStation
    if (list) {
      list.map(item => {
        if (this.data.currentStation.stationId == current.stationId) {
          status = false
        }
      })
    }
    if (status) {
      wx.setStorage({
        key: 'historyAddrsList',
        data: [...list, current]
      })
      this.setData({
        historyAddrsList: [...list, current]
      })
    }
  },
  //  点击修改地理位置
  setStation() {
    wx.chooseLocation({
      success: res => {
        this.setData({
          currentData: res.name
        })
        let location = [res.latitude, res.longitude]
        app.globalData.location = location
        wx.setStorage({
          key: 'location',
          data: location,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let location = wx.getStorageSync('location')
    if (location) {
      this.getservice()
    } else {
      wx.navigateTo({
        url: './accredit/index',
      })
    }
  }
})