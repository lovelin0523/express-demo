/**
 * Token工具类
 */

// 引入模块依赖
const jwt = require('jsonwebtoken');

//引入自定义的异常
const TokenError = require("../error/TokenError");

// 创建 token 类
class JwtToken {
	constructor(days) {
		this.days = days; //授权时效，天数
	}

	//生成token
	getToken(data) {
		let token = jwt.sign(data, JwtToken.SECRET, {
			expiresIn: this.days * 24 * 60 * 60 //自定义token有效期
		});
		return token;
	}

	// 解析token
	parseToken(token) {
		return new Promise(function(resolve, reject) {
			jwt.verify(token, JwtToken.SECRET, function(err, data) {
				if (err) {
					reject(new TokenError("TOKEN已失效，请重新登录"));
				} else {
					resolve(data);
				}
			})
		})
	}
}

JwtToken.SECRET = "mvi";

const jwtToken = new JwtToken(15); //用户登录有效期15天

module.exports = jwtToken;
