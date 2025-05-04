<!-- Страница с карточками.
Получаем из файлов массив для вывода карточек
Из index - карточки, у которых hits = true
Из catalog - карточки, находящиеся в productLocalStorage ИЛИ отфильтрованные по категории карточки
Из accountFav - карточки, находящиеся в избранном у пользователя
-->

<script setup>
import useProducts from '../../composables/useProducts';

import { computed, reactive } from 'vue';
import useUsers from '../../composables/useUsers';

import modalAddItems from '../modals/modalAddItems.vue';

const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;

// Получение активного пользователя через computed
const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});

// Получаем из файлов массив для вывода карточек
// Из index - карточки, у которых hits = true
// Из catalog - карточки, находящиеся в productLocalStorage ИЛИ отфильтрованные по категории карточки
// Из accountFav - карточки, находящиеся в избранном у пользователя
const props = defineProps({
  propsList: Array,
})

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
  <!-- Отображение списка товаров, если он не пуст -->
  <div v-if="props.propsList.length !== 0">
    <div class="cards">
      <!-- Перебор всех товаров -->
      <template v-for="localProduct in props.propsList">
        <div class="card">
          
          <!-- Блок избранного (только для авторизованных пользователей) -->
          <div v-if="userActive" class="addOrDeleteInFavorite">
            <!-- Кнопка добавления в избранное -->
            <button v-if="(!localProduct.favorite)" class="favoriteButton"
              @click="addfavorite(localProduct, userActive?.id)">
              <img class="favStar" src="/src/img/favoriteGrey.svg" alt="">
            </button>

            <!-- Кнопка удаления из избранного -->
            <button v-if="(localProduct.favorite)" class="favoriteButton"
              @click="deletefavorite(localProduct, userActive?.id)">
              <img class="favStar" src="/src/img/favorite.svg" alt="">
            </button>
          </div>

          <!-- Основной блок карточки с картинкой, названием и ценой -->
          <div class="forSending">
            <RouterLink :to="{ name: 'productCard', params: { id: localProduct.id } }">
              <div class="imageFavorite">
                <img class="cardImg" :src="localProduct.picture" alt="top1">
              </div>
              <p>{{ localProduct.name }}</p>
              <p>{{ localProduct.price }} рублей</p>
            </RouterLink>
          </div>

          <!-- Блок корзины (только для авторизованных пользователей) -->
          <div class="addOrDeleteInBasket" v-if="userActive">
            <!-- Кнопка добавления в корзину -->
            <button v-if="!localProduct.basket" class="order" @click="addBasket(localProduct, userActive?.id)">
              Заказать
            </button>
            <!-- Кнопка удаления из корзины -->
            <button v-else class="order" @click="deleteBasket(localProduct, userActive?.id)">
              Удалить из корзины
            </button>
          </div>

          <!-- Модальное окно после действия -->
          <modalAddItems v-if="local.modalShow === true" :propsList="local.modalType" />
        </div>
      </template>
    </div>
  </div>

  <!-- Сообщение, если список товаров пуст -->
  <div class="empty" v-else>
    <h4>Сейчас здесь пусто( <br>Но вы можете добавить товары из 
      <RouterLink class="bold" :to="{ name: 'catalog' }">Каталога</RouterLink>
    </h4>
  </div>
</template>

<style scoped>
/* Контейнер для всех карточек */
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
  padding: 2rem;
}

/* Отдельная карточка товара */
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  flex: 1 1 calc(30% - 10px); 
}

/* Блок с изображением и ссылкой */
.forSending {
  text-align: center;
}

/* Изображение товара */
.cardImg {
  width: 25rem;
}

/* Иконка "Избранное" */
.favStar {
  position: absolute;
  margin-left: 10rem;
  margin-right: 10rem;
}

/* Кнопка "Избранное" */
.favoriteButton {
  position: absolute;
  filter: none;
  width: auto;
  height: auto;
}

/* Кнопка "Заказать" или "Удалить из корзины" */
.order {
  width: 12rem;
  height: 3rem;
  margin-top: 1em;
}

/* Обёртка для кнопок корзины */
.addOrDeleteInBasket {
  z-index: 1;
}

/* Обёртка для кнопок избранного */
.addOrDeleteInFavorite {
  z-index: 1;
}

/* Класс для выделения текста жирным шрифтом */
.bold {
  font-weight: bold;
}

/* Стиль для заголовка в пустом блоке */
h4 {
  font-weight: normal;
}
</style>