<template>
    <article class="temperature-view">
        <article class="current-temperature card">
            <header class="card-header">Current Temperatures</header>
            <section class="channel-wrapper">
                <TemperatureChannel v-for="channel in 4" :channelNumber="channel" :key="channel" />
            </section>
        </article>
        <article class="set-controls card">
            <header class="card-header">Set</header>
            <form class="temperature-submit">
                <input type="number" id="set-temperature" name="set-temperature" />
                <section class="submit-btns">
                    <input type="submit" value="Set" class="btn"/>
                    <input type="submit" value="Fluctuation" class="btn"/>
                </section>
            </form>
        </article>
        <article class="status card">
            <header class="card-header">Status</header>

        </article>
        <article class="controls card">
            <header class="card-header">Controls</header>
        </article>
        <article class="grafana card">
            <header class="card-header">Graph</header>

        </article>
    </article>
</template>
<script setup lang="ts">
import { useTemperatureStore, useAddressesStore} from '@/stores/stores';
import axios from 'axios';
import TemperatureChannel from '@/components/TemperatureChannel.vue';

const temperatureStore = useTemperatureStore();
const addresses = useAddressesStore();

</script>
<style scoped>
.temperature-view {
    display: grid;
    grid-template-areas: 
        "current-temperature grafana"
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

.channel-wrapper {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.card-header {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    margin: 0.5rem;
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
    margin: 0.5rem;
    transition: all 0.2s ease-in-out;
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
    margin: 0.5rem;
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
    background: var(--primary-color);
    height: 2rem;
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.4);
}
</style>