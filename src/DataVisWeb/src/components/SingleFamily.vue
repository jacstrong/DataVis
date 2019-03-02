<template>
  <div class="hello">

  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'SingleFamily',
  components: [
    d3
  ],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      sfDailyData: []
    }
  },
  mounted () {
    this.getSFDaily()
  },
  methods: {
    getSFDaily () {
      console.log('called')
      this.$http.get('/api/singlefam/daily')
        .then(res => {
          console.log(res)
          this.sfDailyData = res.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
