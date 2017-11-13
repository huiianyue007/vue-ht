(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueHt"] = factory();
	else
		root["VueHt"] = factory();
})(this, (function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 19);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ ((function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate
    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ })),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by Aker on 2016/12/22.
 */
var parseColor = function parseColor(hexStr, transparent) {
  var rgbList = [];

  if (hexStr.length === 4 || hexStr.length === 7) {
    rgbList = hexStr.length === 4 ? hexStr.substr(1).split('').map((function (s) {
      return 0x11 * parseInt(s, 16);
    })) : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map((function (s) {
      return parseInt(s, 16);
    }));
    rgbList.push(1);
  } else {
    var reg = new RegExp(/rgba?\((.*)\)/);
    var match = hexStr.match(reg);

    if (match) {
      rgbList = match[1].split(',');
      if (rgbList.length === 3) {
        rgbList.push(1);
      } else if (rgbList.length === 4) {
        var n = rgbList[3].split('.');

        if (n.length === 2) {
          rgbList[3] = '0.' + n[1];
        }
      }
    }
  }
  if (transparent) {
    rgbList[3] = 0;
  }
  return rgbList;
};

var gamma = 2.2;

var normalize = function normalize(channel) {
  return Math.pow(channel / 255, gamma);
};

var gradientColors = function gradientColors(start, end, percentage) {
  if (start === end) {
    return start;
  }
  var j = void 0;
  var so = [];

  var startColorList = start === 'transparent' ? parseColor(end, true) : parseColor(start);
  var endColorList = end === 'transparent' ? parseColor(start, true) : parseColor(end);
  var startOpacity = startColorList.pop();
  var endOpacity = endColorList.pop();

  startColorList = startColorList.map(normalize);
  endColorList = endColorList.map(normalize);

  for (j = 0; j < 3; j++) {
    so[j] = Math.round(Math.pow(startColorList[j] * (100 - percentage) / 100 + endColorList[j] * percentage / 100, 1 / gamma) * 255);
  }
  so[3] = ((endOpacity - startOpacity) / 100 * percentage + parseFloat(startOpacity)).toFixed(2);
  return 'rgba(' + so.join(',') + ')';
};

exports.default = gradientColors;
module.exports = exports['default'];

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tkGradients = exports.install = exports.default = undefined;

var _tkGradientsBar = __webpack_require__(10);

var _tkGradientsBar2 = _interopRequireDefault(_tkGradientsBar);

var _utils = __webpack_require__(2);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var install = function install(Vue) {
  Vue.component('tk-gradients-bar', Vue.extend(_tkGradientsBar2.default));
};

exports.default = _tkGradientsBar2.default;
exports.install = install;
exports.tkGradients = _utils2.default;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(11)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(12),
  /* template */
  __webpack_require__(13),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)
Component.options.__file = "E:\\workspace2\\vue-ht\\src\\components\\tkGradientsBar\\tkGradientsBar.vue"
if (Component.esModule && Object.keys(Component.esModule).some((function (key) {return key !== "default" && key.substr(0, 2) !== "__"}))) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] tkGradientsBar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aee55a42", Component.options)
  } else {
    hotAPI.reload("data-v-aee55a42", Component.options)
  }
  module.hot.dispose((function (data) {
    disposed = true
  }))
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(2);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'tkGradientsBar',
  data: function data() {
    return {
      styleColor: null,
      percentage: 0,
      bindContainer: null
    };
  },

  computed: {
    color: function color() {
      var startColor = this.startColor ? this.startColor : this.styleColor;

      if (this.percentage === 0) {
        return startColor;
      } else if (this.percentage === 100) {
        return this.endColor;
      }
      return (0, _utils2.default)(startColor, this.endColor, this.percentage);
    },
    style: function style() {
      return {
        'background-color': this.color
      };
    }
  },
  watch: {
    container: function container() {
      this.bind();
    }
  },
  mounted: function mounted() {
    if (this.styleColor === null) {
      this.styleColor = this.$el.style.backgroundColor;
    }
    this.bind();
  },
  activated: function activated() {
    this.bind();
  },
  deactivated: function deactivated() {
    this.unbind();
  },
  beforeDestroy: function beforeDestroy() {
    this.unbind();
  },
  methods: {
    bind: function bind() {
      if (this.bindContainer) {
        this.unbind();
      }
      this.bindContainer = this.container ? this.container : this.$el.parentNode;
      this.bindContainer.addEventListener('scroll', this.scrollHandler, false);
      this.scrollHandler();
    },
    unbind: function unbind() {
      if (this.bindContainer) {
        this.bindContainer.removeEventListener('scroll', this.scrollHandler);
        this.bindContainer = null;
      }
    },
    scrollHandler: function scrollHandler(e) {
      var scrollTop = e.target === window ? window.pageYOffset : e.target.scrollTop;

      if (scrollTop <= this.start) {
        this.percentage = 0;
      } else if (scrollTop >= this.end) {
        this.percentage = 100;
      } else {
        this.percentage = Math.ceil((scrollTop - this.start) / (this.end - this.start) * 100);
      }
      var opt = {
        percentage: this.percentage,
        start: this.start,
        end: this.end,
        scrollTop: scrollTop,
        color: this.color
      };

      this.$emit('gradients', opt);
    }
  },
  props: {
    start: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      required: true
    },
    startColor: String,
    endColor: {
      type: String,
      default: 'transparent'
    },
    container: null
  }
}; //
//
//
//
//
//

module.exports = exports['default'];

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "bar",
    staticClass: "tk-gradients-header",
    style: (_vm.style)
  }, [_vm._t("default")], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-aee55a42", module.exports)
  }
}

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/***/ ((function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(9);


/***/ }))
/******/ ]);
}));