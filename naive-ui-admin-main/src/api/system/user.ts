import { http } from '@/utils/http/axios';
import axios from 'axios';
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}

export interface BasicPageParams {
  pageNumber: number;
  pageSize: number;
  total: number;
}

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return axios.get('/adminapi/admin_info').then((res) => {
    console.log(res.data);
    return res.data;
  });
  return http.request({
    url: '/adminapi/admin_info',
    method: 'get',
  });
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return axios.post('/adminapi/user/login', params).then((res) => {
    console.log(res.data);
    return res.data;
  });
  return http.request<BasicResponseModel>(
    {
      url: '/adminapi/user/login',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户修改密码
 */
export function changePassword(params, uid) {
  return http.request(
    {
      url: `/user/u${uid}/changepw`,
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

/**
 * @description: 用户登出
 */
export function logout(params) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params,
  });
}
