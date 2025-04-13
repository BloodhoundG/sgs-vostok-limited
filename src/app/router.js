import { createWebHistory, createRouter } from 'vue-router';

import Form from '../pages/Form.vue';
import Result from '../pages/Result.vue';

const routes = [
    { path: '/', component: Form },
    { path: '/result', component: Result },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
