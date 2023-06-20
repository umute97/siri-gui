<template>
    <div class="hover-header"><span class="highlight">{{ header.operator }}</span> measuring sensor <span class="highlight">{{ header.name }} ({{ header.project }})</span></div>
</template>
<script setup lang="ts">
import { useAddressesStore, useHeaderStore } from '@/stores/stores';
import type { Header } from '@/util/types';
import { packData, pick } from '@/util/utils';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const headerStore = useHeaderStore();
const addresses = useAddressesStore();
const header = ref(headerStore.getHeader);

async function requestHeader(): Promise<Header> {
    const headerPayload = packData("get", "storage", "/data", null);
    try {
        const response = await axios.post(`${addresses.getFullGatewayAddress}`, headerPayload);
        return pick(response.data, 'operator', 'project', 'name');
    } catch (error) {
        console.error(error);
        return { operator: '', project: '', name: '' };
    }
}

onMounted(async () => {
    const { operator, project, name } = await requestHeader();
    headerStore.setHeader(operator, project, name);
    header.value = headerStore.getHeader;
});

</script>
<style>
.hover-header {
    position: absolute;
    background: var(--primary-color);
    padding: 0.3rem 0.5rem;
    border: none;
    border-radius: 8px;
    bottom: 4rem;
    left: 4rem;
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.8);
    transition: all 0.2s ease-in-out;
}

.highlight {
    color: var(--zinc);
    font-weight: bold;
}
</style>