<template>
  <div>
    <h1 class="text-3xl">Instagram Clone!!</h1>
    <p class="mt-5">instagram clone is a minimal app that clone from instagram with nuxt universal framework, it help
      you to build vue js with the help of node js runtime environment</p>
    <ul class="mt-5 flex justify-around">
      <li class="tab-item cursor-pointer" @click="showDiv('feature', $event)">Feature</li>
      <li class="tab-item cursor-pointer" @click="showDiv('techstack', $event)">Techstack</li>
      <li class="tab-item cursor-pointer" @click="showDiv('3rdparty', $event)">3rd Party</li>
    </ul>

    <div class="card-description" ref="feature">
      <p>In <b>Nuxstagram</b>, we have features like upload image, comment and view profile you can register</p>
      <p>if you are first time for accessing nuxt application or login if you ever register before.</p>
      <div class="flex gap-2">
        <nuxt-link to="/auth/login" class="btn btn-primary p-1">Login</nuxt-link>
        <nuxt-link to="/auth/register" class="btn btn-primary p-1">Register</nuxt-link>
      </div>
    </div>
    <div class="card-description hidden" ref="techstack">
      <ul>
        <li>Vue Js</li>
        <li>Nuxt Js</li>
        <li>Node js</li>
        <li>HTML</li>
        <li>CSS</li>
        <li>Javascript</li>
      </ul>
    </div>
    <div class="card-description hidden" ref="3rdparty">
      <ul>
        <li>Algolia</li>
        <li>Cloudinary</li>
      </ul>
    </div>
  </div>
</template>
<script>
  import CookieServer from "cookie";
  import Cookie from "js-cookie";
  export default {
    created() {
      if (Cookie.get("idToken")) {
        this.$router.push("/homes/");
      }
    },
    methods: {
      showDiv(ref, e) {
        let currentEl = e.target;
        let currentDescriptionEl = this.$refs[ref];
        const cardDescription = window.document.querySelectorAll(".card-description");
        if (cardDescription.length != 0) {
          cardDescription.forEach(el => {
            el.classList.remove("block");
            el.classList.add("hidden")
          });
        }

        const tabItem = window.document.querySelectorAll(".tab-item");

        if (tabItem.length != 0) {
          tabItem.forEach(el => {
            el.classList.remove("--active");
          });
        }

        currentEl.classList.add("--active");

        currentDescriptionEl.classList.remove("hidden");
        currentDescriptionEl.classList.add("block")
      }
    },
    async asyncData({
      $dataApi,
      req
    }) {
      var token;
      var user
      if (process.server) {
        if (typeof req.headers.cookie !== "undefined") {
          token = await CookieServer.parse(req.headers.cookie);
          user = await $dataApi.getUserById(token.idToken);
        }
      }
    }
  }
</script>
