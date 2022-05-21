import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { route } from 'quasar/wrappers';

import { sleep } from '../services/utils';
import { useUserSession } from '../stores/user';
import routes from './routes';

declare module 'vue-router' {
    interface RouteMeta {
        // must be declared by every route
        noAuth?: boolean;
    }
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : process.env.VUE_ROUTER_MODE === 'history'
        ? createWebHistory
        : createWebHashHistory;

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    Router.beforeEach(async (to) => {
        // console.log(`route ${to.fullPath} from ${from.fullPath}`);
        // instead of having to check every route record with
        // to.matched.some(record => record.meta.requiresAuth)
        if (!to.meta.noAuth) {
            while (!useUserSession().isLoggedIn) {
                // console.log('store is not initialized in beforeRoute', Store);
                await sleep(100);
            }

            if (!useUserSession().token) {
                // console.log(
                //     'no token in before route',
                //     !!Store.initialized(),
                //     JSON.stringify(Store.getState())
                // );

                console.warn('no authenticated');

                // this route requires auth, check if logged in
                // if not, redirect to login page.
                return {
                    path: '/login',
                    // save the location we were at to come back later
                    query: { redirect: to.fullPath },
                };
            } else {
                // await PROJECTS.loadProjects();
            }
        }
    });
    return Router;
});
