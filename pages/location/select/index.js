import { search} from '../../../utils/api.js'
import { promiseRequest } from '../../../utils/util.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        add: [
            {
                name: '黄鹤小区5片',
                num: '距离200米',
                add: '长沙市岳麓区',
            },
            {
                name: '麓枫和苑',
                num: '距离500米',
                add: '长沙市岳麓区',
            },
            {
              name: '万事家景小区万事家景小区万事家景小区万事家景小区万事家景小区',
                num: '距离1.23公里',
                add: '长沙市岳麓区',
            }
        ],
        record: [],
        searchItem: false,
        searchContent: ''
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
  //  进入小区
  nearItemBtnClick(e) {
    let id = e.currentTarget.dataset.id,
      near = this.data.record,
      hasHistory = true
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
        let data  = {
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
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    setsearchContent(e) {
        this.setData({
            searchContent: e.detail.value
        })
    }
})