Component({
  /**
   * 组件的属性列表
   */
  properties: {
    strTime: {
      value: '',
      type: String,
      observer(value) {
        this.countDown()
      }
    },
    colorfff: {
      value: false,
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTime: 0,
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    countDown() {
      let endtime = this.data.strTime
      endtime= endtime.replace(/-/g,'/')
      let now = new Date().getTime()
      let end = new Date(endtime).getTime()
      let t = end - now
      if (t >= 0) {
        let d = Math.floor(t / 1000 / 60 / 60 / 24)
        let h = Math.floor(t / 1000 / 60 / 60 % 24)
        let m = Math.floor(t / 1000 / 60 % 60)
        let s = Math.floor(t / 1000 % 60)
        h = h < 10 ? "0" + h : h
        m = m < 10 ? "0" + m : m
        s = s < 10 ? "0" + s : s
        this.setData({
          d,
          h,
          m,
          s
        })
        this.timer = setTimeout(() => (this.countDown()), 1000)
      } else {
        this.triggerEvent('getCountStatus', false)
      }
    }
  },
  ready() {
    this.countDown()
  },
  pageLifetimes: {
    hide() {
      if (this.data.timer) {
        clearTimeout(this.data.timer)
      }
    }
  }
})