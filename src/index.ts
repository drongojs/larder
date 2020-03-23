import Vue from 'vue';
import functionApi from '@vue/composition-api';
import { plugin as styles } from '@drongo/styles';
import {
  MdButton,
  MdIcon,
  MdApp,
  MdToolbar,
  MdContent,
  MdTabs,
  MdList,
  MdSubheader,
  MdDivider,
  MdField,
  MdCard,
  MdAutocomplete,
  MdMenu,
  // MdSelect,
  MdDatepicker,
} from 'vue-material/dist/components/index.js';
import App from './presentation/components/App';

Vue.use(functionApi);
Vue.use(styles);
Vue.use(MdButton);
Vue.use(MdIcon);
Vue.use(MdApp);
Vue.use(MdToolbar);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(MdList);
Vue.use(MdSubheader);
Vue.use(MdDivider);
Vue.use(MdField);
Vue.use(MdCard);
Vue.use(MdAutocomplete);
Vue.use(MdMenu);
// Vue.use(MdSelect);
Vue.use(MdDatepicker);

new Vue({
  el: '#root',
  render: (h) => h(App),
});
