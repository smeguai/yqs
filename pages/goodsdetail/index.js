// pages/goodsdetail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        aslid_btn: [{ img: '../../static/img/goods_index.png', txt: '首页' }, { img: '../../static/img/goods_collect.png', txt: '收藏' }, { img: '../../static/img/goods_service.png', txt: '联系客服' }],
        bannerCurrent: 0,
        pays: [{ name: '张三', img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1290832790,1643168179&fm=27&gp=0.jpg' }, { name: '李四', img: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2961748425,612527933&fm=27&gp=0.jpg' }, { name: '王五', img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1290832790,1643168179&fm=27&gp=0.jpg' }],
        paysCurrent: 0,
        data: {
            sell: {
                name: '安特鲁美味成真烘焙店',
                addrs: '麓枫和苑小区8栋',
                time: '7: 00 - 22: 30',
                addrsdesc: '长沙市岳麓区麓枫和苑8栋',
                qa: ['秒杀商品不可使用优惠券', '秒杀价仅限活动期间，秒杀结束后恢复日常价'],
                avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2147421056,2180514384&fm=27&gp=0.jpg'
            },
            banner: [{
                    img: 'https://res.bestcake.com/images-2/classical-detail-new/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3-1.jpg?v=20170607',
                    count: 1987
                },
                {
                    img: 'https://res.bestcake.com/images-2/classical-detail-new/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3-2.jpg?v=20170607',
                    count: 32987
                },
                {
                    img: 'https://res.bestcake.com/images-2/classical-detail-new/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3-3.jpg?v=20170607',
                    count: 21987
                },
                {
                    img: 'https://res.bestcake.com/images-2/classical-detail-new/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B3-4.jpg?v=20170607',
                    count: 14987
                }
            ],
            price: 318.00,
            oldprice: 518.00,
            name: 'HO’K美味成真 | 超精致美味的蛋糕切件，三款任 选一，低至9.9元',
            subtxt: '闪电泡芙/红丝绒/杨枝甘露',
            friend: ['https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2147421056,2180514384&fm=27&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1290832790,1643168179&fm=27&gp=0.jpg', 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2961748425,612527933&fm=27&gp=0.jpg', 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=27&gp=0.jpg'],
            goodsdesc: ['https://res.bestcake.com/images-2/classical-detail-new/detail-img/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B31.jpg?v=20190128', 'https://res.bestcake.com/images-2/classical-detail-new/detail-img/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B32.jpg?v=20190128', 'https://res.bestcake.com/images-2/classical-detail-new/detail-img/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B33.jpg?v=20190128', 'https://res.bestcake.com/images-2/classical-detail-new/detail-img/%E6%9E%81%E5%9C%B0%E7%89%9B%E4%B9%B33.jpg?v=20190128']
        }
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
        this.paysCurrent()
    },
    paysCurrent() {
        let timer = null
        timer = setTimeout(() => {
            let len = this.data.pays.length - 1,
                index = this.data.paysCurrent
            this.setData({
                paysCurrent: index < len ? index + 1 : 0
            })
            this.paysCurrent()
        }, 4000)
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