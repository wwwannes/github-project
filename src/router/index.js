import { createRouter, createWebHistory } from "vue-router";
import SelectUser from "../components/SelectUser.vue";
import Home from "../views/Home.vue";
import Commits from "../views/Commits.vue";
import Files from "../views/Files.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: SelectUser
  },
  {
    path: "/:user",
    name: "User",
    component: Home,
    props: true
  },
  {
    path: "/:user/:name",
    name: "Commits",
    component: Commits,
    props: true
  },
  {
    path: "/:user/:name/:id",
    name: "Files",
    component: Files,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
