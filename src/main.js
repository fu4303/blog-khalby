import Vue from 'vue'
import App from './App.vue'
import router from './router'
import meta from 'vue-meta'

Vue.config.productionTip = false;

Vue.directive('visible', function(el, binding) {
  el.style.display = !!binding.value ? 'block' : 'none';
});

new Vue({
  router,
  meta,
  render: h => h(App)
}).$mount('#app')
