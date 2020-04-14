//引入express模块
const express = require("express")
//创建路由器对象
var router = express.Router()
//引入JsonResult类
const JsonResult = require("../object/JsonResult")
//引入异常
const ServiceError = require("../error/ServiceError")
//引入业务类
const userService = require("../service/UserService")

// 前缀/user

//测试接口
router.get("/demo",(req,res,next)=>{
	//此处进行数据校验,前端校验后,后端仍需校验一次
	//...
	//此处调用业务Service类,进行业务逻辑的处理
	userService.demoTest(req,res,next);
	//如果有req.body中有前端传递参数,将参数全部放到params对象中,则此处为
	//userService.auth(req,res,next,params);
})

module.exports = router
