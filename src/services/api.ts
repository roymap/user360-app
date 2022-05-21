/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Axios from 'axios';
import * as Gravatar from './gravatar';
import { useUserSession } from '../stores/user';
import { ref } from 'vue';

export const APIURL =
    ['localhost'].indexOf(window.location.hostname) > -1 || window.location.hostname.indexOf('ngrok.io') > -1
        ? 'http://localhost:3000/'
        : 'https://directads-api.herokuapp.com/';

export const wId = '5e8ba11d3fb8ff95c90b7332';

export const loading = ref(false);

export interface IUser {
    name?: string;
    email?: string;
    token?: string;
    orgId?: string;
    imageUrl?: string;
}

export interface IAuthMethod {
    id: string;
    name: string;
    imageUrl: string;
    authUrl: string;
    colour?: string; // HEX color code for the background of a button or link
    textColour?: string; // HEX color code for the text of a button or link
    faIcon?: string; // The font awesome icon
}

export interface IIntegrationAuth {
    access_token: string;
    emails?: string[];
    name?: string;
    state?: string;
}

function getAuth() {
    const TOKEN = useUserSession().token;
    // console.log('TOKEN', TOKEN);

    if (!TOKEN) {
        return {};
    }

    return {
        headers: {
            Authorization: `Bearer ${TOKEN}`,
        },
    };
}

export async function get<T>(method: string, params?: any): Promise<T | undefined> {
    loading.value = true;
    try {
        const options = { ...getAuth(), params };
        // console.log('get', options);
        const result = await Axios.get<T>(APIURL + method, options);

        loading.value = false;
        return result ? result.data : undefined;
    } catch (err) {
        loading.value = false;
        error(err);
        return undefined;
    }
}

export async function remove(method: string, params?: any): Promise<{ error?: boolean } | undefined> {
    loading.value = true;

    try {
        const options = { ...getAuth(), params };
        const result: { data: { error?: boolean } } = await Axios.delete(APIURL + method, options);
        loading.value = false;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return result ? result.data : undefined;
    } catch (err) {
        loading.value = false;
        error(err);
    }
}

export async function post<T>(method: string, data: any, params?: any) {
    loading.value = true;
    try {
        const options = { ...getAuth(), params };
        const result = await Axios.post<T>(APIURL + method, data, options);
        loading.value = false;
        return result ? result.data : undefined;
    } catch (err) {
        loading.value = false;
        error(err);
    }
}

export async function put<T>(method: string, data: any, params?: any) {
    loading.value = true;
    try {
        const options = { ...getAuth(), params };
        const result = await Axios.put<T>(APIURL + method, data, options);
        loading.value = false;
        return result ? result.data : undefined;
    } catch (err) {
        loading.value = false;
        error(err);
    }
}

function error(err: any) {
    console.error(
        (err && err.response && err.response.data && err.response.data.error ? err.response.data.error : undefined) ||
            err.error ||
            'ERROR',
        (err && err.response && err.response.data && err.response.data.message ? err.response.data.message : undefined) ||
            err.message
    );
}

// const defaultG = 'https://www.gravatar.com/avatar/';

export async function getUserGravatar(user: IUser) {
    // const user = await get<IUser>('unified/user');
    // console.log('getUser', user);
    if (user && user.email) {
        user.imageUrl = Gravatar.url(user.email);
        // console.log('u', user.imageUrl.substring(0, defaultG.length), defaultG);
        // if (user.imageUrl.substring(0, defaultG.length) === defaultG) {
        // user.imageUrl = '';
        // }
        useUserSession().setUser(user);
    }

    return user;
}

export async function rawGet<T>(url: string) {
    try {
        loading.value = true;
        const result = await Axios.get<T>(url);

        loading.value = false;
        return result ? result.data : undefined;
    } catch (err) {
        loading.value = false;
        error(err);
        return undefined;
    }
}
