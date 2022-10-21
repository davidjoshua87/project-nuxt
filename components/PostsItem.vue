<template>
  <div class="bg-white">
    <!-- header post user -->
    <div class="bg-white shadow-md mb-3">
      <div class="w-100 border-solid border-2 border-gray-400 rounded-t-md flex justify-between p-5 pl-2 items-center">
        <div class="flex gap-5">
          <nuxt-img :src="post.profilePicture" class="max-w-full rounded-full" width="52" height="52" alt="user picture"
            provider="cloudinary" />
          <div>
            <p class="font-medium">{{  post.profileName }}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- post body -->
    <div>
      <nuxt-img :src="post.image" class="object-contain w-full h-auto" width="584" height="470" alt="post picture"
        provider="cloudinary" />
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
        <nuxt-img :src="user.userImage" class="max-w-full rounded-full" width="52" height="52" alt="user picture"
          provider="cloudinary" />
      </div>
      <div class="flex-1">
        <form @submit.prevent="submitComment">
          <input type="text" v-model="message" placeholder="Comment..." class="input-control w-full rounded-3xl">
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  unWrap
} from "../utils/fetchUtils"
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      message: "",
      loader: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    }
  },
  methods: {
    async submitComment() {
      if (this.message.length == 0) {
        return
      }

      try {
        this.post.comments.push({
          userId: this.user.userId,
          profilePicture: this.user.userImage,
          message: this.message
        })

        const response = await unWrap(await fetch("/api/posts/update", {
          body: JSON.stringify(this.post),
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          }
        }))

        if (response.ok) {
          this.message = ""
        }
      } catch (error) {
        console.error(error)
      }


    }
  }
}
</script>
