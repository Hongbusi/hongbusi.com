import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

import './index.css';
import NProgress from 'nprogress';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: () => import('@/views/index.vue') }
  ]
});

router.beforeEach(() => { NProgress.start() });
router.afterEach(() => { NProgress.done() });

const app = createApp(App);
app.use(router);
app.mount('#app');
