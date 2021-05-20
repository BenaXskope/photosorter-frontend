import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import axios from "axios"
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import messagePlugin from './utils/message.plugin'

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.use(messagePlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
