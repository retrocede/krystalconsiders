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
import GhostContentAPI from '@tryghost/content-api'

export default {
  data () {
    return {
      posts: []
    }
  },
  created () {
    const api = new GhostContentAPI({
      url: 'https://ghost.krystalconsiders.com',
      key: '76a2b608a386617f265fec1a3b',
      version: 'v2'
    })

    api.posts
      .browse({ include: 'tags,authors' })
      .then(posts => {
        this.posts = posts
        posts.forEach(post => {
          console.log(post.title)
        })
      })
      .catch(err => {
        console.log('error: ', err)
      })
  }
}
</script>
