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
            </template>
            <template #content>
                <Line :options="ivOptions" :data="ivData"></Line>
            </template>
        </MeasureCard>
        <MeasureCard>
            <template #header>
                Charge Collection
            </template>
        </MeasureCard>
    </article>
</template>

<script setup lang="ts">
import MeasureCard from '@/components/MeasureCard.vue';
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
    height: 100%;
    padding: 1rem;
}

label {
    margin-right: 0.5rem;
}

input {
    width: 100%;
    font-size: 1.1rem;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid white;
    background: var(--zinc);
    color: white;
}
</style>