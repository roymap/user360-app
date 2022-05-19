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
