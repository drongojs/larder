import Vue from 'vue';
import functionApi from '@vue/composition-api';
import { plugin } from '@drongo/styles';
import App from './presentation/components/App';

Vue.use(functionApi);
Vue.use(plugin);

new Vue({
  el: '#root',
  render: (h) => h(App),
});
