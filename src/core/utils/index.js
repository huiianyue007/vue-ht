export default {
  defineProperty: function(name, js, Vue) {
    if (!Vue.prototype[name]) {
      Object.defineProperty(Vue.prototype, name, {
        configurable: true,
        get: function() {
          return js;
        }
      });
    }
  }
};
