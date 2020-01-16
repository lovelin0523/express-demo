//自定义异常
class TokenError extends Error {
	constructor(message) {
		super(message);
		this.message = message;
		this.name = "TokenError";
	}
}

module.exports = TokenError;
