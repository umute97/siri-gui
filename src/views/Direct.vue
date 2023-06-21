<template>
    <article class="card">
        <header>iseg SHR4220</header>
        <section class="content">
            <ISEGChannel v-for="channel in 4" :channel="channel - 1" :channel-enabled="isegChannelsEnabled[channel - 1]" @toggleISEGChannel="toggleISEGChannel" @setISEGChannelVoltage="setISEGChannelVoltage"/>
        </section>
    </article>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from 'vue';
import { toggleISEGChannel, setISEGChannelVoltage, getISEGOutputs } from '@/util/networking';
import ISEGChannel from '@/components/ISEGChannel.vue';

const isegChannelsEnabled = ref([false, false, false, false]);
let isegTimer: number = -1;

defineComponent({
    components: {
        ISEGChannel,
    },
});

onMounted(() => {
    isegTimer = window.setInterval(async () => {
        isegChannelsEnabled.value = await getISEGOutputs();
    }, 1000);
});

onMounted(() => {
    window.clearInterval(isegTimer);
});
</script>

<style scoped>
.card {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    background: var(--zinc);
}
.card header {
    font-size: 1.3rem;
    margin: 0.5rem 0 0.5rem 1rem;
}

.card section {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
}
</style>
