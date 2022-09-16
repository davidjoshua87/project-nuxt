<template>
  <div>
    <div class="grid grid-col-2 grid-flow-col gap-4">
      <div class="flex flex-col" v-if="posts.length > 0">
        <PostsItem v-for="post in posts" :post="post" :key="post.objectID" />
      </div>
      <div class="flex flex-col" v-else>
        <p class="text-center">Data kosong</p>
      </div>
      <SideCardAccount />
    </div>
  </div>
</template>
<script>
name: "HomePage";
export default {
  async asyncData({ $dataApi }) {
    try {
      const posts = await $dataApi.getPosts();
      return {
        posts: posts.hits,
      };
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
