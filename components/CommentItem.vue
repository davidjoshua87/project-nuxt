<template>
  <div class="flex p-2 gap-2 items-center w-full">
      <div>
          <nuxt-img :src="comment.profilePicture" class="max-w-full rounded-full" width="52" height="52" alt="user picture comment" provider="cloudinary"/>
      </div>
      <div class="flex-1">
          {{ comment.message }}
      </div>
  </div>
</template>
<script>
  export default {
      props : {
          comment : {
              type: Object,
              default(){
                  return {
                      profilePicture: "https://via.placeholder.com/52",
                      message: "Lorem ipsum dolor summit!"
                  }
              }
          }
      }
  }
</script>
