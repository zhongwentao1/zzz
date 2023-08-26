const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//user模型 ===> users集合
const userType = {
    username: String, //用户名
    passWord: String, //密码
    gender: Number, //性别 0 1 2 
    desc: String, //简介
    avatar: String, //头像
    role: Number, //权限 或者说 身份
    permissions: Array, //路由权限
}
const UserModel = mongoose.model("user", new Schema(userType))
module.exports = UserModel