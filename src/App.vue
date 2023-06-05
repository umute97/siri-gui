<template>
  <div id="main">
    <Header />
    <main id="content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue';
</script>

<style>
body {
  font-family: var(--font-family);
  font-size: 16px;
  padding: 10px;
}
</style>
