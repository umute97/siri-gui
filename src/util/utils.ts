import { type Header } from '@/util/types';

export function packData(method: string, recipient: string, path: string, payload: object | null) {
    return {
        method,
        recipient,
        path,
        payload,
    };
}

export function pick(obj: object, ...props: any[]): Header {
    return props.reduce((result, prop) => {
        if (obj.hasOwnProperty(prop)) {
            result[prop] = obj[prop as keyof typeof obj];
        }
        return result;
    }, {})
}