// component/catcount/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count: {
            type: Number,
            value: 1
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
        calculate(e) {
            let c = e.currentTarget.dataset.mode
            let num = this.data.count
            switch(c) {
                case 'add':
                    ++num
                break;
                case 'minus':
                    num = num > 1 ? --num : 1
                break;
            }
            this.setData({
                count: num
            })
            this.triggerEvent('reduce', num)
        }
    }
})
