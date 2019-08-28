import { serviceagreement} from '../../../utils/api.js'
import {promiseRequest} from '../../../utils/util.js'
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
      this.getserviceagreement()
    },
    //  获取协议
    getserviceagreement() {
      promiseRequest(serviceagreement, 'get').then(res => {
        if (res.data.code == 0) {
          this.setData({
            data: res.data.data
          })
        }
      })
    }
})