<template>
<div>
  <div v-for="item in Comments">
    <Commentmessage_item :items="item" @reple="butrepleout" :nickname="nickname" :RepleComments="RepleComments"></Commentmessage_item>
  </div>
</div>
</template>

<script>
import Commentmessage_item from "./Commentmessage_item";
export default {
  name: "Commentmessage",
  components:{
    Commentmessage_item
  },
  props:{
    Comments:"",
    RepleComments:"",
    nickname:""
  },
  methods:{
    butrepleout(repleinfo){
      this.$emit("repleoutto",repleinfo)
    }
  }
}
</script>

<style scoped>
</style>
