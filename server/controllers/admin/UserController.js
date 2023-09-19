const UserService = require("../../servers/admin/UserService");
const url = require("url");
const JWT = require("../../utils/jwt");
var fs = require("fs");
var path = require("path");
const UserController = {
  //获取主控台信息
  getConsoleInfo: async (req, res) => {
    res.send({
      code: 200,
      msg: "成功",
    });
  },
  //添加用户
  createUser: async (req, res) => {
    console.log("req.body", req.body, req.file, req.files);
    let suffix = req.file.originalname.split(".")[1];
    let baseFileName = `/avataruploads/${req.file.filename}`;
    let op = path.resolve(__dirname, `../../public${baseFileName}`);
    let np = path.resolve(__dirname, `../../public${baseFileName}.${suffix}`);
    let params = req.body;
    params.avatar = `${baseFileName}.${suffix}`;
    fs.renameSync(op, np);
    let result = await UserService.createUser(params); //创建失败 不知道会返回什么 如果出现 在做处理
    res.send({
      code: 200,
      msg: "成功",
    });
  },
  //更新用户基本信息
  updateUserInfo: async (req, res) => {
    const { username, mobile, desc } = req.body;
    const avatar = `/avataruploads/${req.file.filename}` || "";

    const token = req.headers["authorization"].split(" ")[1];
    const payload = JWT.verify(token);
    let result = await UserService.updateUserInfo({
      _id: payload._id,
      username,
      mobile: Number(mobile),
      desc,
      avatar,
    });
    if (result) {
      res.send({
        code: 200,
        result: "成功",
      });
    } else {
      res.send({
        code: 409,
        result: "更新失败",
      });
    }
  },
  //是否注册
  isEnroll: async (req, res) => {
    let result = await UserService.isEnroll(req.body);
    res.send({
      code: result.length ? 200 : -1,
      msg: result.length ? "OK" : "用户不存在",
    });
  },
  login: async (req, res) => {
    //req.body
    let result = await UserService.login(req.body);
    if (result.length === 0) {
      res.send({
        code: "-1",
        msg: "用户名密码不匹配",
      });
    } else {
      //JWT登录生成token
      const token = JWT.generate(
        {
          _id: result[0]._id,
          username: result[0].username,
        },
        "10s"
      );
      res.header("Authorization", token);
      res.send({
        code: 200,
        msg: "ok",
        result: {
          token,
        },
        type: "success",
      });
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
        msg: "用户不存在",
      });
    } else {
      result = result[0];
      result.avatar = `http://localhost:8889${result.avatar}`;
      result.token = token;
      res.send({
        code: 200,
        msg: "ok",
        type: "success",
        result,
      });
    }
  },
};
module.exports = UserController;
