<!-- Страница с истрией заказов пользователя -->

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

</script>



<template>
<div v-if="userActive">
  <h3>Заказы</h3>
  
  <table>
    <tbody>
      <td class="th">Номер заказа</td>
      <td class="th">Статус оплаты</td>
      <td class="th">Статус доставки</td>
      <td class="th">Сумма</td>
      <td class="th">Дата оформления</td>


      <tr>
        <td>e</td>
        <td>e</td>
        <td>e</td>
        <td>e</td>
        <td>e</td>
      </tr>
    </tbody>
  </table>
</div>

<div class="classNotAuth" v-else>
    <p>Вы ещё не авторизовались</p>
    <br>
    <p>Чтобы зайти в личный кабинет необходимо
      <RouterLink class="bold" :to="{name: 'authorization'}">Войти</RouterLink> 
      или 
      <RouterLink class="bold" :to="{name: 'registration'}">Зарегистрироваться</RouterLink>
    </p>
  </div>
</template>




<style scoped>
h3 {
  font-family: 'ShriftMontserratLight';
  text-align: left;
  margin-left: 5rem;
  margin-block: 2rem;
}

table, .th, td {
  width: 120rem;
  height: 5rem;
  text-align: center;
  margin: auto;
  border: 1px solid var(--black);
  border-collapse: collapse;
  font-size: 1.15rem;
}

.classNotAuth {
  margin: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.bold, .th {
  font-weight: bold;
}

</style>
