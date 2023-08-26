import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/result',
    name: 'Result',
    redirect: '/result/success',
    component: Layout,
    meta: {
      title: '结果页面',
      icon: renderIcon(CheckCircleOutlined),
      sort: 1,
    },
    children: [
      {
        path: 'success',
        name: 'result-success',
        meta: {
          title: 'ceshiye',
        },
        component: () => import('@/views/result/success.vue'),
      },
    ],
  },
];
export default routes;
