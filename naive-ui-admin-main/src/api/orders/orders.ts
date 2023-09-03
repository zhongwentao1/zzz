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
    url: '/api/Orders/ordersList',
    method: 'POST',
    params,
  });
}
