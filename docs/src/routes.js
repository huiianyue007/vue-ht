/* main */
import Introduction from './pages/Introduction';
import Error404 from './pages/Error';

/* Components */
import Box from './pages/components/box';
import ajax from './pages/util/ajax';
/* UI Elements */
import Typography from './pages/ui-elements/Typography';
import Layout from './pages/ui-elements/Layout';

const main = [
  {
    path: '/',
    name: 'introduction',
    component: Introduction
  }
];

const components = [{
  path: '/components/box',
  name: 'box',
  component: Box
}, {
  path: '/util/ajax',
  name: 'ajax',
  component: ajax
}];

const theme = [
];

const uiElements = [
  {
    path: '/ui-elements',
    name: 'ui-elements',
    redirect: '/ui-elements/typography'
  },
  {
    path: '/ui-elements/typography',
    name: 'ui-elements:typography',
    component: Typography
  },
  {
    path: '/ui-elements/layout',
    name: 'ui-elements:layout',
    component: Layout
  }
];

const error = [
  {
    path: '*',
    name: 'error',
    component: Error404
  }
];

export default [].concat(main, components, theme, uiElements, error);
