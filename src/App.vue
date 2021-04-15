<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <footer>
      <p class="copyright">
        Copyright &#xb7;
        <b><a href="//khaleelgibran.com">Khaleel Gibran</a></b> &#xb7;
        {{ year }}
      </p>

      <p class="small-greyed-text">
        Caught a mistake or have a question? Shoot me an email at
        <a href="mailto:hey@khaleelgibran.com">hey@khaleelgibran.com</a>!
      </p>
    </footer>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400&family=Inter:wght@300;400;500;600&display=swap");

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
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-left: 15vw;
  margin-right: 15vw;
  margin-top: 60px;
  margin-bottom: 60px;
}

a {
  color: var(--link-purple);
  text-decoration: none;
}

iframe {
  border: 0px solid white;
  width: 100%;
  height: 600px;
}

img {
  border-radius: 5px;
}

footer {
  margin-top: 60px;
  margin-bottom: 10px;
  font-family: "Inter", "Helvetica", "Arial", sans-serif;
  border-top: 2px solid #e5e7eb;
  vertical-align: center;
  margin-left: 5vw;
  margin-right: 5vw;
}

.copyright {
  margin-bottom: 3px;
}

.small-greyed-text {
  color: grey;
  font-size: 12px;
  margin-top: 0px;
}

footer a {
  color: black !important;
}

.utterances {
  margin-top: 40px;
  border-top: 1px solid #e5e7eb;
  padding-top: 20px;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.post img {
  width: 100%;
}

blockquote {
  font-family: "Inter", "Helvetica", sans-serif;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: whitesmoke;
  border-radius: 3px;
  margin-left: 0px;
  width: 100%;
  word-wrap: break-word;
  border-left: 5px solid var(--link-purple);
  border-top: 1px solid lightgray;
  border-right: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  box-sizing: border-box;
  /* box-shadow: 0 0px 0.5px rgba(0, 0, 0, 0.012), 0 0px 1.1px rgba(0, 0, 0, 0.017),
    0 0px 1.9px rgba(0, 0, 0, 0.021), 0 0px 3px rgba(0, 0, 0, 0.025),
    0 0px 4.6px rgba(0, 0, 0, 0.029), 0 0px 7.2px rgba(0, 0, 0, 0.033),
    0 0px 12px rgba(0, 0, 0, 0.038), 0 0px 24px rgba(0, 0, 0, 0.05); */
}
</style>
