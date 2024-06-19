import { createWebHashHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "Not found",
    redirect: { name: "Main", params: {} },
  },
  {
    path: "/:year?/:campaign?",
    name: "Main",
    component: () => import("../views/MainView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
