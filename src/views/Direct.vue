<template>
    <article class="card">
        <header>iseg SHR4220</header>
        <section class="content">
            <ISEGChannel v-for="channel in 4" :channel="channel - 1" :channel-enabled="isegChannelsEnabled[channel - 1]"
                :current="isegCurrents[channel - 1]" :compliance="isegCompliances[channel - 1]"
                :voltage="isegVoltages[channel - 1]" :set-voltage="isegSetVoltages[channel - 1]"
                :polarity="isegPolarities[channel - 1]" @toggleISEGChannel="toggleISEGChannelOutput"
                @setISEGChannelVoltage="setISEGChannelVoltage" @setISEGChannelCompliance="setISEGChannelCompliance"
                @toggleISEGPolarity="toggleISEGChannelPolarity(channel - 1)" />
        </section>
    </article>
    <article class="card">
        <header>DeviceManager Command</header>
        <form>
            <section>
                <label>Device</label>
                <input type="text" v-model="device" name="device" placeholder="Device" />
            </section>
            <section>
                <label>Command</label>
                <input type="text" v-model="command" name="command" placeholder="Command" />
            </section>
            <section>
                <label>Arguments</label>
                <input type="text" v-model="args" name="arguments" placeholder="Arguments" />
            </section>
            <section>
                <label>Output</label>
                <input type="text" v-model="output" name="output" placeholder="Output" />
            </section>
            <input type="submit" value="Send" @click.prevent="sendDeviceManager">
        </form>
    </article>
</template>

<script lang="ts" setup>
import ISEGChannel from '@/components/ISEGChannel.vue';
import {
getISEGCompliances,
getISEGOutputs,
getISEGPolarities,
getISEGSetVoltages,
readISEGCurrents,
readISEGVoltages,
sendDeviceManagerCommand,
setISEGChannelCompliance,
setISEGChannelVoltage,
toggleISEGChannelOutput,
toggleISEGChannelPolarity
} from '@/util/networking';

import { defineComponent, onMounted, onUnmounted, ref, type Ref } from 'vue';

const isegChannelsEnabled = ref([false, false, false, false]);
const isegCurrents = ref([0, 0, 0, 0]);
const isegVoltages = ref([0, 0, 0, 0]);
const isegPolarities = ref([true, true, true, true]);
const isegSetVoltages = ref([0, 0, 0, 0]);
const isegCompliances = ref([0, 0, 0, 0]);
let isegTimer: number = -1;

const device = ref('');
const command = ref('');
const args = ref('');
const output: Ref<string | number | object | void> = ref('');

defineComponent({
    components: {
        ISEGChannel,
    },
});

onMounted(async () => {
    isegSetVoltages.value = await getISEGSetVoltages();
    isegCompliances.value = await getISEGCompliances();

    isegTimer = window.setInterval(async () => {
        isegChannelsEnabled.value = await getISEGOutputs();
        isegCurrents.value = await readISEGCurrents();
        isegVoltages.value = await readISEGVoltages();
        isegPolarities.value = await getISEGPolarities();
    }, 1000);
});

onUnmounted(() => {
    window.clearInterval(isegTimer);
});

async function sendDeviceManager() {
    const argsValid = args.value === "" || args.value === "null" ? null : args.value;
    output.value = await sendDeviceManagerCommand(device.value, command.value, argsValid);
}
</script>

<style scoped>
.card {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    background: var(--zinc);
    padding: 10px;
    margin: 1rem auto;
}

.card header {
    font-size: 1.3rem;
    margin-bottom: 1rem;
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
