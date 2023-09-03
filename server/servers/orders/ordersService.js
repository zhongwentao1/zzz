const OrdersModel = require("../../models/OrdersModel")

const OrdersService = {
    // insertMany 批量插入
    ordersList: async (params) => {
        const size = (params.page - 1 <= 0 ? 0 : params.page - 1) * (params.pageSize || 10)
        let result = {
            sizeField: params.pageSize,
            page: params.page,
            itemCount: 0
        };
        result.itemCount = await OrdersModel.find().count()
        result.list = await OrdersModel.find().skip(size).limit(params.pageSize);
        return result
        // let arr = [];
        // for (let i = 0; i < 57; i++) {
        //     arr.push({
        //         "cName": "admin" + i,
        //         "Counterparties": "aaa" + i + Math.round(Math.random() * 100) / 100,
        //         "amount": Math.round(Math.random() * 10000) / 10,
        //         "cDate": `2023年09月0${Math.round(Math.random() * 10)}日0${Math.round(Math.random() * 10)}时12分56秒`,
        //     })

        // }
        // return await OrdersModel.insertMany(arr)
    },
}
module.exports = OrdersService