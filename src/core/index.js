/* Code Components */

/* Core Stylesheets */
import './stylesheets/core.scss';

export default function install() {
  if (install.installed) {
    console.warn('Vue Components is already installed.');
    return;
  }
  install.installed = true;
}
