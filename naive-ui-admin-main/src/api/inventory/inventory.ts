import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  msg?: string;
  code: number;
  result?: T;
}

/**
 * @description: 检验用户用是否重复
 */
export async function inventoryList(params: { trade?: string; _id?: string }) {
  return http.request<BasicResponseModel<string>>(
    {
      url: '/api/Inventory/inventoryList',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: true,
    }
  );
}
