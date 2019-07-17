// pages/index/select.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: [
            { name: '龙虾', }, { name: '烤肉', }, { name: '火锅', }, { name: '生鲜', }, { name: '生鲜', }, { name: '西餐', }, { name: '粤菜', },
        ],
        searchShow: false,
        shop_goods: [
            {
                img: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
                title: '牛魔黑砖巧克力水果美味夏日冰爽超级美味奶茶',
                text: '张三疯欧式奶茶铺',
                pay: '9.8',
                price: '19.8',
            },
            {
                img: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
                title: '牛魔黑砖巧克力水果美味夏日冰爽超级美味奶茶',
                text: '张三疯欧式奶茶铺',
                pay: '9.8',
                price: '19.8',
            },
            {
                img: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
                title: '牛魔黑砖巧克力水果美味夏日冰爽超级美味奶茶',
                text: '张三疯欧式奶茶铺',
                pay: '9.8',
                price: '19.8',
            }
        ],
        shop: [
            {
                img: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
                name: '青春泥炉烤肉',
                num: '500',
                text: '记忆中的原始泥炉烤肉',
            },
            {
                img: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
                name: '青春泥炉烤肉',
                num: '500',
                text: '',
            },
            {
                img: 'http://www.pptbz.com/pptpic/UploadFiles_6909/201203/2012031220134655.jpg',
                name: '青春泥炉烤肉',
                num: '500',
                text: '记忆中的原始泥炉烤肉',
            }
        ],
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