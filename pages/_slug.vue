<template>
    <section>
        <div class="content" v-html="post.html"></div>
    </section>
</template>

<script>
import GhostContentAPI from '@tryghost/content-api'

export default {
  data () {
    return {
      post: {}
    }
  },
  asyncData ({ params, error, payload }) {
    if (payload) {
      console.log('payload present: ', payload)
      return { post: payload }
    }

    console.log('payload not found')

    const api = new GhostContentAPI({
      url: 'https://ghost.krystalconsiders.com',
      key: '76a2b608a386617f265fec1a3b',
      version: 'v2'
    })

    return api.posts
      .read({ slug: params.slug }, { include: 'tags,authors' })
      .then(post => {
        console.log('Youve got posts! ', post)
        return { post }
      })
      .catch(err => {
        console.log('error: ', err)
        error({ message: err })
      })
  }
}
</script>
