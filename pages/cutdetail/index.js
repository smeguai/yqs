import {
  usercutdesc,
  cutfriendcut
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navindex: 0,
    pid: 0,
    isme: true,
    uid: 0,
    detail: null,
    canvas_width: 0,
    canvas_height: 0,
    canvas_imgurl: '',
    userCutStatus: 0, // 0:正常 1:活动继续,用户砍价到期
    startcutmode: false,
    loding: true
  },
  //  关闭弹出层  帮他砍一刀
  handleStartCutClose() {
    this.setData({
      handleStartCutClose: false
    })
  },
  //  跳转 当前价购买
  handleNavigatePay() {
    //  用户是否登录
    let online = wx.getStorageSync('userInfo')
    if (!online) {
      wx.navigateTo({
        url: '../accredit/index',
      })
      return
    }
    wx.navigateTo({
      url: `../../pages/pay/index?productid=${this.data.pid}&classs=cut`,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      pid: options.pid
    })
    this.getCutDesc()
    //  画图
    this.getSystemInfoSync()
    this.downlogo('https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg')
  },
  onShow() {
    let userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.setData({
        uid: userinfo.uid
      })
    } else {
      wx.navigateTo({
        url: '../accredit/index',
      })
    }
  },
  // 重新发起砍价
  handleTogoodsdetail(e) {
    wx.navigateTo({
      url: `../goodsdetail/index?pid=${e.currentTarget.dataset.pid}&name=cut`
    })
  },
  //  帮忙砍价
  handleCutfriendcut() {
    promiseRequest(cutfriendcut, 'get', {
      cutPriceId: this.data.pid
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          //  帮忙砍价成功
          startcutmode: true
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  //  活动继续但用户砍价到期
  getCountStatus(e) {
    this.setData({
      userCutStatus: e.detail
    })
  },
  getCutDesc() {
    promiseRequest(usercutdesc, 'get', {
      cutPriceId: this.data.pid
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          detail: res.data.data
        })
      }
      this.setData({
        loding: false
      })
    })
  },
  //  创建画布
  createCanvas() {
    let h = 116
    const ctx = wx.createCanvasContext('sharecanvas')
    //  背景色
    ctx.rect(0, 0, this.data.canvas_width / 2, this.data.canvas_height / 2)
    ctx.setFillStyle('#FFDE4E')
    ctx.fill()
    //  商品图片
    ctx.drawImage(this.data.canvas_imgurl, 10, 10, (this.data.canvas_width / 2) - 20, h)
    //  商品名
    ctx.setFontSize(16)
    ctx.setFillStyle('#fff')
    ctx.fillRect(10, h, (this.data.canvas_width / 2) - 20, 240)
    h += 10
    ctx.setFillStyle('#333333')
    let goodsname = '木瓜水奶茶木瓜水木瓜水奶茶'.substr(0, 30)
    let name = ''
    for (let i = 0; i < goodsname.length; i++) {
      if (name.length < 15) {
        name += goodsname[i]
      } else {
        h += 20
        ctx.fillText(name, 18, h)
        name = ''
      }
    }
    if (name.length > 0) {
      h += 20
      ctx.fillText(name, 18, h)
      name = ''
    }

    //  价格等 
    h += 20
    ctx.setFillStyle('#FF6600')
    ctx.setFontSize(30)
    h += 20
    let price = 9.9 + ''
    ctx.fillText('￥' + price, 18, h)
    let tableft = price.length * 10
    ctx.setFillStyle('#FFDE4E')
    ctx.fillRect(80 + tableft, h - 17, 38, 18)
    ctx.setFillStyle('#333333')
    ctx.setFontSize(10)
    ctx.fillText('抢购价', 84 + tableft, h - 5)
    h += 20
    ctx.setFillStyle('#999999')
    ctx.setFontSize(12)
    ctx.fillText('原价￥39.00', 20, h)
    ctx.setFillStyle('#333')
    ctx.fillText('0人已购买', (this.data.canvas_width / 2) - 98, h)
    //  画虚线
    h += 30
    ctx.setLineDash([10, 10], 5)
    ctx.beginPath()
    ctx.moveTo(20, h)
    ctx.strokeStyle = '#FFDE4E'
    ctx.lineTo((this.data.canvas_width / 2) - 20, h)
    ctx.stroke()
    //  画分割线
    ctx.beginPath()
    ctx.arc(10, h, 10, 0, 2 * Math.PI)
    ctx.setFillStyle('#FFDE4E')
    ctx.fill()
    ctx.beginPath()
    ctx.arc((this.data.canvas_width / 2) - 10, h, 10, 0, 2 * Math.PI)
    ctx.setFillStyle('#FFDE4E')
    ctx.fill()
    //  绘制商家头像
    h += 52
    ctx.save()
    ctx.beginPath()
    ctx.arc(52, h, 32, 0, 2 * Math.PI)
    ctx.clip()
    ctx.drawImage(this.data.canvas_imgurl, 0, 0)
    ctx.restore()
    // 绘制商家名
    let sellername = '张三疯欧式'.substr(0, 10)
    ctx.setFontSize(14)
    ctx.setFillStyle('#333333')
    ctx.fillText(sellername, 102, h - 5)
    //  绘制商家地址
    let selleraddrs = '张三疯欧式张'.substr(0, 12)
    h += 20
    ctx.setFontSize(12)
    ctx.setFillStyle('#333333')
    ctx.fillText(selleraddrs, 102, h)
    ctx.draw()
  },
  //  获取系统信息
  getSystemInfoSync() {
    let info = wx.getSystemInfoSync()
    let width = info.screenWidth * 2 - 180
    let height = info.screenHeight * 2 - 360
    this.setData({
      canvas_width: width,
      canvas_height: height
    })
  },
  //  获取商品图片
  downlogo(url) {
    wx.downloadFile({
      url,
      success: res => {
        if (res.statusCode == 200) {
          this.setData({
            canvas_imgurl: res.tempFilePath
          })
          this.createCanvas()
        }
      }
    })
  },
  //   nav item click
  handleNavItemClick(e) {
    let idx = e.currentTarget.dataset.idx
    this.setData({
      navindex: idx
    })
  },
  //  右侧分享 首页
  handleNavigate() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      title: '帮我来砍价',
      path: `/pages/cutdetail/index?pid=${this.data.pid}`
    }
  }
})