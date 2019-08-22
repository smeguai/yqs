import { privacypolicy } from '../../../utils/api.js'
import { promiseRequest } from '../../../utils/util.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
data: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getprivacypolicy()
    },
    //  获取政策
  getprivacypolicy() {
    promiseRequest(privacypolicy, 'get').then(res => {
      console.log(res.data.data)
      if (res.data.code == 0) {
        this.setData({
          data: res.data.data
        })
      }
    })
  }
})