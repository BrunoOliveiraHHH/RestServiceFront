<template>
  <div class="display-inline">
    <img class="logo" src="../assets/img/d20-logo.png" />
    <img class="barra" src="../assets/img/barra-header.png" />
    <h1 class="title">DM Helper DnD 5E</h1>
  </div>
</template>

<script lang="ts">
export default {};
</script>

<style lang="css">
.display-inline {
  display: flex;
}
.logo {
  height: 150px;
  width: auto;
}
.barra {
  width: 100%;
  height: 150px;
}

.title{
    position: fixed;
    right: 10px;
    font-size: 4em;
    color: #FFF;    
    margin: 30px;
}
</style>
