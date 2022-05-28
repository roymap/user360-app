<template>
    <div class="fixed-center">
        <img src="/User360.png" />
        <h1>User360</h1>
        <h2>Get a 360&deg; view of your customers</h2>

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
