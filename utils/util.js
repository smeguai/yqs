const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
//  promise
function promiseRequest(url, method = 'post', data = {}) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data,
            method,
            header: {
                'Content-Type': 'application/json-patch+json',
            },
            success: (res) => {
                res.statusCode === 200 ? resolve(res) : reject(res.errMsg)
                // if (res.statusCode == 200) {
                //     resolve(res);
                // } else {
                //     reject(res.errMsg);
                // }
            },
            fail: (err) => {
                reject(err)
                console.log("failed")
            }
        })
    })
}

//  image upload
function upload(page, path, way, id) {
    console.log(path)
    wx.showToast({
        icon: "loading",
        title: "正在上传"
    });
    var test = [],
        that = this;
    for (var i = 0; i < path.length; i++) {
        wx.uploadFile({
            url: api.CancelImg,
            filePath: path[i],
            name: 'file',
            header: {
                "Content-Type": "multipart/form-data"
            },
            success: res => {
                test.push(res);
                wx.setStorageSync('cancelImg', test)
                console.log(test)
                if (res.statusCode != 200) {
                    wx.showModal({
                        title: '提示',
                        content: '上传失败',
                        showCancel: false
                    })
                    return;
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '上传成功',
                        showCancel: false
                    })
                }
            },
            fail: function(e) {
                console.log(e);
                wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                })
            },
            complete: function() {
                wx.hideToast(); //隐藏Toast
            }
        })
    }
}

module.exports = {
    formatTime: formatTime,
    promiseRequest
}