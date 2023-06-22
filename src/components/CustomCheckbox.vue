<template>
    <div>
        <div class="checkbox-box" :style="checkedStyle" @click="$emit('togglePolarity')">
            <slot v-if="props.checked">
            </slot>
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
});

defineEmits(['togglePolarity']);

const checkedStyle = computed(() => {
    if (props.colors[1] === "transparent") {
        return {
            backgroundColor: props.checked ? props.colors[0] as string : "transparent",
            boxShadow: props.checked ? `0 0 0.8rem 0.3rem ${props.colors[0]}` : 'none',
        };
    }
    return {
        backgroundColor: props.checked ? props.colors[0] as string : props.colors[1] as string,
        boxShadow: props.checked ? `0 0 0.8rem 0.3rem ${props.colors[0]}` : `0 0 0.8rem 0.3rem ${props.colors[1]}`
    };
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
}
</style>
