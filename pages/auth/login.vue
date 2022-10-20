<template>
  <div
    class="absolute top-2/4 left-2/4"
    style="transform: translate(-50%, -50%)"
  >
    <h2 class="text-2xl font-medium text-center">Login</h2>
    <form @submit.prevent="submitLogin">
      <div class="flex flex-col gap-2">
        <input
          type="text"
          name="name"
          id="name"
          v-model="user.name"
          class="p-5 border-solid border-2 border-black rounded-md"
          placeholder="input your username"
        />
        <input
          type="password"
          name="password"
          id="password"
          v-model="user.password"
          placeholder="input password"
          class="p-5 border-solid border-2 border-black rounded-md"
        />
        <p>
          First time ? go to this
          <nuxt-link to="/auth/register" class="text-blue-400 hover:underline">Register</nuxt-link>
        </p>
        <input
          type="submit"
          value="Login"
          class="p-5 bg-blue-500 text-white rounded-md"
        />
      </div>
    </form>
  </div>
</template>
<script>
import { unWrap } from "~/utils/fetchUtils";
import Cookie from "js-cookie";
export default {
  head() {
    return {
      title: "Login To Instagram Clone",
    };
  },
  data() {
    return {
      user: {
        name: "",
        password: "",
      },
    };
  },
  methods: {
    async submitLogin() {
      try {
        if (this.user.name.length != 0 && this.user.password.length != 0) {
          const result = await unWrap(
            await fetch("/api/user/login", {
              body: JSON.stringify(this.user),
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            })
          );

          console.log(result, '=====user');

          if (result.json.user.length > 0) {
            alert("Login Success");
            Cookie.set("idToken", result.json.user[0].userId)
            window.location.href = "/homes"
          } else {
            alert("Login Failed");
          }
        }else{
            alert("Username or Password is blank")
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
