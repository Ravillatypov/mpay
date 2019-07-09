<template>
  <div id="app">
    <md-toolbar class="md-transparent" v-if="is_authenticated">
      <md-button class="md-raised md-primary" to="/Wallet">кошелек</md-button>
      <md-button class="md-raised md-primary" to="/CreateWithdraw">вывести деньги</md-button>
      <md-button class="md-raised md-primary" to="/WithdrawList">запросы на вывод</md-button>
      <md-button class="md-accent" @click="logOutAndAuth()">выход</md-button>
    </md-toolbar>
    <md-toolbar class="md-primary" v-else>
      <md-button to="/Auth">авторизация</md-button>
    </md-toolbar>
    
    <md-content class="main">
      <router-view></router-view>
    </md-content>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'acquiring-simple',
  computed: {
    ...mapGetters(['is_authenticated'])
  },
  methods: {
    logOutAndAuth () {
      this.$store.dispatch('logOut')
      this.$router.push('/Auth')
    }
  }
}
</script>

<style>
.main {
  padding: .8em;
  margin: 0.8em;
}
</style>
