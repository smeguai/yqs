// pages/user/alterMobile/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        mobile: '',
        code: false,
        code_num: '',
        confirm: false,
    },

    newMobile(e) {
        this.setData({
            mobile: e.detail.value
        })
        this.data.mobile == '' ? this.setData({ code: false }) : this.setData({ code: true })
    },

    mobileCode(e) {
        if(this.data.mobile == '') {
            this.setData({ code_num: '' })
            wx.showToast({
                title: '新号码不能为空',
                icon: 'none',
            })
            return;
        }
        this.setData({
            code_num: e.detail.value
        })
        this.data.code_num == '' ? this.setData({ confirm: false }) : this.setData({ confirm: true })
    },

    /* 生命周期函数--监听页面加载 */
    onLoad: function (options) {},

    /* 生命周期函数--监听页面初次渲染完成 */
    onReady: function () {},

    /* 生命周期函数--监听页面显示 */
    onShow: function () {},

    /* 生命周期函数--监听页面隐藏 */
    onHide: function () {},

    /* 生命周期函数--监听页面卸载 */
    onUnload: function () {},

    /* 页面相关事件处理函数--监听用户下拉动作 */
    onPullDownRefresh: function () {},

    /* 页面上拉触底事件的处理函数 */
    onReachBottom: function () {},

    /* 用户点击右上角分享 */
    onShareAppMessage: function () {}
})