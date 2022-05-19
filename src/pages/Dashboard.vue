<template>
    <q-page class="q-pa-md">
        <h1>
            Dashboard
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
    name: 'DashboardPage',
    components: {},
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
</style>
