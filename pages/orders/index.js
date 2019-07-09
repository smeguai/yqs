// pages/orders/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navList: [{ txt: '全部', id: 0 }, { txt: '待付款', id: 1 }, { txt: '待使用', id: 2 }, { txt: '待收货', id: 3 }, { txt: '待评价', id: 4 }],
        navIdx: 0,
        navMode: ['待付款', '待使用', '待收货', '待评价', '已退款', '交易已取消', '已完成'],
        list: [
            { avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2665752539,2910740997&fm=26&gp=0.jpg', name: '张三疯欧式奶茶铺', cate: 0, imgUrl: 'http://img1.imgtn.bdimg.com/it/u=1237195301,387810032&fm=26&gp=0.jpg', title: '草莓+柠檬+百香果蜂蜜饮料夏季冰镇爽口超值特惠套餐', subtitle: '百香果口味、大杯', price: 8.9, oldprice: 19.8, pay: 8.9, count: 1},
            { avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3732245517,636661403&fm=26&gp=0.jpg', name: '张三疯欧式奶茶铺', cate: 1, imgUrl: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3423937357,3631807604&fm=26&gp=0.jpg', title: '草莓+柠檬+百香果蜂蜜饮料夏季冰镇爽口超值特惠套餐百香果蜂蜜饮料夏季冰镇爽口超值特惠套餐', subtitle: '百香果口味、大杯', price: 8.9, oldprice: 19.8, pay: 8.9, count: 1 },
            { avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3732245517,636661403&fm=26&gp=0.jpg', name: '张三疯欧式奶茶铺', cate: 2, imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=829044612,3699393036&fm=26&gp=0.jpg', title: '草莓+柠檬+百香果蜂蜜饮料夏季冰镇爽口超值特惠套餐', subtitle: '百香果口味、大杯', price: 8.9, oldprice: 19.8, pay: 8.9, count: 1 },
            { avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2665752539,2910740997&fm=26&gp=0.jpg', name: '张三疯欧式奶茶铺', cate: 3, imgUrl: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2961748425,612527933&fm=26&gp=0.jpg', title: '草莓+柠檬+百香果蜂蜜饮料夏季冰镇爽口超值特惠套餐', subtitle: '百香果口味、大杯', price: 8.9, oldprice: 19.8, pay: 8.9, count: 1 },
            { avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2665752539,2910740997&fm=26&gp=0.jpg', name: '张三疯欧式奶茶铺', cate: 4, imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=531931942,3490712849&fm=26&gp=0.jpg', title: '草莓+柠檬+百香果蜂蜜饮料夏季冰镇爽口超值特惠套餐', subtitle: '百香果口味、大杯', price: 8.9, oldprice: 19.8, pay: 8.9, count: 1 },
            { avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2665752539,2910740997&fm=26&gp=0.jpg', name: '张三疯欧式奶茶铺', cate: 5, imgUrl: 'http://img1.imgtn.bdimg.com/it/u=1237195301,387810032&fm=26&gp=0.jpg', title: '草莓+柠檬+百香果蜂蜜饮料夏季冰镇爽口超值特惠套餐', subtitle: '百香果口味、大杯', price: 8.9, oldprice: 19.8, pay: 8.9, count: 1 },
            { avatar: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2665752539,2910740997&fm=26&gp=0.jpg', name: '张三疯欧式奶茶铺', cate: 6, imgUrl: 'http://img1.imgtn.bdimg.com/it/u=1237195301,387810032&fm=26&gp=0.jpg', title: '草莓+柠檬+百香果蜂蜜饮料夏季冰镇爽口超值特惠套餐', subtitle: '百香果口味、大杯', price: 8.9, oldprice: 19.8, pay: 8.9, count: 1 }
        ]
    },
    navItemClick(e) {
        this.setData({
            navIdx: e.currentTarget.dataset.id
        })
    },
    checkOrderDesc() {
        wx.navigateTo({
            url: '../orderdetail/index',
        })
    },
    cancelOrder() {
        wx.showModal({
            title: '提示',
            content: '是否要取消当前订单？（确认后无法撤回）',
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