import { boot } from 'quasar/wrappers';
import { createPinia } from 'pinia';

export default boot(({ app }) => {
    console.log('boot.pinia');

    app.use(createPinia());
});
