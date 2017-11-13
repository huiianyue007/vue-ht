/* Third Party */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.css';

/* Configs */
import './config.js';
import routes from './routes.js';
import App from './App';

import PageContent from './components/PageContent';
import DocsComponent from './components/DocsComponent';
import ExampleBox from './components/ExampleBox';
import ApiTable from './components/ApiTable';
import CodeBlock from './components/CodeBlock';

Vue.component('page-content', PageContent);
Vue.component('docs-component', DocsComponent);
Vue.component('example-box', ExampleBox);
Vue.component('api-table', ApiTable);
Vue.component('code-block', CodeBlock);

Vue.use(VueRouter);
Vue.use(VueMaterial);

let router = new VueRouter({
  base: window.location.pathname,
  routes
});

let Docs = Vue.component('app', App);

Docs = new Docs({
  el: '#app',
  router
});

router.beforeEach((to, from, next) => {
  Vue.nextTick(() => {
    let mainContent = document.querySelector('.main-content');

    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    Docs.closeSidenav();

    next();
  });
});
