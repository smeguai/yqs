import { helpcenter } from '../../../utils/api.js'
import { promiseRequest } from '../../../utils/util.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: null,
        currentIdx: -1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.gethelpcenter()
    },
    //  获取帮助信息
  gethelpcenter() {
    promiseRequest(helpcenter, 'get').then(res => {
      console.log(res.data)
      if (res.data.code == 0) {
        this.setData({
          list: res.data.data
        })
      }
    })
  },

    itemClick(e) {
        let idx = e.currentTarget.dataset.idx
        this.setData({
            currentIdx: idx
        })
    },
})