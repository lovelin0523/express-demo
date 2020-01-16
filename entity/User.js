/**
 * 用户实体
 */
class User {
	
	constructor(user_id,user_account,user_password,user_sex,user_birth,user_identity,user_regist_date,user_login_date) {
		this.user_id = user_id;
		this.user_account = user_account;
		this.user_password = user_password;
		this.user_sex = user_sex;
		this.user_birth = user_birth;
		this.user_identity = user_identity;
		this.user_regist_date = user_regist_date;
		this.user_login_date = user_login_date;
	}
	
	
	
}

module.exports =  User;