// pages/payPassword/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        focus: false,
        Length: 6,        //输入框个数  
        isFocus: true,    //聚焦  
        Value: "",        //输入的内容  
        ispassword: false, //是否密文显示 true为密文， false为明文。

        password_one: '',
        password_oneShow: true,
        Value_tow: "",
        pass_none: false,
    },

    password_done(e) {
        this.setData({
            password_one: e.detail.value,
            password_oneShow: false,
            Value_tow: '',
        })
    },

    password_input: function (e) {
        var that = this;
        var inputValue = e.detail.value;
        that.setData({
            Value: inputValue
        })
    },

    password_tow(e) {
        var that = this;
        var valueTow = e.detail.value;
        that.setData({
            Value_tow: valueTow
        })
    },
    completeClick() {
        let that = this;
        if(that.data.password_one != that.data.Value_tow) {
            that.setData({
                pass_none: true,
                password_oneShow: true,
                Value: '',
            })
        }
    },

    Tap() {
        var that = this;
        that.setData({
            isFocus: true,
        })
    },

    getFocus: function () {
        this.setData({
            focus: !this.data.focus
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