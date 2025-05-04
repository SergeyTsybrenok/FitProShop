<!-- Модальное окно с фильтрами -->

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const emit = defineEmits([
  'emitFilter',
])

function modalOK() {
  router.push({name: 'catalog'})
  emit('emitFilter', local.inpFilter)
}

function modalDel() {
  router.push({name: 'catalog'})
  local.inpFilter = ''
  emit('emitFilter', local.inpFilter)
}

const local = reactive ({
  inpFilter: '',
})

</script>



<template>
  <!-- Весь модальный компонент обёрнут в контейнер, который занимает весь экран -->
  <div class="container">

    <!-- Затемнённый фон модального окна -->
    <div class="modal-back"></div>

    <!-- Основной блок модального окна с контентом -->
    <div class="modal-main">

      <!-- Заголовок модального окна -->
      <div class="header">
        <h1>Фильтры</h1>
      </div>

      <!-- Основная часть модального окна -->
      <div class="main">

        <!-- Радиокнопки для выбора фильтра по полу -->
        <div class="inputs">
          <div class="labelInput">
            <label for="female">Женское</label>
            <input type="radio" name="female" id="female" v-model="local.inpFilter" value="Жен">
          </div>
          <div class="labelInput">
            <label for="male">Мужское</label>
            <input type="radio" name="male" id="male" v-model="local.inpFilter" value="Муж">
          </div>
          <div class="labelInput">
            <label for="uni">Унисекс</label>
            <input type="radio" name="uni" id="uni" v-model="local.inpFilter" value="Уни">
          </div>

        </div>
      </div>

      <!-- Кнопки действия: применить или сбросить фильтры -->
      <div>
        <button @click="modalOK()">Применить</button>
        <button @click="modalDel()">Удалить фильтры</button>
      </div>

    </div>
  </div>
</template>



<style scoped>
/* Контейнер модалки: фиксированное позиционирование по центру, поверх всего */
.container {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

/* Полупрозрачный фон позади модалки */
.modal-back {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  background-color: var(--grey);
  opacity: 0.5;
  z-index: 999;
}

/* Основной блок модалки */
.modal-main {
  background-color: var(--white);
  z-index: 1001; 
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
  position: fixed; 
}

/* Заголовок */
.header {
  color: var(--black);
  font-size: 1.1rem;
}

/* Центрирование основного блока */
.main {
  margin: 2rem auto;
  text-align: center;
}

/* Контейнер с радиокнопками */
.inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

/* Стилизация радиокнопок */
.inputs input {
  width: 1rem;
}

/* Кнопки применить и удалить фильтры */
button {
  width: 12rem;
  height: 3rem;
  margin-top: 1em;
}

/* Контейнер для пары label + radio input */
.labelInput {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
}

</style>