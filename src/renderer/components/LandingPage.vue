<template>
  <h1>main page</h1>
</template>

<script>
export default {
  name: 'landing-page',
  mounted () {
    let toPath = this.$store.getters.is_authenticated ? '/Wallet' : '/Auth'
    this.$router.push(toPath)
  }
}
</script>

<style>
</style>
