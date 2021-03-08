<template>
  <div id="app">
    <header>
      <h1 class="title"><a href="//khaleelgibran.com">Khaleel Gibran</a></h1>
      <p class="subtitle">The blog of a fourteen-year-old web developer. </p>
    </header>
    <router-view/>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400&family=Inter:wght@300;400;500;600&display=swap');

body {
  --link-purple: rgb(153, 0, 255);
}

@media only screen and (max-width: 600px) {
  #app {
    margin: 10px !important;
  }

  .home {
    margin: 10px;
  }
}

#app {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 15vw;
  margin-right: 15vw;
  margin-top: 60px;
  margin-bottom: 60px;
}

header {
  margin: 5vw;
}

h1 a {
  font-family: "Fira Code", "IBM Plex Mono", monospace;
  color: black;
}

a {
  color: var(--link-purple);
  text-decoration: none;
}

.title {
  margin-bottom: 0px;
}

.subtitle {
  opacity: .8;
  font-size: 16px;
  margin-top: 0px;
  color: #444;
}

</style>
