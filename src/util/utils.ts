import type { Header, ResponseData } from '@/util/types';
import type { ChartData } from 'chart.js';

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
const zinc = getComputedStyle(document.documentElement).getPropertyValue('--zinc');

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

export function makeIVMeasDict(start: number, stop: number, step: number) {
    return {
        IV: {
            global: {
                high_voltage: {
                    start: start,
                    stop: stop,
                    step: step,
                }
            },
            I_tot: {}
        }
    }
}

export function makeAnnealingMeasDict(temperature: number, duration: number) {
    return {
        Annealing: {
            global: {
                annealing_temperature: {
                    start: temperature,
                },
                annealing_time: {
                    start: duration,
                },
                storage_temperature: {
                    start: -20,
                },
            },
            GetAnnealing: {},
        }
    }
}

export function makeAlibavaMeasDict(startVoltage: number, stopVoltage: number, stepVoltage: number, events: number) {
    return {
        FullRun: {
            global: {
                high_voltage: {
                    start: startVoltage,
                    stop: stopVoltage,
                    step: stepVoltage,
                },
                compliance: {
                    start: 100e-6,
                },
            },
            Calibration: {},
            Pedestal: {
                nevts: {
                    start: 5000,
                },
            },
            RadSource: {
                nevts: {
                    start: events,
                },
            },
        },
    }
}

export function makeChartStructure(data: ResponseData, label: string): ChartData {
    return {
        labels: data.x,
        datasets: [
            {
                label,
                data: data.y,
                borderColor: primaryColor,
                backgroundColor: zinc,
                fill: false,
                tension: 0.1,
            },
        ],
    };
}