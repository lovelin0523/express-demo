//引入自定义的异常
const ServiceError = require("../error/ServiceError.js")
//引入工具类
const util = require("../util/util.js")
//引入sql操作
const SqlUtil = require("../sql/SqlUtil")
//创建sql类实例
const sqlUtil = new SqlUtil('user')
//创建dao
let dao = {}

/**
 * 注册用户
 * @param {Object} user
 */
dao.createUser = function(user) {
	return new Promise(function(resolve, reject) {
		//此处利用sqlUtil进行数据库操作,采用resolve和reject进行回调,交给上一层(即业务层Service)处理
	})
}



module.exports = dao
