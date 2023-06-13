<template>
    <article class="settings-page">
        <section class="network-section">
            <IPNode :label="backendNode.label" :network="backendNode.network" :network-type="backendNode.networkType" />
            <IPNode v-for="node in portNodes" :key="node.label" :label="node.label" :network="node.network"
                :network-type="node.networkType" />
        </section>
        <section class="mc-header-section">
            <form @submit.prevent="validateHeader">
                <label for="operator">Operator</label>
                <input type="text" name="operator" v-model="headerForm.operator"/>
                <label for="project">Project</label>
                <input type="text" name="project" v-model="headerForm.project"/>
                <label for="sensor">Sensor</label>
                <input type="text" name="sensor" v-model="headerForm.name"/>
                <input type="submit" value="Set header">
            </form>
        </section>
    </article>
</template>
<script setup lang="ts">
import IPNode from '@/components/IPNode.vue';
import { useAddressesStore } from '@/stores/addresses';
import { reactive } from 'vue';
import axios from 'axios';

const backendNode = {
    label: 'The Backend',
    networkType: 'host',
    network: 'backendBaseIP',
}
const portNodes = [
    {
        label: 'Gateway',
        networkType: 'port',
        network: 'gatewayPort',
    },
]

const headerForm = reactive({
    operator: '',
    project: '',
    name: '',
});

const addresses = useAddressesStore();

function packData(method: string, recipient: string, path: string, payload: object | null) {
    return {
        method,
        recipient,
        path,
        payload,
    };
}

function submitHeader() {
    const header = packData("post", "storage", "/data", headerForm);
    try {
        axios.post(`http://${addresses.getFullGatewayAddress}`, header);
    } catch (error) {
        console.error(error);
    }
}

function validateHeader() {
    for (const [key, value] of Object.entries(headerForm)) {
        if (!value) {
            alert(`Please fill in ${key}`);
            return;
        }
    }
    submitHeader();
}
</script>
<style scoped>
.settings-page {
    display: flex;
    height: 100%;
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
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>