export interface IMenuItem {
    label: string;
    icon?: string;
    route?: string;
    page?: unknown;
    children?: Array<ISubmenuItem>;
}
export interface ISubmenuItem extends IMenuItem {
    parent?: string;
}

export const MENU: IMenuItem[] = [
    {
        label: 'Dashboard',
        icon: 'trending_up',
        route: '/app/dashboard',
        page: import('pages/Dashboard.vue'),
    },
    {
        label: 'Orders',
        icon: 'shopping_cart',
        page: import('pages/Orders.vue'),
        route: '/app/orders',
    },
    {
        label: 'Products',
        icon: 'inventory_2',
        page: import('pages/Products.vue'),
        route: '/app/products',
    },
    {
        label: 'Marketing',
        icon: 'campaign',
        children: [
            {
                label: 'Discount Coupons',
                route: '',
            },
            {
                label: 'Sales Events',
            },
            {
                label: 'Incentives',
            },
        ],
    },
    {
        label: 'Settings',
        icon: 'settings',
        children: [
            // {
            //     label: 'Personal Profile',
            //     route: '',
            // },
            {
                label: 'Billing',
                route: '',
            },
            {
                label: 'Integrations',
            },
            {
                label: 'Users',
            },
            {
                label: 'Stores',
            },
        ],
    },
];
