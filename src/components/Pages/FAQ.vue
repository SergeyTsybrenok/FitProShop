<!-- Страница с часто задаваемыми вопросами -->

<script setup>
</script>

<template>
  <h1>Вопросы и ответы</h1>
  <!-- Блок: Заказы и оплата -->
  <div class="question questionsBlack question1">
    <h3>Заказы и оплата 💳</h3>
    <div class="que ">
      <!-- Вопрос 1 -->
      <p>
        1. Как оформить заказ?
      </p>
      <p class="answer">
        Выберите товар, добавьте в корзину, перейдите к оформлению, укажите данные и оплатите удобным способом.
      </p>
      <!-- Вопрос 2 -->
      <p>
        2. Какие способы оплаты доступны?
      </p>
      <p class="answer">
        Мы принимаем карты Visa/MasterCard, Apple Pay, Google Pay и наложенный платеж при получении.
      </p>
    </div>
  </div>

  <!-- Блок: Доставка и возврат -->
  <div class="question question2">
    <h3>Доставка и возврат 🚚</h3>
    <div class="que ">
      <p>
        1. Какие способы доставки доступны?
      </p>
      <p class="answer">
        Доставка осуществляется курьерскими службами (DHL, CDEK, Boxberry) и Почтой России.
      </p>
      <p>
        2. Как отследить мой заказ?
      </p>
      <p class="answer">
        После отправки заказа вы получите трек-номер для отслеживания.
      </p>
      <p>3. Можно ли вернуть товар?</p>
      <p class="answer"> Да, у вас есть 14 дней на возврат, если товар не был использован. Для подробностей напишите нам
        в поддержку.</p>
    </div>
  </div>

  <!-- Блок: Товары и размеры -->
  <div class="question questionsBlack question3">
    <h3>Товары и размеры 📏</h3>
    <div class="que ">
      <p>
        1. Как выбрать правильный размер?
      </p>
      <p class="answer">
        Используйте нашу таблицу размеров на странице товара или свяжитесь с поддержкой.
      </p>
      <p>
        2. Из каких материалов производится одежда?
      </p>
      <p class="answer">
        Мы используем дышащие и эластичные материалы (хлопок, полиэстер, лайкра) для комфорта и долговечности.
        Подробности прописаны в карточке товара.
      </p>
    </div>
  </div>

  <!-- Блок: Скидки и акции -->
  <div class="question question4">
    <h3>Скидки и акции 🎁</h3>
    <div class="que ">
      <p>
        1. Есть ли у вас скидки для постоянных клиентов?
      </p>
      <p class="answer">
        Да! Зарегистрированные пользователи получают бонусы и персональные скидки.
      </p>
      <p>
        2. Как заказать товар по акции?
      </p>
      <p class="answer">
        Цены из каталога указаны конечные, в том числе на акционные товары.
      </p>
      <p>3. Можно ли вернуть товар?</p>
      <p class="answer"> Да, у вас есть 14 дней на возврат, если товар не был использован. Для подробностей напишите нам
        в поддержку.</p>
    </div>
  </div>

  <!-- Блок: Контакты и поддержка -->
  <div class="question questionsBlack question5">
    <h3>Контакты и поддержка 📞</h3>
    <div class="que ">
      <p>
        1. Как связаться с поддержкой?
      </p>
      <p class="answer">
        Вы можете написать нам на fitproshop@mail.ru или в Telegram.
      </p>
      <p>
        2. Как быстро отвечает поддержка?
      </p>
      <p class="answer">
        В рабочее время (Пн-Пт 10:00–20:00) мы отвечаем в течение 30 минут.
      </p>
      <p>
        3. Какие правовые акты вы соблюдаете?
      </p>
      <p class="answer">
        Для ознакомления перейдите в раздел <RouterLink class="doc" :to="{ name: 'documents' }">Документы</RouterLink>
      </p>
    </div>
  </div>


  <!-- Форма обратной связи -->
  <div class="form">
    <h2>Не нашли ответ? Напишите свой вопрос!</h2>
    <div class="formInputs">
      <div class="inpLI inputLabelName">
        <label for="name">Введите своё имя</label>
        <input type="text" name="name" id="name" class="input inpName">
      </div>
      <div class="inpLI inputLabelEmail">
        <label for="email">Введите свой email</label>
        <input type="text" name="email" id="email" class="input inpEmail">
      </div>
      <div class="inpLI inputLabelPhone">
        <label for="phone">Введите свой телефон</label>
        <input type="text" name="phone" id="phone" class="input inpPhone">
      </div>
      <div class="inpLI inputLabelComm">
        <label for="comm">Введите свой комментарий</label>
        <textarea type="text" name="comm" id="comm" class="input inpComm"></textarea>
      </div>
      <button class="btnMain">
        <RouterLink :to="{name: 'modalSendFormFAQ'}">
          Отправить
        </RouterLink>
        
        </button>
    </div>
  </div>
</template>

<style scoped>
/* Общие стили вопросов */
.question {
  padding: 1rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 2rem;
}

/* Тёмный фон для чёрных блоков */
.questionsBlack {
  background-color: var(--black);
  color: var(--white);
}

/* Ширина блока с вопросами */
.que {
  width: 100%;
  max-width: 65rem;
  box-sizing: border-box;
}

/* Отступ слева для ответа */
.answer {
  margin-left: 2rem;
}

/* Стили формы */
.form {
  background-color: var(--white);
  color: var(--black);
}

/* Контейнер с полями формы */
.formInputs {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
}

/* Стиль каждого блока ввода */
.inpLI {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

/* Размеры текстового поля */
.inpComm {
  min-height: 15rem;
  min-width: 36rem;
  max-height: 50rem;
  max-width: 36rem;
}

/* Стили textarea */
textarea {
  background-color: var(--grey);
  width: 36rem;
  height: 3rem;
  border: none;
  padding-left: 1rem;
}

/* Стиль ссылки на документы */
.doc {
  color: var(--white);
  font-weight: bold;
}

/*  Адаптивные стили */
@media (max-width: 900px) {
  .que {
    padding: 0 1rem;
    max-width: 100%;
  }

  .answer {
    margin-left: 1rem;
  }

  .formContent {
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
  }

  .form input {
    width: 27rem;
  }

  .form textarea {
    height: 3rem;
    min-width: 27rem;
    max-width: 27rem;
  }
}
</style>
