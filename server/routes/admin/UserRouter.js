var express = require('express');
const multer = require("multer")
const upload = multer({
    dest: 'public/avataruploads/'
})
const UserController = require('../../controllers/admin/UserController')
var UserRouter = express.Router();

/* GET home page.  之前一直报500的错误 应该是链接数据库超时 在验证用户名密码时,因为数据库一条数据没有 所以一直超时 只要建好一个数据集 就没问题了*/
UserRouter.post("/adminapi/user/login", UserController.login); //用户登录
UserRouter.get("/adminapi/admin_info", UserController.getUserInfo); //获取用户信息
UserRouter.post("/adminapi/is_enroll", UserController.isEnroll); //校验用户名是否重复
UserRouter.post("/adminapi/user/updateUserInfo", upload.single('file'), UserController.updateUserInfo); //更新用户信息
UserRouter.post("/adminapi/dashboard/console", UserController.getConsoleInfo); //获取主控台信息

module.exports = UserRouter;