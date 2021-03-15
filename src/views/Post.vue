<template>
    <div class="post">
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

        <h1 v-if="showPost === true">{{thisPost[0].fields.Title}}</h1>
        <p class="post-updated" v-if="showPost === true">Updated on {{thisPost[0].fields.Date.start_date}}</p>
        <br /><br />
        <p v-if="showPost === true" class="post-content" v-html="thisPostContent"></p>

        <footer>
            <p>Caught a mistake or have a question? Shoot me an email at <a href="mailto:hey@khaleelgibran.com">hey@khaleelgibran.com</a></p>
        </footer>
    </div>
</template>

<script>

import VueSkeletonLoader from 'skeleton-loader-vue';

export default {
    name: "Post",
    components: {
        VueSkeletonLoader
    },
    data: function() {
        return {
            notionData: [],
            thisPost: null,
            thisPostContent: "<h1>Hi</h1>",
            showPost: false
        }
    },
    watch: {
        thisPost: function (newContent, OldContent) {
            this.fetchPostContent();
        },
        thisPostContent: function (newContent, oldContent) {
            hljs.highlightAll();
            console.log("called hljs again!")
        }
    },
    computed: {
        fetchPostContent() {
            fetch("https://potion-api.now.sh/table?id=9676e5ba544740f58d0eb6404220f74c")
                .then(res => res.json())
                .then(data => {
                    this.notionData = data;
                    let that = this;

                    let thisPost = data.filter(function(post) {
                        return post.fields.Slug === that.$route.params.slug;
                    });

                    this.thisPost = thisPost;

                    console.log(thisPost[0])

                    console.log(thisPost[0].id)

                    fetch("https://potion-api.now.sh/html?id=" + thisPost[0].id)
                        .then(res => res.text())
                        .then(data => {
                            

                            console.log(this.thisPostContent)

                            this.thisPostContent = data;

                            this.showPost = true;
                            console.log(this.thisPostContent)

                            hljs.highlightAll();
                            console.log("called hljs!")
                        })
            
                });
        }
    },
    mounted: function() {
        this.fetchPostContent();
    },
    updated: function() {
        hljs.highlightAll();
    }
}

</script>

<style scoped>

h1 {
    color: black;
    font-weight: 10000;
    margin-bottom: 0px;
}

.post {
    margin: 5vw;
    line-height: 1.75;
    font-size: 1rem;
    unicode-bidi: isolate;
    color: #374151;
    font-family: "Roboto Mono", "Fira Code", "IBM Plex Mono", monospace;
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
