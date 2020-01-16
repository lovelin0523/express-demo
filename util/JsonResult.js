/**
 * 后台封装返回前端的类
 */
class JsonResult {
	constructor(state, message, data) {
		this.state = state;
		this.message = message;
		this.data = data;
	}
}

JsonResult.STATUS_SUCCESS = 100; //请求成功状态码
JsonResult.STATUS_SERVICE_ERROR = 101; //应用异常状态码
JsonResult.STATUS_TOKEN_ERROR = 102; //token异常状态码

module.exports = JsonResult;
