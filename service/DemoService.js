//引入异常
const ServiceError = require("../error/ServiceError")
//引入md5
const md5 = require("md5-node")
//引入token工具
const jwt = require("../jwt/JwtToken")
//引入工具类
const util = require("../util/util")
//引入实体
const Demo = require("../entity/Demo")
//引入sql
const pool = require("../pool.js")
//引入mysql-op
const SqlUtil = require("mysql-op")
//创建mysql-op实例
const sqlUtil = new SqlUtil(pool,'demo')
//引入文件操作类
const FdOp = require("fd-op")
//创建fd-op实例
const path = require("path")
const fs = require("fs")
const fdOp = new FdOp(fs,path)
//创建业务类
const service = {};

//测试业务，使用asyc/await 进行异步转同步处理
service.demoTest = async req=>{
	//进行业务处理,调用dao层接口,进行回调
	let demo = new Demo(5,'欢迎使用express-demo')
	return demo;
}

module.exports = service
