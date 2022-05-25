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
            :rows="filterTable(products)"
            virtual-scroll
            v-model:pagination="pagination"
            :rows-per-page-options="[0]"
            :loading="loading"
            selection="multiple"
            v-model:selected="selected"
        >
            <template v-slot:body-cell-status="props">
                <q-td :props="props">
                    <div>
                        <q-badge :color="props.value === 'Active' ? 'green' : 'red'" :label="props.value" />
                    </div>
                </q-td>
            </template>

            <template v-slot:body-cell-tags="props">
                <q-td :props="props">
                    <q-badge v-for="tag in props.value" v-bind:key="tag" :label="tag" />
                </q-td>
            </template>

            <template v-slot:top="props">
                <q-btn v-if="selected.length === 0" color="primary" :disable="loading" label="Add" to="/app/products/new" />

                <div class="q-gutter-md">
                    <q-btn v-if="selected.length === 1" color="primary" label="Edit" :to="`/app/products/${selected[0].id}`" />

                    <q-btn
                        v-if="selected.length && hasArchived()"
                        color="primary"
                        :label="`Unarchive${selected.length > 1 ? ' All' : ''}`"
                    />
                    <q-btn
                        v-if="selected.length && hasActive()"
                        color="primary"
                        :label="`Archive${selected.length > 1 ? ' All' : ''}`"
                    />
                </div>

                <q-space />

                <q-btn
                    flat
                    round
                    dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    class="q-mr-xl"
                />

                <q-option-group
                    v-model="archivedFilter"
                    inline
                    class="q-mr-xl"
                    :options="[
                        { label: 'All', value: 'all' },
                        { label: 'Active', value: '' },
                        { label: 'Archived', value: 'archived' },
                    ]"
                />

                <q-input dense debounce="300" color="primary" v-model="filter">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <!-- </div> -->
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
    {
        name: 'tags',
        label: 'Tags',
        aligh: 'left',
        field: 'tags',
    },
    {
        name: 'status',
        label: 'Status',
        aligh: 'left',
        sortable: true,
        field: 'archived',
        format: (val: boolean) => (val ? 'Archived' : 'Active'),
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
    watch: {
        archivedFilter() {
            this.filter = this.filter + '';
        },
    },
    methods: {
        filterTable(rows: IProduct[]) {
            // console.log('filterTable');
            const terms = this.filter.toLowerCase();

            return rows.filter((row) => {
                if (this.archivedFilter === '' && row.archived) {
                    return false;
                }
                if (this.archivedFilter === 'archived' && !row.archived) {
                    return false;
                }
                return (
                    row.name.toLowerCase().includes(terms) ||
                    String(row.price).includes(terms) ||
                    row.pricingModel.includes(terms)
                );
            });
        },
        archived(val?: boolean) {
            return this.products.some((p) => (val && p.archived) || (!val && !p.archived));
        },
        hasArchived() {
            return this.archived(true);
        },
        hasActive() {
            return this.archived();
        },
    },
    data() {
        return {
            archivedFilter: ref(''),
            selected: ref([] as IProduct[]),
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
