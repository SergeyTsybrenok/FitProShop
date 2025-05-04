<!-- Страница регистрации -->

<script setup>
import { reactive } from 'vue';
import useUsers from '../../composables/useUsers';
import { useRouter } from 'vue-router';

const router = useRouter()

const local = reactive({
  userData: {
    name: '',
    password: '',
    passwordRepeat: '',
    email: '',
    phone: ''
  },
  // флаги ошибок
  errorName: false,
  errorPassword: false,
  errorPasswordRepeat: false,
  errorEmail: false,
  errorEmailBusy: false,
  errorPhone: false,
  errorPhoneBusy: false,
  // регулярки
  regName: /^[AzА-яЁё ]{4,10}$/,
  regPassword: /^(?=.*\d)(?=.*[а-яa-z])(?=.*[А-ЯA-Z]).{6,}$/,
  regEmail: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
  regPhone: /^\8\d{10}$/,
  // сообщения
  // msgRequired: 'Поле не может быть пустым',
  msgRequired: 'Неверный формат или ничего не введено',

  msgRequiredNotMatch: 'Пароли не совпадают',
  // msgFormat: 'Неверный формат',
  msgBusy: 'Вы уже были ранее зарегистрированы',
});

function checkInput() {
  // Проверка имени: пустое или не соответствует регулярке
  if (!local.userData.name) {
    local.errorName = true;
  } else {
    local.errorName = !local.regName.test(local.userData.name);
  }

  // Проверка пароля: пустой или не соответствует регулярке
  if (!local.userData.password) {
    local.errorPassword = true;
  } else {
    local.errorPassword = !local.regPassword.test(local.userData.password);
  }

  // Проверка повтора пароля: должен совпадать с основным
  local.errorPasswordRepeat =
    local.userData.password !== local.userData.passwordRepeat;

  // Проверка email: пустой, неправильный формат или уже занят
  if (!local.userData.email) {
    local.errorEmail = true;
    local.errorEmailBusy = false;
  } else if (!local.regEmail.test(local.userData.email)) {
    local.errorEmail = true;
    local.errorEmailBusy = false;
  } else if (useUsers().findUserEmail(local.userData.email)) {
    local.errorEmail = false;
    local.errorEmailBusy = true;
  } else {
    local.errorEmail = false;
    local.errorEmailBusy = false;
  }

  // Проверка телефона: пустой, неправильный формат или уже занят
  if (!local.userData.phone) {
    local.errorPhone = true;
    local.errorPhoneBusy = false;
  } else if (!local.regPhone.test(local.userData.phone)) {
    local.errorPhone = true;
    local.errorPhoneBusy = false;
  } else if (useUsers().findUserPhone(local.userData.phone)) {
    local.errorPhone = false;
    local.errorPhoneBusy = true;
  } else {
    local.errorPhone = false;
    local.errorPhoneBusy = false;
  }

  // Определяем, прошли ли все проверки
  const noErrors =
    !local.errorName &&
    !local.errorPassword &&
    !local.errorPasswordRepeat &&
    !local.errorEmail &&
    !local.errorEmailBusy &&
    !local.errorPhone &&
    !local.errorPhoneBusy;

  // Если и email, и телефон уже заняты — направляем на авторизацию
  if (local.errorEmailBusy && local.errorPhoneBusy) {
    router.push({ name: 'authorization' });
  }

  // Если ошибок нет — проверяем авторизацию
  if (noErrors) {
    const authResult = useUsers().checkAuthorization(local.userData);

    if (!authResult) {
      // Если пользователь новый — добавляем и переходим в аккаунт
      useUsers().addUser(local.userData);
      router.push({ name: 'accountData' });
    } else {
      // Если совпали логин и пароль — направляем на авторизацию
      router.push({ name: 'authorization' });
    }

    // Очищаем поля формы
    local.userData = {
      name: '',
      password: '',
      passwordRepeat: '',
      email: '',
      phone: ''
    };
  }
}

</script>


<template>
  <h2>Регистрация пользователя</h2>

  <div class="formInputs">
    <div class="inpLI inputLabelName">
      <label class="labalMain" for="name">Введите своё имя</label>
      <label for="name">Имя может содержать только буквы и цифры</label>
      <input type="text" name="name" id="name" class="input inpName" v-model="local.userData.name">
      <div v-if="local.errorName" class="error">{{ local.msgRequired }}
      </div>
    </div>
    <div class="inpLI inputLabelEmail">
      <label class="labalMain" for="email">Введите свой email</label>
      <input type="email" name="email" id="email" class="input inpEmail" v-model="local.userData.email">
      <div v-if="local.errorEmail" class="error">{{ local.msgRequired }}</div>
      <div v-if="local.errorEmailBusy" class="error">{{ local.msgBusy }}
      </div>
    </div>
    <div class="inpLI inputLabelPhone">
      <label class="labalMain" for="phone">Введите свой телефон</label>
      <label for="phone">Номер телефона обязательно начинается с 8</label>
      <input type="tel" name="phone" id="phone" class="input inpPhone" v-model="local.userData.phone">
      <div v-if="local.errorPhone" class="error">{{ local.msgRequired }}</div>
      <div v-if="local.errorPhoneBusy" class="error">{{ local.msgBusy }}
      </div>
    </div>
    <div class="inpLI inputLabelPassword">
      <label class="labalMain" for="password">Введите пароль</label>
      <label for="password">Должен содержать не менее 6 символов, большую и маленькую буквы</label>
      <input type="password" name="password" id="password" class="input inpPassword" v-model="local.userData.password">
      <div v-if="local.errorPassword" class="error">{{ local.msgRequired }}</div>
    </div>
    <div class="inpLI inputLabelPasswordRepeat">
      <label class="labalMain" for="passwordRepeat">Повторите пароль</label>
      <input type="password" name="passwordRepeat" id="passwordRepeat" class="input inpPasswordRepeat"
        v-model="local.userData.passwordRepeat">
      <div v-if="local.errorPasswordRepeat" class="error">{{ local.msgRequiredNotMatch }}</div>
      <div v-if="local.errorPasswordRepeat" class="error">{{ local.msgRequired }}</div>
    </div>
    <button @click="checkInput">Создать пользователя</button>
  </div>
</template>



<style scoped>
/* Стиль для отображения текста ошибки */
.error {
  color: red;
}

/* Контейнер всей формы */
.formInputs {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
}

/* Контейнер отдельного поля ввода с подписью */
.inpLI {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

/* Подпись текста основного */
.labalMain {
  font-size: 1.05rem;
}

/*  Адаптивные стили */
@media (max-width: 900px) {
  input {
    width: 27rem;
  }
}
</style>
