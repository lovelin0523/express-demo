//引入文件流
const fs = require("fs");
const path = require("path");
var FileUtil = {};

//读取文件内容
FileUtil.readFile = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.readFile(filePath, "utf8", (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

//写入文本内容
FileUtil.writeFile = function(filePath, text) {
	return new Promise(function(resolve, reject) {
		fs.writeFile(filePath, text, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	})
}

//文件追加写入内容
FileUtil.appendFile = function(filePath, text) {
	return new Promise(function(resolve, reject) {
		fs.appendFile(filePath, text, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	})
}

//拷贝文件
FileUtil.copyFile = function(filePath, copy_filePath) {
	return new Promise(function(resolve, reject) {
		fs.copyFile(filePath, copy_filePath, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	})
}

//打开文件
FileUtil.openFile = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.open(filePath, "r", (err, fd) => {
			if (err) {
				reject(err);
			} else {
				resolve(fd);
			}
		});
	})
}

//关闭文件
FileUtil.closeFile = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.close(filePath, "r", (fd, err) => {
			if (err) {
				reject(err);
			} else {
				resolve(fd);
			}
		});
	})
}


//查看文件或者目录的操作权限
FileUtil.access = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.access(filePath, err => {
			if (err) {
				reject(err); //不可访问
			} else {
				resolve(); //可读写
			}
		});
	})
}

//获取目录的信息
FileUtil.stat = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.stat(filePath, (err, obj) => {
			if (err) {
				reject(err);
			} else {
				resolve(obj);
			}
		});
	})
}

//创建目录
FileUtil.mkdir = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.mkdir(filePath, err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	})
}

//读取目录列表
FileUtil.readdir = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.readdir(filePath, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	})
}

//删除目录
FileUtil.rmdir = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.rmdir(filePath, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	})
}


//删除文件
FileUtil.deleteFile = function(filePath) {
	return new Promise(function(resolve, reject) {
		fs.unlink(filePath, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	})
}


//递归创建目录
FileUtil.mkdirs = function(filePath) {
	return new Promise(function(resolve, reject) {
		// 转变成数组，如 ['a', 'b', 'c']
		let parts = filePath.split(path.sep);
		let index = 1;

		// 创建文件夹方法
		function next() {
			// 重新拼接成 a a/b a/b/c
			let current = parts.slice(0, index).join(path.sep);
			index++;
			// 如果路径检查成功说明已经有该文件目录，则继续创建下一级
			// 失败则创建目录，成功后递归 next 创建下一级
			FileUtil.access(current).then(function() {
				next();
			}).catch(function(err) {
				FileUtil.mkdir(current).then(function() {
					next();
				})
			})
		}
		next();
	})
}

module.exports = FileUtil;
