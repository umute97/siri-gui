<template>
    <div class="hover-header"><span class="highlight">{{ header.operator }}</span> measuring sensor <span class="highlight">{{ header.name }} ({{ header.project }})</span></div>
</template>
<script setup lang="ts">
import { requestHeader } from '@/util/networking';
import { useHeaderStore } from '@/stores/stores';
import { onMounted, ref } from 'vue';

const headerStore = useHeaderStore();
const header = ref(headerStore.getHeader);


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