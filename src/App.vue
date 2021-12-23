<template>
  <div id="app" class="container">
    <div class="plan flex-item">
      <Plan @update-item-root='updateItemRoot' :plan_data='plan_data'/>
    </div>
    <div class="visual flex-item">
      <PlanVisual ref="visual" :plan_data='plan_data'/>
    </div>
  </div>
</template>

<script>

import Plan from '@/views/Plan'
import PlanVisual from '@/components/PlanVisual'
import plan_data from './assets/plan_data.json'

export default {
  name: 'App',
  data () {
    return {
      plan_data: plan_data
      //     [
      //   { id: 1, name: 'Activity 1', start_date: '2022-01-01', end_date: '2022-03-01' },
      //   { id: 2, name: 'Activity 2', start_date: '2022-02-01', end_date: '2022-05-01' },
      //   { id: 3, name: 'Activity 8', start_date: '2022-03-01', end_date: '2022-07-01' }
      // ]
    }
  },
  components: {
    PlanVisual,
    Plan
  },
  methods: {
    updateItemRoot (itemName, activityIndex, itemValue) {
      console.log('updateItemRoot', itemName, activityIndex, itemValue)
      if (itemName === 'name') {
        this.plan_data[activityIndex].name = itemValue
      } else if (itemName === 'start') {
        this.plan_data[activityIndex].start_date = itemValue
      } else if (itemName === 'end') {
        this.plan_data[activityIndex].end_date = itemValue
      } else if (itemName === 'track') {
        this.plan_data[activityIndex].trackNum = itemValue
      } else {
        console.log('Unrecognised item name ' + itemName)
      }
      this.$refs.visual.callDrawVisual()
    }
  },
  beforeMount () {
    // Add additional data to the end of each activity to facilitate control of the visual.
    // Includes track number.

    console.log('App:mounted (before)', this.plan_data)
    this.plan_data.forEach((activity, i) => {
      activity.trackNum = i
    })
    console.log('App:mounted (after)', this.plan_data)
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  display: flex;
}
.fixed{
  width: 400px;
}
.flex-item{
  flex-grow: 1;
}
.plan {
  background-color: bisque;
}
.visual {
  background-color: cadetblue;
}
</style>
