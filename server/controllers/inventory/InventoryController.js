const InventoryService = require('../../servers/inventory/InventoryService');
const url = require("url")
const JWT = require('../../utils/jwt');
const InventoryController = {
    //获取库存表
    inventoryList: async (req, res) => {
        let result = await InventoryService.inventoryList(req.body);
        res.send({
            code: 200,
            msg: "成功",
            result
        })
    },
}
module.exports = InventoryController