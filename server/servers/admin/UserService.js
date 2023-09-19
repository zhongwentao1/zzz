const UserModel = require("../../models/UserModel");

const UserService = {
  updateUserInfo: async ({ _id, username, mobile, desc, avatar }) => {
    return UserModel.updateOne(
      {
        _id,
      },
      {
        username,
        mobile,
        desc,
        avatar,
      }
    );
  },
  isEnroll: async ({ username }) => {
    return UserModel.find({
      username,
    });
  },
  login: async ({ username, password }) => {
    return UserModel.find({
      username,
      password,
    });
  },
  getUserInfo: async (_id) => {
    return UserModel.find({
      _id,
    });
  },
  createUser: async ({ username, password, desc = " ", avatar, mobile }) => {
    return UserModel.create({
      username,
      password,
      desc,
      avatar,
      mobile: Number(mobile),
    });
  },
};
module.exports = UserService;
