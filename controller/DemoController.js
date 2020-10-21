//引入express模块
const express = require("express")
//创建路由器对象
var router = express.Router()
//引入JsonResult类
const JsonResult = require("../object/JsonResult")
//引入异常
const ServiceError = require("../error/ServiceError")
//引入业务类
const demoService = require("../service/DemoService")

// 前缀/user

//测试接口
router.get("/demo",(req,res,next)=>{
	//此处调用业务Service类,进行业务逻辑的处理，利用catch处理service中的异常
	demoService.demoTest(req,res).catch(error=>{
		next(error)
	});
})

module.exports = router
