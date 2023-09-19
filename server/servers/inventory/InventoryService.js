const InventoryModel = require("../../models/InventoryModel");

const InventoryService = {
  //判断商品是否存在
  getInventory: async ({ trade }) => {
    return InventoryModel.find({ trade });
  },
  //新增商品
  addInventory: async ({
    trade,
    Supply,
    suggestion,
    quantity,
    specification = "",
    cTime,
  }) => {
    return InventoryModel.create({
      trade,
      Supply: Number(Supply),
      suggestion: Number(suggestion),
      quantity: Number(quantity),
      specification,
      cTime,
    });
  },
  // 获取所有商品  insertMany 批量插入
  inventoryList: async (params) => {
    const size =
      (params.page - 1 <= 0 ? 0 : params.page - 1) * (params.pageSize || 10);
    let result = {
      sizeField: params.pageSize,
      page: params.page,
      itemCount: 0,
    };
    result.itemCount = await InventoryModel.find().count();
    result.list = await InventoryModel.find()
      .skip(size)
      .limit(params.pageSize)
      .sort({ cTime: -1 });
    return result;
    // let arr = [];
    // for (let i = 0; i < 10; i++) {
    //   arr.push({
    //     trade: "糖玩" + 2 + i,
    //     fig: "",
    //     Supply: Math.round(Math.random() * 100) / 100,
    //     suggestion: Math.round(Math.random() * 100) / 100,
    //     quantity: Math.round(Math.random() * 100),
    //     specification: "18*24",
    //     cTime: new Date().getTime(),
    //   });
    // }
    // return await InventoryModel.insertMany(arr);
  },
  //修改商品
  updateInventory: async ({
    trade,
    fig,
    Supply,
    suggestion,
    quantity,
    specification,
    cTime,
    _id,
  }) => {
    return InventoryModel.updateOne(
      {
        _id,
      },
      {
        trade,
        fig,
        Supply,
        suggestion,
        quantity,
        cTime,
        specification,
      }
    );
  },
  //删除商品
  delInventory: async ({ _id }) => {
    return InventoryModel.findOneAndRemove({ _id });
  },
};
module.exports = InventoryService;
