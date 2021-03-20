//引入multiparty
const multiparty = require("multiparty")
//引入异常
const ServiceError = require("../error/ServiceError")
/**
 * 上传文件封装
 * request:请求对象
 * uploadDir:文件存放的文件夹的完整路径名
 * maxFilesSize:上传的图片的最大尺寸，单位b
 * errorMessage:如果文件过大时进行的提示内容
 */
module.exports = (request, uploadDir, maxFilesSize, errorMessage) => {
	return new Promise((resolve, reject) => {
			const form = new multiparty.Form({
				uploadDir: uploadDir,
				encoding: 'utf-8',
				maxFilesSize: maxFilesSize
			});
			form.parse(request, (err, fields, files) => {
					if (err) {
						if (err.code == 'ETOOBIG') {
							reject(new ServiceError(errorMessage || '上传的文件过大，请重新上传')));
					} else {
						reject(new ServiceError(err.message));
					}
				} else {
					resolve({
						fields,
						files
					})
				}
			});
	})
}
