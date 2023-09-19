import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { CheckCircleOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/threejs',
    name: 'threejs',
    redirect: '/threejs/threejs',
    component: Layout,
    meta: {
      title: 'three展示',
      icon: renderIcon(CheckCircleOutlined),
      sort: 1,
    },
    children: [
      {
        path: 'threejs',
        name: 'threejs',
        meta: {
          title: 'three展示',
        },
        component: () => import('@/views/threejs/index.vue'),
      },
    ],
  },
];
export default routes;
