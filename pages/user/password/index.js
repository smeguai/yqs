// pages/user/password/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        password_num: '',
        newPassword_num: '',
        code: false,
        code_num: '',
        confirm: false, 
    },

    Password(e) {
        this.setData({
            password_num: e.detail.value,
        })
        this.data.password_num == '' || this.data.newPassword_num == '' ? this.setData({ code: false }) : this.setData({ code: true })
    },
    newPassword(e) {
        if (this.data.password_num.length < 6 ) {
            this.setData({newPassword_num: '',})
            wx.showToast({
                title: '密码长度不能小于6位数',
                icon: 'none',
            })
            return;
        }
        this.setData({newPassword_num: e.detail.value,})
        this.data.newPassword_num == '' || this.data.password_num == '' ? this.setData({ code: false }) : this.setData({ code: true })
    },

    code(e) {
        if(this.data.newPassword_num == '' || this.data.password_num == '') {
            this.setData({code_num: '',})
            wx.showToast({
                title: '密码不能为空',
                icon: 'none',
            })
            return;
        }
        if (this.data.newPassword_num != this.data.password_num) {
            this.setData({ code_num: '', })
            wx.showToast({
                title: '请输入相同密码',
                icon: 'none',
            })
            return;
        }
        this.setData({
            code_num: e.detail.value,
        })
        this.data.code_num == '' ? this.setData({ confirm: false }) : this.setData({ confirm: true })
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