<template>
  <div class="post" id="post">
    <header>
      <span class="title"
        ><a href="https://khaleelgibran.com">Khaleel Gibran</a> -
        <router-link to="/">Blog</router-link></span
      >
    </header>

    <p class="back-home"><router-link to="/">&#8592; back home</router-link></p>

    <VueSkeletonLoader
      v-visible="showPost === false"
      type="rect"
      :width="300"
      :height="40"
      animation="fade"
      :rounded="true"
    />

    <VueSkeletonLoader
      v-visible="showPost === false"
      type="rect"
      :width="500"
      :height="200"
      animation="fade"
      :rounded="true"
    />

    <h1 v-if="showPost === true">{{ thisPost[0].fields.Title }}</h1>
    <p class="post-updated" v-if="showPost === true">
      Updated on {{ thisPost[0].fields.Date.start_date }}
    </p>
    <br /><br />
    <p
      v-if="showPost === true"
      class="post-content"
      v-html="thisPostContent"
    ></p>

    <div id="comments"></div>
  </div>
</template>

<script>
const VueSkeletonLoader = () => import("skeleton-loader-vue");

export default {
  name: "Post",
  components: {
    VueSkeletonLoader,
  },
  metaInfo() {
    return {
      title: this.thisPost[0].fields.Title,
      // title: ""
    };
  },
  data() {
    return {
      notionData: [],
      thisPost: null,
      thisPostContent: "<h1>Hi</h1>",
      showPost: false,
    };
  },
  watch: {
    thisPost: function (newContent, OldContent) {
      this.fetchPostContent();

      this.$meta.refresh();
    },
    thisPostContent: function (newContent, oldContent) {
      hljs.highlightAll();
    },
  },
  methods: {
    fetchPostContent() {
      fetch(
        "https://khaleelgibran-blog-notion.vercel.app/table?id=9676e5ba544740f58d0eb6404220f74c"
      )
        .then((res) => res.json())
        .then((data) => {
          this.notionData = data;
          let that = this;

          let thisPost = data.filter(function (post) {
            return post.fields.Slug === that.$route.params.slug;
          });

          this.thisPost = thisPost;

          fetch("https://potion-api.now.sh/html?id=" + thisPost[0].id)
            .then((res) => res.text())
            .then((data) => {
              this.thisPostContent = data;
              this.showPost = true;

              hljs.highlightAll();
            });
        });
    },
  },
  mounted: function () {
    let localFont = localStorage.getItem("font");
    document.getElementById("post").setAttribute("data-font", localFont);

    let utterances = document.createElement("script");
    utterances.setAttribute("src", "https://utteranc.es/client.js");
    utterances.setAttribute("repo", "khalby786/blog");
    utterances.setAttribute("issue-term", "pathname");
    utterances.setAttribute("label", "utterances comments");
    utterances.setAttribute("theme", "github-light");
    utterances.setAttribute("crossorigin", "anonymous");

    document.getElementById("comments").appendChild(utterances);

    this.fetchPostContent();
  },
  updated: function () {
    hljs.highlightAll();
  },
};
</script>

<style scoped>
:root {
  --font: "Fira Code", "IBM Plex Mono", monospace;
}

h1 {
  color: var(--foreground);
  font-weight: 10000;
  margin-bottom: 0px;
}

header {
  height: 20px;
  padding: 10px;
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  border-bottom: 1px solid lightgray;
  vertical-align: middle;
  background-color: var(--background);
  color: var(--link-purple);
  z-index: 9;
}

header > .title {
  margin-top: 0px;
  margin-bottom: 0px;
  vertical-align: middle;
  float: right;
  float: left;
  color: var(--link-purple);
}

.post {
  margin: 5vw;
  line-height: 1.5;
  white-space: pre-wrap;
  font-size: 1rem;
  unicode-bidi: isolate;
  color: var(--foreground);
  font-family: "Fira Code", "IBM Plex Mono", monospace;
}

.post-updated {
  color: grey;
  margin-top: 0px;
}

footer {
  font-family: "Fira Code", "IBM Plex Mono", monospace;
  padding-top: 10px;
  margin-top: 100px;
  border-top: 2px solid #e5e7eb;
  line-height: 1.5;
}

.loader {
  margin-top: 20px !important;
}
</style>
