// extend
$.extend({
	manualStatistics: function(sessionId,respondData) { //手动埋点
		// save session_id
		sessionStorage.setItem('session_id',sessionId);
		
		var tempObj = {
			user_id: (sessionStorage.getItem('id') || '未登录'),
			stat_time: $directives.getCurrentTime(),
			above_url: document.referrer + "+" + app_version + "+" + obj_type + "+" + device_info,
			url: window.location.href,
			bhv_type: actionParams.evn.element_id,
			evn: respondData //成功之后的接口返回的加密数据
		}
		var sessionData = JSON.parse(sessionStorage.getItem('baseParams'));
		sessionData['obj_type'] = '2';

		tempObj = $.extend(sessionData, tempObj);
		$http.post('', tempObj);
	}
});

// params
var baseParams = actionParams = $filter = $directives = {};
var ip = longitude = latitude = pageInTime = pageOuntTime = '';
var app_version = 'V1.0';
var device_info = 'web';
var obj_type = '1';

// (()=>{})()
(function() {
	
	// 过滤器
	$filter = {
		add: function(m) {
			return m < 10 ? '0' + m : m;
		},
		timer: function(time) {
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y + '-' + $filter.add(m) + '-' + $filter.add(d) + ' ' + $filter.add(h) + ':' + $filter.add(mm) + ':' + $filter.add(s);
		}
	}

	// 工具方法
	$directives = {
		getCurrentTime: function() {
			return $filter.timer(new Date());
		},
		stringToObj: function(string) {
			return JSON.parse(string);
		},
		getBrowserName: function() {
			var agent = navigator.userAgent.toLowerCase();
			var regStr_ie = /msie [\d.]+;/gi;
			var regStr_ff = /firefox\/[\d.]+/gi
			var regStr_chrome = /chrome\/[\d.]+/gi;
			var regStr_saf = /safari\/[\d.]+/gi;
			//IE
			if(agent.indexOf("ie") > 0) {
				return agent.match(regStr_ie);
			}
			//firefox
			if(agent.indexOf("firefox") > 0) {
				return agent.match(regStr_ff);
			}
			//Chrome
			if(agent.indexOf("chrome") > 0) {
				return agent.match(regStr_chrome);
			}
			//Safari
			if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
				return agent.match(regStr_saf);
			}
		},
		getBrowserVersion: function() {
			return $directives.getBrowserName()[0].replace(/[^0-9.]/ig, "");
		},
		getOSName: function() {
			var sUserAgent = navigator.userAgent;
			var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
			var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
			if(isMac) return "Mac";
			var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
			if(isUnix) return "Unix";
			var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
			if(isLinux) return "Linux";
			if(isWin) {
				var isWin2K = sUserAgent.indexOf("Windows NT 5.0") > -1 || sUserAgent.indexOf("Windows 2000") > -1;
				if(isWin2K) return "Win2000";
				var isWinXP = sUserAgent.indexOf("Windows NT 5.1") > -1 || sUserAgent.indexOf("Windows XP") > -1;
				if(isWinXP) return "WinXP";
				var isWin2003 = sUserAgent.indexOf("Windows NT 5.2") > -1 || sUserAgent.indexOf("Windows 2003") > -1;
				if(isWin2003) return "Win2003";
				var isWin2003 = sUserAgent.indexOf("Windows NT 6.0") > -1 || sUserAgent.indexOf("Windows Vista") > -1;
				if(isWin2003) return "WinVista";
				var isWin2003 = sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows 7") > -1;
				if(isWin2003) return "Win7";
				var isWin7 = sUserAgent.indexOf("Windows NT 7") > -1 || sUserAgent.indexOf("Windows 7") > -1;
				if(isWin7) return "Win7";
				var isWin8 = sUserAgent.indexOf("Windows NT 8") > -1 || sUserAgent.indexOf("Windows 8") > -1;
				if(isWin8) return "Win8";
				var isWin10 = sUserAgent.indexOf("Windows NT 10") > -1 || sUserAgent.indexOf("Windows 10") > -1;
				if(isWin10) return "Win10";
			}
			return "None";
		},
		getUserInformation: function(callback) {
			$.ajax({
				type: 'GET',
				async: false,
				dataType: 'JSON',
				url: 'https://freegeoip.net/json/',
				success: function(data) {
					callback(data);
				},
			});
		},
		getAbove_url: function() {
			var urlIdList = [{
				'name': '首页',
				'urlId': 'url001'
			}, {
				'name': '注册',
				'urlId': 'url002'
			}, {
				'name': '找回密码',
				'urlId': 'url003'
			}, {
				'name': '身份认证',
				'urlId': 'url004'
			}, {
				'name': '身份认证审核中',
				'urlId': 'url005'
			}]; //自定义的urlId
			for(var i = 0; i < urlIdList.length; i++) {
				if(document.referrer === urlIdList[i].name) {
					return urlIdList[i].urlId;
				}
			}
		}
	}

	// get data from session
	if(!sessionStorage.getItem('baseParams')) {
		var os = $directives.getOSName(); //操作系统
		var browser = $directives.getBrowserName()[0].split("/")[0]; // 浏览器
		var browser_version = $directives.getBrowserVersion(); // 浏览器版本
		$directives.getUserInformation(function(data) { // ip 和定位
			ip = data.ip;
			longitude = data.longitude;
			latitude = data.latitude;
		});
		var pos_type = '11'; // 行为发生的位置类型,默认11

		baseParams = {
			device_info: device_info,
			device_sn: '无法获取',
			os: os,
			browser: browser,
			browser_version: browser_version,
			ip: ip,
			pos_type: pos_type,
			longitude: longitude,
			latitude: latitude,
			app_version: app_version,
			obj_type: obj_type
		}

		sessionStorage.setItem('baseParams', JSON.stringify(baseParams));
	} else {
		baseParams = JSON.parse(sessionStorage.getItem('baseParams')); //get data from sessionStorage
	}

	// 添加事件监听器
	window.addEventListener('click', function(e) {
			if(e.target.nodeName == 'INPUT' || e.target.nodeName == 'A' || e.target.nodeName == 'BUTTON') {
			elementObj.didTrigger(e.target, e.target.targetName);
		} else {
			return;
		}
	},true);

	// element trigger method
	var elementObj = {
		didTrigger: function(self, targetType, requestURL) {
			requestURL = requestURL || M_API + 'blockchain/h5Log';

			actionParams = {
				session_id: sessionStorage.getItem('session_id') || '没有进行业务请求,暂无',
				user_id: (sessionStorage.getItem('id') || '未登录'),
				stat_time: $directives.getCurrentTime(),
				above_url: document.referrer + "+" + app_version + "+" + obj_type + "+" + device_info,
				url: window.location.href,
				bhv_type: $(self).attr('data-id'),
				evn: {
					title: document.title,
					element_id: $(self).attr('data-id'),
					obj_type: '1', //默认为1,触发的时候的行为,在成功的回调的时候会是2
					element_type: targetType,
					element_content: $(self).attr('data-content'),
					status: '1',
					bhv_datetime: $directives.getCurrentTime()
				}
			}
			actionParams = $.extend(baseParams, actionParams);
			$http.post(requestURL, actionParams);
		}
	}

	// page did enter
	$(document).ready(function() {
		pageInTime = $directives.getCurrentTime();
	});

	// page did unload
	window.onbeforeunload = function() {
		var pageOutRequestBody = {
			user_id: (sessionStorage.getItem('id') || '未登录'),
			stat_time: $directives.getCurrentTime(),
			above_url: document.referrer + "+" + app_version + "+" + obj_type + "+" + device_info,
			url: window.location.href,
			bhv_type: 'A9999',
			in_time: pageInTime,
			out_time: $directives.getCurrentTime()
		}
		pageOutRequestBody = $.extend(JSON.parse(sessionStorage.getItem('baseParams')), pageOutRequestBody);
		$http.post(M_API + 'blockchain/h5Log', pageOutRequestBody);
	}
})();

// 数据请求
var $http = {
	post: function(requestUrl, params) {
		requestUrl = requestUrl || M_API + 'blockchain/h5Log';
		$.ajax({
			type: "post",
			contentType: "application/json",
			url: requestUrl,
			data: JSON.stringify(params),
			success: function(data) {
				console.log(data); // did success
			}
		});
	}
}