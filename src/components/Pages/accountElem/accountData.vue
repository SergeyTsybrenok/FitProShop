<!-- Страница с данными о пользователе -->

<script setup>
import { computed } from 'vue';
import useUsers from '../../../composables/useUsers';
import { useRouter } from 'vue-router';


const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;
const router = useRouter()

// Получение активного пользователя через computed
const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});

// Проверка, чтобы на страницу мог зайти только авторизированный пользователь
if (!userActive.value) {
  router.push({ name: 'authorization' });

}

// Выход
function exitAD() {
  useUsers().exit()
  router.push({name: 'account'})
}

</script>



<template>
  <!-- Если пользователь авторизован -->
  <div v-if="userActive">
    <h3>Данные о пользователе </h3>
    
    <div class="blocks">
      <!-- Блок имени -->
      <div class="block blockName">
        <p class="default">Имя: </p>
        <p>{{ userActive?.name }}</p>
      </div>

      <!-- Блок email -->
      <div class="block blockEmail">
        <p class="default">Почта: </p>
        <p>{{ userActive?.email }}</p>
      </div>

      <!-- Блок телефона -->
      <div class="block blockPhone">
        <p class="default">Телефон: </p>
        <p>{{ userActive?.phone }}</p>
      </div>

      <div v-if="userActive?.role !== 'Пользователь'" class="block blockRole">
        <p class="default">Роль: </p>
        <p>{{ userActive?.role }}</p>
      </div>
    </div>

    <!-- Кнопка выхода -->
    <button class="order" @click="exitAD()">Выйти</button>
  </div>

  <!-- Если пользователь НЕ авторизован -->
  <div class="classNotAuth" v-else>
    <p>Вы ещё не авторизовались</p>
    <br>
    <p>
      Чтобы зайти в личный кабинет необходимо
      <RouterLink class="bold" :to="{name: 'authorization'}">Войти</RouterLink> 
      или 
      <RouterLink class="bold" :to="{name: 'registration'}">Зарегистрироваться</RouterLink>
    </p>
  </div>
</template>




<style scoped>
/* Заголовок страницы с данными пользователя */
h3 {
  font-family: 'ShriftMontserratLight';
  text-align: left;
  margin-left: 5rem;
  margin-top: 2rem;
}

/* Контейнер для блоков с данными пользователя */
.blocks {
  margin-left: 10rem;
  margin-top: 2rem;
}

/* Блок для каждой строки с данными пользователя (Имя, Почта, Телефон) */
.block {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  padding: 1rem;
}

/* Кнопка выхода */
.order {
  background-color: var(--grey);
  margin-top: 5rem;
}

/* Блок для отображения информации, когда пользователь не авторизован */
.classNotAuth {
  margin: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Класс для выделения текста жирным шрифтом */
.bold {
  font-weight: bold;
}

</style>
