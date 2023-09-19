var express = require("express");
const multer = require("multer");
const upload = multer({
  dest: "public/images/",
});
const InventoryController = require("../../controllers/inventory/InventoryController");
var InventoryRouter = express.Router();
InventoryRouter.get(
  "/adminapi/Inventory/getInventory",
  upload.single("file"),
  InventoryController.getInventory
); //判断商品是否存在
InventoryRouter.post(
  "/adminapi/Inventory/inventoryList",
  InventoryController.inventoryList
); //获取库存列表
InventoryRouter.post(
  "/adminapi/Inventory/addInventory",
  upload.single("file"),
  InventoryController.addInventory
); //新增商品
InventoryRouter.post(
  "/adminapi/Inventory/updateInventory",
  InventoryController.updateInventory
); //修改商品
InventoryRouter.post(
  "/adminapi/Inventory/delInventory",
  InventoryController.delInventory
); //删除商品
module.exports = InventoryRouter;
