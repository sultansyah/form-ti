import colors from 'vuetify/es5/util/colors'

export default {
  server: {
    port: 8000
  },
  ssr: false,
  components: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Wegodev Form',
    title: 'home',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  publicRuntimeConfig: {
    baseUrl: process.env.BASE_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/persitedState.js', mode: 'client' },
    { src: '~/plugins/axiosInterceptors.js', mode: 'client'  },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],
  
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
  ],

  i18n: {
    langDir: 'lang/',
    defaultLocale: 'id',
    locales:[
      { code: "id", name: "Indonesia", iso: "id-ID", file: "id.json" },
    ]
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    prefix  : "http://localhost:3000",
    proxy   : true
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/scss/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.purple,
          accent: colors.purple,
          secondary: colors.purple,
          info: colors.purple,
          warning: colors.purple,
          error: colors.purple,
          success: colors.purple
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
