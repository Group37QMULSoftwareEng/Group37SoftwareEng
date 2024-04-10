<template>
    <router-view/>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    height: 100%;
    width: 100%;
    scroll-behavior: smooth;
    background-color: whitesmoke;
}

body {
    height: 100%;
    width: 100%;
    background-color: whitesmoke;
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    width: 100%;
}

.layout {
    display: flex;
    flex-direction: column;
}
</style>
