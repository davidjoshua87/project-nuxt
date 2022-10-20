<template>
  <div>
      <div class="flex flex-row items-center">
          <nuxt-img :src="user.userImage" class="max-w-full float-left mr-5" width="52" height="52" provider="cloudinary"/>
          <p>{{ user.name }}</p>
      </div>
      <div class="my-5">
          <h2 class="text-2xl">Gallery</h2>
      </div>
      <div class="my-10">
          <nuxt-link to="/post/create" class="bg-gray-400 text-white text-md p-1 rounded-md">
              Upload a new photo
          </nuxt-link>
      </div>
      <div class="grid grid-cols-3 justify-center" v-if="posts.length > 0">
          <div v-for="post in posts" :key="post.objectID">
              <nuxt-img :src="post.image" width="200" height="200" provider="cloudinary" class="object-cover"/>
          </div>
      </div>
      <div class="flex justify-center items-center h-screen">
          <p class="text-center text-3xl">There is no posts</p>
      </div>
  </div>
</template>
<script>
  export default {
      head(){
          return {
              title : this.user.name
          }
      },
      async asyncData({ params, $dataApi }){
          try {
              let user = await $dataApi.getUserById(params.username); // username userId localhost:3000/{userId}
              let posts = await $dataApi.getPostsById(params.username);

              return {
                  user : user.json.hits[0],
                  posts: posts.json.hits
              }
          } catch (error) {
              console.error(error)
          }
      }
  }
</script>
