import TkGradientsBar from './tkGradientsBar.vue';
import tkGradients from './utils.js';

const install = function(Vue) {
  Vue.component('tk-gradients-bar', Vue.extend(TkGradientsBar));
};

export {TkGradientsBar as default, install, tkGradients};
