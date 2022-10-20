<template>
  <div>
   <h1 class="text-2xl text-center">Upload a photo</h1>
   <form @submit.prevent="submitPost">
       <div class="my-5">
           <input type="file" @change="uploadFile">
       </div>
       <div class="my-5">
           <textarea class="form-control rounded" rows="4" cols="50" v-model="posts.description"></textarea>
       </div>
       <div class="my-5">
           <button type="submit" class="btn hover:btn-primary rounded duration-500">Uploads</button>
       </div>
   </form>
</div>
</template>
<script>
import Cookie from "cookie";
import {
  unWrap
} from "../../utils/fetchUtils"
import {
  v4 as uuidv4
} from 'uuid';
export default {
  head() {
    return {
      title: "Create a posts"
    }
  },
  data() {
    return {
      posts: {
        image: "",
        description: "",
      },
      imageSelected: null,
    }
  },
  computed: {
    user() {}
  },
  methods: {
    submitPost() {}
  }

}
</script>
