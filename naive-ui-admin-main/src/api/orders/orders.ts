import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  msg?: string;
  code: number;
  result?: T;
}
/**
 * @description: 获取订单表
 */
export async function ordersList(params: { trade?: string; _id?: string }) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Orders/ordersList',
    method: 'POST',
    params,
  });
}

//新增订单
export async function addOrders(params) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Orders/addOrders',
    method: 'POST',
    params,
  });
}
//修改订单
export async function updateOrders(params) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Orders/updateOrders',
    method: 'POST',
    params,
  });
}
//删除订单
export async function delOrders(params) {
  return http.request<BasicResponseModel<string>>({
    url: '/api/adminapi/Orders/delOrders',
    method: 'POST',
    params,
  });
}
