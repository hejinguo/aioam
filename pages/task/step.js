var util = require('../../utils/util.js');
var paramData = null;//列表分页组件参数

Page({
  data:{
    loadMoreFlag: 'waitload'//waitload,loading,loaded
  },
  loadMore: function () {
    if (paramData.total > (paramData.pageNo - 1) * paramData.pageSize && this.data.loadMoreFlag == 'waitload') {
      this.setData({
        loadMoreFlag: 'loading'
      });
      var that = this;
      util.ajax("task/getStep", paramData, function (data) {
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
  onLoad:function(options){
    console.log("setp onload");
    this.setData({// 页面初始化 options为页面跳转所带来的参数
      opTime: options.opTime,
      procName: options.procName
    });
  },
  onReady:function(){// 页面渲染完成
    wx.setNavigationBarTitle({
      title: this.data.procName
    });
    paramData = { opTime: this.data.opTime, procName: this.data.procName, pageNo: 1, pageSize: 10, total: 10 };//total需要大于0才能保证首次加载
    this.loadMore();
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