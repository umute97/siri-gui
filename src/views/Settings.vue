<template>
    <article class="settings-page">
        <section class="network-section">
            <IPNode v-for="node in nodes" :key="node.label" :label="node.label" :network="node.network"/>
        </section>
        <section class="mc-header-section">
            <form @submit.prevent="validateHeader">
                <label for="operator">Operator</label>
                <input type="text" name="operator" v-model="header.operator" />
                <label for="project">Project</label>
                <input type="text" name="project" v-model="header.project" />
                <label for="sensor">Sensor</label>
                <input type="text" name="sensor" v-model="header.name" />
                <input type="submit" value="Set header">
            </form>
        </section>
    </article>
</template>
<script setup lang="ts">
import { submitHeader, requestHeader } from '@/util/networking';

import IPNode from '@/components/IPNode.vue';

import { useAddressesStore, useHeaderStore } from '@/stores/stores';
import { onMounted } from 'vue';

const nodes = [
    {
        label: "The Backend",
        network: "backendBaseIP",
    },
    {
        label: "Grafana",
        network: "grafanaBaseIP",
    }
]

const header = useHeaderStore();

function validateHeader() {
    for (const [key, value] of Object.entries(header.getHeader)) {
        if (!value) {
            alert(`Please fill in ${key}`);
            return;
        }
    }
    submitHeader();
}

onMounted(async () => {
    const {operator, project, name} = await requestHeader();
    header.setHeader(operator, project, name);

});
</script>
<style scoped>
.settings-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
}

.mc-header-section {
    display: grid;
    place-items: center;
    flex: 1;
}

.mc-header-section form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border: 1px solid white;
    border-radius: 8px;
    padding: 1rem;
}

.mc-header-section form label {
    margin-top: 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    color: var(--primary-color);
}

.mc-header-section form input[type=text] {
    font: inherit;
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid white;
    background: var(--zinc);
    color: white;
    transition: all 0.2s ease-in-out;
}

.mc-header-section form input[type=submit] {
    margin-top: 1rem;
    font-weight: 500;
    font-size: 1.1rem;
    width: 100%;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    background: var(--primary-color);
    color: white;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

.mc-header-section form input:focus {
    outline: none;
    border-bottom: 1px solid var(--primary-color);
}

.network-section {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
</style>