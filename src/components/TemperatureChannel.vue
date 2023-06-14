<template>
    <section class="temperature-channel">
        <h1 class="channel">Ch. {{ props.channelNumber }}</h1>
        <div class="temperature">{{ currentTemperature }} °C</div>
    </section>
</template>
<script setup lang="ts">
import { useTemperatureStore, useAddressesStore, type StableStatus } from '@/stores/stores';
import axios from 'axios';
import { computed, onMounted } from 'vue';

const temperatureStore = useTemperatureStore();
const addresses = useAddressesStore();

const currentTemperature = computed(() => {
    const channelTemperature = temperatureStore.getChannelTemperature(props.channelNumber - 1);
    if (channelTemperature) return channelTemperature.toFixed(1);
    return 'N/A';
});

let temperatureTimer: number = 0;

const props = defineProps({
    channelNumber: {
        type: Number,
        required: true
    }
})

function packData(method: string, recipient: string, path: string, payload: object | null) {
    return {
        method,
        recipient,
        path,
        payload,
    };
}

async function getTemperatureStableStatus(): Promise<StableStatus> {
    const payload = packData("get", "temperaturecontroller", "/is_stable", null);
    const response = await axios.post(`http://${addresses.getFullGatewayAddress}`, payload);
    return response.data.result;
}

async function getTemperatures(): Promise<number[]> {
    const payload = packData("get", "monitor", "/data/temperature:get_temperature", null);
    const response = await axios.post(`http://${addresses.getFullGatewayAddress}`, payload);
    return response.data.value;
}

onMounted(() => {
    temperatureTimer = setInterval(async () => {
        const stableStatus = await getTemperatureStableStatus();
        const temperatures = await getTemperatures();
        temperatureStore.setStableStatus(stableStatus);
        temperatureStore.setTemperatures(temperatures);
    }, 1000);
});
</script>
<style scoped>
.temperature-channel {
    background: var(--zinc);
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    padding: 1rem;
}
.channel {
    font-size: 1.2rem;
}

.temperature {
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
}
    
</style>