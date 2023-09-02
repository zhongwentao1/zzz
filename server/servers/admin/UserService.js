const UserModel = require("../../models/UserModel")

const UserService = {
    updateUserInfo: async ({
        _id,
        username,
        mobile,
        desc,
        avatar
    }) => {
        console.log(_id);
        return UserModel.updateOne({
            _id
        }, {
            username,
            mobile,
            desc,
            avatar
        })
    },
    isEnroll: async ({
        username
    }) => {
        return UserModel.find({
            username,
        })
    },
    login: async ({
        username,
        password
    }) => {
        return UserModel.find({
            username,
            password
        })
    },
    getUserInfo: async (_id) => {
        return UserModel.find({
            _id
        })
    }
}
module.exports = UserService