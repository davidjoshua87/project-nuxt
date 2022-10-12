<template>
  <div
    class="absolute top-2/4 left-2/4"
    style="transform: translate(-50%, -50%)"
  >
    <h2 class="text-2xl font-medium text-center">Register</h2>
    <p>
      Already have account, well let's dive in to
      <nuxt-link to="/auth/login" class="text-blue-400 hover:underline"
        >Login</nuxt-link
      >
      Page
    </p>
    <form @submit.prevent="submitRegister">
      <div class="flex flex-col gap-2">
        <input
          type="file"
          accept=".jpeg, .jpg, image/jpeg"
          @change="uploadFile"
        />
        <input
          type="text"
          name="name"
          id="name"
          v-model="user.name"
          class="p-5 border-solid border-2 border-black rounded-md"
          placeholder="input a username"
        />
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
          class="p-5 border-solid border-2 border-black rounded-md"
          placeholder="input a password"
        />
        <button type="submit" class="p-5 bg-blue-500 text-white rounded-md">
          Register
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { unWrap } from '../../utils/fetchUtils';
import { v4 as uuidv4 } from "uuid";

export default {
  head() {
    return {
      title: "Register To NuxtStagram",
    };
  },
  data() {
    return {
      user: {
        name: "",
        password: "",
        userImage: "",
        userId: uuidv4(),
      },
      image: null,
    };
  },
  methods: {
        async submitRegister() {
            try {
                const respUser = await unWrap(await fetch('/api/user/register', {
                    method: 'POST',
                    body: JSON.stringify(this.user),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }));

                const options = {
                    timestamp: Date.now(),
                    public_id: this.user.userImage
                }

                const response = await unWrap(await fetch("/api/cloudinary/signature", {
                    method: "POST",
                    body: JSON.stringify(options),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }));

                const signature = response.json.signature;

                const readData = (fileObj) => new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.readAsDataURL(fileObj);
                });

                const data = await readData(this.image);

                const upload = await this.$cloudinary.upload(data, {
                    ...options,
                    apiKey: this.$config.cloudinary.apiKey,
                    signature
                });

                if(upload && respUser){
                    alert("you already registered")
                    this.$router.push("/auth/login");
                }

            } catch (error) {
                console.error(error)
            }
        },
        async uploadFile(e) {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            const filename = file.name.split(".").slice(0, -1).join(".") + Date.now();
            this.user.userImage = filename;
            this.image = file;
        }
    }
};
</script>
