import { boot } from 'quasar/wrappers';
import { createHead } from '@vueuse/head';

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

export default boot(({ app }) => {
    console.log('boot.head');

    const head = createHead();
    app.use(head);
});
