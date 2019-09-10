import {
  hasbindtel
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
const app = getApp()
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
        },
        {
          idx: 8,
          txt: '退出当前账号'
        }
      ]
    ],
    hasTel: false
  },

  nav(e) {
    let num = e.currentTarget.dataset.idx;
    switch (num) {
      case 0:
        // 设置支付密码
        wx.navigateTo({
          url: '../user/password/index'
        })
        break;
      case 1:
        // 更改手机号
        if (this.data.hasTel) {
          wx.navigateTo({
            url: '../user/alterMobile/index'
          })
        } else {
          wx.navigateTo({
            url: '../login/index'
          })
        }
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
          url: `../logout/index`
        })
        break;
      case 8:
        // 退出账号
        wx.showModal({
          title: '是否退出登录？',
          content: '退出账号后，下次将不会自动登录',
          cancelColor: '#999999',
          confirmColor: '#FF6600',
          success: res => {
            if (res.confirm) {
              wx.removeStorageSync('userInfo')
              wx.removeStorageSync('openORunion')
              app.globalData.userInfo = null
              app.globalData.onLine = false
              app.globalData.openORunion = null
              wx.showToast({
                title: '退出成功!',
                icon: 'none',
                success: () => {
                  setTimeout(() => {
                    wx.navigateBack({
                      delta: -1
                    })
                  }, 1000)
                }
              })
            }
          }
        })
        break;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function() {
    this.getBindTel()
  },
  //  是否绑定手机号
  getBindTel() {
    promiseRequest(hasbindtel, 'get').then(res => {
      if (res.data.code == 0) {
        this.setData({
          hasTel: res.data.mobile ? true : false
        })
      }
    })
  }
})