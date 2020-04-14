/**
 * 登录拦截器
 */
class LoginFilter {
	constructor() {
		//需要登陆拦截的路径地址数组
		this.routes = [
			''
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