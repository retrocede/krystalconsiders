<template>
  <div>
    <h1>{{ post.title }}</h1>
    <div v-html="$md.render(post)" />
  </div>
</template>

<script>
export default {
  async asyncData({ params, app, payload, route, store }) {
    const post = await import(`~/content/posts/${params.post}`)
    return {
      post: post.default
    }
  }
}
</script>
