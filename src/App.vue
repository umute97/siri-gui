<template>
  <div id="app">
    <Header />
    <main>
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

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
