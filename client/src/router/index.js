import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home";
import PDF from "../components/PDF";

const routes = [
  {
    path: "/",
    name: "HomePage",
    component: Home,
  },
  {
    path: "/pdf",
    name: "PDF",
    component: PDF,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;