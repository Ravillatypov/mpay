<template>
  <div id="app">
    <div>
      <router-link to="/Auth">auth</router-link>
      <router-link to="/Invoice">invoice</router-link>
      <router-link to="/InvoiceList">invoice list</router-link>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'acquiring-simple'
  }
</script>

<style>
  /* CSS */
</style>
