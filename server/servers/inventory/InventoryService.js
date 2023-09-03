const InventoryModel = require("../../models/InventoryModel")

const InventoryService = {
    // insertMany 批量插入
    inventoryList: async (params) => {
        const size = (params.page - 1 <= 0 ? 0 : params.page - 1) * (params.pageSize || 10)
        let result = {
            sizeField: params.pageSize,
            page: params.page,
            itemCount: 0
        };
        result.itemCount = await InventoryModel.find().count()
        result.list = await InventoryModel.find().skip(size).limit(params.pageSize);
        return result
        // let arr = [];
        // for (let i = 0; i < 10; i++) {
        //     arr.push({
        //         "trade": "糖玩" + 2 + i,
        //         "fig": "",
        //         "Supply": Math.round(Math.random() * 100) / 100,
        //         "suggestion": Math.round(Math.random() * 100) / 100,
        //         "quantity": Math.round(Math.random() * 100),
        //         "specification": "18*24",
        //     })

        // }
        // return await InventoryModel.insertMany(arr)
    },
}
module.exports = InventoryService