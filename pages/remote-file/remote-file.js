var util = require('../../utils/util.js');

Page({
  data: {
    rows: []
  },
  loadMore: function () {
    var that = this;
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画
    util.ajax("file/list", {}, function (data) {
      console.log(data);
      if (data.state) {
        that.setData({
          rows: data.info
        });
      }
    }, function () {

    }, function () {
      wx.hideNavigationBarLoading();//隐藏导航条加载动画
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {// 页面渲染完成
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
    var content = "";
    if (!e.currentTarget.dataset.directory) {
      content = "https://218.205.252.12:10029/aioam/file/get?name=" + e.currentTarget.dataset.name + "&loginToken=" + wx.getStorageSync('LOGIN_TOKEN');
    }
    this.setData({
      textarea: content
    });
  }
})