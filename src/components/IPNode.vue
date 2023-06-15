<template>
    <div class="node">
        <figure>
            <HomeIcon class="w-6 h-6"/>
            <figcaption>{{ label }}</figcaption>
        </figure>
        <input type="text" v-model="addressesStore[props.network as keyof typeof addressesStore]"/>
    </div>
</template>
<script setup lang="ts">
import { useAddressesStore } from '@/stores/stores';
import { HomeIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';
const props = defineProps({
    label: {
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
    },
});
const addressesStore = useAddressesStore();
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

.node {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
}

div:focus-within {
    border-top: 1px solid var(--primary-color);
}

input {
    font: inherit;
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