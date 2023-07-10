import type { Header, ResponseData } from '@/util/types';
import type { ChartData } from 'chart.js';
import type { Ref } from 'vue';

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

export function makeIVMeasDict(start: number, stop: number, step: number, compliance: number, wait_before: number, wait_after: number) {
    return {
        IV: {
            global: {
                high_voltage: {
                    start,
                    stop,
                    step
                },
                compliance: {
                    start: compliance,
                }
            },
            I_tot: {
                wait_before: {
                    start: wait_before,
                },
                wait_after: {
                    start: wait_after,
                }
            }
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

export function checkForm(inputs: Ref<number>[]): boolean {
    // Very crude input validation
    for (const input of inputs) {
        if (input.value === null || input.value === undefined || typeof input.value !== 'number') {
            return false;
        }
    }
    return true
}