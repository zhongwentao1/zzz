var express = require('express');
const multer = require("multer")
const upload = multer({
    dest: 'public/avataruploads/'
})
const OrdersController = require('../../controllers/orders/OrdersController')
var ordersRouter = express.Router();
ordersRouter.post("/Orders/ordersList", OrdersController.ordersList); //获取库存列表
module.exports = ordersRouter;