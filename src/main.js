import Vue from 'vue'
import App from './App.vue'
import '@/styles/element-variables.scss'
import '@/assets/icons'
import '@/styles/index.scss'

import installElementUI from '@/plugins/element-ui'
import installAxios from '@/api'

installElementUI(Vue)
installAxios(Vue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
