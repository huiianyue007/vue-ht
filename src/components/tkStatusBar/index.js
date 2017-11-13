import TkStatusBar from './tkStatusBar.vue';
import tkStatusBarState from './state.js';

const install = function(Vue) {
  Vue.component('tk-status-bar', Vue.extend(TkStatusBar));
};

export {TkStatusBar as default, install, tkStatusBarState};
