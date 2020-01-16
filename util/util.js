const path = require("path");
/**
 * 普通的工具类
 */
var util = {
	/**
	 * 去除字符串两边空格
	 */
	trim(str) {
		var result = str.replace(/(^\s+)|(\s+$)/g, "");
		return result;
	},

	//随机生成六位短信验证码
	randomCheckCode() {
		var chars = '1234567890';
		var code = "";
		for (var i = 0; i < 6; i++) {
			var index = Math.round(Math.random() * 9);
			code += chars[index];
		}
		return code;
	},

	//获取客户IP地址
	getIP(req) {
		return req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
	}
}

module.exports = util;
