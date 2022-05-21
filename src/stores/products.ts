import { defineStore } from 'pinia';
import { IProduct } from '../models/UnifiedAds';
import { get, post } from '../services/api';

// let PRODUCTS: IProduct[] = [];
// const LOADED_PRODUCTS = false;

export const useProductStore = defineStore('products', {
    state: () => ({
        products: [] as IProduct[],
    }),
    getters: {
        get(state) {
            return state.products;
        },
    },
    actions: {
        async fetch() {
            this.products = (await get<IProduct[]>('products')) || [];
        },

        async add(product: IProduct) {
            const result = await post<IProduct>('products', product);
            if (result?.id) {
                this.products.push(result);
            }
        },
    },
});
