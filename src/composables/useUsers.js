import { ref, watch } from "vue";
import useProducts from "./useProducts";

const products = useProducts().productsLocalStorage.value;
const favorites = useProducts().favoriteLocalStorage.value;

// Локальный массив для хранения списка пользователей из localStorage
const usersLocalStorage = ref([]);

// Переменная для хранения ID текущего активного пользователя. "noUser" - если пользователь не авторизован
const activityUserId = ref("noUser");

// Проверяем, есть ли в localStorage сохранённый активный пользователь
if (localStorage.getItem("usersActiveLS") === null) {
  // Если нет, устанавливаем значение — "noUser"
  activityUserId.value = "noUser";
} else {
  // Если есть — загружаем ID пользователя и приводим его к числу
  activityUserId.value = Number(localStorage.getItem("usersActiveLS"));
}

// Следим за изменениями в activityUserId и сохраняем их в localStorage
watch(activityUserId, (newValue) => {
  localStorage.setItem("usersActiveLS", newValue);
});

// Загружаем данные из localStorage для пользователей
try {
  if (localStorage.getItem("usersLS") === null) {
    usersLocalStorage.value = [
      {
        id: 0,
        name: "Екатерина",
        password: "456159",
        role: "Администратор главный",
        email: "katushka1743@yandex.ru",
        phone: "89819358066",
      },
      {
        id: 1,
        name: "Павел",
        password: "456159",
        role: "Администратор",
        email: "fitproshop@mail.ru",
        phone: "89516682569",
      },
    ];
  } else {
    usersLocalStorage.value = JSON.parse(localStorage.getItem("usersLS"));
  }
} catch (error) {
  usersLocalStorage.value = [
    {
      id: 0,
      name: "Екатерина",
      password: "456159",
      role: "Администратор главный",
      email: "katushka1743@yandex.ru",
      phone: "89819358066",
    },  
    {
      id: 1,
      name: "Павел",
      password: "456159",
      role: "Администратор",
      email: "fitproshop@mail.ru",
      phone: "89516682569",
    },
  ];
}

// Следим за изменениями в пользователях и сохраняем их в localStorage
watch(
  usersLocalStorage,
  (newValue) => {
    localStorage.setItem("usersLS", JSON.stringify(newValue));
  },
  { deep: true }
);

// Функция поиска пользователя по имени
function findUserName(userName) {
  return usersLocalStorage.value.find((user) => user.name === userName);
}

// Функция поиска пользователя по id
function findUserId(userId) {
  return usersLocalStorage.value.find((user) => user.id === userId);
}

// Функция поиска пользователя по email
function findUserEmail(email) {
  return usersLocalStorage.value.find((user) => user.email === email);
}

// Функция поиска пользователя по телефону
function findUserPhone(phone) {
  return usersLocalStorage.value.find((user) => user.phone === phone);
}

// Функция добавления пользователя
function addUser(userData) {
  // Поиск пользователя по имени
  const boolUserBe = findUserName(userData.name);
  // Функция возвращает true/false
  // Если true (пользователь найден) --> Пользователь существует
  // Иначе false (пользователь не найден) --> Создаём пользователя
  if (boolUserBe) {
    // Пользователь уже существует
  } else {
    const newUserId = usersLocalStorage.value[usersLocalStorage.value.length - 1].id + 1;
    usersLocalStorage.value.push({
      id: newUserId,
      name: userData.name,
      password: userData.password,
      role: "Пользователь",
      phone: userData.phone,
      email: userData.email,
    });
    activeUserFunction(usersLocalStorage.value[usersLocalStorage.value.length - 1].id);
  }
}

// Функция удаления пользователя по id
function deleteUser(userId) {
  const deletedUser = findUserId(userId);
  const deletedUserIndex = usersLocalStorage.value.indexOf(deletedUser);
  usersLocalStorage.value.splice(deletedUserIndex, 1);
}

// Функция повышения роли с Пользователь на Администратор
function upgradeRole(userData) {
  const user = findUserId(userData.id);
  if (user && user.role === "Пользователь") {
    user.role = "Администратор";
  }
}

// Функция понижения роли с Администратор на Пользователь
function downgradeRole(userData) {
  const user = findUserId(userData.id);
  if (user && user.role === "Администратор") {
    user.role = "Пользователь";
  }
}

// Функция для проверки авторизации пользователя
// Если найден пользователь с совпадающим email или телефоном и паролем --> возвращает true
// Если найден только по email или телефону, но пароль не совпадает --> возвращает "password"
// Если пользователь не найден вовсе --> возвращает false
function checkAuthorization(userData) {
  // Поиск пользователя по email или телефону и паролю
  const user = usersLocalStorage.value.find((u) => (u.email === userData.emailOrPhone || u.phone === userData.emailOrPhone) && u.password === userData.password);
  // Если найден — вызываем функцию активации пользователя и возвращаем true
  if (user) {
    activeUserFunction(user.id);
    return true;
  }
  // Если найден по email или телефону, но пароль не совпадает
  const onlyUser = usersLocalStorage.value.find((u) => u.email === userData.emailOrPhone || u.phone === userData.emailOrPhone);
  if (onlyUser) {
    return "password"; // пароль неверный
  }
  // Если пользователь вообще не найден
  return false;
}

// Функция для определения активного пользователя
function activeUserFunction(userId) {
  const activeUser = findUserId(userId);
  const activeUserId = usersLocalStorage.value.indexOf(activeUser);
  activityUserId.value = activeUserId;
  favorites.forEach(element => {
    if (element.user_id === userId) {
      const productOne = useProducts().findProduct(element.item.id) 
      productOne.favorite = true;
    }
  })
}

// Функция выхода из аккаунта
function exit() {
  activityUserId.value = "no user";
  products.forEach(product => {
    product.favorite = false;
    product.basket = false;
  })
}

// Экспорт функций и переменных
export default function useUsers() {
  return {
    usersLocalStorage,
    activityUserId,
    addUser,
    findUserName,
    findUserId,
    deleteUser,
    upgradeRole,
    downgradeRole,
    checkAuthorization,
    activeUserFunction,
    exit,
    findUserEmail,
    findUserPhone,
  };
}
