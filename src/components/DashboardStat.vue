<template>
    <q-card bordered flat class="stat">
        <q-card-section>
            <div class="header">
                {{ title }}

                <q-btn flat size="sm" round color="primary" v-if="link" :to="link" class="float-right">
                    <q-icon name="link" />
                </q-btn>
            </div>
        </q-card-section>

        <q-card-section>
            <div class="row">
                <div class="col number">
                    <span v-if="stat.isMoney">{{ money(stat.thisMonth) }}</span>
                    <span v-if="!stat.isMoney">{{ number(stat.thisMonth) }}</span>
                </div>
                <div class="col text">this month</div>
            </div>
            <div class="row">
                <div class="col number">
                    <span :class="diffLastMonth < 0 ? 'text-red' : 'text-green'"> {{ diffLastMonth }}% </span>
                    <q-icon name="trending_up" color="green" v-if="diffLastMonth >= 0"></q-icon>
                    <q-icon name="trending_down" color="red" v-if="diffLastMonth < 0"></q-icon>
                </div>
                <div class="col text">from last month</div>
            </div>
        </q-card-section>
    </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { money, number } from '../services/utils';

export interface IStat {
    thisMonth: number;
    lastMonth: number;
    isMoney?: boolean;
    currencySymbol?: string;
}

export default defineComponent({
    name: 'DashboardStat',
    props: {
        title: {
            type: String,
            required: true,
        },
        link: {
            type: String,
        },
        stat: {
            type: Object as PropType<IStat>,
            required: true,
        },
    },
    data() {
        return {
            diffLastMonth: 0,
        };
    },
    setup(props) {
        console.log('dashboard.setup', props);
        return {};
    },
    mounted() {
        const percentage = new Date().getDate() / daysInMonth(new Date().getFullYear(), new Date().getMonth());
        // console.log(percentage);
        let prorataLastMonth = percentage * (this.stat.lastMonth || 0);
        // console.log(prorataLastMonth, this.stat.thisMonth);
        this.diffLastMonth = Math.floor((this.stat.thisMonth / prorataLastMonth) * 100) - 100;

        function daysInMonth(month: number, year: number) {
            return new Date(year, month, 0).getDate();
        }
    },
    methods: {
        money,
        number,
    },
});
</script>

<style>
.stat .header {
    font-size: 0.9rem;
    font-weight: bold;
    columns: #222;
}
.stat .number {
    font-size: 1rem;
}
.stat .text {
    font-size: 80%;
}
</style>
