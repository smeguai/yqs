import {
  groupdetail
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isgroup: false,
    pid: null,
    groupdesc: null,
    uid: null
  },
  //  参与拼团
  handleGroupPay() {
    wx.redirectTo({
      url: `../goodsdetail/index?groupBuyId=${this.data.pid}&name=group&pid=${this.data.groupdesc.productGroupBuyId}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options.group)
    this.setData({
      isgroup: options.group == 'true' ? true:false,
      pid: options.pid,
      uid: wx.getStorageSync('userInfo').uid
    })
    if (this.data.isgroup) {
      this.getGroupDsc()
    }
  },

//  获取拼团信息
getGroupDsc() {
  promiseRequest(groupdetail, 'get', {
    groupBuyId: this.data.pid
  }).then(res => {
    if (res.data.code == 1) {
      this.setData({
        groupdesc: res.data.data
      })
    }
  })
},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '和我来拼团',
    path: `/pages/paydone/index?pid=${this.data.pid}&uid=${this.data.uid}&group=1`
    }
  }
})