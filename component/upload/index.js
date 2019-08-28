import {
  getsigna
} from '../../utils/api.js'
import {
  promiseRequest
} from '../../utils/util.js'

var app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    uptype: {
      type: Number,
      value: 4,
    },
    img: {
      type: Array,
      value: [],
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    img: [],
    img2: [],
    uptype: 4,
    imgLength: true,
  },

  lifetimes: {
    attached: function() {

    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 添加照片
    addphoto() {
      wx.chooseImage({
        count: 6, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          let that = this,
            userInfo = app.globalData.userInfo,
            tempFilePaths = res.tempFilePaths,
            data = {
              uptype: that.data.uptype
            }
          for (var i = 0; i < tempFilePaths.length; i++) {
            let img = tempFilePaths[i];
            promiseRequest(getsigna, 'get', data).then(res => {
              // 获取文件后缀
              var pathArr = img.split('.');
              //  随机生成文件名称
              var fileRandName = Date.now() + "" + parseInt(Math.random() * 1000);
              var fileName = fileRandName + '.' + pathArr[3];
              // // 要提交的key
              var fileKey = res.data.data.fileurl + '/' + fileName;
              // that.setData({
              //   img: that.data.img.concat(img),
              //   img2: that.data.img2.concat('http://img.bnbn99.com/' + fileKey)
              // })
              wx.uploadFile({
                url: res.data.data.host,
                filePath: img,
                name: 'file',
                formData: {
                  name: tempFilePaths[i],
                  key: fileKey,
                  policy: res.data.data.policy,
                  OSSAccessKeyId: res.data.data.accessid,
                  signature: res.data.data.signature,
                  success_action_status: "200"
                },
                success: function(res) {
                  that.setData({
                    img: [...that.data.img, img],
                    img2: [...that.data.img2, 'http://img.bnbn99.com/' + fileKey]
                  })
                  let imaData = {
                    img1: that.data.img,
                    img2: that.data.img2
                  }
                  that.triggerEvent('addphoto', imaData);
                },
              })
            })
          }
        }
      });
    },
    // 删除图片
    del(e) {
      wx.showModal({
        title: '提示',
        content: '是否删除该照片？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            let img = this.data.img;
            let img2 = this.data.img2;
            img.splice(e.currentTarget.dataset.index, 1)
            img2.splice(e.currentTarget.dataset.index, 1)
            this.setData({
              img,
              img2
            })
            let imaData = {
              img: this.data.img,
              img2: this.data.img2
            }
            this.triggerEvent('delImg', imaData)
          }
        }
      })
    },
  }
})