<template>
    <div class="container">
        <div :style="barStyle">
            <div class="progress">{{ progress.toFixed(0) }}% (step {{currentStep}}/{{maxSteps}})</div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed } from 'vue';

// get primary color
const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
const darkGreen = getComputedStyle(document.documentElement).getPropertyValue('--green-900');

// get progress as prop
const props = defineProps({
    currentStep: {
        type: Number,
        required: true,
    },
    maxSteps: {
        type: Number,
        required: true,
    },
    height: {
        type: String,
        default: '20px',
    },
});

// calculate progress
const progress = computed(() => {
    return (props.currentStep / props.maxSteps) * 100;
});

const barStyle = computed(() => {
    return {
        width: `${progress.value}%`,
        height: props.height,
        background: `linear-gradient(to right, ${darkGreen} 0%, ${primary} 100%)`,
    };
});
</script>
<style>
.container {
    width: 100%;
    height: 100%;
    background: var(--zinc);
    border-radius: 8px;
    overflow: hidden;
}

.progress {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.5);
}
</style>