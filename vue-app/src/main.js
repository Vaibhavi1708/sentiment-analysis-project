// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./plugins/bootstrap-vue";
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VeeValidate from "vee-validate";


Vue.config.productionTip = false
Vue.use(VeeValidate);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
