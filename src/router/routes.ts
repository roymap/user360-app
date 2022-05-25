import { RouteRecordRaw } from 'vue-router';
import { MENU } from '../../menu';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue') },
            { path: 'login', component: () => import('pages/Login.vue') },
        ],
        meta: {
            noAuth: true,
        },
    },
    {
        path: '/app',
        component: () => import('layouts/MainLayout.vue'),
        redirect: '/app/dashboard',
        children: [
            // { path: 'products/:id', component: () => import('pages/ProductEdit.vue') },
            // { path: 'orders', component: () => import('pages/Orders.vue') },
        ],
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

MENU.forEach((menu) => {
    if (menu.page && menu.route) {
        console.log('menu', menu.route.replace('/app/', ''));
        routes[1].children?.push({
            path: menu.route.replace('/app/', ''),
            component: () => menu.page,
        });
    }
});

routes[1].children?.push({
    path: 'products/:id',
    component: () => import('pages/ProductEdit.vue'),
});
// const productRoute = routes[1].children!.find((r) => r.path === 'products');
// if (productRoute) {
//     console.log('found product route', productRoute);
//     productRoute.children = productRoute.children || [];
//     productRoute.children.push({
//         path: ':id',
//         component: () => import('pages/ProductEdit.vue'),
//     });
// }

export default routes;
