const SqlUtil = require('../sql/SqlUtil')
//引入JsonResult类
const JsonResult = require("../object/JsonResult")
//引入异常
const ServiceError = require("../error/ServiceError")
//引入md5
const md5 = require("md5-node")
//引入token工具
const jwt = require("../util/JwtToken")
//引入工具类
const util = require("../util/util")
//引入实体
const Demo = require("../entity/Demo")
//创建sql查询
const sqlUtil = new SqlUtil('demo');
//创建业务类
const service = {};

//测试业务，使用asyc/await 进行异步转同步处理
service.demoTest = async (req,res,next)=>{
	//进行业务处理,调用dao层接口,进行回调
	var demo = new Demo(5,'欢迎使用express-demo')
	return res.json(new JsonResult(JsonResult.STATUS_SUCCESS,'测试成功',demo));
}

module.exports = service
