import { banner} from '../../utils/api.js'
import { promiseRequest} from '../../utils/util.js'
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
      imgurl: '',
      tel: '13548575641'
    },
    //  复制
    copetxt() {
      wx.setClipboardData({
        data: this.data.tel,
        success: () => {
          wx.showToast({
            title: '复制成功!',
            icon: 'none'
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getCodeImg()
    },
    //  获取图片
    getCodeImg() {
      promiseRequest(banner, 'get', {
        id: 3,
        stationId: app.globalData.station.stationId
      }).then(res => {
        if (res.data.code == 0 && res.data.data) {
          this.setData({imgurl: res.data.data[0].imgUrl})
        }
      })
    },
    //  看图
  previewImage() {
    wx.previewImage({ urls: [this.data.imgurl]})
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

    }
})