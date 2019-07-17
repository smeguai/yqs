// pages/user/record/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        nav: [
            { name: '已浏览商家' }, { name: '已浏览商品' }
        ],
        index: 0,
        navIndex: 0,
        content: [
            {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
                name: '安特鲁美味成真烘焙店',
                num: '1230',
                text: '长沙第一烘焙蛋糕店',
            },
            {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
                name: '安特鲁美味成真烘焙店',
                num: '0',
                text: '长沙第一烘焙蛋糕店',
            },
            {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
                name: '安特鲁美味成真烘焙店',
                num: '666',
                text: '长沙第一烘焙蛋糕店',
            }
        ],
        goods: [
            {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
                name: '牛魔黑砖巧克力水果美味夏日冰爽超级美味奶茶',
                text: '张三疯欧式奶茶铺',
                pay: '9.8',
                price: '19.8',
            },
            {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
                name: '牛魔黑砖巧克力水果美味夏日冰爽超级美味奶茶',
                text: '张三疯欧式奶茶铺',
                pay: '9.8',
                price: '19.8',
            },
            {
                img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2922170376,2371336021&fm=27&gp=0.jpg',
                name: '牛魔黑砖巧克力水果美味夏日冰爽超级美味奶茶',
                text: '张三疯欧式奶茶铺',
                pay: '9.8',
                price: '19.8',
            }
        ]
    },

    navClick(e) {
        this.setData({
            navIndex: e.currentTarget.dataset.index
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})