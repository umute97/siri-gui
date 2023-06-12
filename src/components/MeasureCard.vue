<template>
    <article>
        <header>
            <slot name="header"></slot>
        </header>
        <section class="params">
            <slot name="parameters"></slot>
        </section>
        <section class="mc-controls">
            <button class="start btn">Start</button>
            <button class="pause btn">Pause</button>
            <button class="stop btn">Stop</button>
        </section>
        <section class="content">
            <slot name="content"></slot>
        </section>
    </article>
</template>

<script setup lang="ts">
defineEmits(['start', 'pause', 'stop']);
</script>

<style scoped>
article {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    gap: 1rem;
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
    justify-content: space-between;
}

.content {
    width: 100%;
}
</style>