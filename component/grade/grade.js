// component/grade/grade.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        score: {
            value: 0,
            type: String
        },
      itemClass: {
        value: 'itemmid',
        type: String
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
        itemNum: 5
    },

    /**
     * 组件的方法列表
     */
    methods: {
      handleItemClick(e) {
        if (this.data.itemClass == 'itembig') {
          let idx = e.currentTarget.dataset.idx
          this.setData({
            score: idx + 1
          })
          this.triggerEvent('score', idx + 1)
        }
      }
    }
})
