<!-- Страница для добавления товаров админом. НЕ СДЕЛАНО как же вовремя я это увидел... Хотя я все равно буду писать совою реализацию-->

<script setup>
import { RouterView, useRouter } from 'vue-router';
import { computed, reactive } from 'vue';
import useProducts from '../../../composables/useProducts';
import useUsers from '../../../composables/useUsers';

const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;
const router = useRouter()

// Получение активного пользователя через computed
const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});

// Проверка, чтобы на страницу мог зайти только авторизированный пользователь, у которого роль не Пользователь
if (!userActive.value) {
  router.push({ name: 'authorization' });
}
else if (userActive.value.role === 'Пользователь') {
  router.push({ name: 'accountData' });
}

const local = reactive({
  productData: {
    name: '',
    price: '',
    description: '',
    author: userActive.value.name,
  },
  errorName: '',
  regName: /^[A-zА-яЁё0-9 ]+$/,
  errorNameBusy: '',
  errorPrice: '',
  errorDescription: '',
  errorOut: 'Данное поле заполнено неверно или не заполнено', // Текст для вывод ошибки в input
  errorOutNameBusy: 'Данное название уже занято', // Текст для вывод ошибки в input
})

function checkInput() {
  if (local.productData.name === '') {
    local.errorName = true;
  } else if (useProducts().findProductName(local.productData.name)) {
    local.errorNameBusy = true;
  } else {
    local.errorName = !local.regName.test(local.productData.name)
    local.errorNameBusy = false
  }

  if (local.productData.price === '') {
    local.errorPrice = true
  } else if (local.productData.price <= 0) {
    local.errorPrice = true
  }
  else {
    local.errorPrice = false
  }

  if (local.productData.description === '') {
    local.errorDescription = true
  } else {
    local.errorDescription = false
  }

  if (!local.errorName && !local.errorDescription && !local.errorPrice && !local.errorNameBusy) {
    useProducts().addProduct(local.productData)
    router.push({ name: 'productsListCatalog' });

  }
}



</script>

<template>
  <div v-if="userActive">
    <h3>Добавление товара</h3>
    <div class="inputs">
      <p>Введите название только буквы алфавита, цифры и пробелы, повторов быть не может</p>
      <input type="text" name="productName" id="productName" placeholder="Название" v-model="local.productData.name">
      <div v-if="local.errorName" class="error">{{ local.errorOut }}</div>
      <div v-if="local.errorNameBusy" class="error">{{ local.errorOutNameBusy }}</div>

      <p>Введите цену цифрами от 1 рубля</p>
      <input type="number" name="productPrice" id="productPrice" placeholder="Цена" v-model="local.productData.price"
        min="1">
      <div v-if="local.errorPrice" class="error">{{ local.errorOut }}</div>

      <p>Введите описание для товара</p>
      <textarea type="text" name="productDescription" id="productDescription" placeholder="Описание"
        v-model="local.productData.description" class="productDescription"></textarea>
      <div v-if="local.errorDescription" class="error">{{ local.errorOut }}</div>

    </div>
    <br>
    <button @click="checkInput">Создать товар</button>

  </div>
  <div v-else>
    <p>Загрузка или доступ запрещен...</p>
  </div>
</template>

<style scoped>
/* Заголовок страницы */
h3 {
  font-family: 'ShriftMontserratLight';
  text-align: left;
  margin-left: 5rem;
  margin-top: 2rem;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  place-items: center;
}

.productDescription {
  min-height: 7rem;
  min-width: 10rem;
  max-height: 50rem;
  max-width: 36rem;
}

.error {
  color: red;
}
</style>
