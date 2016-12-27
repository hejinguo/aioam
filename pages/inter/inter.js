var util = require('../../utils/util.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var param_data={opTime:'20161226',pageNo:1,pageSize:10};
var app = getApp();

Page({
  data:{
    tabs: ["已加载接口明细", "未加载接口明细"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id
      });
      var that = this;
      util.ajax(this.data.activeIndex == 0 ? "inter/getLoadded":"inter/getUnLoadded",param_data,function(data){
        console.log(data);
        if(data.state){
          
          that.setData({
            rows:data.info.rows
          });

        }
      });

  },
  bindScrollLower:function(){
    
    console.log('11111111111111111');
    // that.setData({
    //   rows:data.info.rows
    // });

  },
  onLoad:function(options){
    console.log("inter onload");
    this.setData({
      sliderLeft:(app.globalData.systemInfo.windowWidth / this.data.tabs.length - sliderWidth) / 2,
      scrollViewHeight:app.globalData.systemInfo.windowHeight-50//其中50为tab的高度
    });
    // 页面初始化 options为页面跳转所带来的参数
    // var that = this;
    // wx.getSystemInfo({
    //   success: function(res) {
    //     that.setData({
    //       sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
    //       scrollViewHeight:res.windowHeight-50//其中50为tab的高度
    //     });
    //   }
    // });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    console.log(getCurrentPages());
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})