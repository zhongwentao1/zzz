import { http } from '@/utils/http/axios';

export interface BasicResponseModel<T = any> {
  permissions: string[];
  msg: any;
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
 * @description: 检验用户用是否重复
 */
export async function isEnroll(params: { username: string }) {
  return http.request<BasicResponseModel<string>>(
    {
      url: '/api/adminapi/is_enroll',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
/**
 * @description: 获取用户信息
 */
export async function getUserInfo() {
  return http.request<BasicResponseModel>(
    {
      url: '/api/adminapi/admin_info',
      method: 'GET',
    },
    {
      isTransformResponse: false,
      joinParamsToUrl: false,
    }
  );
}

/**
 * @description: 用户登录
 */
export function login(params) {
  return http.request<BasicResponseModel>(
    {
      url: '/api/adminapi/user/login',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
      withToken: false,
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
/**
 * @description: 用户基本信息修改
 */

export function updateUserInfo(params) {
  return http.request(
    {
      url: '/api/adminapi/user/updateUserInfo',
      method: 'POST',
      params,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}
