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
    user() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    async submitPost() {
      try {
        const respUser = await unWrap(await fetch('/api/posts/create', {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            postId: uuidv4(),
            ...this.posts,
            userId: this.user.userId,
            profileName: this.user.name,
            profilePicture: this.user.userImage,
            comments: [],
            timestamps: Date.now()
          })
        }))

        const options = {
          timestamp: Date.now(),
          public_id: this.posts.image
        }

        const response = await unWrap(await fetch("/api/cloudinary/signature", {
          method: "POST",
          body: JSON.stringify(options),
          headers: {
            'Content-Type': 'application/json'
          }
        }))

        const signature = response.json.signature;

        const readData = (fileObj) => {
          return new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(fileObj)
          })
        }

        const data = await readData(this.imageSelected);

        console.log(data);
        const upload = await this.$cloudinary.upload(data, {
          ...options,
          apiKey: this.$config.cloudinary.apiKey,
          signature
        });

        if (upload && respUser) {
          alert("Post Uploaded");
          this.$router.push(`/account/${this.user.userId}`);
        }
      } catch (error) {
        console.error(error)
      }
    },
    uploadFile(e) {
      const file = e.target.files[0];

      if (!file) {
        return
      }

      const filename = file.name.split(".").slice(0, -1).join(".") + Date.now();
      this.posts.image = filename;
      this.imageSelected = file;
    }
  },
  async asyncData({
    $dataApi,
    req,
    redirect
  }) {
    var token;
    if (process.server) {
      const cookieHeader = req.headers.cookie;
      if (typeof cookieHeader !== "undefined") {
        token = await Cookie.parse(cookieHeader);
        if (!token) {
          redirect("/auth/login")
        } else {
          await $dataApi.getUserById(token.idToken)
        }
      }
    }
  }
}
</script>
