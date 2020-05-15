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
const User = require("../entity/User")
//创建sql查询
const sqlUtil = new SqlUtil('user');
//创建业务类
const service = {};

//测试业务
service.demoTest = (req,res,next,params)=>{
	//进行业务处理,调用dao层接口,进行回调
	return res.json(new JsonResult(JsonResult.STATUS_SUCCESS,'测试成功','欢迎使用express-demo'));
}

module.exports = service
