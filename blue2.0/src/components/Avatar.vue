<template>
<div>
<img :src="imageUrl" alt="" style="height: 60px;width: 60px;border-radius: 30px;"/>
</div>
</template>

<script>
import {demos} from "../network/request";

export default {
  name: "Avatar",
  data(){
    return{
      imageUrl:""
    }
  },
  mounted() {
    demos({
      url:"/file/Avatar/"+this.$store.getters.Retusername,
      responseType: "arraybuffer",
    }).then(res=>{
     this.imageUrl="data:image/png;base64," +
      btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>

<style scoped>

</style>
