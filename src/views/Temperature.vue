<template>
    <article class="temperature-view">
        <article class="current-temperature card">
            <header class="card-header">Current Temperatures</header>
            <section class="channel-wrapper">
                <TemperatureChannel v-for="channel in 4" :channelNumber="channel" :key="channel" />
            </section>
        </article>
        <article class="current-dewpoint card">
            <header class="card-header">Current Dewpoint</header>
            <section class="dewpoint-wrapper">
                <p :class="dewpointBelowSet">{{ temperatureStore.dew_point }} °C</p>
            </section>
        </article>
        <article class="set-controls card">
            <header class="card-header">Set</header>
            <form class="temperature-submit">
                <input type="number" id="set-temperature" name="set-temperature" v-model="temperatureStore.set_point" />
                <section class="submit-btns">
                    <button class="primary btn" @click.prevent="setTemperatureSetPoint">Set</button>
                    <button class="yellow btn" @click.prevent="setTemperatureFluctuation">Fluctuation</button>
                </section>
            </form>
        </article>
        <article class="status card">
            <header class="card-header">Status</header>
            <section class="status-wrapper">
                <div :style="indicatorStyle"></div>
                <p v-if="temperatureStore.getIsStable">Stable for {{ temperatureStore.getStableTimer }} sec.</p>
                <p v-else>Not stable ({{ Math.abs(temperatureStore.getStableTimer) }} sec. remaining)</p>
            </section>
        </article>
        <article class="controls card">
            <header class="card-header">Controls</header>
            <section class="control-buttons">
                <button class="primary btn" @click.prevent="startControlling">Start</button>
                <button class="red btn" @click.prevent="stopControlling">Stop</button>
                <button class="yellow btn">Reset</button>
            </section>
        </article>
        <article class="grafana card">
            <header class="card-header">Graph</header>
            <iframe :src="addresses.getFullGrafanaAddress" frameborder="0" width="100%" height="90%"></iframe>
        </article>
    </article>
</template>
<script setup lang="ts">
import {
    getTemperatures,
    getDewpoint,
    getTemperatureStableStatus,
    startControlling,
    stopControlling,
    setTemperatureFluctuation,
    setTemperatureSetPoint
} from '@/util/networking';
import { useTemperatureStore, useAddressesStore } from '@/stores/stores';
import TemperatureChannel from '@/components/TemperatureChannel.vue';
import { computed, onMounted, onUnmounted } from 'vue';

const temperatureStore = useTemperatureStore();
const addresses = useAddressesStore();
let temperatureStatusTimer = 0;

const dewpointBelowSet = computed(() => {
    if (temperatureStore.dew_point < Number(temperatureStore.set_point)) return "var(--primary-color)";
    return "var(--red-500)";
});

const temperatureStableColor = computed(() => {
    const is_stable = temperatureStore.stable_status.is_stable;
    if (is_stable) return "var(--green-500)";
    return "var(--red-500)";
});

const indicatorStyle = computed(() => {
    return {
        backgroundColor: temperatureStableColor.value,
        width: "2rem",
        height: "2rem",
        borderRadius: "50%",
        boxShadow: `0 0 0.5rem 0.25rem ${temperatureStableColor.value}`,
    }
});

onMounted(async () => {
    const { range } = await getTemperatures();
    if (range.check_value) temperatureStore.setSetPoint(`${range.check_value}`);

    temperatureStatusTimer = window.setInterval(async () => {
        const { value } = await getTemperatures();
        const dewpoint = await getDewpoint();
        const stableStatus = await getTemperatureStableStatus();
        temperatureStore.setTemperatures(value);
        temperatureStore.setStableStatus(stableStatus);
        temperatureStore.setDewPoint(dewpoint);
    }, 1000);
});

onUnmounted(() => {
    window.clearInterval(temperatureStatusTimer);
});

</script>
<style scoped>
.temperature-view {
    display: grid;
    grid-template-areas:
        "current-temperature grafana"
        "current-dewpoint grafana"
        "set-controls grafana"
        "status grafana"
        "controls grafana";
    grid-template-columns: 1fr 2fr;
    grid-template-rows: auto auto auto auto;
    gap: 2rem;
}

.current-temperature {
    grid-area: current-temperature;
    padding-bottom: 2rem;
}

.current-dewpoint {
    grid-area: current-dewpoint;
}

.set-controls {
    grid-area: set-controls;
}

.status {
    grid-area: status;
}

.controls {
    grid-area: controls;
}

.set-controls {
    grid-area: set-controls;
}

.grafana {
    grid-area: grafana;
}

.grafana iframe {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}

.channel-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.card-header {
    font-size: 1.3rem;
    margin: 0.5rem 0 0.5rem 1rem;
}

.card {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    background: var(--zinc);
}

.temperature-submit {
    display: grid;
    grid-template-areas:
        "set-temperature"
        "submit-btns";
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
}

#set-temperature {
    grid-area: set-temperature;
    border: none;
    border-bottom: 1px solid white;
    background: var(--zinc);
    color: white;
    font: inherit;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem;
    transition: all 0.2s ease-in-out;
}

#set-temperature::after {
    content: "°C";
    font-size: 1rem;
    margin-left: 0.5rem;
}

#set-temperature:focus {
    outline: none;
    border-bottom: 1px solid var(--primary-color);
}

.submit-btns {
    grid-area: submit-btns;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 1rem;
    gap: 1rem;
}

.btn {
    border: none;
    text-align: center;
    flex: 1;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    color: var(--zinc);
    height: 2rem;
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.4);
}

.primary {
    background: var(--primary-color);
}

.red {
    background: var(--red-500);
}

.yellow {
    background: var(--yellow-500);
}

.status-indicator {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin: 0.5rem;
    transition: all 0.2s ease-in-out;
}

.status-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    margin: 1rem;
}

.control-buttons {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
    margin: 1rem;
}

.dewpoint-wrapper p {
    margin: 1rem;
    font-size: 2rem;
    font-weight: bold;
    color: var(--primary-color);
}
</style>