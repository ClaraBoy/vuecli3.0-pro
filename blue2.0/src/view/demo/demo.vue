<template>
  <div class="msgdemos" >
      <div v-for="item in peos">
        <demoitem :items="item" :isdemos="isdemos"></demoitem>
      </div>
    </div>
</template>
<script>
import demoitem from "./demo_item";
export default {
  name: "demo",
  components:{
    demoitem
  },
  props:{
    peos:Array,
    isdemos:""
  },
}
</script>

<style scoped>
.msgdemos{
  padding-left: 4%;
  margin-top: 4%;
}
</style>
