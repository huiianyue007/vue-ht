import htBox from './htBox';
const install = function(Vue) {
  Vue.component('ht-box', htBox);
};

htBox.install = install;
export {htBox as default, install};
