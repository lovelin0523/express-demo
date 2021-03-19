const tencentcloud = require("tencentcloud-sdk-nodejs");
// 导入 SMS 模块的 client models
const smsClient = tencentcloud.sms.v20190711.Client;
const models = tencentcloud.sms.v20190711.Models;
const Credential = tencentcloud.common.Credential;
const ClientProfile = tencentcloud.common.ClientProfile;
const HttpProfile = tencentcloud.common.HttpProfile;
/**
 * 腾讯云短信验证码发送
 */
class CodeSMS {
	constructor() {
		this.secretId = '';
		this.secretKey = '';
		this.SmsSdkAppid = ''; //sdk appId
		this.Sign = ''; //短信签名内容
		this.TemplateID = ''; //短信模板ID
	}

	/**
	 * 发送短信
	 * @param {Object} phoneNumber 手机号
	 * @param {Object} params 数据数组
	 */
	send(phoneNumber, params) {
		return new Promise((resolve, reject) => {
			//实例化一个认证对象，入参需要传入腾讯云账户密钥对 secretId 和 secretKey
			let cred = new Credential(this.secretId, this.secretKey);
			//实例化 SMS 的 client 对象
			let client = new smsClient(cred, "ap-guangzhou");
			//实例化一个请求对象，根据调用的接口和实际情况，可以进一步设置请求参数
			let req = new models.AddSmsTemplateRequest();
			//短信应用 ID:
			req.SmsSdkAppid = this.SmsSdkAppid;
			// 短信签名内容
			req.Sign = this.Sign;
			//下发手机号码，采用 e.164 标准，+[国家或地区码][手机号]
			req.PhoneNumberSet = ["+86" + phoneNumber];
			//模板 ID
			req.TemplateID = this.TemplateID;
			//模板参数
			req.TemplateParamSet = params;
			//通过 client 对象调用想要访问的接口
			client.SendSms(req, function(err, response) {
				// 请求异常返回，打印异常信息
				if (err) {
					reject(err)
					return;
				}
				resolve(response)
			});
		})
	}
}

module.exports = new CodeSMS();
