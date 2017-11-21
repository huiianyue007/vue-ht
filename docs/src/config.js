import Vue from 'vue';
import store from './store';
import config from './assets/js/config';
import VueHt, {htVuexStorage} from '../../src';
Vue.use(VueHt);
htVuexStorage.init(config.storageKeys, config.sessionKeys, store, (storage) => {
  store.commit('initForm', storage);
});
