<template>
    <article class="measure-article">
        <MeasureCard @start="startMeasurement('annealing')" @pause="controlRun('pause')" @stop="controlRun('stop')"
            :enabled="enabledAnnealingControls">
            <template #header>
                <div id="annealing-header">Annealing</div>
            </template>
            <template #parameters>
                <form id="annealing-form">
                    <section class="param-field">
                        <label for="annealing-temperature">Temperature (C°)</label>
                        <input name="annealing-temperature" v-model.number="annealingTemperature" min="0" max="60" step="1"
                            placeholder="temperature (in C°)">
                    </section>
                    <section class="param-field">
                        <label for="annealing-duration">Duration (min)</label>
                        <input name="annealing-duration" v-model.number="annealingDuration" min="0" max="100" step="1"
                            placeholder="duration (in min)">
                    </section>
                </form>
            </template>
            <template #content>
                <Line :options="annealingOptions" :data="annealingData as any"></Line>
            </template>
        </MeasureCard>
        <MeasureCard @start="startMeasurement('iv')" @pause="controlRun('pause')" @stop="controlRun('stop')"
            :enabled="enabledIVControls">
            <template #header>
                <div id="iv-header">IV</div>
            </template>
            <template #parameters>
                <form id="iv-params">
                    <section class="param-field">
                        <label for="iv-voltage-start">Start Voltage (V)</label>
                        <input name="iv-voltage-start" v-model.number="ivStart" min="-1000" max="1000" step="1"
                            placeholder="start voltage (in V)">
                    </section>
                    <section class="param-field">
                        <label for="iv-voltage-stop">Stop Voltage (V)</label>
                        <input name="iv-voltage-stop" v-model.number="ivStop" min="-1000" max="1000" step="1"
                            placeholder="stop voltage (in V)">
                    </section>
                    <section class="param-field">
                        <label for="iv-voltage-step">Voltage Step (V)</label>
                        <input name="iv-voltage-step" v-model.number="ivStep" min="-1000" max="1000" step="1"
                            placeholder="step voltage (in V)">
                    </section>
                    <section class="param-field">
                        <label for="iv-compliance">Compliance (A)</label>
                        <input name="iv-compliance" v-model.number="compliance" placeholder="compliance (in A)">
                    </section>
                    <section class="param-field">
                        <label for="iv-wait-before">Wait Before (s)</label>
                        <input name="iv-wait-before" v-model.number="waitBefore" placeholder="wait before (in s)">
                    </section>
                    <section class="param-field">
                        <label for="iv-wait-after">Wait After (s)</label>
                        <input name="iv-wait-after" v-model.number="waitAfter" placeholder="wait after (in s)">
                    </section>
                </form>
            </template>
            <template #content>
                <Line :options="ivOptions" :data="ivData as any"></Line>
            </template>
        </MeasureCard>
        <MeasureCard @start="startMeasurement('alibava')" @pause="controlRun('pause')" @stop="controlRun('stop')"
            :enabled="enabledAlibavaControls">
            <template #header>
                <div id="alibava-header">Charge Collection</div>
            </template>
            <template #parameters>
                <form id="alibava-params">
                    <section class="param-field">
                        <label for="alibava-voltage-start">Start Voltage (V)</label>
                        <input name="alibava-voltage-start" v-model.number="alibavaVStart" min="-1000" max="1000" step="1"
                            placeholder="start voltage (in V)">
                    </section>
                    <section class="param-field">
                        <label for="alibava-voltage-stop">Stop Voltage (V)</label>
                        <input name="alibava-voltage-stop" v-model.number="alibavaVStop" min="-1000" max="1000" step="1"
                            placeholder="stop voltage (in V)">
                    </section>
                    <section class="param-field">
                        <label for="alibava-voltage-step">Voltage Step (V)</label>
                        <input name="alibava-voltage-step" v-model.number="alibavaVStep" min="-1000" max="1000" step="1"
                            placeholder="step voltage (in V)">
                    </section>
                    <section class="param-field">
                        <label for="alibava-events">No. of events</label>
                        <input name="alibava-events" v-model.number="events" min="0" step="1000"
                            placeholder="no. of events">
                    </section>
                </form>
            </template>
            <template #content>
                <div class="progressbar-wrapper">
                    <ProgressBar :current-step="measurementStore.current_measurement_index"
                        :max-steps="measurementStore.max_measurement_index" :height="'2rem'"></ProgressBar>
                </div>
            </template>
        </MeasureCard>
    </article>
    <ClearListHoverButton />
    <HoverHeader />
</template>

<script setup lang="ts">
import { packData, makeAlibavaMeasDict, makeIVMeasDict, makeAnnealingMeasDict, makeChartStructure, checkForm } from '@/util/utils';
import type { HeaderCollection, Measurement, ResponseData } from '@/util/types';
import { controlRun, getData } from '@/util/networking';

import MeasureCard from '@/components/MeasureCard.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import ClearListHoverButton from '@/components/ClearListHoverButton.vue';
import HoverHeader from '@/components/HoverHeader.vue';

import { useAddressesStore, useMeasurementStore } from '@/stores/stores';
import { computed, defineComponent, onMounted, onUnmounted, reactive, ref, type Ref } from 'vue';

import axios from 'axios';
import { Line } from 'vue-chartjs';
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    LineElement,
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    type ChartData,
} from 'chart.js';

ChartJS.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

defineComponent({
    components: {
        MeasureCard,
        ProgressBar,
        Line,
        ClearListHoverButton,
        HoverHeader,
    }
});

// CHART DATA + OPTIONS
const ivData: Ref<ChartData> = ref({
    labels: [],
    datasets: [],
});
const annealingData: Ref<ChartData> = ref({
    labels: [],
    datasets: [],
});

const ivOptions = reactive({
    scales: {
        y: {
            ticks: {
                callback: (value: number) => value.toExponential(2),
            },
            title: {
                display: true,
                text: 'current (A)',
            },
        },
        x: {
            title: {
                display: true,
                text: 'voltage (V)',
            }
        }
    },
    plugins: {
        legend: {
            display: false,
        },
    },
});

const annealingOptions = reactive({
    scales: {
        y: {
            ticks: {
                callback: (value: number) => {
                    const fixedValue = (value * 100).toFixed(1);
                    return `${fixedValue}`
                }
            },
            title: {
                display: true,
                text: 'progress (%)',
            },
        },
        x: {
            ticks: {
                callback: (value: number) => value.toFixed(0),
            },
            title: {
                display: true,
                text: 'time (s)',
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
});

// FORMS
const annealingTemperature: Ref<number> = ref(60);
const annealingDuration: Ref<number> = ref(20);
const ivStart: Ref<number> = ref(0);
const ivStop: Ref<number> = ref(-1000);
const ivStep: Ref<number> = ref(-10);
const compliance: Ref<number> = ref(1e-6);
const waitBefore: Ref<number> = ref(1);
const waitAfter: Ref<number> = ref(1);
const alibavaVStart: Ref<number> = ref(-300);
const alibavaVStop: Ref<number> = ref(-900);
const alibavaVStep: Ref<number> = ref(-100);
const events: Ref<number> = ref(150000);

// STATE
const addresses = useAddressesStore();
const measurementStore = useMeasurementStore();
const backendStatus: Ref<string | null> = ref(null);
let backendStatusTimer: number = -1;

const enabledIVControls = computed(() => {
    if (measurementStore.measurement_running) {
        if (measurementStore.current_measurement === 'IV') {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
});
const enabledAnnealingControls = computed(() => {
    if (measurementStore.measurement_running) {
        if (measurementStore.current_measurement === 'Annealing') {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
});
const enabledAlibavaControls = computed(() => {
    if (measurementStore.measurement_running) {
        if (measurementStore.current_measurement === 'FullRun') {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
});

// STYLES + COMPONENTS
let annealingHeader: HTMLDivElement;
let ivHeader: HTMLDivElement;
let alibavaHeader: HTMLDivElement;

let headers: HeaderCollection;

// MC INTERFACING FUNCTIONS
async function startMeasurement(measurementType: string) {
    measurementType = measurementType.toLowerCase();
    let measDict: object;
    switch (measurementType) {
        case "iv":
            if (!checkForm([ivStart, ivStop, ivStep]))
                return;
            measDict = makeIVMeasDict(ivStart.value, ivStop.value, ivStep.value, compliance.value, waitBefore.value, waitAfter.value);
            break;
        case "annealing":
            if (!checkForm([annealingTemperature, annealingDuration]))
                return;
            measDict = makeAnnealingMeasDict(annealingTemperature.value, annealingDuration.value);
            break;
        case "alibava":
            if (!checkForm([alibavaVStart, alibavaVStop, alibavaVStep, events]))
                return;
            measDict = makeAlibavaMeasDict(alibavaVStart.value, alibavaVStop.value, alibavaVStep.value, events.value);
            break;
        default:
            console.log("Unknown measurement type");
            return;
    }

    const payload = packData("post", "measurement", "/measurements", measDict);
    try {
        await axios.post(`${addresses.getFullGatewayAddress}/`, payload);
    } catch (error) {
        console.log(error);
    }

    controlRun("start");
}

// LIFECYCLE HOOKS
onMounted(() => {
    // Get header divs
    annealingHeader = document.getElementById('annealing-header') as HTMLDivElement;
    ivHeader = document.getElementById('iv-header') as HTMLDivElement;
    alibavaHeader = document.getElementById('alibava-header') as HTMLDivElement;
    headers = { 'Annealing': annealingHeader, 'IV': ivHeader, 'FullRun': alibavaHeader };

    backendStatusTimer = window.setInterval(async () => {
        let data = packData("get", "measurement", "/measurement_dict", null);
        try {
            const response = await axios.post(`${addresses.getFullGatewayAddress}/`, data);
            if (response.data)
                measurementStore.setCurrentMeasurement(Object.keys(response.data)[0] as Measurement);
        } catch (error) {
            console.log(error);
        }

        data = packData("get", "supervisor", "/control", null);
        try {
            const response = await axios.post(`${addresses.getFullGatewayAddress}/`, data);
            backendStatus.value = response.data.state;
            measurementStore.setCurrentMeasurementIndex(response.data.measurement_index);
            measurementStore.setMeasurementRunning(backendStatus.value != "idle");

            if (measurementStore.measurement_running) {
                headers[measurementStore.current_measurement].classList.add("active");

                const ivResponse: ResponseData = await getData("iv");
                const annealingResponse: ResponseData = await getData("annealing");
                ivData.value = makeChartStructure(ivResponse, "IV");
                annealingData.value = makeChartStructure(annealingResponse, "Annealing");
            } else {
                headers[measurementStore.current_measurement].classList.remove("active");
            }

        } catch (error) {
            console.log(error);
        }
    }, 1000);
});

onUnmounted(() => {
    window.clearInterval(backendStatusTimer);
});

</script>

<style scoped>
.measure-article {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

label {
    align-self: flex-start;
    margin-top: 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--primary-color);
}

#annealing-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 1rem;
    align-items: center;
}

#iv-params,
#alibava-params {
    width: 80%;
    display: grid;
    gap: 1rem;
}

#iv-params {
    grid-template-columns: 1fr 1fr 1fr;
}

#alibava-params {
    grid-template-columns: 1fr 1fr;
}

.param-field {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

input {
    font: inherit;
    width: 100%;
    padding: 0.5rem;
    padding-left: 0;
    border: none;
    border-bottom: 1px solid white;
    background: var(--zinc);
    color: white;
    margin: 0 1rem;
    transition: all 0.2s ease-in-out;
}

input:focus {
    outline: none;
    border-bottom: 1px solid var(--primary-color);
}

.active::after {
    content: " running";
    font-weight: bold;
    /* make a nice gradient text effect with a linear-gradient from left (primary-color) to middle (yellow-500) to right (red-500) */
    background: linear-gradient(to right, var(--primary-color), var(--yellow-500), var(--red-500));
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.progressbar-wrapper {
    flex: 1;
}
</style>