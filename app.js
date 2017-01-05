//app.js
App({
  onLaunch: function () {
    // 开发临时入口
    wx.setStorageSync('LOGIN_TOKEN', 'DC4840A8-5F05-464D-85E9-6584866C772C');

    var loginToken = wx.getStorageSync('LOGIN_TOKEN') || '';
    console.log('app onLaunch');
    console.log("loginToken=" + loginToken);
    if (loginToken) {
      wx.redirectTo({
        url: 'pages/main/main'
      });
      // wx.navigateTo({
      //   url: 'pages/inter/inter'
      // });
      //  wx.clearStorageSync();
    }
    var that=this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res;
      }
    });
  },
  getUserInfo: function (cb) {
    var that = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo);
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      });
    }
  },
  globalData: {
    userInfo: null,
    systemInfo: null
  }
})
