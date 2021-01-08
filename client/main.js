//created at 01/07/2021 by Khalid Imran

import { Meteor } from 'meteor/meteor'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import VueMeteorTracker from 'vue-meteor-tracker';
import router from "./routes/router";

import './index.html'

// Plugin
// ==================
import VeeValidate from 'vee-validate'
import VueToastr from "vue-toastr";
import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

Vue.use(VueMeteorTracker);
Vue.use(VueRouter);
Vue.use(VeeValidate)
Vue.use(VueFlatPickr)
Vue.use(VueToastr, {
  defaultPosition: "toast-top-right",
  defaultTimeout: 2000,
  defaultCloseOnHover: true,
});

Meteor.startup(() => {
  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  });
})
