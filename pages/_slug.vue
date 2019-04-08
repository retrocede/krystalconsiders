<template>
    <section>
        <div class="content" v-html="post.html"></div>
    </section>
</template>

<script>
export default {
  data () {
    return {
      post: {}
    }
  },
  asyncData ({ app, params, error, payload }) {
    if (payload) {
      return { post: payload }
    }

    return app.ghost.posts
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
