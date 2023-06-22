<template>
    <article>
        <header>
            <h1>Channel {{ props.channel }}</h1>
            <CustomCheckbox @click.prevent="$emit('toggleISEGPolarity', props.channel)" :checked="props.polarity" :colors="['var(--red-500)', 'var(--blue-400)']" :marks="['+', '-']" />
            <CustomCheckbox @click.prevent="$emit('toggleISEGChannel', props.channel)" :checked="props.channelEnabled" :colors="['var(--primary-color)', 'transparent']" :marks="['ON', 'OFF']"/>
        </header>
        <section class="fields">
            <section class="value">
                <label>Current (A)</label>
                <input type="number" disabled v-model="props.current">
            </section>
            <section class="value">
                <label>Voltage (V)</label>
                <input type="number" disabled v-model="props.voltage">
            </section>
            <section class="set">
                <label>Compliance (A)</label>
                <form>
                    <input type="number" v-model.number="currentCompliance">
                    <input class="iseg-submit" type="submit" value="Set"
                        @click.prevent="$emit('setISEGChannelCompliance', Number(currentCompliance.toExponential(2)), props.channel);">
                </form>
            </section>
            <section class="set">
                <label>Set Voltage (V)</label>
                <form>
                    <input type="number" v-model.number="setVoltage">
                    <input class="iseg-submit" type="submit" value="Set"
                        @click.prevent="$emit('setISEGChannelVoltage', Number(setVoltage.toFixed(2)), props.channel);">
                </form>
            </section>
        </section>
    </article>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import CustomCheckbox from './CustomCheckbox.vue';

defineComponent({
    components: {
        CustomCheckbox,
    },
});

const props = defineProps({
    channel: {
        type: Number,
        required: true,
    },
    channelEnabled: {
        type: Boolean,
        required: true,
    },
    current: {
        type: Number,
        required: true,
    },
    voltage: {
        type: Number,
        required: true,
    },
    polarity: {
        type: Boolean,
        required: true,
    },
});
const setVoltage = ref(0);
const currentCompliance = ref(0);
</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid white;
    padding: 1rem;
    border-radius: 8px;
}

.fields {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

header {
    display: flex;
    font-size: 1.1rem;
    justify-content: center;
    gap: 1rem;
    align-items: center;
}

.value {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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

.iseg-submit {
    justify-self: flex-end;
    text-align: center;
    border-radius: 5px;
    border: none;
}

.set form {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 0.5rem;
}

.set form input[type="submit"] {
    font: inherit;
    color: var(--zinc);
    background: var(--primary-color);
    min-width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
}
</style>
