// pages/seckill/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navCurrent: 0,
        navList: [{id: 0, txt: '正在进行中'}, {id: 1, txt: '即将开始'}],
        list: [
            {
                sellerName: '张三疯欧式奶茶铺',
                tags: ['长沙市连锁', '第一奶茶店'],
                avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=400062461,2874561526&fm=27&gp=0.jpg',
                goodsname: '草莓+柠檬+百香果蜂蜜饮料超值...',
                subtitle: '周一至周六',
                activityTime: '2019/7/11',
                price: 9.8,
                oldprice: 19.8,
                dis: '500米'
            },
            {
                sellerName: '张三疯欧式奶茶铺',
                tags: ['长沙市连锁', '第一奶茶店'],
                avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=400062461,2874561526&fm=27&gp=0.jpg',
                goodsname: '草莓+柠檬+百香果蜂蜜饮料超值...',
                subtitle: '周一至周六',
                activityTime: '2019/7/12',
                price: 9.8,
                oldprice: 19.8,
                dis: '100米'
            },
            {
                sellerName: '张三疯欧式奶茶铺',
                tags: [],
                avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=400062461,2874561526&fm=27&gp=0.jpg',
                goodsname: '草莓+柠檬+百香果蜂蜜饮料超值...',
                subtitle: '周一至周六',
                activityTime: '2019/7/13',
                price: 19.8,
                oldprice: 49.8,
                dis: '20米'
            }
        ]
    },
    navClick(e) {
        this.setData({
            navCurrent: e.currentTarget.dataset.id
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