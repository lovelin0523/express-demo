//引入连接池模块
const pool = require("./pool.js");

class SqlUtil {
	constructor(table) {
		this.table = table; //数据库表名
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
	 * @param column 表字段名称(以此字段为依据删除)
	 * @param columnValue 表字段名称对应的值 
	 */
	delete(column, columnValue) {
		return new Promise((resolve, reject) => {
			var sql = 'delete from ' + this.table + ' where ' + column + '=?';
			var params = [columnValue];
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
	 * @param {Object} column 表字段名称(以此字段查询)
	 * @param {Object} columnValue 表字段名称对应的值
	 * @param {Object} columns 指定查询部分字段数组 
	 */
	query(column, columnValue,columns) {
		return new Promise((resolve, reject) => {
			var str = '';
			if(columns instanceof Array){
				for(var i = 0;i<columns.length;i++){
					str += ','+columns[i];
				}
				str = str.substr(1);
			}else{
				str = '*'
			}
			var sql = `select ${str} from ${this.table} where ${column}=?`;
			var params = [columnValue];
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
	 * @param {Object} queryOptions 字段参数对象
	 * @param {Object} conjuction 连接词，取值and或者or 
	 * @param {Object} sortBy 排序依据,即根据什么字段进行排序,此处值为排序依据的字段名称字符串
	 * @param {Object} sortMethod 排序方法,即是升序还是降序，升序为"asc",降序为"desc"
	 * @param {Object} startIndex  分页数据起始序列
	 * @param {Object} pageSize 分页大小
	 * @param {Object} columns 指定查询部分字段数组 
	 */
	querys(queryOptions, conjuction, sortBy, sortMethod, startIndex, pageSize,columns) {
		return new Promise((resolve, reject) => {
			var str = '';
			if(columns instanceof Array){
				for(var i = 0;i<columns.length;i++){
					str += ','+columns[i];
				}
				str = str.substr(1);
			}else{
				str = '*'
			}
			var sql = `select ${str} from ${this.table}`;
			var params = [];
			sql += " where ";
			Object.keys(queryOptions).forEach(function(key, index) {
				var qb = {};
				if (typeof(queryOptions[key]) == "object") { //对象形式，则可能进行模糊查询或者范围查询
					qb.value = queryOptions[key].value;
					if(typeof(queryOptions[key].fuzzy) == 'boolean'){
						qb.fuzzy = queryOptions[key].fuzzy;
					}else{
						qb.fuzzy = false;
					}
					if(typeof(queryOptions[key].equal) == 'boolean'){
						qb.equal = queryOptions[key].equal;
					}else{
						qb.equal = true;
					}
				} else { //非对象形式，即直接根据字段-字段值进行查询
					qb.value = queryOptions[key];
					qb.fuzzy = false; //默认非模糊查询
					qb.equal = true;//默认范围查询时包含等号
				}

				//如果value值为数组，表示范围查询
				if (qb.value instanceof Array) {
					if (qb.value[0] != null && qb.value[1] != null && qb.value[0] != undefined && qb.value[1] != undefined) {
						if (qb.value[0] <= qb.value[1]) {
							if(qb.equal){
								sql += `(${key}>=? and ${key}<=?) ${conjuction} `;
							}else{
								sql += `(${key}>? and ${key}<?) ${conjuction} `;
							}
						} else {
							if(qb.equal){
								sql += `(${key}>=? or ${key}<=?) ${conjuction} `;
							}else{
								sql += `(${key}>? or ${key}<?) ${conjuction} `;
							}
						}
						params.push(qb.value[0]);
						params.push(qb.value[1]);
					} else if (qb.value[0] != null && qb.value[0] != undefined) {
						if(qb.equal){
							sql += `${key}>=? ${conjuction} `;
						}else{
							sql += `${key}>? ${conjuction} `;
						}
						params.push(qb.value[0]);
					} else if (qb.value[1] != null && qb.value[1] != undefined) {
						if(qb.equal){
							sql += `${key}<=? ${conjuction} `;
						}else{
							sql += `${key}<? ${conjuction} `;
						}
						params.push(qb.value[1]);
					}
				} else {
					//开启模糊查询
					if (qb.fuzzy) {
						sql += `locate(?,${key})>0 ${conjuction} `;
					} else {
						sql += `${key}=? ${conjuction} `;
					}
					params.push(qb.value);
				}
			})
			const index = sql.lastIndexOf(conjuction);
			if (index > -1) {
				sql = sql.substring(0, index);
			} else {
				sql = sql.substring(0, sql.lastIndexOf("where"));
			}
			if (sortBy && sortMethod) {
				sql += `order by ${sortBy} ${sortMethod} `;
			}
			if (typeof(startIndex) == "number" && typeof(pageSize) == "number" && !isNaN(startIndex) && !isNaN(pageSize)) {
				sql += ` limit ?,? `;
				params.push(startIndex);
				params.push(pageSize);
			}
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
	 * 多条件查询的总记录数
	 * @param {Object} queryOptions 字段参数对象
	 * @param {Object} conjuction 连接词，取值and或者or 
	 */
	queryCounts(queryOptions,conjuction) {
		return new Promise((resolve, reject) => {
			var sql = `select count(1) from ${this.table}`;
			var params = [];
			sql += " where ";
			Object.keys(queryOptions).forEach(function(key, index) {
				var qb = {};
				if (typeof(queryOptions[key]) == "object") { //对象形式，则可能进行模糊查询或者范围查询
					qb.value = queryOptions[key].value;
					if(typeof(queryOptions[key].fuzzy) == 'boolean'){
						qb.fuzzy = queryOptions[key].fuzzy;
					}else{
						qb.fuzzy = false;
					}
					if(typeof(queryOptions[key].equal) == 'boolean'){
						qb.equal = queryOptions[key].equal;
					}else{
						qb.equal = true;
					}
				} else { //非对象形式，即直接根据字段-字段值进行查询
					qb.value = queryOptions[key];
					qb.fuzzy = false; //默认非模糊查询
					qb.equal = true;//默认范围查询时包含等号
				}
			
				//如果value值为数组，表示范围查询
				if (qb.value instanceof Array) {
					if (qb.value[0] != null && qb.value[1] != null && qb.value[0] != undefined && qb.value[1] != undefined) {
						if (qb.value[0] <= qb.value[1]) {
							if(qb.equal){
								sql += `(${key}>=? and ${key}<=?) ${conjuction} `;
							}else{
								sql += `(${key}>? and ${key}<?) ${conjuction} `;
							}
						} else {
							if(qb.equal){
								sql += `(${key}>=? or ${key}<=?) ${conjuction} `;
							}else{
								sql += `(${key}>? or ${key}<?) ${conjuction} `;
							}
						}
						params.push(qb.value[0]);
						params.push(qb.value[1]);
					} else if (qb.value[0] != null && qb.value[0] != undefined) {
						if(qb.equal){
							sql += `${key}>=? ${conjuction} `;
						}else{
							sql += `${key}>? ${conjuction} `;
						}
						params.push(qb.value[0]);
					} else if (qb.value[1] != null && qb.value[1] != undefined) {
						if(qb.equal){
							sql += `${key}<=? ${conjuction} `;
						}else{
							sql += `${key}<? ${conjuction} `;
						}
						params.push(qb.value[1]);
					}
				} else {
					//开启模糊查询
					if (qb.fuzzy) {
						sql += `locate(?,${key})>0 ${conjuction} `;
					} else {
						sql += `${key}=? ${conjuction} `;
					}
					params.push(qb.value);
				}
			})
			const index = sql.lastIndexOf(conjuction);
			if (index > -1) {
				sql = sql.substring(0, index);
			} else {
				sql = sql.substring(0, sql.lastIndexOf("where"));
			}
			pool.query(sql, params, (error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result[0]['count(1)'])
				}
			})
		})
	}
}

module.exports = SqlUtil;
