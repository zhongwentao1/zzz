var express = require('express');
const multer = require("multer")
const upload = multer({
    dest: 'public/avataruploads/'
})
const InventoryController = require('../../controllers/inventory/InventoryController')
var InventoryRouter = express.Router();
InventoryRouter.post("/Inventory/inventoryList", InventoryController.inventoryList); //获取库存列表
module.exports = InventoryRouter;