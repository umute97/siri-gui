import { type Header, type StableStatus, type Measurement } from '@/util/types';
import { defineStore } from 'pinia';

export const useAddressesStore = defineStore({
    id: 'addresses',
    state: () => ({
        backendBaseIP: 'http://192.168.13.188',
        grafanaBaseIP: 'http://grafana.192.168.13.33.nip.io',
    }),
    getters: {
        getFullGatewayAddress(): string {
            return this.backendBaseIP + ':5555';
        },
        getFullGrafanaAddress(): string {
            return this.grafanaBaseIP + '/d-solo/XkhkWeLmz/probestation?orgId=1&refresh=1s&var-station=4&panelId=2';
        },
    },
});

export const useHeaderStore = defineStore({
    id: 'header',
    state: () => ({
        operator: '',
        project: '',
        name: '',
    }),
    getters: {
        getFormattedHeader(): string {
            return `${this.operator} measuring: ${this.name} of ${this.project}`;
        },
        getHeader(): Header {
            return {
                operator: this.operator,
                project: this.project,
                name: this.name,
            };
        }
    },
    actions: {
        setHeader(operator: string, project: string, name: string): void {
            this.operator = operator;
            this.project = project;
            this.name = name;
        },
    },
});

export const useMeasurementStore = defineStore({
    id: 'measurement',
    state: () => ({
        current_measurement_index: 0,
        max_measurement_index: 0,
        measurement_running: false,
        current_measurement: 'IV' as Measurement,
    }),
    actions: {
        setCurrentMeasurementIndex(index: number): void {
            this.current_measurement_index = index;
        },
        setMaxMeasurementIndex(index: number): void {
            this.max_measurement_index = index;
        },
        setMeasurementRunning(running: boolean): void {
            this.measurement_running = running;
        },
        setCurrentMeasurement(measurement: Measurement): void {
            this.current_measurement = measurement;
        },
    },
});

export const useTemperatureStore = defineStore({
    id: 'temperature',
    state: () => ({
        stable_status: {} as StableStatus,
        temperatures: [] as number[],
        set_point: "" as string,
        dew_point: 0 as number,
    }),
    getters: {
        getStableTimer(): number {
            return this.stable_status['stable_time'];
        },
        getIsStable(): boolean {
            return this.stable_status['is_stable'];
        },
    },
    actions: {
        getChannelTemperature(channel: number): number {
            return this.temperatures[channel];
        },
        setStableStatus(stable_status: StableStatus): void {
            this.stable_status = stable_status;
        },
        setTemperatures(temperatures: number[]): void {
            this.temperatures = temperatures;
        },
        setSetPoint(set_point: string): void {
            this.set_point = set_point;
        },
        setDewPoint(dew_point: number): void {
            this.dew_point = dew_point;
        },
    }
});