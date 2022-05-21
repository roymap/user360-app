<template>
    <q-page>
        <h1>
            Products
            <q-icon size="xs" color="grey" name="help_outline">
                <q-tooltip class="border bg-grey-1 text-grey-10">
                    An "ad product" is what you are selling to a buyer. It is a combination of pricing, targeting, and other
                    options.
                </q-tooltip>
            </q-icon>
        </h1>

        <q-table
            row-key="id"
            style="height: 400px"
            :columns="columns"
            :rows="products"
            :filter="filter"
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            :loading="loading"
            selection="multiple"
            v-model:selected="selected"
        >
            <template v-slot:top>
                <q-btn v-if="selected.length === 0" color="primary" :disable="loading" label="Add" to="/app/products/new" />

                <q-btn v-if="selected.length !== 0" color="primary" label="Archive" />

                <q-space />
                <q-input dense debounce="300" color="primary" v-model="filter">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
        </q-table>
    </q-page>
</template>

<script lang="ts">
import { useHead } from '@vueuse/head';
import { defineComponent, ref } from 'vue';

import { IProduct } from '../models/UnifiedAds';
import { money } from '../services/utils';
import { useProductStore } from '../stores/products';
// import { useUserSession } from '../stores/user';
import { loading } from '../services/api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: any = [
    {
        name: 'name',
        required: true,
        label: 'Name',
        align: 'left',
        field: 'name',
        // field: (row:any) => row.name,
        // format: (val: IProduct) => `<a to="/app/products/${val.id}>${val.name}</a>`,
        sortable: true,
    },
    {
        name: 'size',
        // required: true,
        label: 'Size',
        align: 'left',
        // field: 'name',
        field: (row: IProduct) => `${row.size.width}x${row.size.height}`,
        // format: (val) => `${val}`,
        sortable: true,
    },
    {
        name: 'pricing',
        label: 'Pricing',
        align: 'left',
        sortable: true,
        field: (row: IProduct) => `${money(row.price)} ${row.pricingModel}`,
    },
];

export default defineComponent({
    name: 'ProductsPage',
    components: {},
    setup() {
        useHead({
            title: 'DirectAds | Products',
        });
        return {};
    },
    computed: {
        products: () => useProductStore().get,
    },
    data() {
        return {
            selected: ref([]),
            filter: '',
            loading: loading, // ref(useUserSession().loading),

            columns,
            pagination: ref({
                rowsPerPage: 20,
            }),
        };
    },
    mounted() {
        useProductStore().fetch();
    },
});
</script>
