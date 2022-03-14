import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('src/layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/PageMain.vue') }],
  },

  {
    path: '/login',
    component: () => import('src/layouts/AuthLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageLogin.vue') },
      {
        path: '/register',
        component: () => import('src/pages/PageRegister.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
