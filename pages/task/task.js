var util = require('../../utils/util.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
var paramData = null;//列表分页组件参数

Page({
  data: {
    tabs: ["正在执行", "执行成功", "执行失败"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    loadMoreFlag: 'waitload'//waitload,loading,loaded
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      loadMoreFlag: 'waitload',
      rows: []
    });
    paramData.pageNo = 1;
    paramData.total = 10;
    this.loadMore();
  },
  loadMore: function () {
    if (paramData.total > (paramData.pageNo - 1) * paramData.pageSize && this.data.loadMoreFlag == 'waitload') {
      this.setData({
        loadMoreFlag: 'loading'
      });
      var that = this;
      util.ajax("task/getTask/" + (parseInt(this.data.activeIndex) + 2), paramData, function (data) {
        console.log(data);
        if (data.state) {
          paramData.total = data.info.total;
          var hopeRowNum = paramData.pageNo++ * paramData.pageSize;// paramData.pageNo++;
          hopeRowNum = hopeRowNum > paramData.total ? paramData.total : hopeRowNum;
          var targetRows = that.data.rows || [];
          targetRows.push(...data.info.rows);
          that.setData({
            rows: targetRows,
            loadMoreFlag: paramData.total > hopeRowNum ? 'waitload' : 'loaded'//paramData.total > 0 && 
          });
          console.log('已加载' + hopeRowNum + '条,共计' + paramData.total + '条');
        }
      });
    } else {
      this.setData({
        loadMoreFlag: 'loaded'
      });
    }
  },
  bindScrollLower: function () {
    this.loadMore();
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("report onload");
    this.setData({
      sliderLeft: (app.globalData.systemInfo.windowWidth / this.data.tabs.length - sliderWidth) / 2,
      scrollViewHeight: app.globalData.systemInfo.windowHeight - 50//其中50为tab的高度
    });
  },
  onReady: function () {
    // 页面渲染完成
    console.log("report onReady");
    paramData = { opTime: '20161227', pageNo: 1, pageSize: 10, total: 10 };//total需要大于0才能保证首次加载
    this.loadMore();
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  listItemClick: function (e) {
    console.log(e);
    var that = this;
    if (this.data.activeIndex > 0) {//当按住的不是正在执行的任务记录
      wx.showActionSheet({
        itemList: ['查看任务节点', '重新执行任务'],
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {//查看任务节点
              that.showTaskNode(e.currentTarget.dataset.taskSeqNo, e.currentTarget.dataset.taskName);
            }else if(res.tapIndex == 1){//重新执行任务
              that.reRunTask(e.currentTarget.dataset.taskCode, e.currentTarget.dataset.taskName);
            }
          }
        }
      });
    }else{
      this.showTaskNode(e.currentTarget.dataset.taskSeqNo, e.currentTarget.dataset.taskName);
    }
  },
  reRunTask: function (taskCode, taskName) {
    wx.showModal({
      content: "您确定要重新执行任务（" + taskName + "）吗?",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作');
        } else {
          console.log('用户点击辅助操作');
        }
      }
    });
  },
  showTaskNode: function(taskSeqNo, taskName){
    console.log('新窗口查看任务节点情况'+taskSeqNo+'  - '+taskName);
  }
})