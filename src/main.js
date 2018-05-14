import Vue from 'vue'
import App from './App'
import router from './router'
import filters from '@/utils/filters'
import fly, { _post } from '@/utils/ajax'
import * as storage from '@/utils/storage'
import store from '@/store'
import Meta from 'vue-meta'
import { Message } from "element-ui";

import 'babel-polyfill'
import 'normalize.css'
import '@/assets/css/common.css'

Vue.use(Meta)

Vue.prototype.$http = fly
Vue.prototype.$post = _post
Vue.prototype.$local = storage.local
Vue.prototype.$session = storage.session
Vue.prototype.$message = Message



Vue.config.productionTip = false

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})


new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})