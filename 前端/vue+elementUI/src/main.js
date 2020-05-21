// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// 使用elementui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
Vue.use(ElementUI) //使用elementUI
import Vuex from 'vuex'
import func from "./public/func";
import api from "../../node/api";
import store from "../state/vuex-store";

// Vue.prototype.$http = axios;
Vue.use(Vuex)
Vue.prototype.api = api;
Vue.prototype.func = func;

import '@/icons' // icon

import axios from 'axios'
Vue.prototype.axios= axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
