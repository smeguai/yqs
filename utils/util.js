// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//  时间格式化 yyyy-mmmm-dddd hh:mm:ss
function formatTime(time, type = 0) {
  let date = new Date(time)
  let y = date.getFullYear()
  let m = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
  let d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate()
  let hh = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
  let mm = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
  let ss = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
  if (type == 0) {
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  } else if (type == 1) {
    return `${y}-${m}-${d}`
  }
}

//  promise
function promiseRequest(url, method = 'post', data = {}) {
  let header = {
    'Content-Type': 'application/json-patch+json',
    'Authorization': 'Bearer ' + wx.getStorageSync('userInfo').token
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      data,
      method,
      header,
      success: (res) => {
        res.statusCode === 200 ? resolve(res) : reject(res.errMsg)
      },
      fail: (err) => {
        reject(err)
        console.log("failed")
      },
      complete: () => {
        wx.stopPullDownRefresh()
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

//  处理小数精度
function formatNum (num) {
  return parseInt(num * 100) / 100
}

module.exports = {
  formatTime,
  formatNum,
  promiseRequest
}