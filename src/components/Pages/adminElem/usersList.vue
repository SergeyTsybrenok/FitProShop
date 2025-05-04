<!-- Страница для вывода для админа списка всех пользователей -->

<script setup>
import { RouterView, useRouter } from 'vue-router';
import useUsers from '../../../composables/useUsers';
import { computed } from 'vue';

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
} else if (userActive.value.role === 'Пользователь') {
  router.push({ name: 'accountData' });
}

function deleteUserUL(userId) {
  const currentUser = userActive.value;
  useUsers().deleteUser(userId);
  if (currentUser && userId === currentUser.id) {
    router.push({ name: 'authorization' });
  }
}

function upgradeRoleUL(user) {
  useUsers().upgradeRole(user)
}

function downgradeRoleUL(user) {
  useUsers().downgradeRole(user)
}
</script>

<template>
  <div v-if="userActive">
    <h3>Список всех пользователей</h3>

    <div class="cards">
      <div v-for="user in usersAll" class="card">
        <div class="userName"><p>Имя: {{ user?.name }}</p></div>
        <div class="role"><p>Роль: {{ user?.role }}</p></div>
        <div class="phone"><p>Телефон: {{ user?.phone }}</p></div>
        <div class="email"><p>Почта: {{ user?.email }}</p></div>
        <div class="password" v-if="userActive?.role === 'Администратор главный'"><p>password: {{ user?.password }}</p></div> 


        <!-- Кнопка удаления -->
        <button
          class="deleteUser"
          v-if="(
            (userActive.id === 0) && (user.id !== 0)
          )"
          @click="deleteUserUL(user.id)"
        >
          Удалить
        </button>

        <!-- Повышение роли -->
        <button
          class="btnChangeRole"
          v-if="user?.id !== 0 && user?.role === 'Пользователь' && userActive?.id === 0"
          @click="upgradeRoleUL(user)"
        >
          Повысить
        </button>

        <!-- Понижение роли -->
        <button
          class="btnChangeRole"
          v-if="user?.id !== 0 && user?.role === 'Администратор' && userActive?.id === 0"
          @click="downgradeRoleUL(user)"
        >
          Понизить
        </button>
      </div>
    </div>

    <RouterView />
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

/* Все карточки */
.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  gap: 2rem;
  padding: 2rem 5rem;
}

/* Одна карточка */
.card {
  border: 2px solid var(--black);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: var(--white);
  width: 30rem; 
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}

/* Кнопки в карточках */
button {
  width: 12rem;
  height: 3rem;
  margin-top: 1em;
}
</style>
