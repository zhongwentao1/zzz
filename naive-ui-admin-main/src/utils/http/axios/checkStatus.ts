import { PageEnum } from '@/enums/pageEnum';
import router from '@/router';
import { storage } from '@/utils/Storage';

export function checkStatus(status: number, msg: string): void {
  const LoginPath = PageEnum.BASE_LOGIN;
  const $dialog = window['$dialog'];
  const $message = window['$message'];
  switch (status) {
    case 400:
      $message.error(msg);
      break;
    // 401: 未登录
    // 未登录则跳转登录页面，并携带当前页面的路径
    // 在登录成功后返回当前页面，这一步需要在登录页操作。
    case 401:
      // $message.error('用户没有权限（令牌、用户名、密码错误）!');
      const LoginName = PageEnum.BASE_LOGIN_NAME;
      if (router.currentRoute.value?.name === LoginName) return;
      // 到登录页

      $dialog.warning({
        title: '提示',
        content: '登录身份已失效，请重新登录!',
        positiveText: '确定',
        //negativeText: '取消',
        closable: false,
        maskClosable: false,
        onPositiveClick: () => {
          storage.clear();
          window.location.href = LoginPath;
        },
        onNegativeClick: () => {},
      });
      break;
    case 403:
      $message.error('用户得到授权，但是访问是被禁止的。!');
      break;
    // 404请求不存在
    case 404:
      $message.error('网络请求错误，未找到该资源!');
      break;
    case 405:
      $message.error('网络请求错误，请求方法未允许!');
      break;
    case 408:
      $message.error('网络请求超时');
      break;
    case 500:
      // $message.error('服务器错误,请联系管理员!');
      $dialog.warning({
        title: '提示',
        content: '服务器错误,请联系管理员!',
        positiveText: '确定',
        //negativeText: '取消',
        closable: false,
        maskClosable: false,
        onPositiveClick: () => {
          storage.clear();
          window.location.href = LoginPath;
        },
        onNegativeClick: () => {},
      });

      break;
    case 501:
      $message.error('网络未实现');
      break;
    case 502:
      $message.error('网络错误');
      break;
    case 503:
      $message.error('服务不可用，服务器暂时过载或维护!');
      break;
    case 504:
      $message.error('网络超时');
      break;
    case 505:
      $message.error('http版本不支持该请求!');
      break;
    default:
      $message.error(msg);
  }
}
