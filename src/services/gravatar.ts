import md5 from 'md5';

function hash(email: string) {
    email = email.toLowerCase().trim();

    return md5(email);
}

export function url(email: string, def?: string, size?: number) {
    return 'https://www.gravatar.com/avatar/' + hash(email) + '?' + (size ? `s=${size}` : '') + (def ? `d=${def}` : '');
}
