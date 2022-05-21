<template>
    <q-page>
        <h1>
            Orders
            <q-icon size="xs" color="grey" name="help_outline">
                <q-tooltip class="border bg-grey-1 text-grey-10">
                    A summary of statistics and important numbers<br />
                    for you to quickly review
                </q-tooltip>
            </q-icon>
        </h1>
    </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useHead } from '@vueuse/head';

export default defineComponent({
    name: 'OrdersPage',
    components: {},
    setup() {
        useHead({
            title: 'DirectAds | Orders',
        });
        return {};
    },
});
</script>
