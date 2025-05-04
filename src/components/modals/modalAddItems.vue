<!-- Модальное окно справа снизу о изменении статуса товара -->
<script setup>
const props = defineProps({
  propsList: '',
})
</script>

<template>
  <div class="container">
    <div v-if="props.propsList === 'addBasket'">Товар добавлен в корзину</div>
    <div v-if="props.propsList === 'deleteBasket'">Товар удалён из корзины</div>
    <div v-if="props.propsList === 'addfavorite'">Товар добавлен в избранное</div>
    <div v-if="props.propsList === 'deletefavorite'">Товар удалён из избранного</div>
  </div>
</template>


<style scoped>
.container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  background-color: var(--grey);
  color: var(--black);
  padding: 1rem 2rem;
  border-radius: 1rem;
}
</style>
