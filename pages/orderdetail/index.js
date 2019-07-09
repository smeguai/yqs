// pages/orderdetail/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        listTotal: 0,
        orderDesc: {
            avatar: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3361934473,3725527506&fm=27&gp=0.jpg',
            seller: '张三疯欧式奶茶铺',
            sellers: '李三',
            sellerTel: '15896456256',
            sellerAddrs: '长沙市岳麓区麓枫和苑8栋136号',
            orderCreate: '2019-07-04 15:48:36',
            orderNo: '20190706156246',
            vendee: {
                name: '李小生',
                tel: '15264865565',
                remake: '先打包，晚点过去拿'
            },
            list: [
                { title: 'HO’K美味成真 | 阿达克维奇而艰苦的撒旦就是康拉德...', subtitle: '红丝绒', price: 18, oldprice: 28, count: 1, pay: 18, imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3361934473,3725527506&fm=27&gp=0.jpg'}
            ]
        }
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