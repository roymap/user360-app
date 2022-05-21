<template>
    <!-- <q-layout view="lHh Lpr lFf" class="img-background"> -->
    <!-- <q-page-container class="container-fluid"> -->
    <router-view />
    <!-- </q-page-container> -->
    <!-- </q-layout> -->
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BlankLayout',

    data() {
        return {
            dark: false,
        };
    },

    setup() {
        const $q = useQuasar();

        $q.dark.set(false);
    },
});
</script>

<style>
::-webkit-scrollbar {
    display: none;
}
.img-background {
    /* background: #fff url(../statics/background-img.jpg); */
    /* Full height */
    height: 100%;
    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: solid 1px black;
}
</style>
