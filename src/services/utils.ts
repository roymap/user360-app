import { date as _date } from 'quasar';
import plural from '../services/plural';

// eslint-disable-next-line @typescript-eslint/ban-types
export async function sleep(ms: number) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

export function max(str: string, size = 26) {
    if (str.length < size) {
        return str;
    }
    return str.substring(0, size) + '...';
}

export function date(v?: string | number | Date | undefined, format?: string) {
    if (!v) {
        v = new Date();
    }

    if (format) {
        return _date.formatDate(v, format);
    }

    const seconds = _date.getDateDiff(new Date(), v, 'seconds');
    if (seconds < 60) {
        return 'seconds ago';
    }

    const minutes = _date.getDateDiff(new Date(), v, 'minutes');
    if (minutes < 60) {
        return `${minutes} ${plural('minute', minutes)} ago`;
    }

    const hours = _date.getDateDiff(new Date(), v, 'hours');
    if (hours < 24) {
        return `${hours} ${plural('hour', hours)} ago`;
    }

    const days = _date.getDateDiff(new Date(), v, 'days');
    if (days === 1) {
        return 'yesterday';
    } else if (days < 7) {
        return `${days} ${plural('day', days)} ago`;
    }

    // console.log('date', v, _date.formatDate(v), minutes);

    return _date.formatDate(v, 'MMMM D, YYYY [at] H:mma');
}

export function number(value = 0) {
    return new Intl.NumberFormat().format(value);
}

export function possesive(str: string) {
    if (str.endsWith && str.endsWith('s')) {
        return str + "'";
    }
    return str + "'s";
}

export function capitalize(str: string, all: boolean) {
    const reg = all ? /([^\W_]+[^\s-]*) */g : /([^\W_]+[^\s-]*)/;
    return str ? str.replace(reg, fn) : '';

    function fn(txt: string) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
}

export function telephone(str: string, sourceCountry: string) {
    if (!str) {
        return '';
    }

    sourceCountry = sourceCountry || 'US';

    if (['US', 'CA'].indexOf(sourceCountry) !== -1 && str.length === 12 && str.substring(0, 2) === '+1') {
        // US/Canada/Carribean
        return '(' + str.substring(2, 5) + ') ' + str.substring(5, 8) + '-' + str.substring(8);
    }

    return str;
}

export function upper(value: string) {
    if (!value) {
        return '';
    }
    value = value.toString();
    return value.toUpperCase();
}

export function firstName(name: string) {
    if (!name) {
        return '';
    }
    return name.split(' ')[0];
}

export function money(amount?: number | string, currency = '$') {
    const options = {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    };

    return `${currency}${Number(amount || 0).toLocaleString('en', options)}`;
}
