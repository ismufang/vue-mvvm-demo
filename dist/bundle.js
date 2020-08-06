/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/compile.js":
/*!************************!*\
  !*** ./src/compile.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Compile; });\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watcher */ \"./src/watcher.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Compile = /*#__PURE__*/function () {\n  function Compile(vm) {\n    _classCallCheck(this, Compile);\n\n    this.el = vm.$el;\n    this.vm = vm;\n    this.compile(this.el);\n  }\n\n  _createClass(Compile, [{\n    key: \"compile\",\n    value: function compile(el) {\n      var _this = this;\n\n      var childNodes = el.childNodes;\n      Array.from(childNodes).forEach(function (node) {\n        // 处理文本节点\n        if (_this.isTextNode(node)) {\n          _this.compileText(node);\n        } else if (_this.isElementNode(node)) {\n          // 处理元素节点\n          _this.compileElement(node);\n        } // 判断node节点，是否有子节点，如果有子节点，要递归调用compile\n\n\n        if (node.childNodes && node.childNodes.length) {\n          _this.compile(node);\n        }\n      });\n    } // 编译元素节点，处理指令\n\n  }, {\n    key: \"compileElement\",\n    value: function compileElement(node) {\n      var _this2 = this;\n\n      // console.log(node.attributes)\n      // 遍历所有的属性节点\n      Array.from(node.attributes).forEach(function (attr) {\n        // 判断是否是指令\n        var attrName = attr.name;\n\n        if (_this2.isDirective(attrName)) {\n          // v-text --> text\n          attrName = attrName.substr(2);\n          var key = attr.value;\n\n          _this2.update(node, key, attrName);\n        }\n      });\n    } // 编译文本节点，处理差值表达式\n\n  }, {\n    key: \"compileText\",\n    value: function compileText(node) {\n      // console.dir(node)\n      // {{  msg }}\n      var reg = /\\{\\{(.+?)\\}\\}/;\n      var value = node.textContent;\n\n      if (reg.test(value)) {\n        var key = RegExp.$1.trim();\n        node.textContent = value.replace(reg, this.vm[key]); // 创建watcher对象，当数据改变更新视图\n\n        new _watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.vm, key, function (newValue) {\n          node.textContent = newValue;\n        });\n      }\n    }\n  }, {\n    key: \"update\",\n    value: function update(node, key, attrName) {\n      var updateFn = this[attrName + 'Updater'];\n      updateFn && updateFn.call(this, node, this.vm[key], key);\n    } // 处理 v-text 指令\n\n  }, {\n    key: \"textUpdater\",\n    value: function textUpdater(node, value, key) {\n      node.textContent = value;\n      new _watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.vm, key, function (newValue) {\n        node.textContent = newValue;\n      });\n    } // v-model\n\n  }, {\n    key: \"modelUpdater\",\n    value: function modelUpdater(node, value, key) {\n      var _this3 = this;\n\n      node.value = value;\n      new _watcher__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.vm, key, function (newValue) {\n        node.value = newValue;\n      }); // 双向绑定\n\n      node.addEventListener('input', function () {\n        _this3.vm[key] = node.value;\n      });\n    } // 判断元素属性是否是指令\n\n  }, {\n    key: \"isDirective\",\n    value: function isDirective(attrName) {\n      return attrName.startsWith('v-');\n    } // 判断节点是否是文本节点\n\n  }, {\n    key: \"isTextNode\",\n    value: function isTextNode(node) {\n      return node.nodeType === 3;\n    } // 判断节点是否是元素节点\n\n  }, {\n    key: \"isElementNode\",\n    value: function isElementNode(node) {\n      return node.nodeType === 1;\n    }\n  }]);\n\n  return Compile;\n}();\n\n\n\n//# sourceURL=webpack:///./src/compile.js?");

/***/ }),

/***/ "./src/dep.js":
/*!********************!*\
  !*** ./src/dep.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Dep; });\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Dep = /*#__PURE__*/function () {\n  function Dep() {\n    _classCallCheck(this, Dep);\n\n    // 收集订阅者\n    this.subs = [];\n  }\n\n  _createClass(Dep, [{\n    key: \"addSub\",\n    value: function addSub(sub) {\n      this.subs.push(sub);\n    }\n  }, {\n    key: \"notify\",\n    value: function notify() {\n      this.subs.forEach(function (sub) {\n        sub.update();\n      });\n    }\n  }]);\n\n  return Dep;\n}(); // target指watcher实例（绑定订阅者回调更新函数），当target有值，会添加到订阅器中\n// observer数据更新时，dep会调用notify函数\n// 通知所有绑定订阅者，执行update回调函数\n\n\n\nDep.target = null;\n\n//# sourceURL=webpack:///./src/dep.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _mvvm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mvvm */ \"./src/mvvm.js\");\n// console.log('index.js')\n// // let name = 'index'\n// window.onload = function(){\n//     const app = document.getElementById('app')\n//     app.innerHTML = 'hello'\n// }\n\nwindow.MVVM = _mvvm__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/mvvm.js":
/*!*********************!*\
  !*** ./src/mvvm.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MVVM; });\n/* harmony import */ var _observer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./observer */ \"./src/observer.js\");\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watcher */ \"./src/watcher.js\");\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dep */ \"./src/dep.js\");\n/* harmony import */ var _compile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./compile */ \"./src/compile.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\n\n\n\nvar MVVM = /*#__PURE__*/function () {\n  function MVVM(options) {\n    var _this = this;\n\n    _classCallCheck(this, MVVM);\n\n    this.$options = options;\n    this.$data = options.data;\n    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;\n    this.proxyKeys(this.$data); // Object.keys(this.$data).forEach(key=>{\n    //     this.proxyKeys(key)\n    // })\n\n    if (options.methods && Object.keys(options.methods).length) {\n      Object.keys(options.methods).forEach(function (item) {\n        _this[item] = options.methods[item];\n      });\n    }\n\n    new _observer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.$data);\n    new _compile__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this);\n  } // 把data数据绑定到this上\n\n\n  _createClass(MVVM, [{\n    key: \"proxyKeys\",\n    value: function proxyKeys(data) {\n      var _this2 = this;\n\n      Object.keys(data).forEach(function (key) {\n        Object.defineProperty(_this2, key, {\n          configurable: true,\n          enumerable: true,\n          get: function get() {\n            return this.$data[key];\n          },\n          set: function set(value) {\n            this.$data[key] = value;\n          }\n        });\n      }); // const data = new Proxy(this.$data, {\n      //     get(target, key){\n      //         Reflect(target, key)\n      //     },\n      //     set(target, key, value){\n      //         Reflect(target, key, value)\n      //     }\n      // })\n    }\n  }]);\n\n  return MVVM;\n}();\n\n\n\n//# sourceURL=webpack:///./src/mvvm.js?");

/***/ }),

/***/ "./src/observer.js":
/*!*************************!*\
  !*** ./src/observer.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Observer; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/dep.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Observer = /*#__PURE__*/function () {\n  function Observer(data) {\n    _classCallCheck(this, Observer);\n\n    this.data = data;\n    this.walk(this.data);\n  }\n\n  _createClass(Observer, [{\n    key: \"walk\",\n    value: function walk(data) {\n      var _this = this;\n\n      if (!data || _typeof(data) !== 'object') return;\n      Object.keys(data).forEach(function (key) {\n        // 传入value 深层响应，避免死循环\n        _this.defineReactive(data, key, data[key]);\n      }, this);\n    }\n  }, {\n    key: \"defineReactive\",\n    value: function defineReactive(data, key, value) {\n      // 每个属性上都有一个dep订阅器，复制收集订阅者，发送通知\n      var dep = new _dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"](); // 如果value是对象，把value内部属性转换为响应式数据\n\n      var chilrenObj = this.walk(value);\n      Object.defineProperty(data, key, {\n        enumerable: true,\n        configurable: true,\n        get: function get() {\n          // 收集依赖 订阅者\n          _dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target && dep.addSub(_dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target);\n          return value;\n        },\n        set: function set(newVal) {\n          if (newVal === value) return;\n          value = newVal; // 更新通知订阅者\n\n          dep.notify();\n        }\n      });\n    }\n  }]);\n\n  return Observer;\n}();\n\n\n\n//# sourceURL=webpack:///./src/observer.js?");

/***/ }),

/***/ "./src/watcher.js":
/*!************************!*\
  !*** ./src/watcher.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Watcher; });\n/* harmony import */ var _dep__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dep */ \"./src/dep.js\");\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\n\n\nvar Watcher = /*#__PURE__*/function () {\n  function Watcher(vm, key, cb) {\n    _classCallCheck(this, Watcher);\n\n    this.vm = vm;\n    this.key = key;\n    this.cb = cb;\n    this.value = this.get(); // 把自己添加到订阅器中\n  }\n\n  _createClass(Watcher, [{\n    key: \"get\",\n    value: function get() {\n      _dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = this; // 强制执行get方法，把自己添加到订阅器中\n\n      var value = this.vm[this.key];\n      _dep__WEBPACK_IMPORTED_MODULE_0__[\"default\"].target = null; // 释放自己\n\n      return value;\n    }\n  }, {\n    key: \"update\",\n    value: function update() {\n      this.value = this.vm[this.key];\n      this.cb.call(this.vm, this.value);\n    }\n  }]);\n\n  return Watcher;\n}();\n\n\n\n//# sourceURL=webpack:///./src/watcher.js?");

/***/ })

/******/ });