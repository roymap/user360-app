import { defineStore } from 'pinia';
import { computed } from 'vue';
import { useStorage } from '@vueuse/core';
import { IUser } from '../services/api';

export type UserData = IUser | undefined;

export const useUserSession = defineStore('userSession', () => {
    // token will be synced with local storage
    // @see https://vueuse.org/core/usestorage/
    const token = useStorage('token', '');

    const user = useStorage('user', ''); // ref<Partial<UserData>>();
    // const loading = ref(false);

    let userObj: UserData;
    try {
        // console.log('user json', user.value);
        userObj = JSON.parse(user.value) as UserData;
        // console.log('user obj', userObj);
    } catch {
        // console.log('error');
    }

    const isLoggedIn = computed(() => token.value !== undefined && token.value !== '');

    function setUser(newUser: Partial<UserData>) {
        userObj = newUser;
        user.value = JSON.stringify(newUser);
    }

    function setToken(newToken: string) {
        token.value = newToken;
    }

    // function setLoading(newLoading: boolean) {
    //     console.log('setLoading', newLoading);
    //     loading.value = newLoading;
    // }

    function logoutUser() {
        token.value = undefined;
        user.value = undefined;
    }

    return {
        user: userObj,
        token,
        isLoggedIn,
        // loading,
        logoutUser,
        setUser,
        setToken,
        // setLoading,
    } as const;
});

/**
 * Pinia supports Hot Module replacement so you can edit your stores and
 * interact with them directly in your app without reloading the page.
 *
 * @see https://pinia.esm.dev/cookbook/hot-module-replacement.html
 * @see https://vitejs.dev/guide/api-hmr.html
 */
// if (import.meta.hot) {
// import.meta.hot.accept(acceptHMRUpdate(useUserSession, import.meta.hot));
// }
