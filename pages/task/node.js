var util = require('../../utils/util.js');
var paramData = null;//列表分页组件参数

Page({
  data: {
    loadMoreFlag: 'waitload'//waitload,loading,loaded
  },
  loadMore: function () {
    if (paramData.total > (paramData.pageNo - 1) * paramData.pageSize && this.data.loadMoreFlag == 'waitload') {
      this.setData({
        loadMoreFlag: 'loading'
      });
      var that = this;
      util.ajax("task/getNode", paramData, function (data) {
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
    console.log("node onload");
    this.setData({// 页面初始化 options为页面跳转所带来的参数
      taskSeqNo: options.taskSeqNo,
      taskName: options.taskName
    });
  },
  onReady: function () {// 页面渲染完成
    wx.setNavigationBarTitle({
      title: this.data.taskName
    });
    paramData = { opTime: '20161228', taskSeqNo: this.data.taskSeqNo, pageNo: 1, pageSize: 10, total: 10 };//total需要大于0才能保证首次加载
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
    if (e.currentTarget.dataset.procName) {
      var that = this;
      wx.showActionSheet({
        itemList: ['查看程序步骤', 'DPT程序日志'],
        success: function (res) {
          if (!res.cancel) {
            if (res.tapIndex == 0) {//查看程序步骤
              that.showNodeStep(e.currentTarget.dataset.procName);
            } else if (res.tapIndex == 1) {//DPT程序日志
              that.showDptLog(e.currentTarget.dataset.procName+'_'+e.currentTarget.dataset.dlogPath+'.log');
            }
          }
        }
      });
    } else {
      wx.showModal({
        content: "不是DPT程序节点,无法查看步骤.",
        showCancel: false
      });
    }
  },
  showNodeStep: function (procName) {
    console.log(procName);
  },
  showDptLog: function (dlogFile) {
    console.log(dlogFile);
  }
})