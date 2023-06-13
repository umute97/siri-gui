<template>
    <article>
        <header>
            <slot name="header"></slot>
        </header>
        <section class="params">
            <slot name="parameters"></slot>
        </section>
        <section class="mc-controls">
            <button class="start btn" @click="$emit('start')" :disabled="!props.enabled">Start</button>
            <button class="pause btn" @click="$emit('pause')" :disabled="!props.enabled">Pause</button>
            <button class="stop btn" @click="$emit('stop')" :disabled="!props.enabled">Stop</button>
        </section>
        <section class="content">
            <slot name="content"></slot>
        </section>
    </article>
</template>

<script setup lang="ts">
defineEmits(['start', 'pause', 'stop']);
const props = defineProps({
    enabled: {
        type: Boolean,
        default: true,
    },
});
</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    gap: 2rem;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    background: var(--zinc);
    box-shadow: 5px 5px 10px 0 rgba(0, 0, 0, 0.8);
}

header {
    font-size: 1.4rem;
    color: white;
    align-self: flex-start;
}

.mc-controls {
    width: 100%;
    display: flex;
    gap: 0.5rem;
    justify-content: space-around;
    align-items: center;
}

.btn {
    all: unset;
    text-align: center;
    flex: 1;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    color: var(--zinc);
    font-weight: 600;
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, 0.4);
}

.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.start {
    background: var(--primary-color);
}

.pause {
    background: var(--yellow-500);
}

.stop {
    background: var(--red-500);
}

.params {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    width: 100%;
    align-items: center;
}

.content {
    width: 100%;
}
</style>