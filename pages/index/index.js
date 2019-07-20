import { shopget, indexNav, indexdiscount } from '../../utils/api.js'
import { promiseRequest } from '../../utils/util.js'
const app = getApp()

Page({
    data: {
        bannerCurrent: 0,
        pageIndex: 1,
        pageSize: 10,
        stationId: 1,
        typeId: 0,
        navList: null,
        station: null,
        swiperList: [
            {
                imgUrl: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg'
            },
            {
                imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2509469443,1652062333&fm=27&gp=0.jpg'
            }
        ],
        navDefList: [
            {
                imgUrl: '../../static/img/index_sys.png',
                txt: '扫一扫',
                id: 0
            }, {
                imgUrl: '../../static/img/index_yhtg.png',
                txt: '优惠团购',
                id: 1
            }, {
                imgUrl: '../../static/img/index_fjhq.png',
                txt: '附近好券',
                id: 2
            }, {
                imgUrl: '../../static/img/index_ms.png',
                txt: '秒杀',
                id: 3
            }, {
                imgUrl: '../../static/img/index_kj.png',
                txt: '砍价',
                id: 4
            }
        ],
        groupdata: null,
        cutdata: null,
        limitdata: null,
        recommendList: null
    },
    //  推荐商品
    getDiscount() {
        let data = {
            StationId: app.globalData.station.stationId
        }
        promiseRequest(indexdiscount, 'get', data).then(res => {
            console.log(res)
            if (res.data.code === 0) {
                this.setData({
                    groupdata: res.data.groupdata,
                    cutdata: res.data.cutdata,
                    limitdata: res.data.limitdata
                })
            }
        })
    },
    //  推荐商家
    getShop() {
        let location = wx.getStorageSync('location'),
            station = wx.getStorageSync('station')
        //  测试
        station.stationId = 1
        //  end
        let data = {
            pageIndex: this.data.pageIndex,
            pageSize: this.data.pageSize,
            typeId: this.data.typeId,
            stationId: station.stationId,
            x: location[0],
            y: location[1]
        }
        promiseRequest(shopget, 'get', data).then(res => {
            console.log(res)
            if (res.data.code == 0) {
                this.setData({
                    recommendList: res.data.data
                })
            }
        })
    },
    //  navList
    getindexNav() {
        promiseRequest(indexNav, 'get').then(res => {
            if (res.data.code == 0) {
                this.setData({
                    navList: res.data.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getindexNav()
        this.getShop()
        this.getDiscount()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        if (!this.data.station) {
            this.setData({
                station: app.globalData.station
            })
        }
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

    },
    
    bannerChange(e) {
        this.setData({
            bannerCurrent: e.detail.current
        })
    },
    navNavigate(e) {
        let i = e.currentTarget.dataset.id
        switch (i) {
            case 0:
                wx.scanCode({
                    onlyFromCamera: true,
                    scanType: 'qrCode',
                    success: () => {
                        console.log('done')
                    },
                    fail: () => {
                        console.log('err')
                    }
                })
                break;
            case 1:
                wx.navigateTo({
                    url: '../indexnavs/groupbuying/index',
                })
                break;
            case 2:
                wx.navigateTo({
                    url: '../indexnavs/ticket/index',
                })
                break;
            case 3:
                wx.navigateTo({
                    url: '../indexnavs/seckill/index'
                })
                break;
            case 4:
                wx.navigateTo({
                    url: '../indexnavs/askedprice/index'
                })
                break;
            case 15:
                wx.navigateTo({
                    url: '../indexnavs/shop/index',
                })
                break;
            default:
                wx.navigateTo({
                    url: '../indexnavs/fooddrink/index'
                })
                break;
        }
    },

    goodsItemClick() {
        wx.navigateTo({
            url: '../goodsdetail/index',
        })
    },

    locationClick() {
        wx.navigateTo({
            url: '../location/index',
        })
    },

    selectClick() {
        wx.navigateTo({
            url: '../index/select/index',
        })
    }
})