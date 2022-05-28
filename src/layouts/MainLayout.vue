<template>
    <q-layout view="hHh lpR lff">
        <q-header bordered class="text-grey-9">
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-avatar square>
                        <Logo />
                    </q-avatar>
                    User360
                </q-toolbar-title>

                <q-btn @click="toogleDarkMode" dense flat rounded color="grey-8" class="q-ml-lg" :icon="!dark ? 'light_mode' : 'dark_mode'"></q-btn>

                <q-btn dense flat round color="white" class="q-ml-lg" :icon="user?.imageUrl ? undefined : 'user'">
                    <q-avatar v-if="user && user.imageUrl" round>
                        <q-icon size="lg" name="spinner" v-if="saving" />
                        <img :src="user.imageUrl" :title="`${user.name} <${user.email}>`" v-if="!saving" />
                    </q-avatar>
                    <q-menu>
                        <q-list separator>
                            <q-item disable>
                                <q-item-section thumbnail>
                                    <q-icon size="xs" name="person_2" class="q-ml-md"></q-icon>
                                </q-item-section>
                                <q-item-section>{{ user?.email }}</q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup>
                                <q-item-section thumbnail>
                                    <q-icon size="xs" name="account_box" class="q-ml-md"></q-icon>
                                </q-item-section>
                                <q-item-section> Profile Settings </q-item-section>
                            </q-item>

                            <q-item clickable v-close-popup @click="logout">
                                <q-item-section thumbnail>
                                    <q-icon size="xs" name="logout" class="q-ml-md"></q-icon>
                                </q-item-section>

                                <q-item-section> Logout </q-item-section>
                            </q-item>
                        </q-list>
                    </q-menu>
                </q-btn>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered side="left" class="text-grey-9 mainmenu">
            <q-list padding class="text-grey-9">
                <div v-for="menu in menus" :key="menu.label">
                    <q-item clickable v-ripple :active="isActive(menu)" :active-class="!menu.children ? 'active' : ''" @click="setActive(menu)">
                        <q-item-section avatar v-if="menu.icon">
                            <q-icon :name="menu.icon" />
                        </q-item-section>

                        <q-item-section>{{ menu.label }}</q-item-section>

                        <q-item-section side v-if="menu.children">
                            <q-icon v-if="!isActive(menu)" name="chevron_right"></q-icon>
                            <q-icon v-if="isActive(menu)" name="expand_more"></q-icon>
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-for="child in menu.children"
                        :key="child.label"
                        class="q-pl-xl"
                        clickable
                        v-show="expanded === menu.label"
                        v-ripple
                        :active="isActive(child)"
                        @click="setActive(child)"
                        active-class="active"
                    >
                        <q-item-section avatar>
                            <q-icon :name="child.icon || 'arrow_right'" :size="!child.icon ? 'xs' : ''" />
                        </q-item-section>

                        <q-item-section>{{ child.label }}</q-item-section>
                    </q-item>
                </div>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view class="q-pa-lg bg-grey-2" />
        </q-page-container>

        <q-footer bordered size="sm" class="text-grey-9 q-pl-md q-pt-md footer">
            <p class="ma-sm-md">
                &copy; 2022 DirectAds.to - <a href="/help">Help</a> - <a href="/changelog">Release Notes</a> -
                <a href="/status">Status</a>
            </p>
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';

import { useUserSession } from '../stores/user';
import { useDarkmode } from '../stores/darkmode';
// import * as ApiService from '../services/api';
import { IMenuItem, ISubmenuItem, MENU } from '../../menu';
import Logo from '../components/Logo.vue';

export default defineComponent({
    name: 'MainLayout',

    components: { Logo },

    data() {
        return {
            dark: false,
        };
    },

    setup() {
        const $q = useQuasar();

        function toggleDark(val?: boolean) {
            // console.log('toggleDark', val);
            if (val === false) {
                $q.dark.set(false);
            } else if (val === true) {
                $q.dark.set(true);
            } else {
                $q.dark.toggle();
            }
        }

        const leftDrawerOpen = ref(false);

        return {
            toggleDark,
            saving: false,
            user: ref(useUserSession().user),
            selected: ref(''),
            expanded: ref(''),
            menus: MENU.map((l) => {
                if (l.children) {
                    l.children.forEach((c) => {
                        c.parent = l.label;
                    });
                }
                return l;
            }),

            leftDrawerOpen,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value;
            },
        };
    },
    methods: {
        toogleDarkMode() {
            this.dark = !this.dark;
            useDarkmode().isDark = this.dark;
            this.toggleDark();
        },
        async logout() {
            useUserSession().logoutUser();
            await this.$router.push({ path: '/' });
        },
        isActive(menu: IMenuItem) {
            if (menu.children) {
                return this.expanded === menu.label;
            } else {
                return this.selected === menu.route;
            }
        },
        async setActive(menu: IMenuItem & ISubmenuItem) {
            if (menu.children) {
                this.expanded = menu.label;
                this.selected = menu.children[0].route || menu.children[0].label;

                if (menu.children?.length && menu.children[0].route) {
                    await this.$router.push({ path: menu.children[0].route });
                }
            } else {
                this.selected = menu.route || menu.label;
                this.expanded = menu.parent || '';

                if (menu.route) {
                    await this.$router.push({ path: menu.route });
                }
            }
        },
    },
    async mounted() {
        this.selected = this.$route.path;

        if (!useUserSession().token) {
            // console.warn('no token');
            await this.$router.push('/login');
            return;
        }

        this.dark = useDarkmode().isDark;
        this.toggleDark(this.dark);

        // if (!useUserSession().user?.email) {
        // console.log('no user.email');
        // const user = await ApiService.getUser();
        // if (user) {
        // this.user = user;
        // }
        // } else {
        // console.log('found user', Store.getUser());
        // }
    },
});
</script>

<style>
.footer {
    font-size: 80%;
}
.footer a {
    color: #3367d6;
    text-decoration: none;
}
.footer a:hover {
    color: #3367d6;
    cursor: pointer;
    text-decoration: underline;
}
.mainmenu .q-tree__children,
.mainmenu .q-tree__node {
    cursor: pointer;
}
.mainmenu .q-item.active {
    background-color: #e8f0fe;
    font-weight: bold;
    color: #1967d2;
}
.body--dark .bg-grey-2 {
    background-color: #333333 !important;
}
.body--dark .q-item.active,
.body--dark .q-item--active {
    background-color: #666;
    color: #fff !important;
}
.mainmenu .q-item--active {
    color: initial;
}
.mainmenu .q-item {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    margin-right: 8px;
}
.q-header,
.q-footer {
    background-color: #ffffff;
}
</style>
