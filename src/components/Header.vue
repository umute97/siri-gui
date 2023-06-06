<template>
  <header>
      <router-link to="/"><img src="@/assets/logo-large.png" alt="SIRI - An iterative irradiation control suite." id="logo"/></router-link>
      <h1>SIRI - An iterative irradiation control suite.</h1>
  </header>
</template>
<style scoped>
header {
  display: flex;
  width: 100%;
  height: 80px;
  padding: 10px;
  margin: 10px;
  align-items: flex-end;
  border-bottom: 1px solid white;
}

#logo {
  width: auto;
  height: auto;
  max-width: 60px;
  max-height: 60px;
  transition: transform 0.2s ease-in-out;
}

#logo:hover {
  cursor: pointer;
  transform: scale(1.1);
}

header h1 {
  display: inline;
  font-size: 1.5rem;
  font-weight: 300;
  margin-left: 10px;
  margin-top: 10px;
}

</style>
