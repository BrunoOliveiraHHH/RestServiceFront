<template>
  <headerComponent/>
      <RouterView />
  <footerComponent/>
</template>

<script lang="ts">
import footerComponent from './components/footerComponent.vue';
import headerComponent from './components/headerComponent.vue';
export default{
  components:{
    headerComponent,
    footerComponent
  }
    
  }
</script>

<style lang="css">

</style>