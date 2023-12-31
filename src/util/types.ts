export interface Header {
    operator: string;
    project: string;
    name: string;
}

export interface ResponseData {
    x: number[];
    y: number[];
};

interface MonitorResponseRange {
    check_value?: number,
    current_value?: number,
}

export interface MonitorResponse {
    value: number[],
    range: MonitorResponseRange,
}

export interface StableStatus {
    stable_time: number,
    is_stable: boolean,
};

export interface PayloadObject {
    state: string;
    measurement_index?: number;
};

export type Measurement = "Annealing" | "IV" | "FullRun";
export type HeaderCollection = { [key in Measurement]: HTMLDivElement;};