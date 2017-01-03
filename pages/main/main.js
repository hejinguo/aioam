var util = require('../../utils/util.js');

Page({
  data:{
    grids: [
      {title:'接口加载',image:'../../images/inter-load.png',url:'../inter/inter'},
      {title:'任务执行',image:'../../images/task-exec.png',url:'../task/task'},
      {title:'报表加载',image:'../../images/report-load.png',url:'../report/report'},
      {title:'自助服务',image:'../../images/service-search.png',url:'../self-service/self-service'},
      {title:'我的文件',image:'../../images/file-list.png',url:'../remote-file/remote-file'},
      {title:'主机监控',image:'../../images/host-monitor.png',url:'../base/more'},
      {title:'热门问题',image:'../../images/hot-question.png',url:'../base/more'},
      {title:'服务关怀',image:'../../images/service-audit.png',url:'../base/more'},
      {title:'联系方式',image:'../../images/relation-item.png',url:'../base/more'}
    ]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    var loginToken = wx.getStorageSync('LOGIN_TOKEN') || '';
    if (!loginToken) {
      wx.redirectTo({
        url: '../identity/identity'
      });
    }
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})