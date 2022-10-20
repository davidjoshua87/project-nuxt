<template>
  <div>
      <client-only>
            <div class="grid grid-col-2 grid-flow-col gap-4">
          <div class="flex flex-col" v-if="posts.length > 0">
              <PostsItem v-for="post in posts" :post="post" :key="post.objectID"/>
          </div>
          <div class="flex flex-col" v-else>
              <p class="text-center">Data kosong</p>
          </div>
          <SideCardAccount v-if="user" :user="user"/>
      </div>
      </client-only>
  </div>
</template>
<script>
import CookieServer from "cookie";
  export default {
      head(){
          return {
              title : "Homepage"
          }
      },
      computed: {
          user(){
              return this.$store.state.auth.user;
          }
      },
      async asyncData({ $dataApi, req, redirect }){
          try {

              let token;

              if(process.server){
                  if(typeof req.headers.cookie != "undefined"){
                      token = await CookieServer.parse(req.headers.cookie);
                      await $dataApi.getUserById(token.idToken);
                  }else{
                      redirect("/")
                  }
              }

              const posts = await $dataApi.getPosts();
              return {
                  posts: posts.hits,
              }
          } catch (error) {
              console.error(error)
          }
      }
  }
</script>
