/**
 * 发送短信验证码
 */
var QcloudSms = require("qcloudsms_js");
class CodeSMS {
	constructor(phoneNumber, params) {
		// 短信应用 SDK AppID
		this.appid = 0000000;
		// 短信应用 SDK AppKey
		this.appkey = "";
		// 短信模板 ID，需要在短信控制台中申请
		this.templateId = 0000000;
		// 签名，签名参数使用的是`签名内容`，而不是`签名ID`
		this.smsSign = "";
		//需要发送短信的手机号码
		this.phoneNumber = phoneNumber;
		//发送的数据数组
		this.params = params;//验证码与过期时间
	}

	send() {
		return new Promise((resolve,reject)=>{
			// 实例化 QcloudSms
			var qcloudsms = QcloudSms(this.appid, this.appkey);
			var ssender = qcloudsms.SmsSingleSender();
			ssender.sendWithParam("86", this.phoneNumber, this.templateId, this.params, this.smsSign, "", "", function(err, res, resData){
				resolve({
					error:err,
					res:res,
					resData:resData
				})
			});
		})
	}
}

module.exports = CodeSMS
