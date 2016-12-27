var util = require('../../utils/util.js');
//获取应用实例
var app = getApp();
Page({
  data:{
      topTips:{
        showTopTips:false,
        topTipsText:'错误提示'
      },
      userInfo:{},//微信用户信息
      pageInfo:{
        loginCode:'',
        loginPassword:'',
        lastLoginMark:''
      }
  },
  bindLoginCodeInput:function(e){
    this.setData({
      "pageInfo.loginCode":e.detail.value
    });
  },
  bindPasswordInput:function(e){
    this.setData({
      "pageInfo.loginPassword":e.detail.value
    });
  },
  bindLoginMarkInput:function(e){
    this.setData({
      "pageInfo.lastLoginMark":e.detail.value
    });
  },
  bindSendMarkTap: function(){
    if(this.data.pageInfo.loginCode){
      util.ajax('base/getMark',{loginCode:this.data.pageInfo.loginCode},function(data){
        if(data.state){
          wx.showModal({
            content: '验证码发送至'+data.info+',请查收.',
            showCancel: false
          });
        }else{
          wx.showModal({
            content: '错误代码:'+data.code,
            showCancel: false
          });
        }
      });
    }else{
      var that = this;
      this.setData({
        topTips:{
          showTopTips: true,
          topTipsText:'您没有填写工号信息'
        }
      });
      setTimeout(function(){
          that.setData({
            topTips:{
              showTopTips: false
            }
          });
      }, 3000);
    }
  },
  bindLoginAccountTap: function() {
    console.log(this.data.pageInfo);
    if(this.data.pageInfo.loginCode && this.data.pageInfo.loginPassword && this.data.pageInfo.lastLoginMark){
      util.ajax('base/login',this.data.pageInfo,function(data){
        if(data.state){
          // id:43113
          // loginCode:"ai_hejinguo"
          // loginToken:"A3BEBF8E-B94E-459A-8D88-CE06092168AC"
          wx.setStorageSync('LOGIN_TOKEN', data.info.loginToken);
          wx.redirectTo({
              url: '../main/main'
          });
        }else{
          wx.showModal({
            content: '错误代码:'+data.code,
            showCancel: false
          });
        }
      });
    }else{
      var that = this;
      this.setData({
        topTips:{
          showTopTips: true,
          topTipsText:'您没有填写完整全部信息'
        }
      });
      setTimeout(function(){
          that.setData({
            topTips:{
              showTopTips: false
            }
          });
      }, 3000);
    }
  },
  onLoad:function(options){
    console.log("identity onLoad");
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
  	//调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})