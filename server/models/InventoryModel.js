const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//user模型 ===> users集合
const InventoryType = {
  trade: String, //商品名
  fig: String, //商品图片
  Supply: Number, //进货价
  suggestion: Number, //建议零售价
  quantity: Number, //库存
  specification: String, //规格
  cTime: Number, //创建时间
};
const InventoryModel = mongoose.model("inventories", new Schema(InventoryType));
module.exports = InventoryModel;
