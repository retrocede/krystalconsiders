<template>
  <v-layout>
    <v-flex text-xs-center>
      <img src="/v.png" alt="Vuetify.js" class="mb-5">
      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
      <div class="posts">
        <ul>
          <li v-for="post in posts" :key="post.id">
            <n-link :to="`/${post.slug}`">{{ post.title }}</n-link>
          </li>
        </ul>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      posts: []
    }
  },
  asyncData ({ app, error, env }) {
    return app.ghost.posts
      .browse({ include: 'tags,authors' })
      .then(posts => {
        return { posts }
      })
      .catch(err => {
        error({ message: err })
      })
  }
}
</script>
