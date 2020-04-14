/**
 * 用户实体
 */
class User {
	
	constructor(user_id,user_account,user_password) {
		this.user_id = user_id;
		this.user_account = user_account;
		this.user_password = user_password;
	}
}

module.exports =  User;