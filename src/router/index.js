import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BookingDetails from "../views/BookingDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { title: "" }
  },
  {
    path: "/booking-details",
    name: "BookingDetails",
    component: BookingDetails,
    meta: { title: "" }
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});


export default router;
