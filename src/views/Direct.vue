<template>
    <article class="card">
        <header>iseg SHR4220</header>
        <section class="content">
            <ISEGChannel v-for="channel in 4" :channel="channel - 1" :channel-enabled="isegChannelsEnabled[channel - 1]" :current="isegCurrents[channel - 1]" :voltage="isegVoltages[channel - 1]"
                @toggleISEGChannel="toggleISEGChannel" @setISEGChannelVoltage="setISEGChannelVoltage" />
        </section>
    </article>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';
import { toggleISEGChannel, setISEGChannelVoltage, getISEGOutputs, getISEGCurrents, getISEGVoltages } from '@/util/networking';
import ISEGChannel from '@/components/ISEGChannel.vue';

const isegChannelsEnabled = ref([false, false, false, false]);
const isegCurrents = ref([0, 0, 0, 0]);
const isegVoltages = ref([0, 0, 0, 0]);
let isegTimer: number = -1;

defineComponent({
    components: {
        ISEGChannel,
    },
});

onMounted(() => {
    isegTimer = window.setInterval(async () => {
        isegChannelsEnabled.value = await getISEGOutputs();
        isegCurrents.value = await getISEGCurrents();
        isegVoltages.value = await getISEGVoltages();
    }, 1000);
});

onUnmounted(() => {
    window.clearInterval(isegTimer);
});
</script>

<style scoped>
.card {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    background: var(--zinc);
    padding: 10px;
    margin: 1rem;
}

.card header {
    font-size: 1.3rem;
}

.card section {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
}

.content {
    display: flex;
    gap: 1rem;
    justify-content: space-evenly;
    align-items: center;
}
</style>
