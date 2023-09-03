const OrdersService = require('../../servers/orders/OrdersService');
const url = require("url")
const JWT = require('../../utils/jwt');
const OordersController = {
    //获取库存表
    ordersList: async (req, res) => {
        let result = await OrdersService.ordersList(req.body);
        res.send({
            code: 200,
            msg: "成功",
            result
        })
    },
}
module.exports = OordersController