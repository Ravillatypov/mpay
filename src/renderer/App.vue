<template>
  <div id="app">
    <div>
    </div>
    <div>
    </div>

  <div>
    <md-toolbar class="md-primary">
      <md-button to="/Auth">auth</md-button>
      <md-button to="/Invoice">invoice</md-button>
      <md-button to="/InvoiceList">invoice list</md-button>
    </md-toolbar>
    
    <md-content class="main">
      <router-view></router-view>
    </md-content>
  </div>
  </div>
</template>

<script>
  export default {
    name: 'acquiring-simple'
  }
</script>

<style>
.main {
  padding: .8em;
  margin: 0.8em;
}
</style>
