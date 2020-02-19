import Vue from 'vue';
import Component from 'vue-class-component';
import App from './components/app';

Vue.config.productionTip = false;

Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);


new Vue({
  el: '#app',
  render: h => h(App),
});
