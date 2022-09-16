<template>
  <div class="text-center">
    <div class="min-h-screen flex items-center justify-center">
      <div class="flex flex-col">
        <h1 class="text-3xl">{{ error.statusCode }} <span>Wah Error</span></h1>
        <h2 class="text-2xl" v-if="error.statusCode === 404">
          Halaman Tidak Berhasil Ditemukan
        </h2>
        <h2 class="text-2xl" v-else>Terjadi Kesalahan Pada Server</h2>
        <nuxt-link
          to="/"
          class="btn_error"
          >Kembali Ke Baranda</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: ["error"],
  // layout: "error_layout",
};
</script>
