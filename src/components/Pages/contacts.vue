<script setup>


</script>



<template>
  <h1>Контакты</h1>
  <!-- Введение и описание для связи -->
  <div class="textHeader">
    <h3>Свяжитесь с нами – мы всегда на связи!</h3>
    <h4>Если у вас есть вопросы по продукции, сотрудничеству или доставке – мы готовы помочь!</h4>
  </div>

  <!-- Контактная информация -->
  <div class="contacts">
    <div class="text">
      <!-- email для связи -->
      <a href="mailto:fitproshop@mail.ru">fitproshop@mail.ru</a>
      <!-- Рабочие часы -->
      <p>График работы: Пн-Пт: 10:00 – 20:00, Сб-Вс: 11:00 – 18:00</p>
    </div>
    <!-- Социальные сети с иконками -->
    <div class="social">
      <a href="https://www.instagram.com/fit_pro_gorillawear/">
        <img class="iconSoc" src="/src/img/instagram.png" alt="">
      </a>
      <a href="https://t.me/fitprogorillawear">
        <img class="iconSoc" src="/src/img/telegram.png" alt="">
      </a>
      <a href="https://vk.com/fitproshop">
        <img class="iconSoc" src="/src/img/vk.png" alt="">
      </a>
    </div>
  </div>

  <!-- Форма обратной связи -->
  <div class="form">
    <h2>Форма обратной связи</h2>
    <div class="formInputs">
      <!-- Поле для ввода имени -->
      <div class="inpLI inputLabelName">
        <label for="name">Введите своё имя</label>
        <input type="text" name="name" id="name" class="input inpName">
      </div>
      <!-- Поле для ввода email -->
      <div class="inpLI inputLabelEmail">
        <label for="email">Введите свой email</label>
        <input type="text" name="email" id="email" class="input inpEmail">
      </div>
      <!-- Поле для ввода телефона -->
      <div class="inpLI inputLabelPhone">
        <label for="phone">Введите свой телефон</label>
        <input type="text" name="phone" id="phone" class="input inpPhone">
      </div>
      <!-- Поле для ввода комментария -->
      <div class="inpLI inputLabelComm">
        <label for="comm">Введите свой комментарий</label>
        <textarea type="text" name="comm" id="comm" class="input inpComm"></textarea>
      </div>
      <!-- Кнопка отправки формы с переходом на модальное окно -->
      <button class="btnMain">
        <RouterLink :to="{name: 'modalSendFormContacts'}">Отправить</RouterLink>
        
        </button>
    </div>
  </div>
  <!-- Текст внизу страницы для завершения -->
  <div class="textFooter">
    <h3>Мы постараемся как можно скорее помочь вам!</h3>
  </div>
  <br><br><br>
</template>


<style scoped>
/* Ссылка */
a {
  color: var(--black);
}

/* Контейнер с контактной информацией */
.contacts {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 2rem;
}

/* Выравнивание иконок соцсетей */
.social {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Размер иконок соцсетей */
.iconSoc {
  height: 3rem;
  padding-inline: 1rem;
}

/* Контент в блоке с контактной информацией */
.text {
  line-height: 2.5rem;
}

/* Стиль для формы */
.form {
  background-color: var(--black);
  color: var(--white);
}

/* Контейнер для всех элементов формы */
.formInputs {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
}

/* Контейнер для каждого поля ввода */
.inpLI {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

/* Размер и стиль текстового поля для комментария */
.inpComm {
  height: 15rem;
}

/* Стиль для текстовой области */
textarea {
  background-color: var(--grey);
  width: 36rem;
  height: 3rem;
  border: none;
  padding-left: 1rem;
}

/* Текстовый блок внизу страницы */
.textFooter {
  padding-top: 3rem;
}

/* Мобильная адаптация */
@media (max-width: 900px) {
  .formContent {
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
  }

  .form input {
    width: 27rem;
  }

  .form textarea {
    min-width: 27rem;
    max-width: 27rem;
  }
}

</style>
