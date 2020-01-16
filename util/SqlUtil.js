//引入连接池模块
const pool = require("../pool.js");

class SqlUtil {
	constructor(table) {
		this.table = table;
	}
	/**
	 * 向数据库表插入数据
	 * @param {Object} obj
	 */
	insert(obj) {
		return new Promise((resolve, reject) => {
			var param = "";
			var params = [];
			for (var key in obj) {
				param += '?,';
				params.push(obj[key]);
			}
			param = param.substr(0, param.length - 1);
			var sql = 'insert into ' + this.table + ' values (' + param + ')';
			pool.query(sql, params, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result)
				}
			})
		})
	}

	/**
	 * 修改数据库表数据
	 * @param {Object} obj 表对象
	 * @param {Object} column 表字段名称(以此字段为依据修改)
	 */
	update(obj, column) {
		return new Promise((resolve, reject) => {
			var param = "";
			var params = [];
			var conidtion = null;
			for (var key in obj) {
				if (key == column) {
					conidtion = key;
				} else {
					param += (key + '=?,');
					params.push(obj[key]);
				}
			}
			param = param.substr(0, param.length - 1);
			if (conidtion) {
				param += ' where ' + conidtion + '=?';
				params.push(obj[conidtion]);
			}
			var sql = 'update ' + this.table + ' set ' + param;
			pool.query(sql, params, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result)
				}
			})
		})
	}

	/**
	 * 删除数据库表数据
	 * @param key 表字段名称(以此字段为依据删除)
	 * @param value 表字段名称对应的值 
	 */
	delete(key, value) {
		return new Promise((resolve, reject) => {
			var sql = 'delete from ' + this.table + ' where ' + key + '=?';
			var params = [value];
			pool.query(sql, params, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result)
				}
			})
		})
	}
	
	/**
	 * 单条件查询
	 * @param {Object} key 表字段名称(以此字段查询)
	 * @param {Object} value 表字段名称对应的值 
	 */
	query(key,value){
		return new Promise((resolve, reject) => {
			var sql = 'select * from ' + this.table + ' where ' + key + '=?';
			var params = [value];
			pool.query(sql, params, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result)
				}
			})
		})
	}

	/**
	 * 多条件查询
	 * @param {Object} queryOptions  字段参数对象
	 * queryOptions中除了实体参数以外,必须有order1,order2,startIndex,pageSize四个参数,用作分页查询
	 */
	querys(queryOptions) {
		return new Promise((resolve,reject)=>{
			var sql = `select * from ${this.table}`;
			var params = [];
			sql += " where ";
			Object.keys(queryOptions).forEach(function(key, index) {
				if (key != "order1" && key != "order2" && key != "startIndex" && key != "pageSize") {
					if (typeof(queryOptions[key]) == "string") { //字符串
						sql += `locate(?,${key})>0 and `;
						params.push(queryOptions[key]);
					} else if ((queryOptions[key] instanceof Array) && queryOptions[key].length == 2) { //日期
						if (queryOptions[key][0] && queryOptions[key][1]) {
							sql += `${key}>=? and ${key}<=? and `;
							params.push(queryOptions[key][0]);
							params.push(queryOptions[key][1]);
						} else if (queryOptions[key][0]) {
							sql += `${key}>=? and `;
							params.push(queryOptions[key][0]);
						} else if (queryOptions[key][1]) {
							sql += `${key}<=? and `;
							params.push(queryOptions[key][1]);
						}
					} else {
						sql += `${key}=? and `;
						params.push(queryOptions[key]);
					}
			
				}
			})
			const index = sql.lastIndexOf("and");
			if (index > -1) {
				sql = sql.substring(0, index);
			} else {
				sql = sql.substring(0, sql.lastIndexOf("where"));
			}
			if (queryOptions["order1"] && queryOptions["order2"]) {
				sql += `order by ${queryOptions["order1"]} ${queryOptions["order2"]} `;
			}
			if (typeof(queryOptions["startIndex"]) == "number" && typeof(queryOptions['pageSize']) == "number") {
				sql += ` limit ?,? `;
				params.push(queryOptions.startIndex);
				params.push(queryOptions.pageSize);
			}
			pool.query(sql,params,(error,result)=>{
				if (error) {
					reject(error);
				} else {
					resolve(result)
				}
			})
		})
	}
	
	/**
	 * 多条件查询的总记录数
	 * @param {Object} queryOptions
	 */
	queryCounts(queryOptions){
		return new Promise((resolve,reject)=>{
			var sql = `select count(1) from ${this.table}`;
			var params = [];
			sql += " where ";
			Object.keys(queryOptions).forEach(function(key, index) {
				if (typeof(queryOptions[key]) == "string") { //字符串
					sql += `locate(?,${key})>0 and `;
					params.push(queryOptions[key]);
				} else if ((queryOptions[key] instanceof Array) && queryOptions[key].length == 2) { //日期
					if (queryOptions[key][0] && queryOptions[key][1]) {
						sql += `${key}>=? and ${key}<=? and `;
						params.push(queryOptions[key][0]);
						params.push(queryOptions[key][1]);
					} else if (queryOptions[key][0]) {
						sql += `${key}>=? and `;
						params.push(queryOptions[key][0]);
					} else if (queryOptions[key][1]) {
						sql += `${key}<=? and `;
						params.push(queryOptions[key][1]);
					}
				} else {
					sql += `${key}=? and `;
					params.push(queryOptions[key]);
				}
			})
			const index = sql.lastIndexOf("and");
			if (index > -1) {
				sql = sql.substring(0, index);
			} else {
				sql = sql.substring(0, sql.lastIndexOf("where"));
			}
			pool.query(sql,params,(error,result)=>{
				if (error) {
					reject(error);
				} else {
					resolve(result)
				}
			})
		})
	}
}

module.exports = SqlUtil;
