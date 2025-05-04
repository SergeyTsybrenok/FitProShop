<!-- Страница акций -->

<script setup>
</script>


<template>
  <h1>Акции</h1>
  <div class="sale">

    <figure>
      <img class="saleImg" src="/src/img/banner.png" alt="">
      <figcaption>Сроки проведения акции: 02.02.2025 - 08.03.2025</figcaption>
    </figure>

    <RouterLink :to="{ name: 'catalog' }">
      <button class="btnMain">Заказать со скидкой</button>
    </RouterLink>
  </div>

  <RouterView></RouterView>
</template>




<style scoped>
.sale {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.saleImg {
  display: block;
  margin-right: auto;
  margin-left: auto;
  max-width: 100%;

}
</style>
