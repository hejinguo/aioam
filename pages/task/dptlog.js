Page({
  data: {
    dlogFile: ''
  },
  onLoad: function (options) {
    this.setData({// 页面初始化 options为页面跳转所带来的参数
      dlogFile: options.dlogFile,
      dlogFileContent: ''
    });
  },
  onReady: function () {
    // 页面渲染完成
    var that = this;
    wx.request({
      url: "http://218.205.252.12:10029/aioam/file/readDlog",
      method: 'POST',
      data: { name: this.data.dlogFile, loginToken: wx.getStorageSync('LOGIN_TOKEN') || '' },
      dataType: 'text',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        that.setData({
          dlogFileContent: res.data
        });
      },
      fail: function () {

      },
      complete: function () {

      }
    });
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})