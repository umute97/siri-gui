<template>
    <article>
        <header>
            <h1>Channel {{ props.channel }}</h1>
            <input type="checkbox" class="channel-switch" @click.prevent="$emit('toggleISEGChannel', props.channel)" :checked="props.channelEnabled">
        </header>
        <section class="current">
            <label>Current</label>
            <input type="number" disabled v-bind="current">
        </section>
        <section class="voltage">
            <label>Voltage</label>
            <form>
                <input type="number" v-model.number="voltage">
                <input class="voltage-submit" type="submit" value="Set" @click.prevent="$emit('setISEGChannelVoltage', Number(voltage.toFixed(2)), props.channel);">
            </form>
        </section>
    </article>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    channel: {
        type: Number,
        required: true,
    },
    channelEnabled: {
        type: Boolean,
        required: true,
    },
});

const current = ref(0);
const voltage = ref(0);

</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.channel-switch {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid white;
    appearance: none;
    outline: none;
    cursor: pointer;
    background: var(--red-400);
    box-shadow: 0 0 0.8rem 0.3rem var(--red-500);
}

.channel-switch:checked {
    background: var(--primary-color);
    box-shadow: 0 0 0.8rem 0.3rem var(--primary-color);
}

header {
    display: flex;
    font-size: 1.1rem;
    justify-content: center;
    gap: 1rem;
    align-items: center;
}

.voltage, .current {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
}

label {
    color: var(--primary-color);
    font-size: 0.9rem;
}

input[type="number"] {
    width: 100%;
    height: 2.5rem;
    border: none;
    border-bottom: 1px solid white;
    outline: none;
    font-size: 1rem;
    padding: 0 0.5rem;
}

.voltage-submit {
    grid-area: voltageSubmit;
    justify-self: flex-end;
    text-align: center;
    border-radius: 5px;
    border: none;
}

.voltage form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
}

.voltage form input[type="submit"] {
    font: inherit;
    color: var(--zinc);
    background: var(--primary-color);
    min-width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
}

</style>
