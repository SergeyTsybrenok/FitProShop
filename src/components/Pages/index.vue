<!-- Страница "Главная" -->

<script setup>
import { computed } from 'vue';
import useProducts from '../../composables/useProducts';
import cards from './cards.vue';

// Вычисляем хиты продаж: фильтруем товары с параметром hits === true
const productHits = computed(() => {
  return useProducts().productsLocalStorage.value.filter(product => product.hits === true)
})


import useUsers from '../../composables/useUsers';

const usersAll = useUsers().usersLocalStorage;
const userActiveId = useUsers().activityUserId;

// Получение активного пользователя через computed
const userActive = computed(() => {
  // Проверяем, если индекс пользователя существует, то возвращаем его данные
  return usersAll.value[userActiveId.value] || null;
});
</script>

<template>
  <main>
    <!-- Заголовок страницы -->
    <h1>Главная</h1>

    <!-- Картинка -->
    <div class="slider">
      <img src="/src/img/sliderOne.jpg" alt="slider1">
    </div>

    <!-- Приветственный блок -->
    <div class="title">
      <h2>Твоя энергия – твои правила!</h2>
      <h3>Лучший выбор спортивных товаров</h3>

      <!-- Кнопка перехода в каталог -->
      <RouterLink :to="{ name: 'catalog' }">
        <button class="btnMain">Перейти в каталог</button>
      </RouterLink>
    </div>

    <!-- Хиты продаж -->
    <div class="hits">
      <h2>Хиты продаж</h2>
      <!-- Компонент карточек, передаём отфильтрованные товары -->
      <cards :propsList="productHits" />
      <!-- Кнопка перехода в каталог -->
      <button class="btnMain" v-if="!userActive">
        <RouterLink :to="{ name: 'catalog' }">Перейти в каталог</RouterLink>
      </button>
    </div>

    <!-- Преимущества магазина -->
    <div class="advantages">
      <h2>Наши преимущества</h2>
      <div class="advantagesPoints">
        <div class="adv adv1">
          <img src="/src/img/favorite.svg" alt="">
          <p>Прямые поставки <br> от производителей</p>
        </div>
        <div class="adv adv2">
          <img src="/src/img/favorite.svg" alt="">
          <p>Удобные способы <br> оплаты покупок</p>
        </div>
        <div class="adv adv3">
          <img src="/src/img/favorite.svg" alt="">
          <p>Доставка по всей <br>России</p>
        </div>
      </div>
    </div>

    <!-- Акции -->
    <div class="sale">
      <h2>Наши акции</h2>
      <img class="saleImg" src="/src/img/banner.png" alt="">
      <!-- Кнопка перехода в каталог -->
      <button class="btnMain">
        <RouterLink :to="{ name: 'catalog' }">Перейти в каталог</RouterLink>
      </button>
    </div>

    <!-- Блок отзывов покупателей -->
    <div class="reviews">
      <h2>Ваши отзывы</h2>
      <div class="rewiewsPoints">
        <!-- Отзыв 1 -->
        <div class="review">
          <img class="rewiewIcon" src="/src/img/iconFemale.png" alt="">
          <div class="rewiewText">
            <p>Павел, муж сказал, что возвращать сумку не&nbsp;даст🤣
              сказал, что она такая крутая, что не&nbsp;хочет с&nbsp;ней
              расставаться😂 А кроссы вообще🔥🔥🔥🔥🔥 они
              мега-удобные, легкие и броские😎 мы с&nbsp;мужем
              довольны😋 А&nbsp;для него это вообще подарок на&nbsp;ДР&#41;
              так что благодарю, что помогли его сделать
              офигенным!🥰</p>
          </div>
        </div>
        <!-- Отзыв 2 -->
        <div class="review">
          <img class="rewiewIcon" src="/src/img/iconMale.png" alt="">
          <div class="rewiewText">
            <p>
              Ваще огонь🔥 спасибо!!! Получил посылку. Доволен как&nbsp;пацан 😃 Буду на&nbsp;треньке пришлю супер
              крутяцкую фотку 💪 в&nbsp;GORILLA. Теперь нужная маячка. Почему сразу об&nbsp;этом не&nbsp;подумал 🤦‍♂️
              не&nbsp;знаю 🤷‍♂️
            </p>
          </div>
        </div>
        <!-- Отзыв 3 -->
        <div class="review">
          <img class="rewiewIcon" src="/src/img/iconFemale.png" alt="">
          <div class="rewiewText">
            <p>
              Это пушка🔥🔥🔥
              Спасибо <br>
              Такая уверенность при занятиях.
              Нет страха теперь <br>
              Спасибо
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Форма подписки на рассылку -->
    <div class="form">
      <h2>Подпишись на рассылку</h2>
      <div class="formContent">
        <img class="formImg" src="/src/img/plane.png" alt="">
        <div class="formSomething">
          <p class="Inform">Узнавайте первым о&nbsp;скидках и&nbsp;новинках</p>
          <div class="formInputs">
            <!-- Поле ввода email -->
            <div class="inputLabelEmail">
              <label for="email">Введите свой email</label>
              <input type="text" name="email" id="email" class="input inpEmail">
            </div>
            <!-- Поле ввода имени -->
            <div class="inputLabelName">
              <label for="name">Введите своё имя</label>
              <input type="text" name="name" id="name" class="input inpName">
            </div>
            <!-- Кнопка подписки -->
            <button class="btnMain">
              <RouterLink :to="{ name: 'modalSendForm' }">Подписаться</RouterLink>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<style scoped>
/* Основная часть страницы */
main {
  width: 100%;
}

/* Слайдер на главной */
.slider>img {
  width: 100%;
  display: block;
}

/* Тёмный заголовочный блок с призывом */
.title {
  background-color: var(--black);
  color: var(--white);
  padding-bottom: 1rem;
}

/* Блок преимуществ */
.advantages {
  margin-bottom: 5px;
  background-color: var(--black);
  color: var(--white);
  padding-bottom: 1rem;

}

/* Контейнер с иконками преимуществ */
.advantagesPoints {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem;
  flex-wrap: wrap;
}

/* Отдельный блок преимущества */
.adv {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  gap: 2rem;
}

/* Блок "Акции" */
.sale {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Баннер акции */
.saleImg {
  display: block;
  margin-right: auto;
  margin-left: auto;
  max-width: 100%;
}

/* Отзывы – общий контейнер */
.reviews {
  background-color: var(--black);
  color: var(--white);
  padding: 1rem;
}

/* Обёртка для всех отзывов */
.rewiewsPoints {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

/* Один отзыв */
.review {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  width: 35rem;
}

/* Иконка пользователя в отзыве */
.rewiewIcon {
  width: 5rem;
  height: 5rem;
}

/* Текст отзыва */
.rewiewText {
  background-color: var(--white);
  border-radius: 15px;
  color: var(--black);
  text-align: justify;
  padding: 1rem;
}

/* Форма подписки */
.form {
  padding: 1rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

/* Контейнер формы */
.formContent {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
  align-items: start;
}

/* Правая часть с текстом и инпутами */
.formSomething {
  display: flex;
  flex-direction: column;
  width: 40rem;
}

/* Текст "Узнавайте первым о скидках" */
.Inform {
  text-align: left;
  font-size: 1.4rem;
  margin-bottom: 1rem;
  width: 72%;
}

/* Обёртка инпутов и кнопки */
.formInputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
}

/* Обёртка инпута email */
.inputLabelEmail,
.inputLabelName {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
}

/* Стили заголовка */
h2 {
  text-align: center;
  padding: 1.5rem;
  font-family: 'ShriftMontserratLight';
  font-size: 2rem;
}

/* Мобильная адаптация */
@media (max-width: 900px) {
  .formContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .form img {
    width: 80%;
    margin: 0;
    padding: 0;
  }

  .form input {
    width: 27rem;
  }

  h2 {
    text-align: center;
    padding: 1.5rem;
    font-family: 'ShriftMontserratLight';
    font-size: 2rem;
  }

  .formInputs {
    margin: 0;
    width: 70%;
  }

  .formSomething {
    width: 95%;
    margin: 0;
    padding: 0;
  }

  label {
    margin: 0;
    width: 10rem;
  }

  .inputLabelEmail, .inputLabelName {
    width: 70%;
  }

  .form .btnMain {
    margin-inline: 7rem;
  }
}

</style>
