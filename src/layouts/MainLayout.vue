<template>
    <q-layout view="hHh lpR lff">
        <q-header bordered class="text-grey-9 bg-white">
            <q-toolbar>
                <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

                <q-toolbar-title>
                    <q-avatar square>
                        <Logo />
                        <!-- <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" /> -->
                    </q-avatar>
                    Direct Ads
                </q-toolbar-title>

                <q-btn dense flat color="white" class="q-ml-lg" :icon="user?.imageUrl ? undefined : 'user'">
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

        <q-drawer v-model="leftDrawerOpen" show-if-above bordered side="left" class="text-grey-9 bg-white mainmenu">
            <q-list padding class="text-grey-9">
                <div v-for="menu in menus" :key="menu.label">
                    <q-item
                        clickable
                        v-ripple
                        :active="isActive(menu)"
                        :active-class="!menu.children ? 'active' : ''"
                        @click="setActive(menu)"
                    >
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
                            <q-icon :name="child.icon" />
                        </q-item-section>

                        <q-item-section>{{ child.label }}</q-item-section>
                    </q-item>
                </div>
            </q-list>
        </q-drawer>

        <q-page-container>
            <router-view />
        </q-page-container>

        <q-footer bordered size="sm" class="text-grey-9 bg-white q-pl-md q-pt-md footer">
            <p class="ma-sm-md">
                &copy; 2022 DirectAds.to - <a href="#">Help</a> - <a href="#">Release Notes</a> - <a href="#">Status</a>
            </p>
        </q-footer>
    </q-layout>
</template>

<script lang="ts">
import { useUserSession } from 'src/stores/user';
import { defineComponent, ref } from 'vue';
import * as ApiService from '../services/api';
import { IMenuItem, ISubmenuItem, MENU } from '../../menu';
import Logo from '../components/Logo.vue';

export default defineComponent({
    name: 'MainLayout',

    components: { Logo },

    setup() {
        const leftDrawerOpen = ref(false);

        return {
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
        async logout() {
            await useUserSession().logoutUser();
            this.$router.push({ path: '/' });
        },
        isActive(menu: IMenuItem) {
            if (menu.children) {
                return this.expanded === menu.label;
            } else {
                return this.selected === menu.label;
            }
        },
        async setActive(menu: IMenuItem & ISubmenuItem) {
            if (menu.children) {
                this.expanded = menu.label;
                this.selected = menu.children[0].label;

                if (menu.children?.length && menu.children[0].route) {
                    await this.$router.push({ path: menu.children[0].route });
                }
            } else {
                this.selected = menu.label;
                this.expanded = menu.parent || '';

                if (menu.route) {
                    await this.$router.push({ path: menu.route });
                }
            }
        },
    },
    async mounted() {
        if (!useUserSession().token) {
            // console.warn('no token');
            await this.$router.push('/login');
            return;
        }

        if (!useUserSession().user?.email) {
            // console.log('no user.email');
            const user = await ApiService.getUser();
            if (user) {
                this.user = user;
            }
        } else {
            // console.log('found user', Store.getUser());
        }
    },
});
</script>

<style>
.footer {
    font-size: 80%;
}
a {
    color: #3367d6;
    text-decoration: none;
}
a:hover {
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
.mainmenu .q-item--active {
    color: initial;
}
.mainmenu .q-item {
    border-top-right-radius: 40px;
    border-bottom-right-radius: 40px;
    margin-right: 8px;
}
</style>
