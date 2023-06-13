<template>
    <button @click="clearList">
        <FireIcon class="w-6 h-6"/>
        <div class="tooltip">Clear measurement list</div>
        <div class="list-length">{{ listLength }}</div>
    </button>
</template>
<script setup lang="ts">
import { useAddressesStore } from '@/stores/addresses';
import { FireIcon } from '@heroicons/vue/24/outline';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const addresses = useAddressesStore();

const listLength = ref(0);
let listLengthInterval: number = 0;

function packData(method: string, recipient: string, path: string, payload: object | null) {
    return {
        method,
        recipient,
        path,
        payload,
    };
}
async function clearList() {
    const payload = packData('delete', 'supervisor', '/measurements/', null);
    try {
        await axios.post(`http://${addresses.getFullGatewayAddress}`, payload);
    } catch (error) {
        console.error(error);
    }
}

async function getListLength() {
    const payload = packData('get', 'supervisor', '/measurements/length', null);
    try {
        const response = await axios.post(`http://${addresses.getFullGatewayAddress}`, payload);
        listLength.value = response.data.measurements;
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    listLengthInterval = setInterval(getListLength, 1000);
});

</script>
<style>
button {
    position: absolute;
    background: var(--primary-color);
    border: none;
    border-radius: 50%;
    width: 4rem;
    height: 4rem;
    bottom: 5rem;
    right: 5rem;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.8);
    transition: all 0.2s ease-in-out;
    cursor: pointer;
}

button:hover {
    transform: scale(1.1);
}

button:hover .tooltip {
    visibility: visible;
}

.tooltip {
    width: 11rem;
    visibility: hidden;
    background: var(--zinc);
    font-weight: 600;
    color: white;
    text-align: center;
    padding: 0.5rem;
    position: absolute;
    z-index: 1;
    right: 105%;
    bottom: 105%;
    border-radius: 8px;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.8);
}

.list-length {
    position: absolute;
    display: inline-block;
    border-radius: 8px;
    padding: 0.3rem 0.5rem;
    top: 90%;
    background: var(--primary-color);
    box-shadow: inherit;
}
</style>