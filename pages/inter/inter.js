var util = require('../../utils/util.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
var param_data={opTime:'20161226',pageNo:1,pageSize:10,total:10};//total需要大于0才能保证首次加载

Page({
  data:{
    tabs: ["已加载接口明细", "未加载接口明细"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    loadMoreFlag:'waitload'//waitload,loading,loaded
  },
  tabClick: function (e) {
      this.setData({
          sliderOffset: e.currentTarget.offsetLeft,
          activeIndex: e.currentTarget.id,
          rows:[]
      });
      param_data.pageNo=1;
      param_data.total=10;
      this.loadMore();
  },
  loadMore:function(){
    if(param_data.total > (param_data.pageNo-1)*param_data.pageSize){
      this.setData({
        loadMoreFlag:'loading'
      });
      var that = this;
      util.ajax(this.data.activeIndex == 0 ? "inter/getLoadded":"inter/getUnLoadded",param_data,function(data){
        console.log(data);
        if(data.state){
          var targetRows = that.data.rows || [];
          targetRows.push(...data.info.rows);
          that.setData({
            rows:targetRows,
            loadMoreFlag:data.info.total > 0 ? 'waitload' : 'loaded'
          });
          param_data.total=data.info.total;
          var hopeRows = param_data.pageNo++*param_data.pageSize;// param_data.pageNo++;
          hopeRows = hopeRows > param_data.total ? param_data.total : hopeRows;
          console.log('已加载'+hopeRows+'条,共计'+param_data.total+'条');
          // wx.showToast({
          //   title: '已加载'+hopeRows+'条,共计'+param_data.total+'条',
          //   icon: 'success',
          //   duration: 2000
          // });
        }
      });
    }else{
      this.setData({
        loadMoreFlag:'loaded'
      });
    }
  },
  bindScrollLower:function(){
    this.loadMore();
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log("inter onload");
    this.setData({
      sliderLeft:(app.globalData.systemInfo.windowWidth / this.data.tabs.length - sliderWidth) / 2,
      scrollViewHeight:app.globalData.systemInfo.windowHeight-50//其中50为tab的高度
    });
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