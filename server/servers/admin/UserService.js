const UserModel = require("../../models/UserModel")

const UserService = {
    login: async ({
        username,
        password
    }) => {
        return UserModel.find({
            username,
            password
        })
    },
    getUserInfo: async ({
        username
    }) => {
        return UserModel.find({
            username
        })
    }
}
module.exports = UserService