import {
  productdetail,
  groupbuydetail,
  cutdetail,
  limitdetail,
  sharegooddes,
  usercut,
  getcodeimg
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'
import {
  base64src
} from '../../utils/base64img.js'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loding: true,
    status: null,
    isproduct: true,
    productId: null,
    popupShow: false,
    startcutmode: false,
    cutprice: 0,
    aslid_btn: [{
      img: '../../static/img/goods_index.png',
      txt: '首页'
    }, {
      img: '../../static/img/goods_collect.png',
      txt: '分享'
    }, {
      img: '../../static/img/goods_service.png',
      txt: '联系商家'
    }],
    bannerCurrent: 0,
    pays: null,
    paysCurrent: 0,
    detail: null,
    pageIndex: 1,
    pageSize: 10,
    groupPrice: 0,
    groupAlonePrice: 0,
    popupId: null,
    grouppaystatus: false,
    itemDesc: null,
    groupBuyId: 0,
    tencentshow: false,
    videoShow: true, // 视频展示
    bannerIndex: 0, // banner 滑块下标
    edition: true,
    canvasShow: false,
    canvas_width: 0,
    canvas_height: 0,
    qaCodeImg: '',
    shareImg: null,
    writePhotosAlbum: true
  },
  //  关闭去参团
  handleCloseToGroup() {
    this.setData({
      grouppaystatus: false
    })
  },
  //  关闭去加群
  handleTencentClick() {
    this.setData({
      tencentshow: !this.data.tencentshow
    })
  },
  //  隐藏canvas
  handleCanvasToggle() {
    this.setData({
      canvasShow: false
    })
  },
  // 返回上一页
  backClick() {
    wx.navigateBack({
      delta: -1
    })
  },
  // 跳转到首页
  indexClick() {
    wx.reLaunch({
      url: '../index/index',
    })
  },

  // 播放视频
  videoPlayClick() {
    this.setData({
      videoShow: false,
    })
  },
  // 播放停止
  videoEndClick() {
    this.setData({
      videoShow: true,
    })
  },
  // banner 切换下标
  bannerClick(e) {
    this.setData({
      bannerIndex: e.detail.current,
    })
  },
  // banner 视频图片按钮
  bannerType(e) {
    if (e.currentTarget.dataset.idx == 0) {
      this.data.bannerIndex = 0;
    } else {
      this.data.bannerIndex = 1;
    }
    this.setData({
      bannerIndex: this.data.bannerIndex,
    })
  },

  //  进店逛逛
  handleToSeller(e) {
    let pid = e.currentTarget.dataset.pid
    let title = e.currentTarget.dataset.title
    wx.navigateTo({
      url: `../indexnavs/shop/index?pid=${pid}&title=${title}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getSystemInfo({
      success(res) {
        if (res.SDKVersion.split('.').join("") < '260') {
          that.data.edition = false;
        }
      }
    })
    let scene = null
    if (options.scene) {
      scene = decodeURIComponent(options.scene).split(',')
    }
    that.setData({
      edition: that.data.edition,
      status: scene && scene[0] || options.name,
      productId: scene && scene[1] || options.pid,
      groupBuyId: scene && scene[2] || options.groupBuyId
    })
    that.getDetails()
    that.getsharegooddes()
    //  获取二维码
    this.getCodeImg()
    //  画图
    this.getSystemInfoSync()
  },

  //  获取商品图片
  getImgUrl(url) {
    return new Promise((resolve, reject) => {
      wx.downloadFile({
        url,
        success: res => {
          if (res.statusCode == 200) {
            resolve(res.tempFilePath)
          }
        }
      })
    })
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
  //  参与拼团
  handleGroupPay(e) {
    let myuid = wx.getStorageSync('userInfo').uid
    if (myuid == e.currentTarget.dataset.uid) {
      wx.showToast({
        title: '不能参与自己的拼团',
        icon: 'none'
      })
    } else {
      this.setData({
        popupShow: true,
        grouppaystatus: false,
        popupId: this.data.productId,
        groupBuyId: e.currentTarget.dataset.groupbuyid,
        price: e.currentTarget.dataset.price
      })
    }
  },
  //  查看位置
  handleAddres(e) {
    wx.openLocation({
      latitude: parseFloat(e.currentTarget.dataset.x),
      longitude: parseFloat(e.currentTarget.dataset.y),
      name: e.currentTarget.dataset.merchantName,
      address: e.currentTarget.dataset.addr
    })
  },
  //  弹出参团层
  handleChangeGroupPay(e) {
    this.setData({
      groupPrice: this.data.detail.price,
      grouppaystatus: true,
      itemDesc: e.currentTarget.dataset.itemdesc
    })
  },
  //  查看订单
  getDetails() {
    let detail = null
    switch (this.data.status) {
      case 'group':
        promiseRequest(groupbuydetail, 'get', {
          Id: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            detail = res.data.data
            detail.x = parseFloat(detail.x)
            detail.y = parseFloat(detail.y)
            this.setData({
              detail,
              loding: false
            })
            wx.setNavigationBarTitle({
              title: detail.productName
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              success: () => {
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 0
                  })
                }, 1000)
              }
            })
          }
        })
        break;
      case 'limit':
        promiseRequest(limitdetail, 'get', {
          Id: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            detail = res.data.data
            this.setData({
              detail,
              loding: false
            })
            wx.setNavigationBarTitle({
              title: detail.productName
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              success: () => {
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 0
                  })
                }, 1000)
              }
            })
          }
        })
        break;
      case 'cut':
        promiseRequest(cutdetail, 'get', {
          Id: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            detail = res.data.data
            detail.cutList.map(item => {
              item.receiveTime = item.receiveTime.substr(0, 10)
            })
            wx.setNavigationBarTitle({
              title: detail.productName
            })
            this.setData({
              detail,
              loding: false
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              success: () => {
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 0
                  })
                }, 1000)
              }
            })
          }
        })
        break;
      case 'product':
        promiseRequest(productdetail, 'get', {
          productId: this.data.productId
        }).then(res => {
          if (res.data.code == 0) {
            detail = res.data.data
            this.setData({
              detail,
              isproduct: false,
              loding: false
            })
            wx.setNavigationBarTitle({
              title: detail.productName
            })
          } else {
            wx.showToast({
              title: res.data.msg,
              icon: 'none',
              success: () => {
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 0
                  })
                }, 1000)
              }
            })
          }
        })
        break;
    }
  },

  //  发起砍价
  handleStartCut() {
    let userinfo = wx.getStorageSync('userInfo')
    if (!userinfo) {
      wx.navigateTo({
        url: '../accredit/index',
      })
      return
    }
    wx.showLoading({
      title: '砍价中...',
    })
    promiseRequest(usercut, 'get', {
      productCutPriceId: this.data.productId
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          startcutmode: true,
          cutprice: res.data.data.hadCutPrice
        })
        setTimeout(() => {
          wx.redirectTo({
            url: `../cutdetail/index?pid=${res.data.data.cutPriceId}`
          })
        }, 1400)
      } else if (this.data.code == 401) {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
      }
    })
  },
  //  关闭发起砍价
  handleStartCutClose() {
    this.setData({
      startcutmode: false
    })
  },
  //  单独购买 重新获取普通商品详情
  handleGetGoodsDetail(e) {
    wx.redirectTo({
      url: `./index?name=product&pid=${e.currentTarget.dataset.orderid}`,
    })
  },
  //  分享过此商品的用户
  getsharegooddes() {
    promiseRequest(sharegooddes, 'get', {
      productId: this.data.productId,
      pageIndex: this.data.pageIndex,
      pageSize: this.data.pageSize
    }).then(res => {
      if (res.data.code == 0) {
        this.setData({
          pays: res.data.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.paysCurrent()
  },
  //  购买数
  paysCurrent() {
    let timer = setTimeout(() => {
      let len = this.data.pays.length - 1,
        index = this.data.paysCurrent
      if (index < len) {
        this.setData({
          paysCurrent: index + 1
        })
      } else {
        this.setData({
          pageIndex: this.data.pageIndex + 1
        })
      }
      if (this.data.pays.length != 0) {
        this.getsharegooddes()
      }
      this.paysCurrent()
    }, 4000)
  },
  popupStatus(e) {
    this.setData({
      popupShow: e.detail
    })
  },
  handleAslidBtnClick(e) {
    let i = e.currentTarget.dataset.index
    switch (i) {
      case 0:
        wx.switchTab({
          url: '../index/index'
        })
        break;
      case 1:
        this.setData({
          canvasShow: true
        })
        this.createCanvas()
        break;
      case 2:
        wx.makePhoneCall({
          phoneNumber: e.currentTarget.dataset.tel
        })
        break;
    }
  },
  //  发起订单
  handlePayClick(e) {
    let popupId = null
    switch (this.data.status) {
      case 'group':
        popupId = this.data.detail.productGroupBuyId
        break;
      case 'limit':
        popupId = this.data.detail.timeLimitBuyId
        break;
      case 'product':
        popupId = this.data.detail.productId
        break;
    }
    this.setData({
      popupShow: true,
      price: e.currentTarget.dataset.price,
      popupId
    })
  },
  onShareAppMessage: function(ops) {
    if (ops.from === 'button') {
      return {
        title: this.data.detail.productName,
        imageUrl: this.data.detail.imgList[0].fileUrl,
        path: `/pages/goodsdetail/index?name=${this.data.status}&pid=${this.data.productId}&groupBuyId=${this.data.groupBuyId || 0}`
      }
    }
  },
  //  拨打商家电话
  handleTelClick(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel
    })
  },
  //  获取分享二维码
  getCodeImg() {
    console.log(this.data.status + ',' + this.data.productId + ',' + (this.data.groupBuyId || 0))
    // 'name=' + this.data.status + '&pid=' + this.data.productId + '&groupById=' + (this.data.groupBuyId || 0),
    promiseRequest(getcodeimg, 'get', {
      source: 0,
      scene: this.data.status + ',' + this.data.productId + ',' + (this.data.groupBuyId || 0),
      page: 'pages/goodsdetail/index',
      width: 280
    }).then(res => {
      if (res.data.code == 0) {
        base64src('data:image/jpeg;base64,' + res.data.data, res => {
          this.setData({
            qaCodeImg: res
          })
        })
      }
    })
  },
  //  创建画布
  createCanvas() {
    wx.showLoading({
      title: '生成图片中...'
    })
    //  全部图片
    let detail = this.data.detail
    let goodsImgUrl = this.getImgUrl(detail.imgList[0].fileUrl)
    let headImgUrl = this.getImgUrl(detail.headImgUrl)
    let myavatar = wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo').headimg : detail.headImgUrl
    let myavatarUrl = this.getImgUrl(myavatar)
    let imgLs = null
    Promise.all([goodsImgUrl, headImgUrl, myavatarUrl]).then(res => {
      imgLs = res
      let h = 180
      const ctx = wx.createCanvasContext('sharecanvas')
      //  背景色
      ctx.rect(0, 0, this.data.canvas_width / 2, this.data.canvas_height / 2 - 86)
      ctx.setFillStyle('#FFDE4E')
      ctx.fill()
      ctx.drawImage(imgLs[0], 10, 40, (this.data.canvas_width / 2) - 20, h)
      //  商品名
      ctx.setFontSize(16)
      ctx.setFillStyle('#fff')
      ctx.fillRect(10, h, (this.data.canvas_width / 2) - 20, 210)
      h += 10
      ctx.setFillStyle('#333333')
      let goodsname = detail.productName.substr(0, 30)
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
      let price = detail.price + ''
      ctx.fillText('￥' + price, 18, h)
      let tableft = price.length * 10
      ctx.setFillStyle('#FFDE4E')
      ctx.fillRect(80 + tableft, h - 17, 38, 18)
      ctx.setFillStyle('#333333')
      ctx.setFontSize(10)
      ctx.fillText('抢购价', 84 + tableft, h - 4)
      h += 20
      ctx.setFillStyle('#999999')
      ctx.setFontSize(12)
      ctx.fillText('原价￥' + detail.tagPrice, 20, h)
      ctx.setFillStyle('#333')
      ctx.fillText(detail.virtualSoldNum + '人已购买', (this.data.canvas_width / 2) - 98, h)
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
      h = name < 15 ? h + 42 : h + 32
      ctx.save()
      ctx.beginPath()
      ctx.arc(52, h, 22, 0, 2 * Math.PI)
      ctx.clip()
      ctx.drawImage(imgLs[1], 30, h - 22, 44, 44)
      ctx.restore()
      // 绘制商家名
      let sellername = detail.merchantName.substr(0, 10)
      ctx.setFontSize(14)
      ctx.setFillStyle('#333333')
      ctx.fillText(sellername, 102, h - 5)
      //  绘制商家地址
      let selleraddrs = detail.addr.substr(0, 12)
      h += 20
      ctx.setFontSize(12)
      ctx.setFillStyle('#333333')
      ctx.fillText(selleraddrs, 102, h)
      //  底部背景色
      ctx.save()
      ctx.beginPath()
      ctx.rect(0, (this.data.canvas_height / 2) - 86, this.data.canvas_width / 2, this.data.canvas_height / 2)
      ctx.setFillStyle('#fff')
      ctx.fill()
      ctx.restore()
      //  绘制用户头像
      h = this.data.canvas_height / 2 - 50
      ctx.save()
      ctx.beginPath()
      ctx.arc(35, h, 30, 0, 2 * Math.PI)
      ctx.clip()
      ctx.drawImage(imgLs[2], 5, h - 30, 60, 60)
      ctx.restore()
      //  绘制二维码
      ctx.drawImage(this.data.qaCodeImg, 201, h - 33, 81, 80)
      //  昵称
      h -= 16
      let userinfo = wx.getStorageSync('userInfo')
      let nickname = userinfo && userinfo.nickname.substr(0, 9) || detail.merchantName
      ctx.setFontSize(14)
      ctx.setFillStyle('#FF6600')
      ctx.fillText(nickname, 72, h)
      h += 20
      let tipstxt1 = '我发现这东西不错呢！'
      ctx.setFontSize(12)
      ctx.setFillStyle('#333333')
      ctx.fillText(tipstxt1, 72, h)
      h += 12
      let tipstxt2 = ' 向您推荐~'
      ctx.setFontSize(12)
      ctx.setFillStyle('#333333')
      ctx.fillText(tipstxt2, 72, h)
      ctx.save()
      ctx.beginPath()
      ctx.rect(72, h + 8, 120, 20)
      ctx.setFillStyle('#FFDE4E')
      ctx.fill()
      ctx.restore()
      h += 24
      let tipstxt3 = ' 长按立即购买>>'
      ctx.setFontSize(14)
      ctx.setFillStyle('#333333')
      ctx.fillText(tipstxt3, 72, h)
      ctx.drawImage('../../static/img/logo1.png', (this.data.canvas_width / 4) - 32, 10, 64, 22)
      ctx.draw()

      //canvas画图需要时间而且还是异步的，所以加了个定时器
      setTimeout(() => {
        // 将生成的canvas图片，转为真实图片
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          canvasId: 'sharecanvas',
          width: 375,
          height: 667,
          destWidth: 750,
          destHeight: 1334,
          success: (res) => {
            let shareImg = res.tempFilePath;
            this.setData({
              shareImg: shareImg,
              showModal: true,
              showShareModal: false
            })
            wx.hideLoading()
          }
        })
      }, 1000)
    })
  },
  //  保存海报
  handleSaveCanvas() {
    //  canvas没生成完，  return 出去
    if (!this.data.shareImg) return

    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success: (res) => {
              this._saveCanvas()
            },
            fail: () => {
              wx.showModal({
                content: '保存海报需要使用到相册权限，是否打开此授权？',
                success: res => {
                  if (res.confirm) {
                    wx.openSetting({
                      success: res => {
                        if (res.authSetting['scope.writePhotosAlbum']) {
                          this._saveCanvas()
                        }
                      }
                    })
                  }
                }
              })
            }
          })
        } else {
          this._saveCanvas()
        }
      }
    })
  },
  _saveCanvas() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImg,
      success: () => {
        wx.showToast({
          title: '保存成功'
        })
      },
      fail: (err) => {
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      },
      complete: () => {
        this.setData({
          canvasShow: false
        })
      }
    })
  }
})