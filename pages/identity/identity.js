var util = require('../../utils/util.js');
var app = getApp();//获取应用实例
var intObj = {int:null,time:60};//倒计时对象

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
      },
      sendMarkText:'获取验证码'
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
    if(!intObj.int){//没有正在倒计时的过程时
      if(this.data.pageInfo.loginCode){
        var that = this;
        var thisTime = intObj.time;
        intObj.int = setInterval(function(){
          if(thisTime > 0){
            that.setData({
              sendMarkText:thisTime+'秒'
            });
            thisTime--;
          }else{
            clearInterval(intObj.int);
            intObj.int = null;
            that.setData({
              sendMarkText:'获取验证码'
            });
          }
        },1000);

        util.ajax('base/getMark',{loginCode:this.data.pageInfo.loginCode},function(data){
          if(data.state){
            wx.showModal({
              content: '验证码发送至'+data.info+',请查收.',
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
    }else{
      console.log('wait setinterval');
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