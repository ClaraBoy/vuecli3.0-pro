<template>
  <div>
  <div v-for="(item,index) in Li">
  <demo_item :items="item" :index="index"></demo_item>
</div>
  </div>
</template>

<script>
import demo_item from "./demo_item";
export default {
  name: "demo",
  components:{
    demo_item
  },
  props:{
    Li:"",
  },
}
</script>

<style scoped>
</style>
