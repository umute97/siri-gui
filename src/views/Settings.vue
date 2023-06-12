<template>
    <article>
        <IPNode :label="backendNode.label" :network="backendNode.network" :network-type="backendNode.networkType" />
        <IPNode v-for="node in portNodes" :key="node.label" :label="node.label" :network="node.network" :network-type="node.networkType" />
    </article>
</template>
<script setup lang="ts">
import IPNode from '@/components/IPNode.vue';

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
</script>
<style scoped>
article {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>