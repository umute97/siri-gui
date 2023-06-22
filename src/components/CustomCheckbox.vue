<template>
    <div>
        <div class="checkbox-box" :style="checkedStyle" @click="$emit('togglePolarity')">
            {{ mark }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    colors: {
        type: Array,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
    marks: {
        type: Array,
        required: false,
    },
});

defineEmits(['togglePolarity']);

const checkedStyle = computed(() => {
    if (props.colors[1] === "transparent") {
        return {
            backgroundColor: props.checked ? props.colors[0] as string : "transparent",
            boxShadow: props.checked ? `0 0 0.8rem 0.3rem ${props.colors[0]}` : 'none',
            fontSize: mark.value.length > 1 ? '0.5rem' : '0.8rem',
            color: props.checked ? 'black': 'white',
            fontWeight: mark.value.length < 2 ? 'bold' : 'normal',
        };
    }
    return {
        backgroundColor: props.checked ? props.colors[0] as string : props.colors[1] as string,
        boxShadow: props.checked ? `0 0 0.8rem 0.3rem ${props.colors[0]}` : `0 0 0.8rem 0.3rem ${props.colors[1]}`,
        fontSize: mark.value.length > 1 ? '0.5rem' : '0.8rem',
        color: 'white',
    };
});

const mark = computed(() => {
    if (props.marks) {
        return props.checked ? props.marks[0] as string : props.marks[1] as string;
    }
    return "";
});
</script>
<style scoped>
.checkbox-box {
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    vertical-align: middle;
    border: 1px solid white;
    appearance: none;
    outline: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.5rem;
}
</style>
