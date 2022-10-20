<template>
  <div class="bg-white shadow-sm p-5 sticky">
      <div class="flex gap-5 items-center" style="flex: 0 0 auto;">
          <div>
              <nuxt-img :src="user.userImage" class="max-w-full" width="52" height="52" provider="cloudinary"/>
          </div>
          <div>
              <a :href="'/account/' + user.userId">
                  {{ user.name }}
              </a>
              <div class="text-gray-300" style="font-size: 14px;">
                  {{ user.name }}
              </div>
          </div>
      </div>
  </div>
</template>
<script>
  export default {
      props : {
          user : {
              type : Object,
              required: true,
      }
      }
  }
</script>
