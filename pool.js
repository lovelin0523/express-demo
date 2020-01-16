const mysql = require("mysql");
//创建连接池对象
var pool = mysql.createPool({
	host : "118.25.177.182",
	port : "3306",
	user : "root",
	password : "z1983127",
	database : "mvi",
	connectionLimit : 15
});

//导出连接池
module.exports = pool;

