import * as htBox from '@@/components/htBox/';
import * as htVuexStorage from '@@/utils/vuexStorage/';
import * as htAjax from '@@/utils/htAjax/';
let option = {
  htBox,
  htVuexStorage,
  htAjax
};
let components = {};
const install = function(Vue) {
  Object.entries(option).forEach((item) => {
    Object.entries(item[1]).forEach((it) => {
      if (it[0] === 'default') {
        const componentsInstaller = it[1].install;

        if (componentsInstaller) {
          Vue.use(componentsInstaller);
        }
      } else if (it[0] !== 'install') {
        components[it[0]] = it[1];
      }
    });
  });
};

Object.entries(option).forEach((item) => {
  Object.entries(item[1]).forEach((it) => {
    if (it[0] === 'default') {
      components[item[0]] = item[1].default;
    } else if (it[0] !== 'install') {
      components[it[0]] = it[1];
    }
  });
});
components.install = install;
export default components;
