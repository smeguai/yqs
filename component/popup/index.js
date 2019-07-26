Component({
    /**
     * 组件的属性列表
     */
    properties: {
        skulist: Array
    },
    data: {
        animationData: null,
        sellout: false,
        tagCurr: 0,
        detail: null,
        count: 1
    },
    methods: {
        reduceCount(e) {
            this.setData({
                count: e.detail
            })
        },
        createAnimation() {
            let animationData = wx.createAnimation({
                duration: 300
            })
            animationData.top(0).step()
            this.setData({
                animationData
            })
        },
        handleTagItemClick(e) {
            let idx = e.currentTarget.dataset.curr
            this.setData({
                tagCurr: idx,
                detail: this.data.skulist[idx]
            })
        },
        closepopup() {
            this.triggerEvent('myPopupClose', false)
        },
        handleOrderSubmit() {
            wx.navigateTo({
                url: `../../pages/pay/index?productid=${this.data.detail.productId}&count=${this.data.count}&skuid=${this.data.detail.productSKUId}`,
            })
        }
    },
    ready() {
        this.createAnimation()
        this.setData({
            detail: this.data.skulist[0]
        })
    }
})