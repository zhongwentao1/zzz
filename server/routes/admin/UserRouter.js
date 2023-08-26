var express = require('express');
const UserController = require('../../controllers/admin/UserController')
var UserRouter = express.Router();

/* GET home page.  之前一直报500的错误 应该是链接数据库超时 在验证用户名密码时,因为数据库一条数据没有 所以一直超时 只要建好一个数据集 就没问题了*/
UserRouter.post("/adminapi/user/login", UserController.login);
UserRouter.get("/adminapi/admin_info", UserController.getUserInfo);

module.exports = UserRouter;