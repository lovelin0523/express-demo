/**
 * 登录拦截器
 */
class LoginFilter {
	constructor() {
		this.routes = [
			'/api/user/getUser',
			'/api/user/modifyPassword',
			'/api/user/authAdmin'
		]
	}
	
	//用户登录路径拦截
	doFilter(route){
		if(this.routes.includes(route)){
			return true;
		}else{
			return false;
		}
	}
}

module.exports = new LoginFilter()