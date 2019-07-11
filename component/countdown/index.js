// component/countdown/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        strTime: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTime: 0,
        h: 0,
        m: 0,
        s: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        countDown() {
            let date = new Date()
            let now = date.getTime()

            let str = this.data.strTime
            let end = new Date(str).getTime()

            let t = end - now
            if (t >= 0) {
                let d = Math.floor(t / 1000 / 60 / 60 / 24),
                    h = d * 24 + Math.floor(t / 1000 / 60 / 60 % 24),
                    m = Math.floor(t / 1000 / 60 % 60),
                    s = Math.floor(t / 1000 % 60)
                h = h < 10 ? "0" + h : h
                m = m < 10 ? "0" + m : m
                s = s < 10 ? "0" + s : s
                this.setData({
                    h,
                    m,
                    s
                })
                setTimeout(() => (this.countDown()), 1000)
            }
        }
    },
    ready() {
        this.countDown()
    }
})