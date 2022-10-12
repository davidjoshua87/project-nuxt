export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  SSR: true,
  head: {
    title: "project-nuxt",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/app.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/dataApi"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "~/modules/algolia",
    "~/modules/cloudinary",
    "@nuxtjs/cloudinary"
  ],

  cloudinary: {
    cloundName: process.env.CLOUDINARY_NAME
  },

  image: {
    cloudinary: {
      baseUrl: process.env.CLOUDINARY_URL
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  publicRuntimeConfig: {
    auth :{
      cookieName: "idToken"
    },
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      key: process.env.ALGOLIA_TOKEN_GENERAL,
    },
    cloudinary: {
      apiKey: process.env.CLOUDINARY_KEY
    }
  },
  privateRuntimeConfig: {
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      key: process.env.ALGOLIA_TOKEN_ALL,
    },
    cloudinary: {
      appSecret: process.env.CLOUDINARY_SECRET,
      key: process.env.CLOUDINARY_KEY,
    }
  },
};
