<template>
  <div id="app">
    <div>
    <AdminMenu/>
    </div>
  </div>
</template>

<script>
import AdminMenu from "./components/AdminMenu/AdminMenu";
export default {
  name: 'App',
  components:{
    AdminMenu
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
</style>
