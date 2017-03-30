(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _desc, _value, _class; /*!
	                            *
	                            * Flxr.js
	                            *
	                            * @author: samsmo
	                            *
	                            *
	                            */


	var _coreDecorators = __webpack_require__(1);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
	  var desc = {};
	  Object['ke' + 'ys'](descriptor).forEach(function (key) {
	    desc[key] = descriptor[key];
	  });
	  desc.enumerable = !!desc.enumerable;
	  desc.configurable = !!desc.configurable;

	  if ('value' in desc || desc.initializer) {
	    desc.writable = true;
	  }

	  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
	    return decorator(target, property, desc) || desc;
	  }, desc);

	  if (context && desc.initializer !== void 0) {
	    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
	    desc.initializer = undefined;
	  }

	  if (desc.initializer === void 0) {
	    Object['define' + 'Property'](target, property, desc);
	    desc = null;
	  }

	  return desc;
	}

	var defaultOpts = {
	  accel: { x: -0.001, y: -0.01 },
	  vMax: { x: 80, y: 80 },
	  vMin: { x: -80, y: -80 },
	  drag: { x: 0.95, y: 0.85 },
	  axis: { x: true, y: true }
	};

	var defaults = {
	  _isMoving: false,
	  _draggedTime: 0,
	  _startTime: 0,
	  _startPos: null,
	  _startOffset: 0
	};

	var opts = Object.assign({}, defaultOpts);

	// Updateable vectors only.
	var vectors = {
	  loc: { x: 0, y: 0 },
	  velocity: { x: 0, y: 0 }
	};

	function clamp(min, max, number) {
	  return Math.max(min, Math.min(number, max));
	}

	var Flixr = (_class = function () {
	  function Flixr(el, container, options) {
	    _classCallCheck(this, Flixr);

	    this._velocity = vectors.velocity;
	    this._loc = vectors.loc;

	    this._opts = Object.assign(opts, options);
	    this._el = el;
	    this._container = container;

	    this._setDefaults();
	    this._bindEvents();
	    this._init();
	  }

	  _createClass(Flixr, [{
	    key: '_init',
	    value: function _init() {
	      window.requestAnimationFrame(this._loop);
	    }
	  }, {
	    key: '_setDefaults',
	    value: function _setDefaults() {
	      Object.assign(this, defaults);
	    }
	  }, {
	    key: '_bindEvents',
	    value: function _bindEvents() {
	      this._el.addEventListener('mousedown', this._startDrag);
	      this._el.addEventListener('mouseup', this._stopDrag);
	      this._container.addEventListener('mouseout', this._killDrag);
	      this._container.addEventListener('mousemove', this._handleDrag);
	    }
	  }, {
	    key: '_startDrag',
	    value: function _startDrag(e) {
	      e.preventDefault();
	      this._setDefaults();
	      this._isMoving = true;
	    }
	  }, {
	    key: '_handleDrag',
	    value: function _handleDrag(e) {
	      if (this._isMoving) {
	        var clientX = e.clientX,
	            clientY = e.clientY;

	        if (!this._startPos) {
	          var rect = this._el.getBoundingClientRect();
	          var x = clientX - rect.left;
	          var y = clientY - rect.top;
	          this._startOffset = { x: x, y: y };
	          this._startPos = { x: clientX, y: clientY };
	        }

	        this._loc.x += clientX - this._startOffset.x - this._loc.x;
	        this._loc.y += clientY - this._startOffset.y - this._loc.y;
	      }
	    }
	  }, {
	    key: '_stopDrag',
	    value: function _stopDrag(e) {
	      if (!this._startPos) {
	        return;
	      }

	      var time = (this._draggedTime - this._startTime) / 15;
	      var xDistance = e.clientX - this._startPos.x;
	      var yDistance = e.clientY - this._startPos.y;

	      this._velocity.x = xDistance / time;
	      this._velocity.y = yDistance / time;

	      this._killDrag();
	    }
	  }, {
	    key: '_killDrag',
	    value: function _killDrag() {
	      this._isMoving = false;
	    }
	  }, {
	    key: '_loop',
	    value: function _loop(timestamp) {
	      if ((this._velocity.x !== 0 || this._velocity.y !== 0) && !this._isMoving) {
	        var elementRect = this._el.getBoundingClientRect();
	        var containerRect = this._container.getBoundingClientRect();
	        var width = elementRect.width;
	        var rightBound = containerRect.width - width;
	        var leftBound = containerRect.left;
	        this._velocity.x = clamp(this._opts.vMin.x, this._opts.vMax.x, (this._velocity.x + this._opts.accel.x) * this._opts.drag.x);
	        this._velocity.y = clamp(this._opts.vMin.y, this._opts.vMax.y, (this._velocity.y + this._opts.accel.y) * this._opts.drag.y);
	        if (this._opts.axis.x) this._loc.x += this._velocity.x;
	        if (this._opts.axis.y) this._loc.y += this._velocity.y;

	        if (this._loc.x >= rightBound) {
	          this._velocity.x = 0;
	          this._loc.x = rightBound;
	        } else if (this._loc.x <= leftBound) {
	          this._velocity.x = 0;
	          this._loc.x = leftBound;
	        } else if (this._velocity.x < 0.1 && this._velocity.x > -0.1) {
	          this._velocity.x = 0;
	        }
	      }

	      this._el.style.transform = 'translate(' + this._loc.x + 'px, ' + this._loc.y + 'px)';

	      if (this._isMoving) {
	        if (!this._startTime) {
	          this._startTime = timestamp;
	        }
	        this._draggedTime = timestamp;
	      }

	      window.requestAnimationFrame(this._loop);
	    }
	  }]);

	  return Flixr;
	}(), (_applyDecoratedDescriptor(_class.prototype, '_startDrag', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_startDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_handleDrag', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_handleDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_stopDrag', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_stopDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_killDrag', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_killDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_loop', [_coreDecorators.autobind], Object.getOwnPropertyDescriptor(_class.prototype, '_loop'), _class.prototype)), _class);
	exports.default = Flixr;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * core-decorators.js
	 * (c) 2016 Jay Phelps and contributors
	 * MIT Licensed
	 * https://github.com/jayphelps/core-decorators.js
	 * @license
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _override = __webpack_require__(2);

	exports.override = _interopRequire(_override);

	var _deprecate = __webpack_require__(5);

	exports.deprecate = _interopRequire(_deprecate);
	exports.deprecated = _interopRequire(_deprecate);

	var _suppressWarnings = __webpack_require__(6);

	exports.suppressWarnings = _interopRequire(_suppressWarnings);

	var _memoize = __webpack_require__(7);

	exports.memoize = _interopRequire(_memoize);

	var _autobind = __webpack_require__(8);

	exports.autobind = _interopRequire(_autobind);

	var _readonly = __webpack_require__(9);

	exports.readonly = _interopRequire(_readonly);

	var _enumerable = __webpack_require__(10);

	exports.enumerable = _interopRequire(_enumerable);

	var _nonenumerable = __webpack_require__(11);

	exports.nonenumerable = _interopRequire(_nonenumerable);

	var _nonconfigurable = __webpack_require__(12);

	exports.nonconfigurable = _interopRequire(_nonconfigurable);

	var _debounce = __webpack_require__(13);

	exports.debounce = _interopRequire(_debounce);

	var _throttle = __webpack_require__(14);

	exports.throttle = _interopRequire(_throttle);

	var _decorate = __webpack_require__(15);

	exports.decorate = _interopRequire(_decorate);

	var _mixin = __webpack_require__(16);

	exports.mixin = _interopRequire(_mixin);
	exports.mixins = _interopRequire(_mixin);

	var _lazyInitialize = __webpack_require__(4);

	exports.lazyInitialize = _interopRequire(_lazyInitialize);

	var _time = __webpack_require__(17);

	exports.time = _interopRequire(_time);

	var _extendDescriptor = __webpack_require__(18);

	exports.extendDescriptor = _interopRequire(_extendDescriptor);

	// Helper to apply decorators to a class without transpiler support

	var _applyDecorators = __webpack_require__(19);

	exports.applyDecorators = _interopRequire(_applyDecorators);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	exports['default'] = override;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _privateUtils = __webpack_require__(3);

	var GENERIC_FUNCTION_ERROR = '{child} does not properly override {parent}';
	var FUNCTION_REGEXP = /^function ([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?(\([^\)]*\))[\s\S]+$/;

	var SyntaxErrorReporter = (function () {
	  _createClass(SyntaxErrorReporter, [{
	    key: '_getTopic',
	    value: function _getTopic(descriptor) {
	      if (descriptor === undefined) {
	        return null;
	      }

	      if ('value' in descriptor) {
	        return descriptor.value;
	      }

	      if ('get' in descriptor) {
	        return descriptor.get;
	      }

	      if ('set' in descriptor) {
	        return descriptor.set;
	      }
	    }
	  }, {
	    key: '_extractTopicSignature',
	    value: function _extractTopicSignature(topic) {
	      switch (typeof topic) {
	        case 'function':
	          return this._extractFunctionSignature(topic);
	        default:
	          return this.key;
	      }
	    }
	  }, {
	    key: '_extractFunctionSignature',
	    value: function _extractFunctionSignature(fn) {
	      var _this = this;

	      return fn.toString().replace(FUNCTION_REGEXP, function (match, name, params) {
	        if (name === undefined) name = _this.key;
	        return name + params;
	      });
	    }
	  }, {
	    key: 'key',
	    get: function get() {
	      return this.childDescriptor.key;
	    }
	  }, {
	    key: 'parentNotation',
	    get: function get() {
	      return this.parentKlass.constructor.name + '#' + this.parentPropertySignature;
	    }
	  }, {
	    key: 'childNotation',
	    get: function get() {
	      return this.childKlass.constructor.name + '#' + this.childPropertySignature;
	    }
	  }, {
	    key: 'parentTopic',
	    get: function get() {
	      return this._getTopic(this.parentDescriptor);
	    }
	  }, {
	    key: 'childTopic',
	    get: function get() {
	      return this._getTopic(this.childDescriptor);
	    }
	  }, {
	    key: 'parentPropertySignature',
	    get: function get() {
	      return this._extractTopicSignature(this.parentTopic);
	    }
	  }, {
	    key: 'childPropertySignature',
	    get: function get() {
	      return this._extractTopicSignature(this.childTopic);
	    }
	  }]);

	  function SyntaxErrorReporter(parentKlass, childKlass, parentDescriptor, childDescriptor) {
	    _classCallCheck(this, SyntaxErrorReporter);

	    this.parentKlass = parentKlass;
	    this.childKlass = childKlass;
	    this.parentDescriptor = parentDescriptor;
	    this.childDescriptor = childDescriptor;
	  }

	  _createClass(SyntaxErrorReporter, [{
	    key: 'assert',
	    value: function assert(condition) {
	      var msg = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];

	      if (condition !== true) {
	        this.error(GENERIC_FUNCTION_ERROR + msg);
	      }
	    }
	  }, {
	    key: 'error',
	    value: function error(msg) {
	      var _this2 = this;

	      msg = msg
	      // Replace lazily, because they actually might not
	      // be available in all cases
	      .replace('{parent}', function (m) {
	        return _this2.parentNotation;
	      }).replace('{child}', function (m) {
	        return _this2.childNotation;
	      });
	      throw new SyntaxError(msg);
	    }
	  }]);

	  return SyntaxErrorReporter;
	})();

	function getDescriptorType(descriptor) {
	  if (descriptor.hasOwnProperty('value')) {
	    return 'data';
	  }

	  if (descriptor.hasOwnProperty('get') || descriptor.hasOwnProperty('set')) {
	    return 'accessor';
	  }

	  // If none of them exist, browsers treat it as
	  // a data descriptor with a value of `undefined`
	  return 'data';
	}

	function checkFunctionSignatures(parent, child, reporter) {
	  reporter.assert(parent.length === child.length);
	}

	function checkDataDescriptors(parent, child, reporter) {
	  var parentValueType = typeof parent.value;
	  var childValueType = typeof child.value;

	  if (parentValueType === 'undefined' && childValueType === 'undefined') {
	    // class properties can be any expression, which isn't ran until the
	    // the instance is created, so we can't reliably get type information
	    // for them yet (per spec). Perhaps when Babel includes flow-type info
	    // in runtime? Tried regex solutions, but super hacky and only feasible
	    // on primitives, which is confusing for usage...
	    reporter.error('descriptor values are both undefined. (class properties are are not currently supported)\'');
	  }

	  if (parentValueType !== childValueType) {
	    var isFunctionOverUndefined = childValueType === 'function' && parentValueType === undefined;
	    // Even though we don't support class properties, this
	    // will still handle more than just functions, just in case.
	    // Shadowing an undefined value is an error if the inherited
	    // value was undefined (usually a class property, not a method)
	    if (isFunctionOverUndefined || parentValueType !== undefined) {
	      reporter.error('value types do not match. {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
	    }
	  }

	  // Switch, in preparation for supporting more types
	  switch (childValueType) {
	    case 'function':
	      checkFunctionSignatures(parent.value, child.value, reporter);
	      break;

	    default:
	      reporter.error('Unexpected error. Please file a bug with: {parent} is "' + parentValueType + '", {child} is "' + childValueType + '"');
	      break;
	  }
	}

	function checkAccessorDescriptors(parent, child, reporter) {
	  var parentHasGetter = typeof parent.get === 'function';
	  var childHasGetter = typeof child.get === 'function';
	  var parentHasSetter = typeof parent.set === 'function';
	  var childHasSetter = typeof child.set === 'function';

	  if (parentHasGetter || childHasGetter) {
	    if (!parentHasGetter && parentHasSetter) {
	      reporter.error('{parent} is setter but {child} is getter');
	    }

	    if (!childHasGetter && childHasSetter) {
	      reporter.error('{parent} is getter but {child} is setter');
	    }

	    checkFunctionSignatures(parent.get, child.get, reporter);
	  }

	  if (parentHasSetter || childHasSetter) {
	    if (!parentHasSetter && parentHasGetter) {
	      reporter.error('{parent} is getter but {child} is setter');
	    }

	    if (!childHasSetter && childHasGetter) {
	      reporter.error('{parent} is setter but {child} is getter');
	    }

	    checkFunctionSignatures(parent.set, child.set, reporter);
	  }
	}

	function checkDescriptors(parent, child, reporter) {
	  var parentType = getDescriptorType(parent);
	  var childType = getDescriptorType(child);

	  if (parentType !== childType) {
	    reporter.error('descriptor types do not match. {parent} is "' + parentType + '", {child} is "' + childType + '"');
	  }

	  switch (childType) {
	    case 'data':
	      checkDataDescriptors(parent, child, reporter);
	      break;

	    case 'accessor':
	      checkAccessorDescriptors(parent, child, reporter);
	      break;
	  }
	}

	var suggestionTransforms = [function (key) {
	  return key.toLowerCase();
	}, function (key) {
	  return key.toUpperCase();
	}, function (key) {
	  return key + 's';
	}, function (key) {
	  return key.slice(0, -1);
	}, function (key) {
	  return key.slice(1, key.length);
	}];

	function findPossibleAlternatives(superKlass, key) {
	  for (var i = 0, l = suggestionTransforms.length; i < l; i++) {
	    var fn = suggestionTransforms[i];
	    var suggestion = fn(key);

	    if (suggestion in superKlass) {
	      return suggestion;
	    }
	  }

	  return null;
	}

	function handleDescriptor(target, key, descriptor) {
	  descriptor.key = key;
	  var superKlass = Object.getPrototypeOf(target);
	  var superDescriptor = Object.getOwnPropertyDescriptor(superKlass, key);
	  var reporter = new SyntaxErrorReporter(superKlass, target, superDescriptor, descriptor);

	  if (superDescriptor === undefined) {
	    var suggestedKey = findPossibleAlternatives(superKlass, key);
	    var suggestion = suggestedKey ? '\n\n  Did you mean "' + suggestedKey + '"?' : '';
	    reporter.error('No descriptor matching {child} was found on the prototype chain.' + suggestion);
	  }

	  checkDescriptors(superDescriptor, descriptor, reporter);

	  return descriptor;
	}

	function override() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var _slice = Array.prototype.slice;

	var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

	exports.isDescriptor = isDescriptor;
	exports.decorate = decorate;
	exports.metaFor = metaFor;
	exports.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
	exports.createDefaultSetter = createDefaultSetter;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

	var _lazyInitialize = __webpack_require__(4);

	var _lazyInitialize2 = _interopRequireDefault(_lazyInitialize);

	var defineProperty = Object.defineProperty;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
	var getOwnPropertyNames = Object.getOwnPropertyNames;
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;

	function isDescriptor(desc) {
	  if (!desc || !desc.hasOwnProperty) {
	    return false;
	  }

	  var keys = ['value', 'initializer', 'get', 'set'];

	  for (var i = 0, l = keys.length; i < l; i++) {
	    if (desc.hasOwnProperty(keys[i])) {
	      return true;
	    }
	  }

	  return false;
	}

	function decorate(handleDescriptor, entryArgs) {
	  if (isDescriptor(entryArgs[entryArgs.length - 1])) {
	    return handleDescriptor.apply(undefined, _toConsumableArray(entryArgs).concat([[]]));
	  } else {
	    return function () {
	      return handleDescriptor.apply(undefined, _slice.call(arguments).concat([entryArgs]));
	    };
	  }
	}

	var Meta = (function () {
	  var _instanceInitializers = {};

	  function Meta() {
	    _classCallCheck(this, Meta);

	    _defineDecoratedPropertyDescriptor(this, 'debounceTimeoutIds', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttleTimeoutIds', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttlePreviousTimestamps', _instanceInitializers);

	    _defineDecoratedPropertyDescriptor(this, 'throttleTrailingArgs', _instanceInitializers);
	  }

	  _createDecoratedClass(Meta, [{
	    key: 'debounceTimeoutIds',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttleTimeoutIds',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttlePreviousTimestamps',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return {};
	    },
	    enumerable: true
	  }, {
	    key: 'throttleTrailingArgs',
	    decorators: [_lazyInitialize2['default']],
	    initializer: function initializer() {
	      return null;
	    },
	    enumerable: true
	  }], null, _instanceInitializers);

	  return Meta;
	})();

	var META_KEY = typeof Symbol === 'function' ? Symbol('__core_decorators__') : '__core_decorators__';

	function metaFor(obj) {
	  if (obj.hasOwnProperty(META_KEY) === false) {
	    defineProperty(obj, META_KEY, {
	      // Defaults: NOT enumerable, configurable, or writable
	      value: new Meta()
	    });
	  }

	  return obj[META_KEY];
	}

	var getOwnKeys = getOwnPropertySymbols ? function (object) {
	  return getOwnPropertyNames(object).concat(getOwnPropertySymbols(object));
	} : getOwnPropertyNames;

	exports.getOwnKeys = getOwnKeys;

	function getOwnPropertyDescriptors(obj) {
	  var descs = {};

	  getOwnKeys(obj).forEach(function (key) {
	    return descs[key] = getOwnPropertyDescriptor(obj, key);
	  });

	  return descs;
	}

	function createDefaultSetter(key) {
	  return function set(newValue) {
	    Object.defineProperty(this, key, {
	      configurable: true,
	      writable: true,
	      // IS enumerable when reassigned by the outside word
	      enumerable: true,
	      value: newValue
	    });

	    return newValue;
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = lazyInitialize;

	var _privateUtils = __webpack_require__(3);

	var defineProperty = Object.defineProperty;

	function handleDescriptor(target, key, descriptor) {
	  var configurable = descriptor.configurable;
	  var enumerable = descriptor.enumerable;
	  var initializer = descriptor.initializer;
	  var value = descriptor.value;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,

	    get: function get() {
	      // This happens if someone accesses the
	      // property directly on the prototype
	      if (this === target) {
	        return;
	      }

	      var ret = initializer ? initializer.call(this) : value;

	      defineProperty(this, key, {
	        configurable: configurable,
	        enumerable: enumerable,
	        writable: true,
	        value: ret
	      });

	      return ret;
	    },

	    set: (0, _privateUtils.createDefaultSetter)(key)
	  };
	}

	function lazyInitialize() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = deprecate;

	var _privateUtils = __webpack_require__(3);

	var DEFAULT_MSG = 'This function will be removed in future versions.';

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var msg = _ref2$0 === undefined ? DEFAULT_MSG : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var options = _ref2$1 === undefined ? {} : _ref2$1;

	  if (typeof descriptor.value !== 'function') {
	    throw new SyntaxError('Only functions can be marked as deprecated');
	  }

	  var methodSignature = target.constructor.name + '#' + key;

	  if (options.url) {
	    msg += '\n\n    See ' + options.url + ' for more details.\n\n';
	  }

	  return _extends({}, descriptor, {
	    value: function deprecationWrapper() {
	      console.warn('DEPRECATION ' + methodSignature + ': ' + msg);
	      return descriptor.value.apply(this, arguments);
	    }
	  });
	}

	function deprecate() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = suppressWarnings;

	var _privateUtils = __webpack_require__(3);

	function suppressedWarningNoop() {
	  // Warnings are currently suppressed via @suppressWarnings
	}

	function applyWithoutWarnings(context, fn, args) {
	  if (typeof console === 'object') {
	    var nativeWarn = console.warn;
	    console.warn = suppressedWarningNoop;
	    var ret = fn.apply(context, args);
	    console.warn = nativeWarn;
	    return ret;
	  } else {
	    return fn.apply(context, args);
	  }
	}

	function handleDescriptor(target, key, descriptor) {
	  return _extends({}, descriptor, {
	    value: function suppressWarningsWrapper() {
	      return applyWithoutWarnings(this, descriptor.value, arguments);
	    }
	  });
	}

	function suppressWarnings() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = memoize;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var _privateUtils = __webpack_require__(3);

	function toObject(cache, value) {
	  if (value === Object(value)) {
	    return value;
	  }
	  return cache[value] || (cache[value] = {});
	}

	function applyAndCache(context, fn, args, cache, signature) {
	  var ret = fn.apply(context, args);
	  cache[signature] = ret;
	  return ret;
	}

	function metaForDescriptor(descriptor) {
	  var fn = undefined,
	      wrapKey = undefined;

	  // This is ugly code, but way faster than other
	  // ways I tried that *looked* pretty

	  if (descriptor.value) {
	    fn = descriptor.value;
	    wrapKey = 'value';
	  } else if (descriptor.get) {
	    fn = descriptor.get;
	    wrapKey = 'get';
	  } else if (descriptor.set) {
	    fn = descriptor.set;
	    wrapKey = 'set';
	  }

	  return { fn: fn, wrapKey: wrapKey };
	}

	function handleDescriptor(target, key, descriptor) {
	  console.warn('DEPRECATION: @memoize is deprecated and will be removed shortly. Use @decorate with lodash\'s memoize helper.\n\n  https://github.com/jayphelps/core-decorators.js#decorate');

	  var _metaForDescriptor = metaForDescriptor(descriptor);

	  var fn = _metaForDescriptor.fn;
	  var wrapKey = _metaForDescriptor.wrapKey;

	  var argumentCache = new WeakMap();
	  var signatureCache = Object.create(null);
	  var primativeRefCache = Object.create(null);
	  var argumentIdCounter = 0;

	  return _extends({}, descriptor, _defineProperty({}, wrapKey, function memoizeWrapper() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    var signature = '0';

	    for (var i = 0, l = args.length; i < l; i++) {
	      var arg = args[i];
	      var argRef = toObject(primativeRefCache, arg);
	      var argKey = argumentCache.get(argRef);

	      if (argKey === undefined) {
	        argKey = ++argumentIdCounter;
	        argumentCache.set(argRef, argKey);
	      }

	      signature += argKey;
	    }

	    return signatureCache[signature] || applyAndCache(this, fn, arguments, signatureCache, signature);
	  }));
	}

	function memoize() {
	  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    args[_key2] = arguments[_key2];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = autobind;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	var _privateUtils = __webpack_require__(3);

	var defineProperty = Object.defineProperty;
	var getPrototypeOf = Object.getPrototypeOf;

	function bind(fn, context) {
	  if (fn.bind) {
	    return fn.bind(context);
	  } else {
	    return function __autobind__() {
	      return fn.apply(context, arguments);
	    };
	  }
	}

	var mapStore = undefined;

	function getBoundSuper(obj, fn) {
	  if (typeof WeakMap === 'undefined') {
	    throw new Error('Using @autobind on ' + fn.name + '() requires WeakMap support due to its use of super.' + fn.name + '()\n      See https://github.com/jayphelps/core-decorators.js/issues/20');
	  }

	  if (!mapStore) {
	    mapStore = new WeakMap();
	  }

	  if (mapStore.has(obj) === false) {
	    mapStore.set(obj, new WeakMap());
	  }

	  var superStore = mapStore.get(obj);

	  if (superStore.has(fn) === false) {
	    superStore.set(fn, bind(fn, obj));
	  }

	  return superStore.get(fn);
	}

	function autobindClass(klass) {
	  var descs = (0, _privateUtils.getOwnPropertyDescriptors)(klass.prototype);
	  var keys = (0, _privateUtils.getOwnKeys)(descs);

	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    var desc = descs[key];

	    if (typeof desc.value !== 'function' || key === 'constructor') {
	      continue;
	    }

	    defineProperty(klass.prototype, key, autobindMethod(klass.prototype, key, desc));
	  }
	}

	function autobindMethod(target, key, _ref) {
	  var fn = _ref.value;
	  var configurable = _ref.configurable;
	  var enumerable = _ref.enumerable;

	  if (typeof fn !== 'function') {
	    throw new SyntaxError('@autobind can only be used on functions, not: ' + fn);
	  }

	  var constructor = target.constructor;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,

	    get: function get() {
	      // Class.prototype.key lookup
	      // Someone accesses the property directly on the prototype on which it is
	      // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
	      if (this === target) {
	        return fn;
	      }

	      // Class.prototype.key lookup
	      // Someone accesses the property directly on a prototype but it was found
	      // up the chain, not defined directly on it
	      // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
	      if (this.constructor !== constructor && getPrototypeOf(this).constructor === constructor) {
	        return fn;
	      }

	      // Autobound method calling super.sameMethod() which is also autobound and so on.
	      if (this.constructor !== constructor && key in this.constructor.prototype) {
	        return getBoundSuper(this, fn);
	      }

	      var boundFn = bind(fn, this);

	      defineProperty(this, key, {
	        configurable: true,
	        writable: true,
	        // NOT enumerable when it's a bound method
	        enumerable: false,
	        value: boundFn
	      });

	      return boundFn;
	    },
	    set: (0, _privateUtils.createDefaultSetter)(key)
	  };
	}

	function handle(args) {
	  if (args.length === 1) {
	    return autobindClass.apply(undefined, _toConsumableArray(args));
	  } else {
	    return autobindMethod.apply(undefined, _toConsumableArray(args));
	  }
	}

	function autobind() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  if (args.length === 0) {
	    return function () {
	      return handle(arguments);
	    };
	  } else {
	    return handle(args);
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = readonly;

	var _privateUtils = __webpack_require__(3);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.writable = false;
	  return descriptor;
	}

	function readonly() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = enumerable;

	var _privateUtils = __webpack_require__(3);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.enumerable = true;
	  return descriptor;
	}

	function enumerable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = nonenumerable;

	var _privateUtils = __webpack_require__(3);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.enumerable = false;
	  return descriptor;
	}

	function nonenumerable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = nonconfigurable;

	var _privateUtils = __webpack_require__(3);

	function handleDescriptor(target, key, descriptor) {
	  descriptor.configurable = false;
	  return descriptor;
	}

	function nonconfigurable() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = debounce;

	var _privateUtils = __webpack_require__(3);

	var DEFAULT_TIMEOUT = 300;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var wait = _ref2$0 === undefined ? DEFAULT_TIMEOUT : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var immediate = _ref2$1 === undefined ? false : _ref2$1;

	  var callback = descriptor.value;

	  if (typeof callback !== 'function') {
	    throw new SyntaxError('Only functions can be debounced');
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var _this = this;

	      var _metaFor = (0, _privateUtils.metaFor)(this);

	      var debounceTimeoutIds = _metaFor.debounceTimeoutIds;

	      var timeout = debounceTimeoutIds[key];
	      var callNow = immediate && !timeout;
	      var args = arguments;

	      clearTimeout(timeout);

	      debounceTimeoutIds[key] = setTimeout(function () {
	        delete debounceTimeoutIds[key];
	        if (!immediate) {
	          callback.apply(_this, args);
	        }
	      }, wait);

	      if (callNow) {
	        callback.apply(this, args);
	      }
	    }
	  });
	}

	function debounce() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = throttle;

	var _privateUtils = __webpack_require__(3);

	var DEFAULT_TIMEOUT = 300;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var wait = _ref2$0 === undefined ? DEFAULT_TIMEOUT : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var options = _ref2$1 === undefined ? {} : _ref2$1;

	  var callback = descriptor.value;

	  if (typeof callback !== 'function') {
	    throw new SyntaxError('Only functions can be throttled');
	  }

	  if (options.leading !== false) {
	    options.leading = true;
	  }

	  if (options.trailing !== false) {
	    options.trailing = true;
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var _this = this;

	      var meta = (0, _privateUtils.metaFor)(this);
	      var throttleTimeoutIds = meta.throttleTimeoutIds;
	      var throttlePreviousTimestamps = meta.throttlePreviousTimestamps;

	      var timeout = throttleTimeoutIds[key];
	      // last execute timestamp
	      var previous = throttlePreviousTimestamps[key] || 0;
	      var now = Date.now();

	      if (options.trailing) {
	        meta.throttleTrailingArgs = arguments;
	      }

	      // if first be called and disable the execution on the leading edge
	      // set last execute timestamp to now
	      if (!previous && options.leading === false) {
	        previous = now;
	      }

	      var remaining = wait - (now - previous);

	      if (remaining <= 0) {
	        clearTimeout(timeout);
	        delete throttleTimeoutIds[key];
	        throttlePreviousTimestamps[key] = now;
	        callback.apply(this, arguments);
	      } else if (!timeout && options.trailing) {
	        throttleTimeoutIds[key] = setTimeout(function () {
	          throttlePreviousTimestamps[key] = options.leading === false ? 0 : Date.now();
	          delete throttleTimeoutIds[key];
	          callback.apply(_this, meta.throttleTrailingArgs);
	          // don't leak memory!
	          meta.throttleTrailingArgs = null;
	        }, remaining);
	      }
	    }
	  });
	}

	function throttle() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = decorate;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

	var _privateUtils = __webpack_require__(3);

	var defineProperty = Object.defineProperty;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _toArray(_ref);

	  var decorator = _ref2[0];

	  var args = _ref2.slice(1);

	  var configurable = descriptor.configurable;
	  var enumerable = descriptor.enumerable;
	  var writable = descriptor.writable;

	  var originalGet = descriptor.get;
	  var originalSet = descriptor.set;
	  var originalValue = descriptor.value;
	  var isGetter = !!originalGet;

	  return {
	    configurable: configurable,
	    enumerable: enumerable,
	    get: function get() {
	      var fn = isGetter ? originalGet.call(this) : originalValue;
	      var value = decorator.call.apply(decorator, [this, fn].concat(_toConsumableArray(args)));

	      if (isGetter) {
	        return value;
	      } else {
	        var desc = {
	          configurable: configurable,
	          enumerable: enumerable
	        };

	        desc.value = value;
	        desc.writable = writable;

	        defineProperty(this, key, desc);

	        return value;
	      }
	    },
	    set: isGetter ? originalSet : (0, _privateUtils.createDefaultSetter)()
	  };
	}

	function decorate() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	exports['default'] = mixin;

	var _privateUtils = __webpack_require__(3);

	var defineProperty = Object.defineProperty;
	var getPrototypeOf = Object.getPrototypeOf;

	function buggySymbol(symbol) {
	  return Object.prototype.toString.call(symbol) === '[object Symbol]' && typeof symbol === 'object';
	}

	function hasProperty(prop, obj) {
	  // We have to traverse manually prototypes' chain for polyfilled ES6 Symbols
	  // like "in" operator does.
	  // I.e.: Babel 5 Symbol polyfill stores every created symbol in Object.prototype.
	  // That's why we cannot use construction like "prop in obj" to check, if needed
	  // prop actually exists in given object/prototypes' chain.
	  if (buggySymbol(prop)) {
	    do {
	      if (obj === Object.prototype) {
	        // Polyfill assigns undefined as value for stored symbol key.
	        // We can assume in this special case if there is nothing assigned it doesn't exist.
	        return typeof obj[prop] !== 'undefined';
	      }
	      if (obj.hasOwnProperty(prop)) {
	        return true;
	      }
	    } while (obj = getPrototypeOf(obj));
	    return false;
	  } else {
	    return prop in obj;
	  }
	}

	function handleClass(target, mixins) {
	  if (!mixins.length) {
	    throw new SyntaxError('@mixin() class ' + target.name + ' requires at least one mixin as an argument');
	  }

	  for (var i = 0, l = mixins.length; i < l; i++) {
	    var descs = (0, _privateUtils.getOwnPropertyDescriptors)(mixins[i]);
	    var keys = (0, _privateUtils.getOwnKeys)(descs);

	    for (var j = 0, k = keys.length; j < k; j++) {
	      var key = keys[j];

	      if (!hasProperty(key, target.prototype)) {
	        defineProperty(target.prototype, key, descs[key]);
	      }
	    }
	  }
	}

	function mixin() {
	  for (var _len = arguments.length, mixins = Array(_len), _key = 0; _key < _len; _key++) {
	    mixins[_key] = arguments[_key];
	  }

	  if (typeof mixins[0] === 'function') {
	    return handleClass(mixins[0], []);
	  } else {
	    return function (target) {
	      return handleClass(target, mixins);
	    };
	  }
	}

	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = time;

	var _privateUtils = __webpack_require__(3);

	var labels = {};

	// Exported for mocking in tests
	var defaultConsole = {
	  time: console.time ? console.time.bind(console) : function (label) {
	    labels[label] = new Date();
	  },
	  timeEnd: console.timeEnd ? console.timeEnd.bind(console) : function (label) {
	    var timeNow = new Date();
	    var timeTaken = timeNow - labels[label];
	    delete labels[label];
	    console.log(label + ': ' + timeTaken + 'ms');
	  }
	};

	exports.defaultConsole = defaultConsole;
	var count = 0;

	function handleDescriptor(target, key, descriptor, _ref) {
	  var _ref2 = _slicedToArray(_ref, 2);

	  var _ref2$0 = _ref2[0];
	  var prefix = _ref2$0 === undefined ? null : _ref2$0;
	  var _ref2$1 = _ref2[1];
	  var console = _ref2$1 === undefined ? defaultConsole : _ref2$1;

	  var fn = descriptor.value;

	  if (prefix === null) {
	    prefix = target.constructor.name + '.' + key;
	  }

	  if (typeof fn !== 'function') {
	    throw new SyntaxError('@time can only be used on functions, not: ' + fn);
	  }

	  return _extends({}, descriptor, {
	    value: function value() {
	      var label = prefix + '-' + count;
	      count++;
	      console.time(label);

	      try {
	        return fn.apply(this, arguments);
	      } finally {
	        console.timeEnd(label);
	      }
	    }
	  });
	}

	function time() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = extendDescriptor;

	var _privateUtils = __webpack_require__(3);

	var getPrototypeOf = Object.getPrototypeOf;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	function handleDescriptor(target, key, descriptor) {
	  var superKlass = getPrototypeOf(target);
	  var superDesc = getOwnPropertyDescriptor(superKlass, key);

	  return _extends({}, superDesc, {
	    value: descriptor.value,
	    initializer: descriptor.initializer,
	    get: descriptor.get || superDesc.get,
	    set: descriptor.set || superDesc.set
	  });
	}

	function extendDescriptor() {
	  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	    args[_key] = arguments[_key];
	  }

	  return (0, _privateUtils.decorate)(handleDescriptor, args);
	}

	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports["default"] = applyDecorators;
	var defineProperty = Object.defineProperty;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	function applyDecorators(Class, props) {
	  var prototype = Class.prototype;

	  for (var key in props) {
	    var decorators = props[key];

	    for (var i = 0, l = decorators.length; i < l; i++) {
	      var decorator = decorators[i];

	      defineProperty(prototype, key, decorator(prototype, key, getOwnPropertyDescriptor(prototype, key)));
	    }
	  }

	  return Class;
	}

	module.exports = exports["default"];

/***/ }
/******/ ])
});
;