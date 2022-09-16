<template>
  <div class="absolute top-2/4 left-2/4" style="transform: translate(-50%, -50%);">
      <h2 class="text-2xl font-medium text-center">Login</h2>
      <form @submit.prevent="submitLogin">
          <div class="flex flex-col gap-2">
              <input type="text" name="name"
                  id="name"
                  v-model="user.name"
                  class="p-5 border-solid border-2 border-black rounded-md"
                  placeholder="input your username">
              <input
                  type="password"
                  name="password"
                  id="password"
                  v-model="user.password"
                  class="p-5 border-solid border-2 border-black rounded-md"
              >
              <p>First time ? go to this <nuxt-link to="/auth/register">Register</nuxt-link></p>
              <input type="submit" value="Login" class="p-5 bg-blue-500 text-white rounded-md">
          </div>
      </form>
  </div>
</template>
<script>
  name: 'Login'
  export default {
      head(){
          return {
              title : "Login To NuxtStagram"
          }
      },
      data(){
          return {
              user : {
                  name : "",
                  password: ""
              }
          }
      },
      methods : {
          submitLogin(){
              alert("Login")
          }
      }
  }
</script>
