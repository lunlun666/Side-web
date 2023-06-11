import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import {MainLayout} from '../page/MainLayout'
import { Ubike } from '../page/Ubike'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children:[
      {path: "/ubkie",name: "bike", component: Ubike}
    ],
  },
  // {path: '/ubike', components: Ubike}
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
