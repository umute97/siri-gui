<template>
    <section class="temperature-channel">
        <h1 class="channel">Ch. {{ props.channelNumber }}</h1>
        <div class="temperature">{{ currentTemperature }} °C</div>
    </section>
</template>
<script setup lang="ts">
import { useTemperatureStore } from '@/stores/stores';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const temperatureStore = useTemperatureStore();
const { temperatures } = storeToRefs(temperatureStore);
const currentTemperature = computed(() => {
    if (temperatures.value[props.channelNumber - 1]) return temperatures.value[props.channelNumber - 1].toFixed(1);
    return 'N/A';
})

const props = defineProps({
    channelNumber: {
        type: Number,
        required: true
    },
})
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