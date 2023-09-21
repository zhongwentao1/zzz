const OrdersModel = require("../../models/OrdersModel");

const OrdersService = {
  //新增订单
  addOrders: async ({ cName, counterparties, amount, cDate }) => {
    return OrdersModel.create({
      cName,
      counterparties,
      amount,
      cDate,
    });
  },
  // insertMany 批量插入
  ordersList: async (params) => {
    const size =
      (params.page - 1 <= 0 ? 0 : params.page - 1) * (params.pageSize || 10);
    let result = {
      sizeField: params.pageSize,
      page: params.page,
      itemCount: 0,
    };
    result.itemCount = await OrdersModel.find().count();
    result.list = await OrdersModel.find()
      .skip(size)
      .limit(params.pageSize)
      .sort({ cDate: -1 });
    return result;
    /*  let arr = [];
    for (let i = 0; i < 57; i++) {
      arr.push({
        cName: "admin" + i,
        counterparties: "aaa" + i + Math.round(Math.random() * 100) / 100,
        amount: Math.round(Math.random() * 10000) / 10,
        cDate: new Date().getTime(),
      });
    }
    return await OrdersModel.insertMany(arr); */
  },

  //修改订单
  updateOrders: async ({ cName, counterparties, amount, cDate, _id }) => {
    return OrdersModel.updateOne(
      {
        _id,
      },
      {
        cName,
        counterparties,
        amount,
        cDate,
      }
    );
  },
  //删除订单
  delOrders: async ({ _id }) => {
    return OrdersModel.findOneAndRemove({ _id });
  },
};
module.exports = OrdersService;
