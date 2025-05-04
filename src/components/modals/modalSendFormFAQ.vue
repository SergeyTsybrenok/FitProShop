<!-- Модальное окно при отправке вопроса -->

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

function modalOK() {
  router.push({name: 'FAQ'})
}



</script>



<template>
<div class="container">
  <div class="modal-back"></div>
  <div class="modal-main">
    <div class="header">
      <h1>Вы нажали кнопку отправки вопроса</h1>
    </div>
    <div class="main">
      Спасибо, что пытаетесь узнать о нас что-то новое! На данный момент форма никуда не отправляется, но скоро она заработает! <br> Пока вы можете написать нам в
      <a href="https://t.me/fitprogorillawear" style="font-weight: bold;">
        Telegram
      </a>
    </div>
    <div>
      <button @click="modalOK()">Понял</button>
    </div>
  </div>
</div>

</template>



<style scoped>
.container {
  position: fixed;
  top: 0;
  left: 0;
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

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

.modal-main {
  background-color: var(--white);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  padding: 40px;
  align-items: center;
}

.header {
  color: var(--black);
  font-size: 1.1rem;
}

.main {
  margin: 2rem;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

</style>