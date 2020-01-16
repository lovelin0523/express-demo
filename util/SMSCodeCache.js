/**
 * 短信验证码缓存方法
 */
class SMSCodeCache {
	constructor() {
		this.timer = 2; //过期时间默认为2分
		this.map = {}; //数据集合
	}
	//设置值
	set(key, value) {
		this.map[key] = value;
		setTimeout(() => {
			delete this.map[key];
		}, this.timer * 60 * 1000)
	}

	//读取值
	get(key) {
		return this.map[key];
	}
}

const sc = new SMSCodeCache();

module.exports = sc;
