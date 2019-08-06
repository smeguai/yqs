// component/dis/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    num: {
      value: 0,
      type: Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setDis() {
      this.setData({
        content: this.data.num >= 1000 ? parseInt(this.data.num / 100) / 10 + '公里' : parseInt(this.data.num) + '米'
      })
    }
  },
  ready() {
    this.setDis()
  }
})
