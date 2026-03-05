<!-- Страница с карточкой продукта -->

<script setup>
import useProducts from '../../composables/useProducts';
import { useRoute } from 'vue-router';

import modalAddItems from '../modals/modalAddItems.vue';

import { computed, reactive } from 'vue';
import useUsers from '../../composables/useUsers';

const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;

// Получение активного пользователя через computed
const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});

const route = useRoute()

// Находим нужный товар по ID, переданному в URL (params.id)
const localProduct = useProducts().findProduct(Number(route.params.id))

const local = reactive({
  modalShow: false,
  modalType: '',
})

// Функция добавления товара в корзину
function addBasket(productItem, userId) {
  useProducts().addInBasket(productItem, userId)
  local.modalShow = true
  local.modalType = 'addBasket'
  setTimeout(() => {
    local.modalShow = false;
  }, 5000);
}

// Функция удаления товара из корзины
function deleteBasket(productItem, userId) { 
  useProducts().deleteInBasket(productItem, userId)
  local.modalShow = true
  local.modalType = 'deleteBasket'
  setTimeout(() => {
    local.modalShow = false;
  }, 5000);
  
}

// Функция добавления товара в избранное
function addfavorite(productItem, userId) {
  useProducts().addInFavorite(productItem, userId)
  local.modalShow = true
  local.modalType = 'addfavorite'
  setTimeout(() => {
    local.modalShow = false;
  }, 5000);
}

// Функция удаления товара из избранного
function deletefavorite(productItem, userId) {
  useProducts().deleteInFavorite(productItem, userId)
  local.modalShow = true
  local.modalType = 'deletefavorite'
  setTimeout(() => {
    local.modalShow = false;
  }, 5000);
}
</script>

<template>
  <h1>Товар</h1>

  <div class="card">
    <!-- Изображение товара -->
    <img :src="localProduct.picture" alt="product" class="productImg">

    <!-- Информация о товаре -->
    <div class="information">
      <h2>{{ localProduct.name }}</h2>

      <!-- Описание товара -->
      <p class="description">{{ localProduct.description }}</p>

      <!-- Цена -->
      <p class="cost">{{ localProduct.price }} рублей</p>

      <!-- Блок с кнопками -->
      <div class="buttons">
        <!-- Избранное -->
        <div v-if="userActive" class="addOrDeleteInFavorite">
          <!-- Кнопка добавления в избранное -->
          <button v-if="!localProduct.favorite"
          class="favoriteButton"
          @click="addfavorite(localProduct, userActive?.id)">
            <img class="favStar" src="/src/img/favoriteGrey.svg" alt="">
          </button>

          <!-- Кнопка удаления из избранного -->
          <button v-else class="favoriteButton" @click="deletefavorite(localProduct, userActive?.id)">
            <img class="favStar" src="/src/img/favorite.svg" alt="">
          </button>
        </div>

        <!-- Корзина -->
        <template class="addOrDeleteInBasket" v-if="userActive">
          <!-- Кнопка добавления в корзину -->
          <button v-if="!localProduct.basket" class="order" @click="addBasket(localProduct, userActive?.id)">Добавить в корзину</button>
          <!-- Кнопка удаления из корзины -->
          <button v-if="localProduct.basket" class="order" @click="deleteBasket(localProduct, userActive?.id)">Удалить из корзины</button>
        </template>
      </div>
      <modalAddItems v-if="local.modalShow === true" :propsList="local.modalType" />

    </div>
  </div>
</template>

<style scoped>
/* Контейнер карточки товара */
.card {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 3rem;
  margin: 2rem;
  justify-content: center;
  align-items: center;
}

/* Изображение товара */
.productImg {
  width: 100%;
  max-width: 400px;
  height: auto;
}

/* Контейнер с информацией о товаре */
.information {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1rem;
  max-width: 600px;
  width: 100%;
}

/* Название товара */
.information h2 {
  text-align: left;
  margin: 0;
  padding: 0;
}

/* Описание товара */
.description {
  font-size: 1.1rem;
  width: 100%;
  max-width: 40rem;
}

/* Стоимость товара */
.cost {
  font-size: 1.2rem;
}

/* Контейнер для кнопок */
.buttons {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1rem;
}

/* Кнопка избранного */
.favoriteButton {
  filter: none;
  width: auto;
  height: auto;
  background-color: var(--white); 
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  border: none; 
  padding: 0; 
}

/* Иконка избранного */
.favStar {
  margin: 0;
  padding: 0;
}

/* Адаптация */
@media (max-width: 768px) {
  .card {
    flex-direction: column;
    gap: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .cost {
    font-size: 1.1rem;
  }

  .buttons {
    flex-direction: row;
  }
}

</style>
