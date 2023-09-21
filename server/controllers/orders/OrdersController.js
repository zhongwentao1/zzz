const OrdersService = require("../../servers/orders/OrdersService");
const url = require("url");
const JWT = require("../../utils/jwt");
const OordersController = {
  //获取库存表
  ordersList: async (req, res) => {
    let result = await OrdersService.ordersList(req.body);
    res.send({
      code: 200,
      msg: "成功",
      result,
    });
  }, //新增库存表
  addOrders: async (req, res) => {
    let result = await OrdersService.addOrders(req.body);
    console.log("result", result);
    res.send({
      code: 200,
      msg: "成功",
      result,
    });
  },
  updateOrders: async (req, res) => {
    let result = await OrdersService.updateOrders(req.body);
    res.send({
      code: result.matchedCount === 1 ? 200 : -1,
      msg: result.matchedCount === 1 ? "更新成功" : "更新失败",
    });
  },
  delOrders: async (req, res) => {
    let result = await OrdersService.delOrders(req.body);
    res.send({
      code: result ? 200 : -1,
      msg: result ? "成功删除" : "删除失败",
      result,
    });
  },
};

module.exports = OordersController;
