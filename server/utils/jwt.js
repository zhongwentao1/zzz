//jwt 验证
const jsonwebtoken = require("jsonwebtoken");
const secret = 'zzz'
const JWT = {
    generate(value, expires) { //value :token  expires:过期时间
        return jsonwebtoken.sign(value, secret, {
            expiresIn: expires || "1d"
        })
    },
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (error) {
            return false
        }
    }
}

module.exports = JWT