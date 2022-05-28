<template>
    <q-page v-if="product">
        <h1>{{ product.id ? 'Edit' : 'New' }} Product</h1>

        <q-card class="q-pa-md">
            <q-input autogrow v-model="product.name" label="Product name" />

            <q-select emit-value map-options :options="SIZES" label="Size" v-model="product.size" />

            <q-select :options="PricingModels" label="Pricing Model" v-model="product.pricingModel" />

            <q-input :rules="[(val) => val > 0 || 'Value must be greater than $0']" prefix="$" type="number" v-model.number="product.price" label="Price" />

            <q-select use-input @new-value="createTag" v-model="product.tags" multiple :options="TAGS" use-chips stack-label label="Tags" />

            <div class="q-mt-lg">
                <q-btn @click="save" color="primary" :label="product.id ? 'Update' : 'Save'" />
                <q-btn label="Cancel" class="float-right" to="/app/products" />
            </div>
        </q-card>
    </q-page>
</template>

<script lang="ts">
import { useHead } from '@vueuse/head';
import { SIZES } from '../services/size';
import { defineComponent } from 'vue';

import { IProduct, PricingModels } from '../models/UnifiedAds';
// import { money } from '../services/utils';
import { useProductStore } from '../stores/products';

export default defineComponent({
    name: 'ProductEditPage',
    components: {},
    setup() {
        useHead({
            title: 'DirectAds',
        });
        return {};
    },
    data() {
        return {
            TAGS: [] as string[],
            PricingModels,
            SIZES: SIZES.map((s) => {
                return {
                    label: s.name,
                    value: {
                        width: s.width,
                        height: s.height,
                    },
                };
            }),
            filter: '',
            products: useProductStore().products,
            product: undefined as undefined | IProduct,
        };
    },
    methods: {
        async save() {
            if (this.product) {
                await useProductStore().add(this.product);
                await this.$router.push('/app/products');
            }
        },

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createTag(val: string, done: any) {
            // specific logic to eventually call done(...) -- or not
            if (this.TAGS.indexOf(val) === -1) {
                this.TAGS.push(val);
            }

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            done(val, 'add-unique');
        },

        async load() {
            console.log('product-edit', this.$route.params.id);

            if (this.$route.params.id === 'new') {
                this.product = {
                    name: 'new ad product',
                    size: {
                        width: 728,
                        height: 90,
                    },
                    pricingModel: 'CPM',
                    price: 10,
                };
                return;
            } else if (!this.$route.params.id) {
                return this.$router.push('/app/products');
            }

            const id: string = this.$route.params.id as string;

            this.product = this.products.find((p) => p.id === id);
            if (!this.product) {
                await this.$router.push('/app/products');
                return;
            }

            console.log('product-edit-object', this.product);

            this.TAGS = [];
            this.products.forEach((p) => {
                (p.tags || []).forEach((t) => {
                    if (this.TAGS.indexOf(t) === -1) {
                        this.TAGS.push(t);
                    }
                });
            });
        },
    },
    async mounted() {
        console.log('product-edit-mounted');
        await this.load();
    },
});
</script>
