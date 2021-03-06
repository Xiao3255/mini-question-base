import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true,
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/admin_users/create',
        name: 'admin_users_create',
        component: () => import('../views/AdminUserEdit'),
      },
      {
        path: '/admin_users/list',
        name: 'admin_users_list',
        component: () => import('../views/AdminUserList'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    next('/login');
  } else {
    next();
  }
});
export default router;
