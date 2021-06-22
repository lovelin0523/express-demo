const QcloudSms = require("qcloudsms_js");
const ServiceError = require('../error/ServiceError')
class CodeSMS {
	constructor(templateId) {
		// 短信应用 SDK AppID
		this.appid = '';
		// 短信应用 SDK AppKey
		this.appkey = "";
		// 短信模板ID
		this.templateId = templateId;
		// 签名，签名参数使用的是`签名内容`，而不是`签名ID`
		this.smsSign = "";
	}

	/**
	 * 发送短信
	 * @param {Object} phoneNumber
	 * @param {Object} params
	 */
	send(phoneNumber, params) {
		return new Promise((resolve, reject) => {
			// 实例化 QcloudSms
			let qcloudsms = QcloudSms(this.appid, this.appkey);
			let ssender = qcloudsms.SmsSingleSender();
			ssender.sendWithParam("86", phoneNumber, this.templateId, params, this.smsSign, "",
				"", (err, res, resData) => {
					if(err){
						reject(err)
					}else if(resData.result != 0){
						reject(new ServiceError(resData.errmsg))
					}else {
						resolve()
					}
				});
		})
	}
}

module.exports = {
	//普通短信模板
	common: new CodeSMS(''),
}
