const path = require("path");
/**
 * 普通的工具类
 */
var util = {
	/**
	 * 去除字符串两边空格
	 * @param {Object} text
	 */
	trim(text) {
		return str.replace(/(^\s+)|(\s+$)/g, "");
	},
	
	/**
	 * 是否为网址
	 * @param {Object} text
	 */
	isUrl(text){
		return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(text)
	},
	
	/**
	 * 是否为身份证号
	 * @param {Object} text
	 */
	isIdCard(text){
		return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(text)
	},
	
	/**
	 * 是否为手机号
	 * @param {Object} text
	 */
	isPhoneNumber(text){
		return /^1[0-9]\d{9}$/.test(text)
	},
	
	/**
	 * 是否为4-16位的用户名(字母数字下划线)
	 * @param {Object} text
	 */
	isUserName(text){
		/^[a-zA-Z0-9_]{4,16}$/.test(text)
	},
	
	/**
	 * 是否为邮箱
	 * @param {Object} text
	 */
	isEmail(text){
		return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(text)
	},
	
	/**
	 * 是否含有中文
	 * @param {Object} text
	 */
	hasChinese(text){
		return /[\u4e00-\u9fa5]/.test(text)
	},
	
	/**
	 * 是否为中文
	 * @param {Object} text
	 */
	isChinese(text){
		return /^[\u4e00-\u9fa5]+$/.test(text);
	},

	/**
	 * 随机生成六位短信验证码
	 */
	randomCheckCode() {
		var chars = '0123456789';
		var code = "";
		for (var i = 0; i < 6; i++) {
			var index = Math.floor(Math.random() * chars.length);
			code += chars[index];
		}
		return code;
	},

	/**
	 * 获取客户IP地址
	 * @param {Object} req
	 */
	getIP(req) {
		return req.headers['x-forwarded-for'] ||
			req.connection.remoteAddress ||
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;
	}
}

module.exports = util;
