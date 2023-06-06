<template>
    <article>
        <MeasureCard>
            <template #header>
                Annealing
            </template>
        </MeasureCard>
        <MeasureCard>
            <template #header>
                IV
            </template>
        </MeasureCard>
        <MeasureCard>
            <template #header>
                Charge Collection
            </template>
        </MeasureCard>
    </article>
</template>

<script setup lang="ts">
import MeasureCard from '@/components/MeasureCard.vue';
import { defineComponent } from 'vue';

defineComponent({
    components: {
        MeasureCard
    }
});
</script>

<style scoped>
article {
    display: flex;
    justify-content: space-between;
    height: 100%;
    padding: 1rem;
}
</style>