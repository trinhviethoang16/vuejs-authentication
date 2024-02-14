import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Register from "../components/Register.vue"
import NotFound from "../components/NotFound.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "home", component: Home },
  { path: "/login", name: "login", component: Login },
  { path: "/register", name: "register", component: Register },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
