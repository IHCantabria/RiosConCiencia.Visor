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
  {
    path: "/muestreo/:idSample",
    name: "Sample",
    component: () => import("../views/SampleView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
