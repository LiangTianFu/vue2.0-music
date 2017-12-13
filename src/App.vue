<template>
  <div id="app">
	  <vheader></vheader>
	  <tab></tab>
	  <keep-alive>
	   <router-view></router-view>
	  </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import vheader from 'components/header/header'
  import tab from 'components/tab/tab'
  import player from 'components/player/player'
  export default {
    components: {
      vheader,
      tab,
      player
    }
  }
</script>

<style scoped lang="scss">
</style>
<!-- /* @import "~common/scss/variable.scss";

#app{
	color:$color-theme;
}*/ -->


