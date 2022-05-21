<template>
    <q-page class="dashboard-page">
        <h1>
            Dashboard
            <q-icon size="xs" color="grey" name="help_outline">
                <q-tooltip class="border bg-grey-1 text-grey-10">
                    A summary of statistics and important numbers<br />
                    for you to quickly review
                </q-tooltip>
            </q-icon>
        </h1>

        <div class="row q-gutter-md">
            <div class="col">
                <dashboard-stat
                    title="Revenue"
                    link="/app/orders"
                    :stat="{ thisMonth: 14233.42, lastMonth: 14002, isMoney: true }"
                />
            </div>
            <div class="col">
                <dashboard-stat title="Orders" link="/app/orders" :stat="{ thisMonth: 1833, lastMonth: 3102 }" />
            </div>
            <div class="col">
                <dashboard-stat title="Products" link="/app/products" :stat="{ thisMonth: 233, lastMonth: 230 }" />
            </div>
        </div>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@vueuse/head';
import DashboardStat from '../components/DashboardStat.vue';

export default defineComponent({
    name: 'DashboardPage',
    components: { DashboardStat },
    setup() {
        useHead({
            title: 'DirectAds | Dashboard',
        });
        return {};
    },
});
</script>

<style>
.q-page h1 {
    margin-top: 0;
    font-size: 28px;
    font-family: Google Sans, Roboto, Arial, sans-serif;
    padding-top: 0;
    line-height: initial;
}
.border {
    border: 1px solid #0000001f;
}

.dashboard-page .q-card .header {
    font-size: 0.9rem;
    font-weight: bold;
}
</style>
