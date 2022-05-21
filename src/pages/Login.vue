<template>
    <q-layout class="login-page bg-image" v-cloak>
        <q-page-container>
            <q-page class="flex flex-center">
                <q-card v-if="providers && providers.length" class="bg-transparent no-border no-shadow">
                    <q-item>
                        <!-- <q-item-section avatar>
                            <q-avatar rounded size="130px" class="shadow-10">
                                <img src="~assets/unified_octopus.png" title="UnifiedModels" />
                            </q-avatar>
                        </q-item-section> -->

                        <q-item-section class="text-white">
                            <q-item-label>
                                <h5>Sign-In</h5>
                            </q-item-label>

                            <q-item-label> If this is your first time, then a new account will be created </q-item-label>

                            <q-item-label class="q-pt-lg">
                                <q-btn
                                    ripple
                                    class="text-grey-9 q-mr-md"
                                    color="white"
                                    @click="click(`${authUrl}auth/${googleId}/login${authPostUrl}`)"
                                >
                                    <q-avatar square size="32px" class="q-mr-md">
                                        <img src="~assets/google.png" />
                                    </q-avatar>
                                    Google
                                </q-btn>

                                <q-btn
                                    class="text-grey-9 q-mr-md"
                                    color="white"
                                    ripple
                                    @click="click(`${authUrl}auth/${microsoftId}/login${authPostUrl}`)"
                                >
                                    <q-avatar square size="32px" class="q-mr-md">
                                        <img src="~assets/microsoft-logo-icon.png" />
                                    </q-avatar>
                                    Microsoft
                                </q-btn>

                                <q-btn
                                    class="text-grey-9 q-mr-md"
                                    color="white"
                                    ripple
                                    @click="click(`${authUrl}auth/${twitterId}/login${authPostUrl}`)"
                                >
                                    <q-avatar square size="32px" class="q-mr-md">
                                        <img src="~assets/twitter.png" />
                                    </q-avatar>
                                    Twitter
                                </q-btn>

                                <!-- <q-btn
                                    v-for="provider in providers"
                                    :key="provider.id"
                                    rounded
                                    flat
                                    :href="provider.authUrl"
                                    color="white"
                                    class="q-ma-md shadow-10"
                                    :style="`background-color: #${provider.colour} !important; color: #${
                                        provider.textColour || 'FFF'
                                    } !important`"
                                    :title="`Sign-in with ${provider.name}`"
                                >
                                    <q-avatar size="40px">
                                        <img
                                            :src="
                                                provider.id === 'microsoft'
                                                    ? '@src/assets/microsoft-logo-icon.png'
                                                    : provider.imageUrl
                                            "
                                        />
                                    </q-avatar>
                                    {{ provider.name }}
                                </q-btn> -->
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-card>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { defineComponent } from 'vue';
import * as ApiService from '../services/api';
import { IAuthMethod, IUser, wId } from '../services/api';

import { useUserSession } from '../stores/user';

const twitterId = '61d24c350fa4c13f8be56efd';
const googleId = '5f77ec4dc32d5e00177073f4';
const microsoftId = '5f7a64ecd0540a43a42cf768';
const authUrl = 'https://api.unified.to/';
const authPostUrl = `?success_redirect=${window.location.href}`;

export default defineComponent({
    name: 'LoginPage',
    data() {
        return {
            providers: [] as IAuthMethod[],
            twitterId,
            googleId,
            microsoftId,
            authUrl,
            authPostUrl,
        };
    },
    methods: {
        click(url: string) {
            window.location.href = url;
        },
        async authorizing() {
            if (this.$route.query.jwt) {
                const jwt = this.$route.query.jwt;
                // console.log('jwt', this.$route.query.jwt);

                const result = await ApiService.get<IUser>('users/jwt', { jwt });

                if (result && result.token) {
                    // console.log('user', token);
                    // Store.setUserName(token.name || '');
                    useUserSession().setToken(result.token);
                    // Store.setToken(result.token);
                    await ApiService.getUserGravatar(result);
                    useUserSession().setUser(result);

                    // console.log(Store.getSeed(), token.state);
                    // if (Number(this.$route.query.state || '0') === Store.getSeed()) {
                    await this.$router.push({ path: '/app' });
                    return true;
                    // }
                } else {
                    await this.$router.push({ path: '/login' });
                }
            }
        },

        async load() {
            if (await this.authorizing()) {
                return;
            }

            if (useUserSession().token) {
                await this.$router.push({ path: '/app' });
                return;
            }

            this.providers =
                (await ApiService.rawGet<IAuthMethod[]>(
                    `https://api.unified.to/auth/${wId}?success_redirect=${window.location.href}`
                )) || [];
            this.providers = this.providers?.filter((p) => {
                return ['google', 'twitter', 'microsoft'].indexOf(p.id) !== -1;
            });
        },
    },
    async mounted() {
        // await this.authorizing();
        await this.load();

        // if (Store.getToken()) {
        //     await this.$router.push({path: '/app'});
        //     return;
        // }
    },
});
</script>

<style lang="scss">
.login-page.bg-image {
    background-color: #0760f0;
    background-image: linear-gradient(135deg, #0760f0, #43daeb);
}

.login-page {
    h5 {
        margin: 0;
    }

    .rounded-borders {
        border-radius: 6px;
    }
}
</style>
