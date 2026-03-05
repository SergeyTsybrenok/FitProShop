import { createRouter, createWebHistory } from "vue-router";

// Импорт основных страниц проекта
import index from "./components/Pages/index.vue";
import catalog from "./components/Pages/catalog.vue";
import sale from "./components/Pages/sale.vue";
import about from "./components/Pages/about.vue";
import contacts from "./components/Pages/contacts.vue";
import FAQ from "./components/Pages/FAQ.vue";
import basket from "./components/Pages/basket.vue";
import account from "./components/Pages/account.vue";
import authorization from "./components/Pages/authorization.vue"
import registration from "./components/Pages/registration.vue"
import documents from "./components/Pages/documents.vue";
import admin from "./components/Pages/admin.vue";
import error404 from "./components/Pages/error404.vue";

// Импорт дополнительных страниц проекта
import accountData from './components/Pages/accountElem/accountData.vue'
import accountFav from './components/Pages/accountElem/accountFav.vue'
import accountOrder from './components/Pages/accountElem/accountOrder.vue'
import productCard from "./components/Pages/productCard.vue";

// Импорты для админа
import usersList from "./components/Pages/adminElem/usersList.vue"
import productList from "./components/Pages/adminElem/productList.vue"
import AddProductNew from "./components/Pages/adminElem/addProductNew.vue";

// Импорт модальных окон
import modalAllOrders from "./components/modals/modalAllOrders.vue";
import modalFiltres from "./components/modals/modalFiltres.vue";
import modalSendForm from "./components/modals/modalSendForm.vue";
import modalSendFormFAQ from "./components/modals/modalSendFormFAQ.vue";
import modalSendFormContacts from "./components/modals/modalSendFormContacts.vue";
import modalOrder from "./components/modals/modalOrder.vue";
import modalAddItems from "./components/modals/modalAddItems.vue";

const routes = [
  { path: "/FitProShop/", component: index, name: "index" },
  { path: "/FitProShop/catalog", component: catalog, name: "catalog" },
  { path: "/FitProShop/sale", component: sale, name: "sale" },
  { path: "/FitProShop/about", component: about, name: "about" },
  { path: "/FitProShop/contacts", component: contacts, name: "contacts" },
  { path: "/FitProShop/FAQ", component: FAQ, name: "FAQ" },
  { path: "/FitProShop/basket", component: basket, name: "basket" },
  { path: "/FitProShop/productCard/:id?", component: productCard, name: "productCard" },
  {path: '/FitProShop/authorization', component: authorization, name: 'authorization'},
  {path: '/FitProShop/registration', component: registration, name: 'registration'},
  {path: '/FitProShop/documents', component: documents, name: 'documents'},
  {path: '/FitProShop/admin', component: admin, name: 'admin', children: [
    {path: 'usersList', component: usersList, name: 'usersList'},
    {path: 'productList', component: productList, name: 'productList'},
    {path: 'addProduct', component: AddProductNew, name: 'addProduct'},
    ]
  },
  { path: "/FitProShop/account", component: account, name: "account", children: [
    {path: 'accountData', component: accountData, name: 'accountData'},
    {path: 'accountFav', component: accountFav, name: 'accountFav'},
    {path: 'accountOrder', component: accountOrder, name: 'accountOrder'},
  ]
  },
  { path: "/FitProShop/modalAllOrders", component: modalAllOrders, name: "modalAllOrders" },
  { path: "/FitProShop/modalFiltres", component: modalFiltres, name: "modalFiltres" },
  { path: "/FitProShop/modalSendForm", component: modalSendForm, name: "modalSendForm" },
  { path: "/FitProShop/modalSendFormFAQ", component: modalSendFormFAQ, name: "modalSendFormFAQ" },
  { path: "/FitProShop/modalSendFormContacts", component: modalSendFormContacts, name: "modalSendFormContacts" },
  { path: "/FitProShop/modalOrder", component: modalOrder, name: "modalOrder" },
  { path: "/FitProShop/modalAddItems", component: modalAddItems, name: "modalAddItems" },
  { path: '/:pathMatch(.*)*', component: error404, name: 'error404' },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    window.scrollTo(0,0);
  }
});