import Vue from "vue";
import ProductList from "../views/ProductList.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ProductDetails from "../views/ProductDetails.vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/products",
    name: "ProductList",
    meta: { requiresAuth: true },
    component: ProductList,
  },
  {
    path: "/login",
    name: "Login",
    meta: { requiresUnauth: true },
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    meta: { requiresUnauth: true },
    component: Register
    },
  {
    path: "/product-detail/:prod_id",
    name: "ProductDetails",
    meta: { requiresAuth: true },
    component: ProductDetails
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
