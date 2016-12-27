function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds();

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function ajax(url, params, onSuccess, onError, onComplete){
	var onSuccess = arguments[2]?arguments[2]:function(){};//成功时
	var onError = arguments[3]?arguments[3]:function(){};//异常时
	var onComplete = arguments[4]?arguments[4]:function(){};//完成时
	var AI_APP_PATH = "http://218.205.252.12:10029/aioam/";//办公网环境
	// var AI_APP_PATH = "http://localhost:8080/aioam/";
	params.loginToken = wx.getStorageSync('LOGIN_TOKEN')||'';
	if(url.indexOf('http://') < 0){
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
		success: function(res) {
			console.log(res.data)
			if(!res.data.state && res.data.code == "JAVA_EXCEPTION"){
      	console.log('服务端请求处理发生问题,请联系系统管理员.');
			}else if(!res.data.state && res.data.code == "NOT_LOGINED"){
				wx.clearStorageSync();
				console.log('您尚未登陆或账号在其他终端上登陆导致本设备踢出.');
			}else if(!res.data.state && res.data.code == "CHARACTER_WRONGFUL"){
				console.log('您提交的数据中含有非法字符,请调整后继续.');
			}else if(!res.data.state){
					wx.showModal({
            content: '错误代码:'+res.data.code,
            showCancel: false
          });
			}else{
				onSuccess(res.data);
			}
		},
		fail: function(){
			onError();
		},
		complete: function(){
			onComplete();
		}
	});
};


module.exports = {
  formatTime: formatTime,
  ajax:ajax
}