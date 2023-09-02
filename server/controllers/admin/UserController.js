const UserService = require('../../servers/admin/UserService');
const url = require("url")
const JWT = require('../../utils/jwt');
const UserController = {
    //获取主控台信息
    getConsoleInfo: async (req, res) => {
        res.send({
            code: 200,
            msg: "成功"
        })
    },
    //更新用户基本信息
    updateUserInfo: async (req, res) => {
        const {
            username,
            mobile,
            desc,
        } = req.body;

        // const avatar = `/avataruploads/${req.file.filename}`
        const token = req.headers["authorization"].split(" ")[1];
        const payload = JWT.verify(token);
        let result = await UserService.updateUserInfo({
            _id: payload._id,
            username,
            mobile: Number(mobile),
            desc,
            // avatar,
        })

        res.send({
            code: 200,
            result: "成功"
        })
    },
    //是否注册
    isEnroll: async (req, res) => {
        let result = await UserService.isEnroll(req.body);
        res.send({
            code: result.length ? 200 : -1,
            msg: result.length ? "OK" : "用户不存在"
        })
    },
    login: async (req, res) => {
        //req.body
        let result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: "-1",
                msg: '用户名密码不匹配'
            })
        } else {

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
    //获取用户信息
    getUserInfo: async (req, res) => {
        const token = req.headers["authorization"].split(" ")[1];
        const payload = JWT.verify(token);
        let result = await UserService.getUserInfo(payload._id);

        if (result.length === 0) {
            res.send({
                code: "200",
                msg: '用户不存在',
            })
        } else {

            result = result[0]
            result.token = token
            res.send({
                code: 200,
                msg: "ok",
                type: "success",
                result
            })
        }
    }
}
module.exports = UserController