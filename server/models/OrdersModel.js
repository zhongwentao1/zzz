const mongoose = require("mongoose");

const Schema = mongoose.Schema;
//user模型 ===> users集合
const OrdersType = {
   cName: String, //创建者
   Counterparties: String, //交易方
   amount: Number, //交易金额
   cDate: String, //创建时间
}
const OrdersModel = mongoose.model("orders", new Schema(OrdersType))
module.exports = OrdersModel