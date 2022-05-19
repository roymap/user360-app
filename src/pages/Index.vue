<template>
    <div class="fixed-center">
        <h1>DirectAds</h1>

        <q-btn color="primary" @click="click('/login')">Sign-in</q-btn>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'IndexPage',
    methods: {
        click(url: string) {
            window.location.href = url;
        },
    },
});
</script>
