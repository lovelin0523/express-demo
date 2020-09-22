//引入multiparty
const multiparty = require("multiparty")
//引入异常
const ServiceError = require("../error/ServiceError")
/**
 * @param {Object} req request对象
 * @param {Object} dir 文件存放目录
 * @param {Object} maxSize 尺寸，单位b
 */
module.exports = function(req,dir,maxSize) {
	return new Promise((resolve, reject) => {
		var form = new multiparty.Form({
			uploadDir:dir,//文件存放的文件夹的完整路径名
			encoding: 'utf-8',
			maxFilesSize: maxSize
		});
		form.parse(req, function(err, fields, files) {
			if (err) {
				if (err.code == 'ETOOBIG') {
					reject(new ServiceError('文件大小超出限制'));
				} else {
					reject(err);
				}
			} else {
				resolve({
					fields,files
				})
			}
		});
	})
}
