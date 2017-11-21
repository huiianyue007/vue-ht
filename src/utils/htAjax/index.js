import { htAjax, htAjaxGlobal } from './htAjax';
import util from '@@/core/utils/';
const install = function(Vue) {
  util.defineProperty('$htAjax', htAjax, Vue);
  util.defineProperty('$htAjaxGlobal', htAjaxGlobal, Vue);
};
htAjax.install = install
export {htAjax as default, install};
