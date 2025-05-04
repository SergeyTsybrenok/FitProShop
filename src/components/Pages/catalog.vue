<!-- Страница каталога -->

<script setup>
import useProducts from '../../composables/useProducts';
import cards from './cards.vue';
import modalFiltres from '../modals/modalFiltres.vue';
import { reactive } from 'vue';

const product = useProducts().productsLocalStorage.value;



const local = reactive ({
  inpFilter: '',
  modalShow: false,
  list: [],
})


function filterFunction(params) {
  local.modalShow = false;

  // Если выбрано "Удалить фильтр" --> возвращаем список со всеми продуктами
  if (params === '') {
    return (local.list = product);
  }

  // Очищаем список перед фильтрацией
  local.list = [];

  // Фильтруем по параметру
  product.forEach((item) => {
    if (params === item.gender) {
      local.list.push(item);
    }
  });
}

</script>


<template>
  <!-- Заголовок страницы -->
  <h1>Каталог</h1>

  <!-- Основной контейнер -->
  <div class="main">

    <!-- Блок кнопки фильтрации -->
    <div class="filter">
      <button class="filterButton" @click="local.modalShow = true">Фильтры</button>
    </div>

    <!-- Модальное окно фильтров -->
    <modalFiltres 
      v-if="local.modalShow"
      @emitFilter="filterFunction" 
    />

    <!-- Компонент карточек товаров -->
    <!-- Если отфильтрованный список пуст, показать весь список товаров -->
    <cards
      v-if="local.list.length === 0"
      :propsList="product"
    />

    <!-- Если отфильтрованный список не пуст, показать только отфильтрованные товары -->
    <cards 
      v-else
      :propsList="local.list"
    />

    <RouterView></RouterView>
  </div>
</template>




<style scoped>
/* Контейнер кнопки фильтра */
.filter {
  margin: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end; 
}

/* Кнопка открытия фильтров */
.filterButton {
  background-color: var(--grey); 
  width: 12rem;
  height: 3rem;
}

</style>
