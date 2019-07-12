Page({

    /**
     * 页面的初始数据
     */
    data: {
        bannerCurrent: 0,
        swiperList: [{
                imgUrl: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg'
            },
            {
                imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2509469443,1652062333&fm=27&gp=0.jpg'
            }
        ],
        navList: {
            list0: [{
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
            }],
            list1: [{
                imgUrl: '../../static/img/index_yyt.png',
                txt: '电信营业厅',
                id: 5
            }, {
                imgUrl: '../../static/img/index_xxyl.png',
                txt: '休闲娱乐',
                id: 6
            }, {
                imgUrl: '../../static/img/index_sc.png',
                txt: '商超便利店',
                id: 7
            }, {
                imgUrl: '../../static/img/index_msyp.png',
                txt: '美食饮品',
                id: 8
            }, {
                imgUrl: '../../static/img/index_shfw.png',
                txt: '生活服务',
                id: 9
            }]
        },
        favorableList: [{
            imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
            mode: 1,
            title: '牛魔黑砖巧克力',
            subtitle: '张三疯欧式奶茶铺',
            newprice: 9.9,
            oldprice: 19.9
        }, {
            imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
            mode: 1,
            title: '特色咖喱蛋包饭',
            subtitle: '特色咖喱蛋包饭',
            newprice: 29.9,
            oldprice: 129.9
        }, {
            imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
            mode: 1,
            title: '三人火锅套餐超',
            subtitle: '三人火锅套餐超',
            newprice: 39.9,
            oldprice: 69.9
        }],
        recommendList: [{
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=27&gp=0.jpg',
                name: '张三疯欧式奶茶铺',
                tab: ['长沙连锁店', '第一奶茶店'],
                addr: '300米',
                grade: 4,
                leixing: '甜品饮品',
                rq: '566'
            },
            {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=27&gp=0.jpg',
                name: '张三疯欧式奶茶铺',
                tab: ['长沙连锁店', '第一奶茶店'],
                addr: '300米',
                grade: 4,
                leixing: '甜品饮品',
                rq: '566'
            },
            {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=27&gp=0.jpg',
                name: '张三疯欧式奶茶铺',
                tab: ['长沙连锁店', '第一奶茶店'],
                addr: '300米',
                grade: 4,
                leixing: '甜品饮品',
                rq: '566'
            }
        ]
    },
    bannerChange() {
        console.log(this.data.bannerCurrent)
        // this.setData({
        //     bannerIndex: 
        // })
    },
    navNavigate(e) {
        let i = e.currentTarget.dataset.id
        switch(i) {
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
            case 8:
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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