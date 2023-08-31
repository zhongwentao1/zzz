import { http } from '@/utils/http/axios';
import { BasicResponseModel } from '../system/user';

//获取主控台信息
export async function getConsoleInfo() {
  return http.request(
    {
      url: 'api/adminapi/dashboard/console',
      method: 'GET',
    },
    {
      isTransformResponse: false,
    }
  );
}
export async function getUserInfo() {
  return http.request<BasicResponseModel>(
    {
      url: 'api/adminapi/admin_info',
      method: 'GET',
    },
    {
      isTransformResponse: false,
    }
  );
}
