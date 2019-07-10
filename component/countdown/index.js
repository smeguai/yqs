// component/countdown/index.js
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
        currentTime: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    ready() {
        this.setData({
            currentTime: new Date().getTime()
        })
        let endTime = new Date('2019-07-11 11:53:44').getTime()
        let newTime = new Date().getTime()
        if (endTime > newTime) {
            let time = (endTime - newTime) / 1000
            let house = parseInt(time % (60 * 60 * 24) / 3600)
            console.log(time, 60 * 60 * 24)
        }
    }
})