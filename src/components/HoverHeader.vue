<template>
    <div class="hover-header"><span class="highlight">{{ header.operator }}</span> measuring sensor <span class="highlight">{{ header.name }} ({{ header.project }})</span></div>
</template>
<script setup lang="ts">
import { useHeaderStore } from '@/stores/stores';

const headerStore = useHeaderStore();
const header = headerStore.getHeader;

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