const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    skulist: Array,
    price: Number,
    tagprice: Number,
    avatarUrl: String,
    orderid: Number,
    groupbuyid: {
      value: 0,
      type: Number
    },
    goodsimg: String,
    classs: String
  },
  data: {
    animationData: null,
    sellout: false,
    tagCurr: 0,
    detail: null,
    count: 1,
    onLine: false
  },
  methods: {
    reduceCount(e) {
      this.setData({
        count: e.detail
      })
    },
    createAnimation() {
      let animationData = wx.createAnimation({
        duration: 200
      })
      animationData.top(0).step()
      this.setData({
        animationData
      })
    },
    handleTagItemClick(e) {
      let idx = e.currentTarget.dataset.curr
      this.setData({
        tagCurr: idx,
        detail: this.data.skulist[idx]
      })
    },
    closepopup() {
      this.triggerEvent('myPopupClose', false)
    },
    handleOrderSubmit() {
      this.triggerEvent('myPopupClose', false)
      //  用户是否登录
      if (!this.data.onLine) {
        wx.navigateTo({
          url: '../accredit/index',
        })
        return
      }
      //  登录状态
      if (this.data.skulist.length > 0) {
        wx.navigateTo({
          url: `../../pages/pay/index?productid=${this.data.orderid}&count=${this.data.count}&skuid=${this.data.detail.productSKUId}&classs=${this.data.classs}&groupbuyid=${this.data.groupbuyid}`,
        })
      } else {
        wx.navigateTo({
          url: `../../pages/pay/index?productid=${this.data.orderid}&count=${this.data.count}&classs=${this.data.classs}&groupbuyid=${this.data.groupbuyid}`,
        })
      }
    }
  },
  ready() {
    this.createAnimation()
    this.setData({
      detail: this.data.skulist[0],
      onLine: wx.getStorageSync('userInfo') ? true : false
    })
  }
})