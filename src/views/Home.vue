<template>
  <div class="home">
    <header>
      <h1 class="title">Khaleel Gibran's Blog</h1>
      <p class="subtitle" v-if="($router.href = '/')">
        The blog of a fourteen-year-old web developer.
      </p>
    </header>
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
    <div class="post" v-for="post in notionData" :key="post.id">
      <p class="post-title">
        <router-link :to="'/posts/' + post.fields.Slug">{{
          post.fields.Title
        }}</router-link>
      </p>
      <p class="post-date">Written on {{ post.fields.Date.start_date }}</p>
    </div>
  </div>
</template>

<script>
import VueSkeletonLoader from "skeleton-loader-vue";

export default {
  name: "Home",
  components: {
    VueSkeletonLoader,
  },
  data: function () {
    return {
      notionData: [],
      postsLoaded: false,
    };
  },
  computed: {
    fetchPosts: function () {
      fetch(
        "https://potion-api.now.sh/table?id=9676e5ba544740f58d0eb6404220f74c"
      )
        .then((res) => res.json())
        .then((data) => {
          this.notionData = data.filter(
            (post) => post.fields.Published === true
          );
          this.postsLoaded = true;
        });
    },
  },
  mounted: function () {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.home {
  margin-top: 100px;
  margin-left: 5vw;
  margin-right: 5vw;
}

h1 a {
  font-family: "Fira Code", "IBM Plex Mono", monospace;
  color: black;
}

.title {
  margin-bottom: 0px;
}

.subtitle {
  opacity: 0.8;
  font-size: 16px;
  margin-top: 0px;
  color: #444;
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
</style>
