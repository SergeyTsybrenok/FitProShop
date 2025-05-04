<!-- Страница для авторизации пользователя -->

<script setup>
import { reactive } from 'vue';
import useUsers from '../../composables/useUsers';
import { useRouter } from 'vue-router';

const router = useRouter()
const local = reactive({
  userData: {
    emailOrPhone: '',
    password: '',
  },

  errorLogin: false,
  errorPassword: false,
  errorAuth: '',

  msgRequired: 'Поле не может быть пустым',
  msgInvalid: 'Неверный логин или пароль',
  msgWrongPassword: 'Неверный пароль',
})

// Функция логина
function checkInput() {
  local.errorLogin = false
  local.errorPassword = false
  local.errorAuth = ''

  const login = local.userData.emailOrPhone.trim()
  const password = local.userData.password

  // Проверка логина
  if (login === '') {
    local.errorLogin = local.msgRequired
  }

  // Проверка пароля
  if (password === '') {
    local.errorPassword = local.msgRequired
  }

  // Если нет ошибок — пробуем авторизовать
  if (!local.errorLogin && !local.errorPassword) {
    const result = useUsers().checkAuthorization(local.userData)

    if (result === true) {
      router.push({ name: 'accountData' })
      local.userData.emailOrPhone = ''
      local.userData.password = ''
    } else if (result === 'password') {
      local.userData.password = ''
      local.errorAuth = local.msgWrongPassword
    } else {
      local.errorAuth = local.msgInvalid
    }
  }
}

</script>

<template>
  <h2>Авторизация пользователя</h2>
  <div class="formInputs">
    <!-- Поле для ввода Email или телефона -->
    <div class="inpLI inputLabelLogin">
      <label class="labalMain" for="emailOrPhone">Введите Email или телефон</label>
      <label for="emailOrPhone">Номер телефона обязательно начинается с 8</label>
      <input type="text" name="emailOrPhone" id="emailOrPhone" class="input inpLogin"
        v-model="local.userData.emailOrPhone" />
      <!-- Ошибка формата или пустого поля для логина -->
      <div v-if="local.errorLogin" class="error">{{ local.errorLogin }}</div>
    </div>

    <!-- Поле для ввода пароля -->
    <div class="inpLI inputLabelPassword">
      <label class="labalMain" for="password">Введите пароль </label>
      <label for="password">Должен содержать не менее 6 символов, большую и маленькую буквы</label>
      <input type="password" name="password" id="password" class="input inpPassword"
        v-model="local.userData.password" />
      <!-- Ошибка формата или пустого поля пароля -->
      <div v-if="local.errorPassword" class="error">{{ local.errorPassword }}</div>
    </div>

    <!-- Общая ошибка авторизации (неправильный логин или пароль) -->
    <div v-if="local.errorAuth" class="error">{{ local.errorAuth }}</div>

    <br>
    <button @click="checkInput">Войти</button>
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
