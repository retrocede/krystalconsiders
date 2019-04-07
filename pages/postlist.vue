<template lang="html">
  <div>
    <ul>
      <li v-for='post in posts'>
        {{ post.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="javascript">
const sanityClient = require("@sanity/client");

export default {
  data() {
    return {
      posts: [],
      error: null,
    };
  },
  async asyncData({ params }) {
    // eslint-disable-next-line
    console.log('params: ', params);

    const client = sanityClient({
      projectId: 'xhnx0qdc',
      dataset: 'production'
    });

    const posts = await client.fetch("*[_type == 'post']");

    return { posts };
  },
}
</script>
