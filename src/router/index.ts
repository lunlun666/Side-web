import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import {MainLayout} from '../page/MainLayout'
import { Ubike } from '../page/Ubike'
import { Ubike2 } from '../page/Ubike2'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children:[
      {path: "/ubkie",name: "bike", component: Ubike},
      {path: "/ubkie2",name: "bike2", component: Ubike2},
    ],
  },
  // {path: '/ubike', components: Ubike}
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
