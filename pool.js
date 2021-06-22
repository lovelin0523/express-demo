const mysql = require("mysql");
//创建连接池对象
let pool = mysql.createPool({
	host : "",//数据库IP地址
	port : "",//数据库端口
	user : "",//数据库账号
	password : "",//数据库密码
	database : "",//数据库名称
	connectionLimit : 15//连接池限制
});

//导出连接池
module.exports = pool;

