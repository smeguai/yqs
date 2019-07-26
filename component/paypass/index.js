// component/paypass/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
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

    /**
     * 组件的方法列表
     */
    methods: {
        password_done(e) {
            if (e.detail.value.length != 6) return
            this.setData({
                password_one: e.detail.value,
                password_oneShow: false,
                Value_tow: '',
            })
        },
        
        password_input(e) {
            var that = this;
            var inputValue = e.detail.value;
            that.setData({
                Value: inputValue
            })
        },

        passConfime() {
            this.setData({
                password_one: this.data.Value,
                password_oneShow: false,
                Value_tow: '',
            })
        },
        password_tow(e) {
            if (e.detail.value.length != 6) return
            var that = this;
            var valueTow = e.detail.value;
            that.setData({
                Value_tow: valueTow
            })
        },
        completeClick() {
            let that = this;
            if (that.data.password_one != that.data.Value_tow) {
                that.setData({
                    pass_none: true,
                    password_oneShow: true,
                    Value: '',
                })
            } else {

                wx.showToast({
                    title: '和和大傻逼',
                })
            }
        },

        Tap() {
            var that = this;
            that.setData({
                isFocus: true,
            })
        },

        getFocus() {
            this.setData({
                focus: !this.data.focus
            })
        },
    }
})
