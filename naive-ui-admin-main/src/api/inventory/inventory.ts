import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  msg?: string;
  code: number;
  result?: T;
}

/* *
 * @description: 商品接口
 */
//获取所有商品
export async function inventoryList(params: { trade?: string; _id?: string }) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Inventory/inventoryList',
    method: 'POST',
    params,
  });
}
//判断商品名是否存在
export async function getInventory(params) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Inventory/getInventory',
    method: 'GET',
    params,
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
}
//新增商品
export async function addInventory(params) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Inventory/addInventory',
    method: 'POST',
    params,
  });
}
//修改商品
export async function updateInventory(params) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Inventory/updateInventory',
    method: 'POST',
    params,
  });
}
//删除商品
export async function delInventory(params) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Inventory/delInventory',
    method: 'POST',
    params,
  });
}
