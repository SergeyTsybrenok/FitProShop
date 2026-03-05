<!-- Страница с навигацией для разделов админского доступа -->

<script setup>
import { RouterView, useRoute, useRouter } from 'vue-router';
import useUsers from '../../composables/useUsers';
import useProducts from '../../composables/useProducts';
import { computed } from 'vue';
import usersList from './adminElem/usersList.vue';
import { RouterLink } from 'vue-router';

const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;
const router = useRouter()
const route = useRoute()

// Получение активного пользователя через computed
const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});

// Проверка, чтобы на старницу мог зайти только авторизированный пользователь, у которого роль не Пользователь
if (!userActive.value) {
  router.push({ name: 'authorization' });
} else if (userActive.value.role === 'Пользователь') {
  router.push({ name: 'accountData' });
}

</script>



<template>
  <div v-if="userActive">
    <h1>Админская</h1>
    <nav class="nav" v-if="userActive">
    <RouterLink :to="{ name: 'usersList' }" >
      Пользователи
    </RouterLink>
    <RouterLink :to="{ name: 'productList' }" >
      Редактировать товары
    </RouterLink>
    <RouterLink :to="{ name: 'addProduct' }" >
      Добавить товар
    </RouterLink>
  </nav>
  <RouterView></RouterView>
  </div>

  <div v-else>
    Вы не имеете прав попасть на данную страницу
  </div>


</template>



<style scoped>
/* Контейнер для навигационных кнопок */
a {
  color: white;
}
.nav {
	display: flex;
	justify-content: space-evenly;
  align-items: center;
	width: 100%;
  background-color: black;
  height: 40px;
}

/* Стиль для кнопок навигации */
.navBtn {
	width: 100%;
	border: none;
	color: var(--white);
	padding: 15px;
	font-size: 1.15rem;
	border-radius: 0;
	height: auto;
	filter: none;
  background-color: var(--black);
}

/* Контейнер для ссылки, чтобы кнопка была ссылкой */
.navBtnRouter {
	width: 100%;
}

/* Ссылка внутри кнопки */
.navBtn a {
	color: var(--white);
}

/* Выделение активной кнопки навигации */
.activePage {
	font-weight: bold;
}
</style>