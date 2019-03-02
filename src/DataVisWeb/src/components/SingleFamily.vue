<template>
  <div class="SF">
    <p>
      This is where all the text goes
    </p>
    <Bars
      :data="sfDailyShow"
      :gradient="['#6fa8dc', '#42b983']"
      :barWidth="4"
    ></Bars>
  </div>

</template>

<script>
import * as d3 from 'd3'
import Bars from 'vuebars'
import Chart from 'v-chart-plugin'
import DateFNS from 'date-fns'
// import LineChart from './subComponents/LineChart'

export default {
  name: 'SingleFamily',
  components: {
    d3,
    // LineChart,
    Bars
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      sfDailyData: [],
      sfDailyDataSolo: [],
      sfDailyShow: [],
      mondays: []
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

          res.data.forEach(element => {
            let dayNum = DateFNS.getDay(new Date(element.year, element.month, element.day))
            let day = ''
            switch (dayNum) {
              case 1:
                day = 'Monday'
                break
              case 2:
                day = 'Tuesday'
                break
              case 3:
                day = 'Wednesday'
                break
              case 4:
                day = 'Thursday'
                break
              case 5:
                day = 'Friday'
                break
              case 6:
                day = 'Saturday'
                break
              case 7:
                day = 'Sunday'
                break
              default:
                day = 'error'
                break
            }
            let data = {
              value: element.amount,
              title: day
            }
            this.sfDailyDataSolo.push(data)
          })
        })
        .catch(err => {
          console.log(err)
        })
        .finally(res => {
          this.findMondays()
        })
    },
    findMondays () {
      for (let i = 0; i < this.sfDailyData.length; i++) {
        if (DateFNS.getDay(new Date(this.sfDailyData[i].year, this.sfDailyData[i].month, this.sfDailyData[i].day)) === 1) {
          this.mondays.push(i)
        }
      }
      this.setBarData()
    },
    setBarData (numWeeks, startWeek) {
      this.sfDailyShow = this.sfDailyDataSolo.slice(this.mondays[0], this.mondays[3] - 1)
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
.SF {
  background-color: antiquewhite;
}
</style>
