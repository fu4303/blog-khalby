import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

Vue.directive('visible', function(el, binding) {
  el.style.display = !!binding.value ? 'block' : 'none';
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
