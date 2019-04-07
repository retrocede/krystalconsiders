<template>
    <section>
        <div class="content" v-html="html"></div>
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
  asyncData (context) {
    const api = new GhostContentAPI({
      url: 'https://ghost.krystalconsiders.com',
      key: '76a2b608a386617f265fec1a3b',
      version: 'v2'
    })

    console.log('fetching posts')

    return api.posts
      .read({ slug: context.params.slug }, { include: 'tags,authors' })
      .then(post => {
        console.log('Youve got posts! ', post)
        return post
      })
      .catch(err => {
        console.log('error: ', err)
        context.error({ message: err })
      })
  }
}
</script>
