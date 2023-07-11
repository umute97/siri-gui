<template>
    <article class="direct-wrapper">
        <article class="card iseg">
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
            <form class="devicemanager-form">
                <section class="device">
                    <label>Device</label>
                    <input type="text" v-model="device" name="device" />
                </section>
                <section class="command">
                    <label>Command</label>
                    <input type="text" v-model="command" name="command" />
                </section>
                <section class="arguments">
                    <label>Arguments</label>
                    <input type="text" v-model="args" name="arguments" />
                </section>
                <section class="output">
                    <label>Output</label>
                    <textarea type="text" v-model="output" name="output" />
                </section>
                <input class="send" type="submit" value="Send" @click.prevent="sendDeviceManager">
            </form>
        </article>
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
const output: Ref<string | undefined> = ref('');

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

.direct-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.card {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.8);
    border-radius: 8px;
    background: var(--zinc);
    padding: 10px;
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

.devicemanager-form {
    display: grid;
    grid-template-areas:
        "device output"
        "command output"
        "arguments output"
        "send output";
    gap: 1rem;
}

.device {
    grid-area: device;
}

.command {
    grid-area: command;
}

.arguments {
    grid-area: arguments;
}

.output {
    grid-area: output;
}

.send {
    grid-area: send;
    justify-self: flex-end;
    text-align: center;
    border-radius: 5px;
    border: none;
}

label {
    align-self: flex-start;
    color: var(--primary-color);
    font-size: 0.9rem;
}

form input[type="text"],
form textarea {
    width: 100%;
    height: 2.5rem;
    border: none;
    border-bottom: 1px solid white;
    outline: none;
    font-size: 1rem;
    padding: 0 0.5rem;
}

form textarea {
    padding: 0.5rem;
}

form input[type="submit"] {
    font: inherit;
    color: var(--zinc);
    background: var(--primary-color);
    cursor: pointer;
    width: 100%;
}

form section {
    display: flex;
    flex-direction: column;
}
</style>
