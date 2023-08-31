const UserModel = require("../../models/UserModel")

const UserService = {
    uploadUserInfo: async ({}) => {

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
        console.log('_id', _id);
        return UserModel.find({
            _id
        })
    }
}
module.exports = UserService