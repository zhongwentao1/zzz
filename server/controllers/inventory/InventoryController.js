const InventoryService = require("../../servers/inventory/InventoryService");
const url = require("url");
const JWT = require("../../utils/jwt");
const InventoryController = {
  //获取库存表
  inventoryList: async (req, res) => {
    let result = await InventoryService.inventoryList(req.body);
    res.send({
      code: 200,
      msg: "成功",
      result,
    });
  },
  //判断商品是否存在
  getInventory: async (req, res) => {
    let result = await InventoryService.getInventory(req.query);
    res.send({
      code: result.length ? 200 : -1,
      msg: result,
    });
  },
  //新增库存表
  addInventory: async (req, res) => {
    let result = await InventoryService.addInventory(req.body);
    console.log("result", result);
    res.send({
      code: 200,
      msg: "成功",
      result,
    });
  },
  updateInventory: async (req, res) => {
    let result = await InventoryService.updateInventory(req.body);
    res.send({
      code: result.matchedCount === 1 ? 200 : -1,
      msg: result.matchedCount === 1 ? "更新成功" : "更新失败",
    });
  },
  delInventory: async (req, res) => {
    let result = await InventoryService.delInventory(req.body);
    res.send({
      code: result ? 200 : -1,
      msg: result ? "成功删除" : "删除失败",
      result,
    });
  },
};
module.exports = InventoryController;
