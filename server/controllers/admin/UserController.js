const UserService = require('../../servers/admin/UserService')
const JWT = require('../../utils/jwt')
const UserController = {
    login: async (req, res) => {
        //req.body
        let result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: "-1",
                msg: '用户名密码不匹配'
            })
        } else {
            console.log(result);

            //JWT登录生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "10s")
            res.header("Authorization", token)
            res.send({
                code: 200,
                msg: "ok",
                result: {
                    token
                },
                type: "success"

            })
        }
    },
    getUserInfo: async (req, res) => {
        //req.body

        let result = await UserService.getUserInfo(req.body);
        console.log(result);
        if (result.length === 0) {
            res.send({
                code: "-1",
                msg: '用户不存在'
            })
        } else {
            console.log(result);
            res.send({
                code: 200,
                msg: "ok",
                type: "success"

            })
        }
    }
}
module.exports = UserController