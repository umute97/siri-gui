<template>
    <article>
        <MeasureCard>
            <template #header>
                Annealing
            </template>
            <template #parameters>
                <input type="number" id="annealing-temp" name="annealing-temp" min="0" max="60" step="1" placeholder="temperature (in C°)">
                <input type="number" id="annealing-time" name="annealing-time" min="0" max="100" step="1" placeholder="duration (in min)">
            </template>
            <template #content>
                <Line :options="annealingOptions" :data="annealingData"></Line>
            </template>
        </MeasureCard>
        <MeasureCard>
            <template #header>
                IV
            </template>
            <template #parameters>
                <input type="number" id="iv-start" name="iv-start" min="-1000" max="1000" step="1" placeholder="start voltage (in V)">
                <input type="number" id="iv-stop" name="iv-stop" min="-1000" max="1000" step="1" placeholder="stop voltage (in V)">
                <input type="number" id="iv-step" name="iv-step" min="-1000" max="1000" step="1" placeholder="step voltage (in V)">
            </template>
            <template #content>
                <Line :options="ivOptions" :data="ivData"></Line>
            </template>
        </MeasureCard>
        <MeasureCard>
            <template #header>
                Charge Collection
            </template>
            <template #parameters>
                <input type="number" id="iv-start" name="iv-start" min="-1000" max="1000" step="1" placeholder="start voltage (in V)">
                <input type="number" id="iv-stop" name="iv-stop" min="-1000" max="1000" step="1" placeholder="stop voltage (in V)">
                <input type="number" id="iv-step" name="iv-step" min="-1000" max="1000" step="1" placeholder="step voltage (in V)">
                <input type="number" id="evt" name="evt" min="0" step="1000" placeholder="no. of events">
            </template>
            <template #content>
                <ProgressBar :current-step="22" :max-steps="30" :height="'2rem'"></ProgressBar>
            </template>
        </MeasureCard>
    </article>
</template>

<script setup lang="ts">
import MeasureCard from '@/components/MeasureCard.vue';
import ProgressBar from '@/components/ProgressBar.vue';
import { defineComponent, onMounted, onUnmounted, reactive, ref, type Ref } from 'vue';
import axios from 'axios';
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

import { Line } from 'vue-chartjs';

ChartJS.register(
    LinearScale,
    CategoryScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

interface ResponseData {
    x: number[];
    y: number[];
}

defineComponent({
    components: {
        MeasureCard,
        ProgressBar,
        Line,
    }
});

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
        },
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
                callback: (value: number) => `${value * 100}%`,
            },
        },
    },
    plugins: {
        legend: {
            display: false,
        },
    },
});

const backendStatus : Ref<string | null> = ref(null);
const measurementRunning : Ref<boolean> = ref(false);
let backendStatusTimer: number = -1;

const host = "192.168.13.16";
const gatewayport = "5555";

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
const zinc = getComputedStyle(document.documentElement).getPropertyValue('--zinc');

function packData(method: string, recipient: string, path: string, payload: any) {
    return {
        method,
        recipient,
        path,
        payload,
    };
}

async function getData(measurementType: string): Promise<ResponseData> {
    const data = packData("get", "liveplot", `/measurements/${measurementType}`, null);
    try {
        const response = await axios.post(`http://${host}:${gatewayport}/`, data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
    return {x: [], y: []};
}

function makeChartStructure(data: ResponseData, label: string): ChartData {
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

onMounted(() => {
    backendStatusTimer = setInterval(async () => {
        const data = packData("get", "supervisor", "/control", null);
        try {
            const response = await axios.post(`http://${host}:${gatewayport}/`, data);
            backendStatus.value = response.data.state;
            measurementRunning.value = backendStatus.value != "idle";

            if(measurementRunning.value) {
                const ivResponse : ResponseData = await getData("iv");
                const annealingResponse : ResponseData = await getData("annealing");
                ivData.value = makeChartStructure(ivResponse, "IV");
                annealingData.value = makeChartStructure(annealingResponse, "Annealing");
            }

        } catch (error) {
            console.log(error);
        }
    }, 1000);
});

onUnmounted(() => {
    clearInterval(backendStatusTimer);
});

</script>

<style scoped>
article {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

label {
    margin-right: 0.5rem;
}

input {
    font: inherit;
    width: 100%;
    font-size: 1.1rem;
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
</style>