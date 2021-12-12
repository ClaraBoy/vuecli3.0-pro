<template>
<div>
  <Release_Article_View :titleName="this.$route.query.titleName" :applicationidTo="this.$route.query.applicationidTo"></Release_Article_View>
</div>
</template>

<script>
import Release_Article_View from "../../view/Release_ArticleView/Release_Article_View";
export default {
  name: "Release_Article",
  components:{
    Release_Article_View
  }

}
</script>

<style scoped>

</style>
