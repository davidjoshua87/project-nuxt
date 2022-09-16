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
  name: 'Register'
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
          userId: "123",
        },
        image: null,
      };
    },
    methods: {
          async submitRegister() {
            alert('register!')
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
