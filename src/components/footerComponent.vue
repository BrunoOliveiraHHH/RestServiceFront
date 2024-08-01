<template>
  <div class="display-inline">
    <div class="barra-bottom">
      <h5 class="footer-text">
        Ⓒ Bruno Oliveira - Todos os direitos reservados.
      </h5>
    </div>
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
.barra-bottom {
  width: 100%;
  height: 150px;
  bottom: 0px;
  background-color: #784315;
  position: fixed;
  align-items: center;
  display: flex;
  flex-direction: column;
}

.footer-text{
    font-size: 1em;
    color: #fff;
}
</style>
