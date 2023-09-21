var express = require("express");
const multer = require("multer");
const upload = multer({
  dest: "public/avataruploads/",
});
const OrdersController = require("../../controllers/orders/OrdersController");
var ordersRouter = express.Router();
ordersRouter.post("/adminapi/Orders/ordersList", OrdersController.ordersList); //获取库存列表
ordersRouter.post("/adminapi/Orders/addOrders", OrdersController.addOrders); //新增订单
ordersRouter.post(
  "/adminapi/Orders/updateOrders",
  OrdersController.updateOrders
); //修改订单
ordersRouter.post("/adminapi/Orders/delOrders", OrdersController.delOrders); //删除订单
module.exports = ordersRouter;
