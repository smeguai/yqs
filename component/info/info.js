// component/info/info.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: Array,
            value: [],
        }
    },
 
    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
      handleItemClick(e) {
        let pid = e.currentTarget.dataset.id
        let title = e.currentTarget.dataset.title
        wx.navigateTo({
          url: `../../indexnavs/shop/index?pid=${pid}&title=${title}`
        })
      }
    }
})
