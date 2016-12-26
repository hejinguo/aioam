//app.js
App({
  onLaunch: function () {
    console.log('app onLaunch');
    var loginToken = wx.getStorageSync('LOGIN_TOKEN')||'';
    console.log("loginToken="+loginToken);
    if(loginToken){
      wx.redirectTo({
        url: 'pages/inter/inter'
      });
      // wx.navigateTo({
      //   url: 'pages/inter/inter'
      // });
      wx.clearStorageSync();
    }else{
      wx.setStorageSync('LOGIN_TOKEN', 'LOGIN_TOKEN');
    }
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
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
  globalData:{
    userInfo:null
  }
})
