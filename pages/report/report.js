var util = require('../../utils/util.js');
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
var paramData = null;//列表分页组件参数

Page({
  data: {
    tabs: ["已生成报表明细", "未生成报表明细"],
    activeIndex: "0",
    sliderOffset: 0,
    sliderLeft: 0,
    successNum: 0,
    failureNum: 0,
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
      util.ajax(this.data.activeIndex == 0 ? "report/getCheck/1" : "report/getCheck/0", paramData, function (data) {
        console.log(data);
        if (data.state) {
          paramData.total = data.info.total;
          var hopeRowNum = paramData.pageNo++ * paramData.pageSize;// paramData.pageNo++;
          hopeRowNum = hopeRowNum > paramData.total ? paramData.total : hopeRowNum;
          var targetRows = that.data.rows || [];
          targetRows.push(...data.info.rows);
          that.setData({
            rows: targetRows,
            successNum: data.info.successNum,
            failureNum: data.info.failureNum,
            loadMoreFlag: paramData.total > hopeRowNum ? 'waitload' : 'loaded'//paramData.total > 0 && 
          });
          console.log('已加载' + hopeRowNum + '条,共计' + paramData.total + '条');
          // wx.showToast({
          //   title: '已加载'+hopeRowNum+'条,共计'+paramData.total+'条',
          //   icon: 'success',
          //   duration: 2000
          // });
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
  changeOpTime: function (event) {
    console.log(event);
    this.setData({
      "footerContent.opTimevalue": event.detail.value,
      "footerContent.opTimeShow": event.detail.value.replace(/-/g, "")
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log("report onload");
    this.setData({
      sliderLeft: (app.globalData.systemInfo.windowWidth / this.data.tabs.length - sliderWidth) / 2,
      scrollViewHeight: app.globalData.systemInfo.windowHeight - 50 - 19//其中50为tab的高度,19位账期选择控件高度
    });
  },
  onReady: function () {
    // 页面渲染完成
    console.log("report onReady");
    paramData = { opTime: util.getOpTime(null,''), pageNo: 1, pageSize: 10, total: 10 };//total需要大于0才能保证首次加载
    this.setData({
      footerContent: {
        opTimevalue: util.getOpTime(null, '-'),
        opTimeMax: util.getOpTime(null, '-'),
        opTimeShow: util.getOpTime(null, '')
      }
    });

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
  }
})