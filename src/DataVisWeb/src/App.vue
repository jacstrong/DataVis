<template>
  <div id="app">

    <!-- <img src="./assets/logo.png"> -->

    <v-toolbar
      class="blue lighten-3"
    >
      <v-toolbar-title>Best Data VIS</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat>Single Family</v-btn>
        <v-btn
          flat
          @click="init()"
          :loading="initLoading"
          >Init</v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      initLoading: false
    }
  },
  methods: {
    init () {
      this.initLoading = true
      this.$http.get('/api/init/fam')
        .then(res => {
          console.log('it worked')
        })
        .catch(err => {
          console.log(err)
        })
        .finally(res => {
          this.initLoading = false
        })
    }
  }
}
</script>

<style>
#app {
  font-family: "Roboto";
}
</style>
