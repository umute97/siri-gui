import { packData, pick } from './utils';
import axios from 'axios';
import { useAddressesStore, useHeaderStore, useMeasurementStore, useTemperatureStore } from '@/stores/stores';
import type { Header, MonitorResponse, PayloadObject, ResponseData, StableStatus } from './types';

const addresses = useAddressesStore();
const measurementStore = useMeasurementStore();
const header = useHeaderStore();
const temperatureStore = useTemperatureStore();

export async function clearList() {
    const payload = packData('delete', 'supervisor', '/measurements/', null);
    try {
        await axios.post(`${addresses.getFullGatewayAddress}`, payload);
    } catch (error) {
        console.error(error);
    }
}

export async function getListLength() {
    const payload = packData('get', 'supervisor', '/measurements/length', null);
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, payload);
        measurementStore.max_measurement_index = response.data.measurements;
    } catch (error) {
        console.error(error);
    }
}

export async function requestHeader(): Promise<Header> {
    const headerPayload = packData("get", "storage", "/data", null);
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, headerPayload);
        return pick(response.data, 'operator', 'project', 'name');
    } catch (error) {
        console.error(error);
        return { operator: '', project: '', name: '' };
    }
}

export async function controlRun(command: "run" | "start" | "pause" | "stop") {
    command = command === "start" ? "run" : command;
    const payload: PayloadObject = { state: command };
    if (command !== "pause")
        payload.measurement_index = 0;

    const data = packData("put", "supervisor", "/control", payload);
    try {
        await axios.post(`${addresses.getFullGatewayAddress}/`, data);
    }
    catch (error) {
        console.log(error);
    }
}

export async function getData(measurementType: string): Promise<ResponseData> {
    const data = packData("get", "liveplot", `/measurements/${measurementType}`, null);
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}/`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return { x: [], y: [] };
}

export function submitHeader() {
    const headerPayload = packData("post", "storage", "/data", header.getHeader);
    try {
        axios.post(`${addresses.getFullGatewayAddress}`, headerPayload);
    } catch (error) {
        console.error(error);
    }
}

export async function getTemperatures(): Promise<MonitorResponse> {
    const payload = packData("get", "monitor", "/data/temperature:get_temperature", null);
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, payload);
        return response.data;
    } catch (error) {
        console.log(error);
        return { value: [], range: {} }
    }
}

export async function getDewpoint(): Promise<number> {
    const payload = { "device": "dewpointcontroller", "command": "get_dew_point"};
    const data = packData("post", "dewpointcontroller", "/", payload)
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, data);
        return response.data.result.toFixed(1);
    } catch (error) {
        console.log(error);
        return 0;
    }
}

export async function getTemperatureStableStatus(): Promise<StableStatus> {
    const payload = packData("get", "temperaturecontroller", "/is_stable", null);
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, payload);
        return response.data.result;
    } catch (error) {
        console.log(error);
        return { is_stable: false, stable_time: 0 };
    }
}

export async function setTemperatureSetPoint(): Promise<void> {
    const payload = { "command": "set_operation_point", "arguments": parseFloat(temperatureStore.set_point) }
    const data = packData("post", "temperaturecontroller", "/", payload)
    try {
        await axios.post(`${addresses.getFullGatewayAddress}`, data);
    } catch (error) {
        console.log(error);
    }
}

export async function setTemperatureFluctuation(): Promise<void> {
    const payload = { "command": "set_control_fluctuation", "arguments": parseFloat(temperatureStore.set_point) }
    const data = packData("post", "temperaturecontroller", "/", payload)
    try {
        await axios.post(`${addresses.getFullGatewayAddress}`, data);
    } catch (error) {
        console.log(error);
    }
}

export async function startControlling(): Promise<void> {
    const payload = { "set_value": parseFloat(temperatureStore.set_point), "timeout": 0 }
    const data = packData("post", "temperaturecontroller", "/start", payload)
    try {
        await axios.post(`${addresses.getFullGatewayAddress}`, data);
    } catch (error) {
        console.log(error);
    }
}

export async function stopControlling(): Promise<void> {
    const data = packData("get", "temperaturecontroller", "/stop", null)
    try {
        await axios.post(`${addresses.getFullGatewayAddress}`, data);
    } catch (error) {
        console.log(error);
    }
}

export async function setISEGChannelVoltage(voltage: number, channel: number): Promise<void> {
    const payload = { device: "high_voltage_device", command: "set_voltage", arguments: [voltage, channel] }
    const data = packData("post", "devicemanager", "/", payload)
    try {
        await axios.post(`${addresses.getFullGatewayAddress}`, data);
    } catch (error) {
        console.log(error);
    }
}

export async function toggleISEGChannel(channel: number): Promise<void> {
    const payload = { device: "high_voltage_device", command: "toggle_output", arguments: channel }
    const data = packData("post", "devicemanager", "/", payload)
    try {
        await axios.post(`${addresses.getFullGatewayAddress}`, data);
    } catch (error) {
        console.log(error);
    }
}

export async function getISEGOutputs(): Promise<boolean[]> {
    const payload = { device: "high_voltage_device", command: "get_all_outputs", arguments: null }
    const data = packData("post", "devicemanager", "/", payload)
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, data);
        return response.data.result;
    } catch (error) {
        console.log(error);
        return [false, false, false, false];
    }
}

export async function getISEGVoltages(): Promise<number[]> {
    const payload = { device: "high_voltage_device", command: "get_all_voltages", arguments: null }
    const data = packData("post", "devicemanager", "/", payload)
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, data);
        return response.data.result;
    } catch (error) {
        console.log(error);
        return [0, 0, 0, 0];
    }
}

export async function getISEGCurrents(): Promise<number[]> {
    const payload = { device: "high_voltage_device", command: "get_all_currents", arguments: null }
    const data = packData("post", "devicemanager", "/", payload)
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, data);
        return response.data.result;
    } catch (error) {
        console.log(error);
        return [0, 0, 0, 0];
    }
}