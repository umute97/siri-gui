<template>
    <div :class="nodeClass">
        <figure>
            <HomeIcon class="w-6 h-6" v-if="networkType === 'host'"/>
            <FlagIcon class="w-6 h-6" v-else/>
            <figcaption>{{ label }}</figcaption>
        </figure>
        <input type="text" v-model="addressesStore[props.network as keyof typeof addressesStore]"/>
    </div>
</template>
<script setup lang="ts">
import { useAddressesStore } from '@/stores/addresses';
import { HomeIcon, FlagIcon } from '@heroicons/vue/24/outline';
import { defineComponent, ref } from 'vue';
const props = defineProps({
    label: {
        type: String,
        required: true,
    },
    networkType: {
        type: String,
        required: true,
    },
    network: {
        required: true,
    },
})

defineComponent({
    components: {
        HomeIcon,
        FlagIcon,
    },
});
const addressesStore = useAddressesStore();
const nodeClass = props.networkType === 'host' ? 'host-node' : 'port-node';
</script>
<style scoped>

figure {
    margin-top: 1rem;
}
figure figcaption {
    text-align: center;
}

figure svg {
    width: 5rem;
    height: 5rem;
    display: block;
    margin: 0 auto;
}

figure svg path {
    stroke-width: 1.1;
}

.host-node {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.port-node {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) translate(100%, 100%);
}

div:focus-within {
    border-top: 1px solid var(--primary-color);
}

input {
    font: inherit;
    width: 60%;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid white;
    background: var(--zinc);
    color: white;
    transition: all 0.2s ease-in-out;
}

input:focus {
    outline: none;
    border-bottom: 1px solid var(--primary-color);
}

</style>