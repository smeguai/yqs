// pages/coupon/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3393805308,1492477291&fm=27&gp=0.jpg',
            name: '张三疯欧式奶茶铺',
            grade: 5,
            genre: '甜品饮品',
            moods: 566,
            tag: ['长沙市连锁', '第一奶茶店'],
            activity: [{
                id: 0,
                txt: '12元优惠券满30元可用'
            }, {
                id: 1,
                txt: '2人团每人只需8.9元'
            }],
            goods: [{
                imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2961748425,612527933&fm=27&gp=0.jpg',
                price: 19,
                oldprice: 29
            }, {
                imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2961748425,612527933&fm=27&gp=0.jpg',
                price: 19,
                oldprice: 29
            }, {
                imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2961748425,612527933&fm=27&gp=0.jpg',
                price: 19,
                oldprice: 29
            }]
        }]
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