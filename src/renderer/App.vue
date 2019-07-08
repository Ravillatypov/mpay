<template>
  <div id="app">
    <div>
    </div>
    <div>
    </div>

  <div>
    <md-toolbar class="md-primary" v-if="is_authenticated">
      <md-button to="/Wallet">wallet</md-button>
      <md-button to="/CreateWithdraw">create withdraw</md-button>
      <md-button to="/WithdrawList">withdrawals</md-button>
      <!-- <md-button @click="logOut()">log out</md-button> -->
    </md-toolbar>
    <md-toolbar class="md-primary" v-else>
      <md-button to="/Auth">auth</md-button>
    </md-toolbar>
    
    <md-content class="main">
      <router-view></router-view>
    </md-content>
  </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'acquiring-simple',
  computed: {
    ...mapGetters(['is_authenticated'])
  },
  methods: {
    ...mapActions(['logOut'])
  }
}
</script>

<style>
.main {
  padding: .8em;
  margin: 0.8em;
}
</style>
