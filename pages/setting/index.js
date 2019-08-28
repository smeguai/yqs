// pages/setting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [
      [{
          idx: 0,
          txt: '设置支付密码'
        },
        {
          idx: 1,
          txt: '绑定/更改手机号'
        }
      ],
      [{
          idx: 2,
          txt: '服务协议'
        },
        {
          idx: 3,
          txt: '隐私政策'
        },
        {
          idx: 4,
          txt: '用户反馈'
        },
        {
          idx: 5,
          txt: '帮助中心'
        }
      ],
      [{
          idx: 6,
          txt: '清除缓存'
        },
        {
          idx: 7,
          txt: '注销账号'
        }
      ]
    ],

  },

  nav(e) {
    let num = e.currentTarget.dataset.idx;
    switch (num) {
      case 0:
        // 设置支付密码
        wx.navigateTo({
          url: '../payPassword/index'
        })
        break;
      case 1:
        // 更改手机号
        wx.navigateTo({
          url: '../user/alterMobile/index'
        })
        break;
      case 2:
        // 服务协议
        wx.navigateTo({
          url: './protocol/index'
        })
        break;
      case 3:
        // 隐私政策
        wx.navigateTo({
          url: './policy/index'
        })
        break;
      case 4:
        // 用户反馈
        wx.navigateTo({
          url: './feedback/index'
        })
        break;
      case 5:
        // 帮助中心
        wx.navigateTo({
          url: './help/index'
        })
        break;
      case 6:
        // 清除缓存
        wx.showModal({
          content: '确定清除缓存吗?',
          confirmColor: '#FFDE4E',
          success: res => {
            if (res.confirm) {
              wx.removeStorage({
                key: 'historyKeys',
                key: 'historyAddrsList',
                success: r => {
                  if (r.errMsg == 'removeStorage:ok') {
                    wx.showToast({
                      title: '清除成功',
                      icon: 'none'
                    })
                  }
                }
              })
            }
          }
        })
        break;
      case 7:
        // 注销账号
        wx.navigateTo({
          url: '../logout/index'
        })
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})