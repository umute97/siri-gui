<template>
    <section class="overview-wrapper">
        <article class="menu">
            <router-link to="/measure" id="measure-link" class="tile"><div>measure</div></router-link>
            <router-link to="/settings" id="temperature-link" class="tile"><div>settings</div></router-link>
            <router-link to="/temperature" id="direct-control-link" class="tile"><div>temperature</div></router-link>
            <router-link to="/control" id="settings-link" class="tile"><div>direct control</div></router-link>
        </article>
    </section>
</template>

<script setup lang="ts">
</script>

<style>
.overview-wrapper {
    margin-top: 10rem;
    display: grid;
    place-items: center;
}

.menu {
    transform: rotate(45deg);
    display: grid;
    grid-template: auto auto / auto auto;
}

.tile {
    text-decoration: none;
    padding: 1rem;
    font-size: 1.5rem;
    display: block;
    width: 200px;
    height: 200px;
    margin: 10px;
    background-color: var(--zinc);
    color: var(--primary-color);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease-in-out;
}

.tile div {
    height: 100%;
    display: grid;
    place-items: center;
    text-align: center;
    text-transform: uppercase;
    transform: rotate(-45deg);
}

.tile:hover {
    transform: scale(1.1);
    background: var(--primary-color);
    color: var(--zinc);
}

</style>