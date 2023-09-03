import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/orders',
    name: 'ordersSys',
    redirect: '/orders/orders',
    component: Layout,
    meta: {
      title: '订单管理',
      icon: renderIcon(CheckCircleOutlined),
      sort: 1,
    },
    children: [
      {
        path: 'orders',
        name: 'orders',
        meta: {
          title: '订单表',
        },
        component: () => import('@/views/orders/index.vue'),
      },
    ],
  },
];
export default routes;
