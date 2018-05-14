// 本地环境接口域名

// var api = "http://192.168.10.229:9090/bcinfo/bcinfo/api/";
// 张龙本地 http://192.168.10.229:9090/bcinfo/bcinfo/api/
// SIT:https://sit.001bank.com/bcinfo/bcinfo/api/

// 测试环境接口域名
var api = "http://192.168.188.193:8089/bcinfo/bcinfo/api/";

// 生产环境接口域名
// var api = "http://www.huobc.com/bcinfo/bcinfo/api/";

/**
 * 埋点api create by allen
 * DEV:http://192.168.188.197:8089/baselogybd/api/blockchain/h5Log 
 * SIT:https://sit.001bank.com/baselogybd/api/
 * PRO:http://www.huobc.com/baselog/api/
 * 
 */
var M_API = 'http://www.huobc.com/baselog/api/';

// 获取底部年份
(function(){
	var year = new Date().getFullYear();
    document.getElementById("footerYear").innerHTML = year;
})();
