function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取默认要加载的opTime
 * date,-,:
 */
function getOpTime() {
	console.log("arguments.length="+arguments.length);
	var date = new Date((new Date() / 1000 - 86400) * 1000);//86400为1天的秒数;
	if(arguments.length > 0 && arguments[0]){
		date = arguments[0];
	}
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds();
	if(arguments.length == 3){
		return [year, month, day].map(formatNumber).join(arguments[1]) + ' ' + [hour, minute, second].map(formatNumber).join(arguments[2]);
	}else if(arguments.length == 2){
		return [year, month, day].map(formatNumber).join(arguments[1]);
	}else{
		return [year, month, day].map(formatNumber).join('-');
	}
	// var date = date ? date : new Date((new Date() / 1000 - 86400) * 1000);//86400为1天的秒数
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
	return year + ((month > 9 ? '' : '0') + month) + ((day > 9 ? '' : '0') + day);
}

/**
 * Ajax请求封装
 */
function ajax(url, params, onSuccess, onError, onComplete) {
	var onSuccess = arguments[2] ? arguments[2] : function () { };//成功时
	var onError = arguments[3] ? arguments[3] : function () { };//异常时
	var onComplete = arguments[4] ? arguments[4] : function () { };//完成时
	var AI_APP_PATH = "http://218.205.252.12:10029/aioam/";//办公网环境
	// var AI_APP_PATH = "http://localhost:8080/aioam/";
	params.loginToken = wx.getStorageSync('LOGIN_TOKEN') || '';
	if (url.indexOf('http://') < 0) {
		url = AI_APP_PATH + url;
	}
	console.log(params);
	wx.request({
		url: url,
		method: 'POST',
		data: params,
		header: {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		success: function (res) {
			console.log(res.data)
			if (!res.data.state && res.data.code == "JAVA_EXCEPTION") {
				console.log('服务端请求处理发生问题,请联系系统管理员.');
			} else if (!res.data.state && res.data.code == "NOT_LOGINED") {
				console.log('您尚未登陆或账号在其他终端上登陆导致本设备踢出.');
				wx.clearStorageSync();
				wx.navigateBack(getCurrentPages().length + 100);//返回首页
			} else if (!res.data.state && res.data.code == "CHARACTER_WRONGFUL") {
				console.log('您提交的数据中含有非法字符,请调整后继续.');
			} else if (!res.data.state) {
				wx.showModal({
					content: '错误代码:' + res.data.code,
					showCancel: false
				});
			} else {
				onSuccess(res.data);
			}
		},
		fail: function () {
			onError();
		},
		complete: function () {
			onComplete();
		}
	});
};


module.exports = {
	// formatTime: formatTime,
	ajax: ajax,
	getOpTime: getOpTime
}