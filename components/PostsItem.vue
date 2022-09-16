<template>
  <div class="bg-white">
    <!-- header post user -->
    <div class="bg-white shadow-md mb-3">
      <div class="w-100 border-solid border-2 border-gray-400 rounded-t-md flex justify-between p-5 pl-2 items-center">
        <div class="flex gap-5">
          <img :src="post.profilePicture" class="max-w-full rounded-full" width="52" height="52" alt="user picture">
          <div>
            <p class="font-medium">{{  post.profileName }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- post body -->
    <div>
      <img src="https://via.placeholder.com/584" class="min-w-full" width="584" height="470" alt="post picture">
    </div>
    <!-- post description -->
    <div class="px-5 py-2">
      <p><b>{{ post.profileName }}</b></p>
      <p>{{ post.description }}</p>
    </div>
    <hr>
    <div v-if="post.comments.length > 0">
      <comment-item v-for="(comment, index) in post.comments" :comment="comment" :key="index" />
    </div>
    <div v-else>
      <p>There is no comment</p>
    </div>
    <div class="flex p-2 gap-2 items-center w-full">
      <div>
        <img src="https://via.placeholder.com/52" class="max-w-full rounded-full" width="52" height="52"
          alt="user picture comment" />
      </div>
      <div class="flex-1">
        <form action="">
          <input type="text" class="input-control w-full rounded-3xl">
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      props: {
          post: {
              type: Object,
              required: true
          }
      },
  }
</script>
