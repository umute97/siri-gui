<template>
    <article>
        <figure>
            <div class="oops">Oops!</div>
            <figcaption>The content you were looking for went for some cigarettes. Please go <router-link to="/">back to the
                    overview</router-link>!</figcaption>
        </figure>
    </article>
</template>

<style scoped>
article {
    display: grid;
    place-items: center;
    height: 100%;
}

.oops {
    font-size: 10rem;
    font-weight: 700;
    text-align: center;

    @supports (background-clip: text) or (-webkit-background-clip: text) {
        background: #11998e;
        background: -webkit-linear-gradient(to right, #38ef7d, #11998e);
        background: linear-gradient(to right, #38ef7d, #11998e);
        background-size: 110% auto;
        background-position: center;
        color: transparent;
        -webkit-background-clip: text;
        background-clip: text;
    }
}

figcaption {
    font-size: 1.2rem;
    color: white;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    text-align: center;
}

figcaption a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 700;
    transition: all 0.2s ease-in-out;
}

figcaption a:hover {
    color: var(--highlight-text-color);
}
</style>