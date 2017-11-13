// import Core from './core'
import * as tkStatusBar from './components/tkStatusBar';
import * as tkGradientsBar from './components/tkGradientsBar';

const options = {
  // Core,
  tkStatusBar,
  tkGradientsBar
};

const components = {
};

components.install = (Vue) => {
  for (let component in options) {
    for (let item in options[component]) {
      if (item === 'install') {
        const componentInstaller = options[component].install;

        if (componentInstaller) {
          Vue.use(componentInstaller);
        }
      } else {
        components[item] = options[component][item];
      }
    }
  }
};

window.VueTk = components;

export default components;
