import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/inventory',
    name: 'inventorySys',
    redirect: '/inventory/inventory',
    component: Layout,
    meta: {
      title: '库存管理',
      icon: renderIcon(CheckCircleOutlined),
      sort: 0,
    },
    children: [
      {
        path: 'inventory',
        name: 'inventory',
        meta: {
          title: '库存表',
        },
        component: () => import('@/views/inventory/index.vue'),
      },
    ],
  },
];
export default routes;
