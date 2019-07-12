// component/popup/index.js
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
        animationData: null
    },

    /**
     * 组件的方法列表
     */
    methods: {
        createAnimation() {
            let animationData = wx.createAnimation({
                duration: 400
            })
            animationData.top(0).step()
            this.setData({
                animationData
            })
        }
    },

    ready() {
        this.createAnimation()
    }
    
})
