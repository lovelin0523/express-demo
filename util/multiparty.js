//引入multiparty
const multiparty = require("multiparty")
//引入异常
const ServiceError = require("../error/ServiceError")

module.exports = function(req) {
	return new Promise((resolve, reject) => {
		var form = new multiparty.Form({
			encoding: 'utf-8',
			maxFilesSize: 50 * 1024 * 1024
		});
		form.parse(req, function(err, fields, files) {
			if (err) {
				if (err.code == 'ETOOBIG') {
					reject(new ServiceError('图片大小超出限制'));
				} else {
					reject(err);
				}
			} else {
				resolve(files)
			}
		});
	})
}
