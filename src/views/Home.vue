<template>
  <div class="home">
    <VueSkeletonLoader
      v-visible="postsLoaded === false"
      type="rect"
      :width="300"
      :height="20"
      animation="fade"
      :rounded="true"
    />
    <VueSkeletonLoader
      v-visible="postsLoaded === false"
      type="rect"
      :width="400"
      :height="20"
      animation="fade"
      rounded="true"
    />
    <VueSkeletonLoader
      v-visible="postsLoaded === false"
      type="rect"
      :width="300"
      :height="20"
      animation="fade"
      :rounded="true"
    />
    <VueSkeletonLoader
      v-visible="postsLoaded === false"
      type="rect"
      :width="400"
      :height="20"
      animation="fade"
      rounded="true"
    />
    <VueSkeletonLoader
      v-visible="postsLoaded === false"
      type="rect"
      :width="300"
      :height="20"
      animation="fade"
      :rounded="true"
    />
    <VueSkeletonLoader
      v-visible="postsLoaded === false"
      type="rect"
      :width="400"
      :height="20"
      animation="fade"
      rounded="true"
    />
    <div class="post" v-for="(post) in notionData" :key="post.id">
      <p class="post-title"><router-link :to="'/posts/' + post.fields.Slug">{{post.fields.Title}}</router-link></p>
      <p class="post-date">Written on {{post.fields.Date.start_date}}</p>
    </div>

    <footer>
      <p class="copyright">Copyright &#xb7; <b><a href="//khaleelgibran.com">Khaleel Gibran</a></b> &#xb7; {{year}}</p>

      <p class="small-greyed-text">Caught a mistake or have a question? Shoot me an email at <a href="mailto:hey@khaleelgibran.com">hey@khaleelgibran.com</a>!</p>
    </footer>
  </div>
</template>

<script>

import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
  name: 'Home',
  components: {
    VueSkeletonLoader
  },
  data: function() {
    return {
      notionData: [],
      postsLoaded: false,
      year: new Date().getFullYear()
    }
  },
  computed: {
    fetchPosts: function() {
      fetch("https://potion-api.now.sh/table?id=9676e5ba544740f58d0eb6404220f74c")
        .then(res => res.json())
        .then(data => {
          this.notionData = data;
          this.postsLoaded = true;
        });
    }
  },
  mounted: function() {
    this.fetchPosts();
  }
}
</script>

<style scoped>

.home {
  margin-top: 100px;
  margin-left: 5vw;
  margin-right: 5vw;
}

.post {
  margin-top: 40px;
  margin-bottom: 40px;
}

.post-title {
  color: var(--link-purple);
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 2px;
}

.post-date {
  margin-top: 0px;
  font-family: "Fira Code", "IBM Plex Mono", monospace;
}

.loader {
  margin-top: 20px !important;
}

footer {
  margin-top: 100px;
  margin-bottom: 10px;
  font-family: "Inter", "Helvetica", "Arial", sans-serif;
  border-top: 2px solid #e5e7eb;
  vertical-align: center;
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

</style>
