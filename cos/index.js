var COS = require('cos-nodejs-sdk-v5');
var fs = require('fs')
class CosObject {
	constructor() {
		this.SecretId = '';
		this.SecretKey = '';
		this.AppId = '';
		this.Bucket = 'blog-'+this.AppId;
		this.Region = '';
		this.cos = new COS({
			SecretId: this.SecretId,
			SecretKey: this.SecretKey
		})
	}
	
	//判断存储桶是否存在
	hasBucket() {
		return new Promise((resolve, reject) => {
			this.cos.headBucket({
				Bucket: this.Bucket,
				Region: this.Region
			}, (err, data) => {
				if (err) {
					reject(err)
				} else {
					resolve(data)
				}
			});
		})
	}

	//创建存储桶
	createBucket() {
		return new Promise((resolve, reject) => {
			this.cos.putBucket({
				Bucket: this.Bucket,
				Region: this.Region,
				ACL: 'public-read'
			}, (err, data) => {
				if (err) {
					reject(err)
				} else {
					resolve(data)
				}
			});
		})
	}

	//获取指定目录下的所有文件
	getFiles(folder) {
		return new Promise((resolve, reject) => {
			this.cos.getBucket({
				Bucket: this.Bucket,
				Region: this.Region,
				Prefix: folder + '/',
				Delimiter: '/'
			}, (err, data) => {
				if (err) {
					reject(err)
				} else {
					resolve(data);
				}
			});
		})
	}

	//上传文件
	uploadFile(folder, fileName, filePath) {
		return new Promise((resolve, reject) => {
			this.cos.putObject({
				Bucket: this.Bucket,
				Region: this.Region,
				Key: folder + '/' + fileName,
				Body: fs.createReadStream(filePath)
			}, (err, data) => {
				if (err) {
					reject(err)
				} else {
					resolve(data);
				}
			});
		})
	}

	//下载文件
	downloadFile(key) {
		return new Promise((resolve, reject) => {
			this.cos.getObject({
				Bucket: this.Bucket,
				Region: this.Region,
				Key: key
			}, function(err, data) {
				if (err) {
					reject(err)
				} else {
					resolve(data);
				}
			});
		})
	}

	//删除文件
	deleteFile(key) {
		return new Promise((resolve, reject) => {
			this.cos.deleteObject({
				Bucket: this.Bucket,
				Region: this.Region,
				Key: key
			}, function(err, data) {
				if (err) {
					reject(err)
				} else {
					resolve(data);
				}
			});
		})
	}

}


module.exports = new CosObject();