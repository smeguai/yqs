import {
  orderdetail,
  refund
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    causelist: [{
        txt: '预约不上',
        active: false
      },
      {
        txt: '店里活动更优惠',
        active: false
      },
      {
        txt: '买多了/买错了',
        active: false
      },
      {
        txt: '朋友/网上评价不好',
        active: false
      },
      {
        txt: '计划有变,没时间消费',
        active: false
      },
    ],
    btnActive: false,
    orderId: null,
    data: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      orderId: options.orderid
    })
    this.getOrderDetail()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  //  退款
  handleRefund() {
    if (this.data.btnActive) {
      wx.showModal({
        title: '提示',
        content: '是否要申请退款？（退款后核销码将不可使用）',
        success: r => {
          if (r.confirm) {
            let des = ''
            this.data.causelist.map(item => {
              if (item.active) {
                des += item.txt + ','
              }
            })
            promiseRequest(refund, 'post', {
              orderId: this.data.orderId,
              returnType: '',
              reasonDes: des
            }).then(res => {
              if (res.data.code == 0) {
                wx.navigateBack({
                  delat: -1
                })
              } else if (res.data.code == 1) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none'
                })
              }
            })
          }
        }
      })
    }
  },
  handleCauseItemClick(e) {
    let index = e.currentTarget.dataset.index
    let d = this.data.causelist
    let btnActive = false
    d[index].active = !d[index].active
    d.map(item => {
      if (item.active) {
        btnActive = true
      }
    })
    this.setData({
      causelist: d,
      btnActive
    })
  },
  getOrderDetail() {
    promiseRequest(orderdetail, 'get', {
      orderId: this.data.orderId
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          data: res.data.data
        })
      }
    })
  }
})