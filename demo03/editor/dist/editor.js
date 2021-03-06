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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 129);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var ctx = __webpack_require__(18);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(52)('wks');
var uid = __webpack_require__(32);
var Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(93);
var toPrimitive = __webpack_require__(22);
var dP = Object.defineProperty;

exports.f = __webpack_require__(6) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(24);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(23);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(31);
module.exports = __webpack_require__(6) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var SRC = __webpack_require__(32)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(21).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47);
var defined = __webpack_require__(23);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(48);
var createDesc = __webpack_require__(31);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(93);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(6) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(68)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(18);
var IObject = __webpack_require__(47);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var asc = __webpack_require__(85);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__(6)) {
  var LIBRARY = __webpack_require__(33);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(62);
  var $buffer = __webpack_require__(91);
  var ctx = __webpack_require__(18);
  var anInstance = __webpack_require__(39);
  var propertyDesc = __webpack_require__(31);
  var hide = __webpack_require__(12);
  var redefineAll = __webpack_require__(41);
  var toInteger = __webpack_require__(24);
  var toLength = __webpack_require__(8);
  var toIndex = __webpack_require__(119);
  var toAbsoluteIndex = __webpack_require__(35);
  var toPrimitive = __webpack_require__(22);
  var has = __webpack_require__(11);
  var classof = __webpack_require__(49);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(82);
  var create = __webpack_require__(36);
  var getPrototypeOf = __webpack_require__(17);
  var gOPN = __webpack_require__(37).f;
  var getIterFn = __webpack_require__(84);
  var uid = __webpack_require__(32);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(26);
  var createArrayIncludes = __webpack_require__(53);
  var speciesConstructor = __webpack_require__(60);
  var ArrayIterators = __webpack_require__(87);
  var Iterators = __webpack_require__(44);
  var $iterDetect = __webpack_require__(57);
  var setSpecies = __webpack_require__(38);
  var arrayFill = __webpack_require__(86);
  var arrayCopyWithin = __webpack_require__(109);
  var $DP = __webpack_require__(7);
  var $GOPD = __webpack_require__(16);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var Map = __webpack_require__(114);
var $export = __webpack_require__(0);
var shared = __webpack_require__(52)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(117))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(32)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(12)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = false;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(95);
var enumBugKeys = __webpack_require__(69);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(96);
var enumBugKeys = __webpack_require__(69);
var IE_PROTO = __webpack_require__(68)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(66)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(95);
var hiddenKeys = __webpack_require__(69).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(6);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var call = __webpack_require__(107);
var isArrayIter = __webpack_require__(82);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(8);
var getIterFn = __webpack_require__(84);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(72);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var prosemirrorModel = __webpack_require__(51);
var prosemirrorTransform = __webpack_require__(50);

var classesById = Object.create(null);

// ::- Superclass for editor selections. Every selection type should
// extend this. Should not be instantiated directly.
var Selection = function Selection($anchor, $head, ranges) {
  // :: [SelectionRange]
  // The ranges covered by the selection.
  this.ranges = ranges || [new SelectionRange($anchor.min($head), $anchor.max($head))];
  // :: ResolvedPos
  // The resolved anchor of the selection (the side that stays in
  // place when the selection is modified).
  this.$anchor = $anchor;
  // :: ResolvedPos
  // The resolved head of the selection (the side that moves when
  // the selection is modified).
  this.$head = $head;
};

var prototypeAccessors = { anchor: {},head: {},from: {},to: {},$from: {},$to: {},empty: {} };

// :: number
// The selection's anchor, as an unresolved position.
prototypeAccessors.anchor.get = function () { return this.$anchor.pos };

// :: number
// The selection's head.
prototypeAccessors.head.get = function () { return this.$head.pos };

// :: number
// The lower bound of the selection's main range.
prototypeAccessors.from.get = function () { return this.$from.pos };

// :: number
// The upper bound of the selection's main range.
prototypeAccessors.to.get = function () { return this.$to.pos };

// :: ResolvedPos
// The resolved lowerbound of the selection's main range.
prototypeAccessors.$from.get = function () {
  return this.ranges[0].$from
};

// :: ResolvedPos
// The resolved upper bound of the selection's main range.
prototypeAccessors.$to.get = function () {
  return this.ranges[0].$to
};

// :: bool
// Indicates whether the selection contains any content.
prototypeAccessors.empty.get = function () {
  var ranges = this.ranges;
  for (var i = 0; i < ranges.length; i++)
    { if (ranges[i].$from.pos != ranges[i].$to.pos) { return false } }
  return true
};

// eq:: (Selection) → bool
// Test whether the selection is the same as another selection.

// map:: (doc: Node, mapping: Mappable) → Selection
// Map this selection through a [mappable](#transform.Mappable) thing. `doc`
// should be the new document to which we are mapping.

// :: () → Slice
// Get the content of this selection as a slice.
Selection.prototype.content = function content () {
  return this.$from.node(0).slice(this.from, this.to, true)
};

// :: (Transaction, ?Slice)
// Replace the selection with a slice or, if no slice is given,
// delete the selection. Will append to the given transaction.
Selection.prototype.replace = function replace (tr, content) {
    if ( content === void 0 ) content = prosemirrorModel.Slice.empty;

  // Put the new selection at the position after the inserted
  // content. When that ended in an inline node, search backwards,
  // to get the position after that node. If not, search forward.
  var lastNode = content.content.lastChild, lastParent = null;
  for (var i = 0; i < content.openEnd; i++) {
    lastParent = lastNode;
    lastNode = lastNode.lastChild;
  }

  var mapFrom = tr.steps.length, ranges = this.ranges;
  for (var i$1 = 0; i$1 < ranges.length; i$1++) {
    var ref = ranges[i$1];
      var $from = ref.$from;
      var $to = ref.$to;
      var mapping = tr.mapping.slice(mapFrom);
    tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), i$1 ? prosemirrorModel.Slice.empty : content);
    if (i$1 == 0)
      { selectionToInsertionEnd(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1); }
  }
};

// :: (Transaction, Node)
// Replace the selection with the given node, appending the changes
// to the given transaction.
Selection.prototype.replaceWith = function replaceWith (tr, node) {
  var mapFrom = tr.steps.length, ranges = this.ranges;
  for (var i = 0; i < ranges.length; i++) {
    var ref = ranges[i];
      var $from = ref.$from;
      var $to = ref.$to;
      var mapping = tr.mapping.slice(mapFrom);
    var from = mapping.map($from.pos), to = mapping.map($to.pos);
    if (i) {
      tr.deleteRange(from, to);
    } else {
      tr.replaceRangeWith(from, to, node);
      selectionToInsertionEnd(tr, mapFrom, node.isInline ? -1 : 1);
    }
  }
};

// toJSON:: () → Object
// Convert the selection to a JSON representation. When implementing
// this for a custom selection class, make sure to give the object a
// `type` property whose value matches the ID under which you
// [registered](#state.Selection^jsonID) your class.

// :: (ResolvedPos, number, ?bool) → ?Selection
// Find a valid cursor or leaf node selection starting at the given
// position and searching back if `dir` is negative, and forward if
// positive. When `textOnly` is true, only consider cursor
// selections. Will return null when no valid selection position is
// found.
Selection.findFrom = function findFrom ($pos, dir, textOnly) {
  var inner = $pos.parent.inlineContent ? new TextSelection($pos)
      : findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
  if (inner) { return inner }

  for (var depth = $pos.depth - 1; depth >= 0; depth--) {
    var found = dir < 0
        ? findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly)
        : findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly);
    if (found) { return found }
  }
};

// :: (ResolvedPos, ?number) → Selection
// Find a valid cursor or leaf node selection near the given
// position. Searches forward first by default, but if `bias` is
// negative, it will search backwards first.
Selection.near = function near ($pos, bias) {
    if ( bias === void 0 ) bias = 1;

  return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new AllSelection($pos.node(0))
};

// :: (Node) → Selection
// Find the cursor or leaf node selection closest to the start of
// the given document. Will return an
// [`AllSelection`](#state.AllSelection) if no valid position
// exists.
Selection.atStart = function atStart (doc) {
  return findSelectionIn(doc, doc, 0, 0, 1) || new AllSelection(doc)
};

// :: (Node) → Selection
// Find the cursor or leaf node selection closest to the end of the
// given document.
Selection.atEnd = function atEnd (doc) {
  return findSelectionIn(doc, doc, doc.content.size, doc.childCount, -1) || new AllSelection(doc)
};

// :: (Node, Object) → Selection
// Deserialize the JSON representation of a selection. Must be
// implemented for custom classes (as a static class method).
Selection.fromJSON = function fromJSON (doc, json) {
  var cls = classesById[json.type];
  if (!cls) { return this.backwardsCompatFromJSON(doc, json) }
  return cls.fromJSON(doc, json)
};

Selection.backwardsCompatFromJSON = function backwardsCompatFromJSON (doc, json) {
  if (json.anchor != null) { return TextSelection.fromJSON(doc, json) }
  if (json.node != null) { return NodeSelection.fromJSON(doc, {anchor: json.node, head: json.after}) }
  throw new RangeError("Unrecognized JSON data " + JSON.stringify(json))
};

// :: (string, constructor<Selection>)
// To be able to deserialize selections from JSON, custom selection
// classes must register themselves with an ID string, so that they
// can be disambiguated. Try to pick something that's unlikely to
// clash with classes from other modules.
Selection.jsonID = function jsonID (id, selectionClass) {
  if (id in classesById) { throw new RangeError("Duplicate use of selection JSON ID " + id) }
  classesById[id] = selectionClass;
  selectionClass.prototype.jsonID = id;
  return selectionClass
};

// :: () → SelectionBookmark
// Get a [bookmark](#state.SelectionBookmark) for this selection,
// which is a value that can be mapped without having access to a
// current document, and later resolved to a real selection for a
// given document again. (This is used mostly by the history to
// track and restore old selections.) The default implementation of
// this method just converts the selection to a text selection and
// returns the bookmark for that.
Selection.prototype.getBookmark = function getBookmark () {
  return TextSelection.between(this.anchor, this.head).getBookmark()
};

Object.defineProperties( Selection.prototype, prototypeAccessors );

// :: bool
// Controls whether, when a selection of this type is active in the
// browser, the selected range should be visible to the user. Defaults
// to `true`.
Selection.prototype.visible = true;

// SelectionBookmark:: interface
// A lightweight, document-independent representation of a selection.
// You can define a custom bookmark type for a custom selection class
// to make the history handle it well.
//
//   map:: (mapping: Mapping) → SelectionBookmark
//   Map the bookmark through a set of changes.
//
//   resolve:: (doc: Node) → Selection
//   Resolve the bookmark to a real selection again. This may need to
//   do some error checking and may fall back to a default (usually
//   [`TextSelection.between`](#state.TextSelection^between)) if
//   mapping made the bookmark invalid.

// ::- Represents a selected range in a document.
var SelectionRange = function SelectionRange($from, $to) {
  // :: ResolvedPos
  // The lower bound of the range.
  this.$from = $from;
  // :: ResolvedPos
  // The upper bound of the range.
  this.$to = $to;
};

// ::- A text selection represents a classical editor selection, with
// a head (the moving side) and anchor (immobile side), both of which
// point into textblock nodes. It can be empty (a regular cursor
// position).
var TextSelection = (function (Selection) {
  function TextSelection($anchor, $head) {
    if ( $head === void 0 ) $head = $anchor;

    Selection.call(this, $anchor, $head);
  }

  if ( Selection ) TextSelection.__proto__ = Selection;
  TextSelection.prototype = Object.create( Selection && Selection.prototype );
  TextSelection.prototype.constructor = TextSelection;

  var prototypeAccessors$1 = { $cursor: {} };

  // :: ?ResolvedPos
  // Returns a resolved position if this is a cursor selection (an
  // empty text selection), and null otherwise.
  prototypeAccessors$1.$cursor.get = function () { return this.$anchor.pos == this.$head.pos ? this.$head : null };

  TextSelection.prototype.map = function map (doc, mapping) {
    var $head = doc.resolve(mapping.map(this.head));
    if (!$head.parent.inlineContent) { return Selection.near($head) }
    var $anchor = doc.resolve(mapping.map(this.anchor));
    return new TextSelection($anchor.parent.inlineContent ? $anchor : $head, $head)
  };

  TextSelection.prototype.replace = function replace (tr, content) {
    if ( content === void 0 ) content = prosemirrorModel.Slice.empty;

    Selection.prototype.replace.call(this, tr, content);
    if (content == prosemirrorModel.Slice.empty) {
      var marks = this.$from.marksAcross(this.$to);
      if (marks) { tr.ensureMarks(marks); }
    }
  };

  TextSelection.prototype.eq = function eq (other) {
    return other instanceof TextSelection && other.anchor == this.anchor && other.head == this.head
  };

  TextSelection.prototype.getBookmark = function getBookmark () {
    return new TextBookmark(this.anchor, this.head)
  };

  TextSelection.prototype.toJSON = function toJSON () {
    return {type: "text", anchor: this.anchor, head: this.head}
  };

  TextSelection.fromJSON = function fromJSON (doc, json) {
    return new TextSelection(doc.resolve(json.anchor), doc.resolve(json.head))
  };

  // :: (Node, number, ?number) → TextSelection
  // Create a text selection from non-resolved positions.
  TextSelection.create = function create (doc, anchor, head) {
    if ( head === void 0 ) head = anchor;

    var $anchor = doc.resolve(anchor);
    return new this($anchor, head == anchor ? $anchor : doc.resolve(head))
  };

  // :: (ResolvedPos, ResolvedPos, ?number) → Selection
  // Return a text selection that spans the given positions or, if
  // they aren't text positions, find a text selection near them.
  // `bias` determines whether the method searches forward (default)
  // or backwards (negative number) first. Will fall back to calling
  // [`Selection.near`](#state.Selection^near) when the document
  // doesn't contain a valid text position.
  TextSelection.between = function between ($anchor, $head, bias) {
    var dPos = $anchor.pos - $head.pos;
    if (!bias || dPos) { bias = dPos >= 0 ? 1 : -1; }
    if (!$head.parent.inlineContent) {
      var found = Selection.findFrom($head, bias, true) || Selection.findFrom($head, -bias, true);
      if (found) { $head = found.$head; }
      else { return Selection.near($head, bias) }
    }
    if (!$anchor.parent.inlineContent) {
      if (dPos == 0) {
        $anchor = $head;
      } else {
        $anchor = (Selection.findFrom($anchor, -bias, true) || Selection.findFrom($anchor, bias, true)).$anchor;
        if (($anchor.pos < $head.pos) != (dPos < 0)) { $anchor = $head; }
      }
    }
    return new TextSelection($anchor, $head)
  };

  Object.defineProperties( TextSelection.prototype, prototypeAccessors$1 );

  return TextSelection;
}(Selection));

Selection.jsonID("text", TextSelection);

var TextBookmark = function TextBookmark(anchor, head) {
  this.anchor = anchor;
  this.head = head;
};
TextBookmark.prototype.map = function map (mapping) {
  return new TextBookmark(mapping.map(this.anchor), mapping.map(this.head))
};
TextBookmark.prototype.resolve = function resolve (doc) {
  return TextSelection.between(doc.resolve(this.anchor), doc.resolve(this.head))
};

// ::- A node selection is a selection that points at a single node.
// All nodes marked [selectable](#model.NodeSpec.selectable) can be
// the target of a node selection. In such a selection, `from` and
// `to` point directly before and after the selected node, `anchor`
// equals `from`, and `head` equals `to`..
var NodeSelection = (function (Selection) {
  function NodeSelection($pos) {
    var node = $pos.nodeAfter;
    var $end = $pos.node(0).resolve($pos.pos + node.nodeSize);
    Selection.call(this, $pos, $end);
    // :: Node The selected node.
    this.node = node;
  }

  if ( Selection ) NodeSelection.__proto__ = Selection;
  NodeSelection.prototype = Object.create( Selection && Selection.prototype );
  NodeSelection.prototype.constructor = NodeSelection;

  NodeSelection.prototype.map = function map (doc, mapping) {
    var ref = mapping.mapResult(this.anchor);
    var deleted = ref.deleted;
    var pos = ref.pos;
    var $pos = doc.resolve(pos);
    if (deleted) { return Selection.near($pos) }
    return new NodeSelection($pos)
  };

  NodeSelection.prototype.content = function content () {
    return new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(this.node), 0, 0)
  };

  NodeSelection.prototype.eq = function eq (other) {
    return other instanceof NodeSelection && other.anchor == this.anchor
  };

  NodeSelection.prototype.toJSON = function toJSON () {
    return {type: "node", anchor: this.anchor}
  };

  NodeSelection.prototype.getBookmark = function getBookmark () { return new NodeBookmark(this.anchor) };

  NodeSelection.fromJSON = function fromJSON (doc, json) {
    return new NodeSelection(doc.resolve(json.anchor))
  };

  // :: (Node, number) → NodeSelection
  // Create a node selection from non-resolved positions.
  NodeSelection.create = function create (doc, from) {
    return new this(doc.resolve(from))
  };

  // :: (Node) → bool
  // Determines whether the given node may be selected as a node
  // selection.
  NodeSelection.isSelectable = function isSelectable (node) {
    return !node.isText && node.type.spec.selectable !== false
  };

  return NodeSelection;
}(Selection));

NodeSelection.prototype.visible = false;

Selection.jsonID("node", NodeSelection);

var NodeBookmark = function NodeBookmark(anchor) {
  this.anchor = anchor;
};
NodeBookmark.prototype.map = function map (mapping) {
  var ref = mapping.mapResult(this.anchor);
    var deleted = ref.deleted;
    var pos = ref.pos;
  return deleted ? new TextBookmark(pos, pos) : new NodeBookmark(pos)
};
NodeBookmark.prototype.resolve = function resolve (doc) {
  var $pos = doc.resolve(this.anchor), node = $pos.nodeAfter;
  if (node && NodeSelection.isSelectable(node)) { return new NodeSelection($pos) }
  return Selection.near($pos)
};

// ::- A selection type that represents selecting the whole document
// (which can not necessarily be expressed with a text selection, when
// there are for example leaf block nodes at the start or end of the
// document).
var AllSelection = (function (Selection) {
  function AllSelection(doc) {
    Selection.call(this, doc.resolve(0), doc.resolve(doc.content.size));
  }

  if ( Selection ) AllSelection.__proto__ = Selection;
  AllSelection.prototype = Object.create( Selection && Selection.prototype );
  AllSelection.prototype.constructor = AllSelection;

  AllSelection.prototype.toJSON = function toJSON () { return {type: "all"} };

  AllSelection.fromJSON = function fromJSON (doc) { return new AllSelection(doc) };

  AllSelection.prototype.map = function map (doc) { return new AllSelection(doc) };

  AllSelection.prototype.eq = function eq (other) { return other instanceof AllSelection };

  AllSelection.prototype.getBookmark = function getBookmark () { return AllBookmark };

  return AllSelection;
}(Selection));

Selection.jsonID("all", AllSelection);

var AllBookmark = {
  map: function map() { return this },
  resolve: function resolve(doc) { return new AllSelection(doc) }
};

// FIXME we'll need some awareness of text direction when scanning for selections

// Try to find a selection inside the given node. `pos` points at the
// position where the search starts. When `text` is true, only return
// text selections.
function findSelectionIn(doc, node, pos, index, dir, text) {
  if (node.inlineContent) { return TextSelection.create(doc, pos) }
  for (var i = index - (dir > 0 ? 0 : 1); dir > 0 ? i < node.childCount : i >= 0; i += dir) {
    var child = node.child(i);
    if (!child.isAtom) {
      var inner = findSelectionIn(doc, child, pos + dir, dir < 0 ? child.childCount : 0, dir, text);
      if (inner) { return inner }
    } else if (!text && NodeSelection.isSelectable(child)) {
      return NodeSelection.create(doc, pos - (dir < 0 ? child.nodeSize : 0))
    }
    pos += child.nodeSize * dir;
  }
}

function selectionToInsertionEnd(tr, startLen, bias) {
  var last = tr.steps.length - 1;
  if (last < startLen || !(tr.steps[last] instanceof prosemirrorTransform.ReplaceStep)) { return }
  var map = tr.mapping.maps[last], end;
  map.forEach(function (_from, _to, _newFrom, newTo) { return end = newTo; });
  if (end != null) { tr.setSelection(Selection.near(tr.doc.resolve(end), bias)); }
}

var UPDATED_SEL = 1;
var UPDATED_MARKS = 2;
var UPDATED_SCROLL = 4;

// ::- An editor state transaction, which can be applied to a state to
// create an updated state. Use
// [`EditorState.tr`](#state.EditorState.tr) to create an instance.
//
// Transactions track changes to the document (they are a subclass of
// [`Transform`](#transform.Transform)), but also other state changes,
// like selection updates and adjustments of the set of [stored
// marks](#state.EditorState.storedMarks). In addition, you can store
// metadata properties in a transaction, which are extra pieces of
// information that client code or plugins can use to describe what a
// transacion represents, so that they can update their [own
// state](#state.StateField) accordingly.
//
// The [editor view](#view.EditorView) uses a few metadata properties:
// it will attach a property `"pointer"` with the value `true` to
// selection transactions directly caused by mouse or touch input, and
// a `"paste"` property of true to transactions caused by a paste..
var Transaction = (function (Transform$$1) {
  function Transaction(state) {
    Transform$$1.call(this, state.doc);
    // :: number
    // The timestamp associated with this transaction, in the same
    // format as `Date.now()`.
    this.time = Date.now();
    this.curSelection = state.selection;
    // The step count for which the current selection is valid.
    this.curSelectionFor = 0;
    // :: ?[Mark]
    // The stored marks set by this transaction, if any.
    this.storedMarks = state.storedMarks;
    // Bitfield to track which aspects of the state were updated by
    // this transaction.
    this.updated = 0;
    // Object used to store metadata properties for the transaction.
    this.meta = Object.create(null);
  }

  if ( Transform$$1 ) Transaction.__proto__ = Transform$$1;
  Transaction.prototype = Object.create( Transform$$1 && Transform$$1.prototype );
  Transaction.prototype.constructor = Transaction;

  var prototypeAccessors = { selection: {},selectionSet: {},storedMarksSet: {},isGeneric: {},scrolledIntoView: {} };

  // :: Selection
  // The transaction's current selection. This defaults to the editor
  // selection [mapped](#state.Selection.map) through the steps in the
  // transaction, but can be overwritten with
  // [`setSelection`](#state.Transaction.setSelection).
  prototypeAccessors.selection.get = function () {
    if (this.curSelectionFor < this.steps.length) {
      this.curSelection = this.curSelection.map(this.doc, this.mapping.slice(this.curSelectionFor));
      this.curSelectionFor = this.steps.length;
    }
    return this.curSelection
  };

  // :: (Selection) → Transaction
  // Update the transaction's current selection. Will determine the
  // selection that the editor gets when the transaction is applied.
  Transaction.prototype.setSelection = function setSelection (selection) {
    this.curSelection = selection;
    this.curSelectionFor = this.steps.length;
    this.updated = (this.updated | UPDATED_SEL) & ~UPDATED_MARKS;
    this.storedMarks = null;
    return this
  };

  // :: bool
  // Whether the selection was explicitly updated by this transaction.
  prototypeAccessors.selectionSet.get = function () {
    return (this.updated & UPDATED_SEL) > 0
  };

  // :: (?[Mark]) → Transaction
  // Set the current stored marks.
  Transaction.prototype.setStoredMarks = function setStoredMarks (marks) {
    this.storedMarks = marks;
    this.updated |= UPDATED_MARKS;
    return this
  };

  // :: ([Mark]) → Transaction
  // Make sure the current stored marks or, if that is null, the marks
  // at the selection, match the given set of marks. Does nothing if
  // this is already the case.
  Transaction.prototype.ensureMarks = function ensureMarks (marks) {
    if (!prosemirrorModel.Mark.sameSet(this.storedMarks || this.selection.$from.marks(), marks))
      { this.setStoredMarks(marks); }
    return this
  };

  // :: (Mark) → Transaction
  // Add a mark to the set of stored marks.
  Transaction.prototype.addStoredMark = function addStoredMark (mark) {
    return this.ensureMarks(mark.addToSet(this.storedMarks || this.selection.$head.marks()))
  };

  // :: (union<Mark, MarkType>) → Transaction
  // Remove a mark or mark type from the set of stored marks.
  Transaction.prototype.removeStoredMark = function removeStoredMark (mark) {
    return this.ensureMarks(mark.removeFromSet(this.storedMarks || this.selection.$head.marks()))
  };

  // :: bool
  // Whether the stored marks were explicitly set for this transaction.
  prototypeAccessors.storedMarksSet.get = function () {
    return (this.updated & UPDATED_MARKS) > 0
  };

  Transaction.prototype.addStep = function addStep (step, doc) {
    Transform$$1.prototype.addStep.call(this, step, doc);
    this.updated = this.updated & ~UPDATED_MARKS;
    this.storedMarks = null;
  };

  // :: (number) → Transaction
  // Update the timestamp for the transaction.
  Transaction.prototype.setTime = function setTime (time) {
    this.time = time;
    return this
  };

  // :: (Slice) → Transaction
  // Replace the current selection with the given slice.
  Transaction.prototype.replaceSelection = function replaceSelection (slice) {
    this.selection.replace(this, slice);
    return this
  };

  // :: (Node, ?bool) → Transaction
  // Replace the selection with the given node. When `inheritMarks` is
  // true and the content is inline, it inherits the marks from the
  // place where it is inserted.
  Transaction.prototype.replaceSelectionWith = function replaceSelectionWith (node, inheritMarks) {
    var selection = this.selection;
    if (inheritMarks !== false)
      { node = node.mark(this.storedMarks || selection.$from.marks(selection.to > selection.from)); }
    selection.replaceWith(this, node);
    return this
  };

  // :: () → Transaction
  // Delete the selection.
  Transaction.prototype.deleteSelection = function deleteSelection () {
    this.selection.replace(this);
    return this
  };

  // :: (string, from: ?number, to: ?number) → Transaction
  // Replace the given range, or the selection if no range is given,
  // with a text node containing the given string.
  Transaction.prototype.insertText = function insertText (text, from, to) {
    if ( to === void 0 ) to = from;

    var schema = this.doc.type.schema;
    if (from == null) {
      if (!text) { return this.deleteSelection() }
      return this.replaceSelectionWith(schema.text(text), true)
    } else {
      if (!text) { return this.deleteRange(from, to) }
      var node = schema.text(text, this.storedMarks || this.doc.resolve(from).marks(to > from));
      return this.replaceRangeWith(from, to, node)
    }
  };

  // :: (union<string, Plugin, PluginKey>, any) → Transaction
  // Store a metadata property in this transaction, keyed either by
  // name or by plugin.
  Transaction.prototype.setMeta = function setMeta (key, value) {
    this.meta[typeof key == "string" ? key : key.key] = value;
    return this
  };

  // :: (union<string, Plugin, PluginKey>) → any
  // Retrieve a metadata property for a given name or plugin.
  Transaction.prototype.getMeta = function getMeta (key) {
    return this.meta[typeof key == "string" ? key : key.key]
  };

  // :: bool
  // Returns true if this transaction doesn't contain any metadata,
  // and can thus safely be extended.
  prototypeAccessors.isGeneric.get = function () {
    var this$1 = this;

    for (var _ in this$1.meta) { return false }
    return true
  };

  // :: () → Transaction
  // Indicate that the editor should scroll the selection into view
  // when updated to the state produced by this transaction.
  Transaction.prototype.scrollIntoView = function scrollIntoView () {
    this.updated |= UPDATED_SCROLL;
    return this
  };

  prototypeAccessors.scrolledIntoView.get = function () {
    return (this.updated & UPDATED_SCROLL) > 0
  };

  Object.defineProperties( Transaction.prototype, prototypeAccessors );

  return Transaction;
}(prosemirrorTransform.Transform));

function bind(f, self) {
  return !self || !f ? f : f.bind(self)
}

var FieldDesc = function FieldDesc(name, desc, self) {
  this.name = name;
  this.init = bind(desc.init, self);
  this.apply = bind(desc.apply, self);
};

var baseFields = [
  new FieldDesc("doc", {
    init: function init(config) { return config.doc || config.schema.topNodeType.createAndFill() },
    apply: function apply(tr) { return tr.doc }
  }),

  new FieldDesc("selection", {
    init: function init(config, instance) { return config.selection || Selection.atStart(instance.doc) },
    apply: function apply(tr) { return tr.selection }
  }),

  new FieldDesc("storedMarks", {
    init: function init() { return null },
    apply: function apply(tr, _marks, _old, state) { return state.selection.$cursor ? tr.storedMarks : null }
  }),

  new FieldDesc("scrollToSelection", {
    init: function init() { return 0 },
    apply: function apply(tr, prev) { return tr.scrolledIntoView ? prev + 1 : prev }
  })
];

// Object wrapping the part of a state object that stays the same
// across transactions. Stored in the state's `config` property.
var Configuration = function Configuration(schema, plugins) {
  var this$1 = this;

  this.schema = schema;
  this.fields = baseFields.concat();
  this.plugins = [];
  this.pluginsByKey = Object.create(null);
  if (plugins) { plugins.forEach(function (plugin) {
    if (this$1.pluginsByKey[plugin.key])
      { throw new RangeError("Adding different instances of a keyed plugin (" + plugin.key + ")") }
    this$1.plugins.push(plugin);
    this$1.pluginsByKey[plugin.key] = plugin;
    if (plugin.spec.state)
      { this$1.fields.push(new FieldDesc(plugin.key, plugin.spec.state, plugin)); }
  }); }
};

// ::- The state of a ProseMirror editor is represented by an object
// of this type. A state is a persistent data structure—it isn't
// updated, but rather a new state value is computed from an old one
// using the [`apply`](#state.EditorState.apply) method.
//
// A state holds a number of built-in fields, and plugins can
// [define](#state.PluginSpec.state) additional fields.
var EditorState = function EditorState(config) {
  this.config = config;
};

var prototypeAccessors$1 = { schema: {},plugins: {},tr: {} };

// doc:: Node
// The current document.

// selection:: Selection
// The selection.

// storedMarks:: ?[Mark]
// A set of marks to apply to the next input. Will be null when
// no explicit marks have been set.

// :: Schema
// The schema of the state's document.
prototypeAccessors$1.schema.get = function () {
  return this.config.schema
};

// :: [Plugin]
// The plugins that are active in this state.
prototypeAccessors$1.plugins.get = function () {
  return this.config.plugins
};

// :: (Transaction) → EditorState
// Apply the given transaction to produce a new state.
EditorState.prototype.apply = function apply (tr) {
  return this.applyTransaction(tr).state
};

// : (Transaction) → ?Transaction
EditorState.prototype.filterTransaction = function filterTransaction (tr, ignore) {
    var this$1 = this;
    if ( ignore === void 0 ) ignore = -1;

  for (var i = 0; i < this.config.plugins.length; i++) { if (i != ignore) {
    var plugin = this$1.config.plugins[i];
    if (plugin.spec.filterTransaction && !plugin.spec.filterTransaction.call(plugin, tr, this$1))
      { return false }
  } }
  return true
};

// :: (Transaction) → {state: EditorState, transactions: [Transaction]}
// Verbose variant of [`apply`](#state.EditorState.apply) that
// returns the precise transactions that were applied (which might
// be influenced by the [transaction
// hooks](#state.PluginSpec.filterTransaction) of
// plugins) along with the new state.
EditorState.prototype.applyTransaction = function applyTransaction (tr) {
    var this$1 = this;

  if (!this.filterTransaction(tr)) { return {state: this, transactions: []} }

  var trs = [tr], newState = this.applyInner(tr), seen = null;
  // This loop repeatedly gives plugins a chance to respond to
  // transactions as new transactions are added, making sure to only
  // pass the transactions the plugin did not see before.
  outer: for (;;) {
    var haveNew = false;
    for (var i = 0; i < this.config.plugins.length; i++) {
      var plugin = this$1.config.plugins[i];
      if (plugin.spec.appendTransaction) {
        var n = seen ? seen[i].n : 0, oldState = seen ? seen[i].state : this$1;
        var tr$1 = n < trs.length &&
            plugin.spec.appendTransaction.call(plugin, n ? trs.slice(n) : trs, oldState, newState);
        if (tr$1 && newState.filterTransaction(tr$1, i)) {
          tr$1.setMeta("appendedTransaction", tr$1);
          if (!seen) {
            seen = [];
            for (var j = 0; j < this.config.plugins.length; j++)
              { seen.push(j < i ? {state: newState, n: trs.length} : {state: this$1, n: 0}); }
          }
          trs.push(tr$1);
          newState = newState.applyInner(tr$1);
          haveNew = true;
        }
        if (seen) { seen[i] = {state: newState, n: trs.length}; }
      }
    }
    if (!haveNew) { return {state: newState, transactions: trs} }
  }
};

// : (Transaction) → EditorState
EditorState.prototype.applyInner = function applyInner (tr) {
    var this$1 = this;

  if (!tr.before.eq(this.doc)) { throw new RangeError("Applying a mismatched transaction") }
  var newInstance = new EditorState(this.config), fields = this.config.fields;
  for (var i = 0; i < fields.length; i++) {
    var field = fields[i];
    newInstance[field.name] = field.apply(tr, this$1[field.name], this$1, newInstance);
  }
  for (var i$1 = 0; i$1 < applyListeners.length; i$1++) { applyListeners[i$1](this$1, tr, newInstance); }
  return newInstance
};

// :: Transaction
// Start a [transaction](#state.Transaction) from this state.
prototypeAccessors$1.tr.get = function () { return new Transaction(this) };

// :: (Object) → EditorState
// Create a new state.
//
// config::- Configuration options. Must contain `schema` or `doc` (or both).
//
//    schema:: ?Schema
//    The schema to use.
//
//    doc:: ?Node
//    The starting document.
//
//    selection:: ?Selection
//    A valid selection in the document.
//
//    plugins:: ?[Plugin]
//    The plugins that should be active in this state.
EditorState.create = function create (config) {
  var $config = new Configuration(config.schema || config.doc.type.schema, config.plugins);
  var instance = new EditorState($config);
  for (var i = 0; i < $config.fields.length; i++)
    { instance[$config.fields[i].name] = $config.fields[i].init(config, instance); }
  return instance
};

// :: (Object) → EditorState
// Create a new state based on this one, but with an adjusted set of
// active plugins. State fields that exist in both sets of plugins
// are kept unchanged. Those that no longer exist are dropped, and
// those that are new are initialized using their
// [`init`](#state.StateField.init) method, passing in the new
// configuration object..
//
// config::- configuration options
//
//   schema:: ?Schema
//   New schema to use.
//
//   plugins:: ?[Plugin]
//   New set of active plugins.
EditorState.prototype.reconfigure = function reconfigure (config) {
    var this$1 = this;

  var $config = new Configuration(config.schema || this.schema, config.plugins);
  var fields = $config.fields, instance = new EditorState($config);
  for (var i = 0; i < fields.length; i++) {
    var name = fields[i].name;
    instance[name] = this$1.hasOwnProperty(name) ? this$1[name] : fields[i].init(config, instance);
  }
  return instance
};

// :: (?Object<Plugin>) → Object
// Serialize this state to JSON. If you want to serialize the state
// of plugins, pass an object mapping property names to use in the
// resulting JSON object to plugin objects.
EditorState.prototype.toJSON = function toJSON (pluginFields) {
    var this$1 = this;

  var result = {doc: this.doc.toJSON(), selection: this.selection.toJSON()};
  if (pluginFields) { for (var prop in pluginFields) {
    if (prop == "doc" || prop == "selection")
      { throw new RangeError("The JSON fields `doc` and `selection` are reserved") }
    var plugin = pluginFields[prop], state = plugin.spec.state;
    if (state && state.toJSON) { result[prop] = state.toJSON.call(plugin, this$1[plugin.key]); }
  } }
  return result
};

// :: (Object, Object, ?Object<Plugin>) → EditorState
// Deserialize a JSON representation of a state. `config` should
// have at least a `schema` field, and should contain array of
// plugins to initialize the state with. `pluginFields` can be used
// to deserialize the state of plugins, by associating plugin
// instances with the property names they use in the JSON object.
//
// config::- configuration options
//
//   schema:: Schema
//   The schema to use.
//
//   plugins:: ?[Plugin]
//   The set of active plugins.
EditorState.fromJSON = function fromJSON (config, json, pluginFields) {
  if (!config.schema) { throw new RangeError("Required config field 'schema' missing") }
  var $config = new Configuration(config.schema, config.plugins);
  var instance = new EditorState($config);
  $config.fields.forEach(function (field) {
    if (field.name == "doc") {
      instance.doc = prosemirrorModel.Node.fromJSON(config.schema, json.doc);
    } else if (field.name == "selection") {
      instance.selection = Selection.fromJSON(instance.doc, json.selection);
    } else {
      if (pluginFields) { for (var prop in pluginFields) {
        var plugin = pluginFields[prop], state = plugin.spec.state;
        if (plugin.key == field.name && state && state.fromJSON &&
            Object.prototype.hasOwnProperty.call(json, prop)) {
          // This field belongs to a plugin mapped to a JSON field, read it from there.
          instance[field.name] = state.fromJSON.call(plugin, config, json[prop], instance);
          return
        }
      } }
      instance[field.name] = field.init(config, instance);
    }
  });
  return instance
};

// Kludge to allow the view to track mappings between different
// instances of a state.
EditorState.addApplyListener = function addApplyListener (f) {
  applyListeners.push(f);
};
EditorState.removeApplyListener = function removeApplyListener (f) {
  var found = applyListeners.indexOf(f);
  if (found > -1) { applyListeners.splice(found, 1); }
};

Object.defineProperties( EditorState.prototype, prototypeAccessors$1 );

var applyListeners = [];

// PluginSpec:: interface
//
// This is the type passed to the [`Plugin`](#state.Plugin)
// constructor. It provides a definition for a plugin.
//
//   props:: ?EditorProps
//   The [view props](#view.EditorProps) added by this plugin. Props
//   that are functions will be bound to have the plugin instance as
//   their `this` binding.
//
//   state:: ?StateField<any>
//   Allows a plugin to define a [state field](#state.StateField), an
//   extra slot in the state object in which it can keep its own data.
//
//   key:: ?PluginKey
//   Can be used to make this a keyed plugin. You can have only one
//   plugin with a given key in a given state, but it is possible to
//   access the plugin's configuration and state through the key,
//   without having access to the plugin instance object.
//
//   view:: ?(EditorView) → Object
//   When the plugin needs to interact with the editor view, or
//   set something up in the DOM, use this field. The function
//   will be called when the plugin's state is associated with an
//   editor view.
//
//     return::-
//     Should return an object with the following optional
//     properties:
//
//       update:: ?(view: EditorView, prevState: EditorState)
//       Called whenever the view's state is updated.
//
//       destroy:: ?()
//       Called when the view is destroyed or receives a state
//       with different plugins.
//
//   filterTransaction:: ?(Transaction, EditorState) → bool
//   When present, this will be called before a transaction is
//   applied by the state, allowing the plugin to cancel it (by
//   returning false).
//
//   appendTransaction:: ?(transactions: [Transaction], oldState: EditorState, newState: EditorState) → ?Transaction
//   Allows the plugin to append another transaction to be applied
//   after the given array of transactions. When another plugin
//   appends a transaction after this was called, it is called again
//   with the new state and new transactions—but only the new
//   transactions, i.e. it won't be passed transactions that it
//   already saw.

function bindProps(obj, self, target) {
  for (var prop in obj) {
    var val = obj[prop];
    if (val instanceof Function) { val = val.bind(self); }
    else if (prop == "handleDOMEvents") { val = bindProps(val, self, {}); }
    target[prop] = val;
  }
  return target
}

// ::- Plugins bundle functionality that can be added to an editor.
// They are part of the [editor state](#state.EditorState) and
// may influence that state and the view that contains it.
var Plugin = function Plugin(spec) {
  // :: EditorProps
  // The [props](#view.EditorProps) exported by this plugin.
  this.props = {};
  if (spec.props) { bindProps(spec.props, this, this.props); }
  // :: Object
  // The plugin's [spec object](#state.PluginSpec).
  this.spec = spec;
  this.key = spec.key ? spec.key.key : createKey("plugin");
};

// :: (EditorState) → any
// Extract the plugin's state field from an editor state.
Plugin.prototype.getState = function getState (state) { return state[this.key] };

// StateField:: interface<T>
// A plugin spec may provide a state field (under its
// [`state`](#state.PluginSpec.state) property) of this type, which
// describes the state it wants to keep. Functions provided here are
// always called with the plugin instance as their `this` binding.
//
//   init:: (config: Object, instance: EditorState) → T
//   Initialize the value of the field. `config` will be the object
//   passed to [`EditorState.create`](#state.EditorState^create). Note
//   that `instance` is a half-initialized state instance, and will
//   not have values for plugin fields initialized after this one.
//
//   apply:: (tr: Transaction, value: T, oldState: EditorState, newState: EditorState) → T
//   Apply the given transaction to this state field, producing a new
//   field value. Note that the `newState` argument is again a partially
//   constructed state does not yet contain the state from plugins
//   coming after this one.
//
//   toJSON:: ?(value: T) → *
//   Convert this field to JSON. Optional, can be left off to disable
//   JSON serialization for the field.
//
//   fromJSON:: ?(config: Object, value: *, state: EditorState) → T
//   Deserialize the JSON representation of this field. Note that the
//   `state` argument is again a half-initialized state.

var keys = Object.create(null);

function createKey(name) {
  if (name in keys) { return name + "$" + ++keys[name] }
  keys[name] = 0;
  return name + "$"
}

// ::- A key is used to [tag](#state.PluginSpec.key)
// plugins in a way that makes it possible to find them, given an
// editor state. Assigning a key does mean only one plugin of that
// type can be active in a state.
var PluginKey = function PluginKey(name) {
if ( name === void 0 ) name = "key";
 this.key = createKey(name); };

// :: (EditorState) → ?Plugin
// Get the active plugin with this key, if any, from an editor
// state.
PluginKey.prototype.get = function get (state) { return state.config.pluginsByKey[this.key] };

// :: (EditorState) → ?any
// Get the plugin's state from an editor state.
PluginKey.prototype.getState = function getState (state) { return state[this.key] };

exports.Selection = Selection;
exports.SelectionRange = SelectionRange;
exports.TextSelection = TextSelection;
exports.NodeSelection = NodeSelection;
exports.AllSelection = AllSelection;
exports.Transaction = Transaction;
exports.EditorState = EditorState;
exports.Plugin = Plugin;
exports.PluginKey = PluginKey;
//# sourceMappingURL=index.js.map


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(19);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(19);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var prosemirrorModel = __webpack_require__(51);

// Mappable:: interface
// There are several things that positions can be mapped through.
// Such objects conform to this interface.
//
//   map:: (pos: number, assoc: ?number) → number
//   Map a position through this object. When given, `assoc` (should
//   be -1 or 1, defaults to 1) determines with which side the
//   position is associated, which determines in which direction to
//   move when a chunk of content is inserted at the mapped position.
//
//   mapResult:: (pos: number, assoc: ?number) → MapResult
//   Map a position, and return an object containing additional
//   information about the mapping. The result's `deleted` field tells
//   you whether the position was deleted (completely enclosed in a
//   replaced range) during the mapping. When content on only one side
//   is deleted, the position itself is only considered deleted when
//   `assoc` points in the direction of the deleted content.

// Recovery values encode a range index and an offset. They are
// represented as numbers, because tons of them will be created when
// mapping, for example, a large number of decorations. The number's
// lower 16 bits provide the index, the remaining bits the offset.
//
// Note: We intentionally don't use bit shift operators to en- and
// decode these, since those clip to 32 bits, which we might in rare
// cases want to overflow. A 64-bit float can represent 48-bit
// integers precisely.

var lower16 = 0xffff;
var factor16 = Math.pow(2, 16);

function makeRecover(index, offset) { return index + offset * factor16 }
function recoverIndex(value) { return value & lower16 }
function recoverOffset(value) { return (value - (value & lower16)) / factor16 }

// ::- An object representing a mapped position with extra
// information.
var MapResult = function MapResult(pos, deleted, recover) {
  if ( deleted === void 0 ) deleted = false;
  if ( recover === void 0 ) recover = null;

  // :: number The mapped version of the position.
  this.pos = pos;
  // :: bool Tells you whether the position was deleted, that is,
  // whether the step removed its surroundings from the document.
  this.deleted = deleted;
  this.recover = recover;
};

// :: class extends Mappable
// A map describing the deletions and insertions made by a step, which
// can be used to find the correspondence between positions in the
// pre-step version of a document and the same position in the
// post-step version.
var StepMap = function StepMap(ranges, inverted) {
  if ( inverted === void 0 ) inverted = false;

  this.ranges = ranges;
  this.inverted = inverted;
};

StepMap.prototype.recover = function recover (value) {
    var this$1 = this;

  var diff = 0, index = recoverIndex(value);
  if (!this.inverted) { for (var i = 0; i < index; i++)
    { diff += this$1.ranges[i * 3 + 2] - this$1.ranges[i * 3 + 1]; } }
  return this.ranges[index * 3] + diff + recoverOffset(value)
};

// : (number, ?number) → MapResult
StepMap.prototype.mapResult = function mapResult (pos, assoc) {
  if ( assoc === void 0 ) assoc = 1;
 return this._map(pos, assoc, false) };

// : (number, ?number) → number
StepMap.prototype.map = function map (pos, assoc) {
  if ( assoc === void 0 ) assoc = 1;
 return this._map(pos, assoc, true) };

StepMap.prototype._map = function _map (pos, assoc, simple) {
    var this$1 = this;

  var diff = 0, oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i = 0; i < this.ranges.length; i += 3) {
    var start = this$1.ranges[i] - (this$1.inverted ? diff : 0);
    if (start > pos) { break }
    var oldSize = this$1.ranges[i + oldIndex], newSize = this$1.ranges[i + newIndex], end = start + oldSize;
    if (pos <= end) {
      var side = !oldSize ? assoc : pos == start ? -1 : pos == end ? 1 : assoc;
      var result = start + diff + (side < 0 ? 0 : newSize);
      if (simple) { return result }
      var recover = makeRecover(i / 3, pos - start);
      return new MapResult(result, assoc < 0 ? pos != start : pos != end, recover)
    }
    diff += newSize - oldSize;
  }
  return simple ? pos + diff : new MapResult(pos + diff)
};

StepMap.prototype.touches = function touches (pos, recover) {
    var this$1 = this;

  var diff = 0, index = recoverIndex(recover);
  var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i = 0; i < this.ranges.length; i += 3) {
    var start = this$1.ranges[i] - (this$1.inverted ? diff : 0);
    if (start > pos) { break }
    var oldSize = this$1.ranges[i + oldIndex], end = start + oldSize;
    if (pos <= end && i == index * 3) { return true }
    diff += this$1.ranges[i + newIndex] - oldSize;
  }
  return false
};

// :: ((oldStart: number, oldEnd: number, newStart: number, newEnd: number))
// Calls the given function on each of the changed ranges included in
// this map.
StepMap.prototype.forEach = function forEach (f) {
    var this$1 = this;

  var oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
  for (var i = 0, diff = 0; i < this.ranges.length; i += 3) {
    var start = this$1.ranges[i], oldStart = start - (this$1.inverted ? diff : 0), newStart = start + (this$1.inverted ? 0 : diff);
    var oldSize = this$1.ranges[i + oldIndex], newSize = this$1.ranges[i + newIndex];
    f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
    diff += newSize - oldSize;
  }
};

// :: () → StepMap
// Create an inverted version of this map. The result can be used to
// map positions in the post-step document to the pre-step document.
StepMap.prototype.invert = function invert () {
  return new StepMap(this.ranges, !this.inverted)
};

StepMap.prototype.toString = function toString () {
  return (this.inverted ? "-" : "") + JSON.stringify(this.ranges)
};

// :: (n: number) → StepMap
// Create a map that moves all positions by offset `n` (which may be
// negative). This can be useful when applying steps meant for a
// sub-document to a larger document, or vice-versa.
StepMap.offset = function offset (n) {
  return n == 0 ? StepMap.empty : new StepMap(n < 0 ? [0, -n, 0] : [0, 0, n])
};

StepMap.empty = new StepMap([]);

// :: class extends Mappable
// A mapping represents a pipeline of zero or more [step
// maps](#transform.StepMap). It has special provisions for losslessly
// handling mapping positions through a series of steps in which some
// steps are inverted versions of earlier steps. (This comes up when
// ‘[rebasing](/docs/guide/#transform.rebasing)’ steps for
// collaboration or history management.)
var Mapping = function Mapping(maps, mirror, from, to) {
  // :: [StepMap]
  // The step maps in this mapping.
  this.maps = maps || [];
  // :: number
  // The starting position in the `maps` array, used when `map` or
  // `mapResult` is called.
  this.from = from || 0;
  // :: number
  // The end position in the `maps` array.
  this.to = to == null ? this.maps.length : to;
  this.mirror = mirror;
};

// :: (?number, ?number) → Mapping
// Create a mapping that maps only through a part of this one.
Mapping.prototype.slice = function slice (from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.maps.length;

  return new Mapping(this.maps, this.mirror, from, to)
};

Mapping.prototype.copy = function copy () {
  return new Mapping(this.maps.slice(), this.mirror && this.mirror.slice(), this.from, this.to)
};

Mapping.prototype.getMirror = function getMirror (n) {
    var this$1 = this;

  if (this.mirror) { for (var i = 0; i < this.mirror.length; i++)
    { if (this$1.mirror[i] == n) { return this$1.mirror[i + (i % 2 ? -1 : 1)] } } }
};

Mapping.prototype.setMirror = function setMirror (n, m) {
  if (!this.mirror) { this.mirror = []; }
  this.mirror.push(n, m);
};

// :: (StepMap, ?number)
// Add a step map to the end of this mapping. If `mirrors` is
// given, it should be the index of the step map that is the mirror
// image of this one.
Mapping.prototype.appendMap = function appendMap (map, mirrors) {
  this.to = this.maps.push(map);
  if (mirrors != null) { this.setMirror(this.maps.length - 1, mirrors); }
};

// :: (Mapping)
// Add all the step maps in a given mapping to this one (preserving
// mirroring information).
Mapping.prototype.appendMapping = function appendMapping (mapping) {
    var this$1 = this;

  for (var i = 0, startSize = this.maps.length; i < mapping.maps.length; i++) {
    var mirr = mapping.getMirror(i);
    this$1.appendMap(mapping.maps[i], mirr != null && mirr < i ? startSize + mirr : null);
  }
};

// :: (Mapping)
// Append the inverse of the given mapping to this one.
Mapping.prototype.appendMappingInverted = function appendMappingInverted (mapping) {
    var this$1 = this;

  for (var i = mapping.maps.length - 1, totalSize = this.maps.length + mapping.maps.length; i >= 0; i--) {
    var mirr = mapping.getMirror(i);
    this$1.appendMap(mapping.maps[i].invert(), mirr != null && mirr > i ? totalSize - mirr - 1 : null);
  }
};

// () → Mapping
// Create an inverted version of this mapping.
Mapping.prototype.invert = function invert () {
  var inverse = new Mapping;
  inverse.appendMappingInverted(this);
  return inverse
};

// : (number, ?number) → number
// Map a position through this mapping.
Mapping.prototype.map = function map (pos, assoc) {
    var this$1 = this;
    if ( assoc === void 0 ) assoc = 1;

  if (this.mirror) { return this._map(pos, assoc, true) }
  for (var i = this.from; i < this.to; i++)
    { pos = this$1.maps[i].map(pos, assoc); }
  return pos
};

// : (number, ?number) → MapResult
// Map a position through this mapping, returning a mapping
// result.
Mapping.prototype.mapResult = function mapResult (pos, assoc) {
  if ( assoc === void 0 ) assoc = 1;
 return this._map(pos, assoc, false) };

Mapping.prototype._map = function _map (pos, assoc, simple) {
    var this$1 = this;

  var deleted = false, recoverables = null;

  for (var i = this.from; i < this.to; i++) {
    var map = this$1.maps[i], rec = recoverables && recoverables[i];
    if (rec != null && map.touches(pos, rec)) {
      pos = map.recover(rec);
      continue
    }

    var result = map.mapResult(pos, assoc);
    if (result.recover != null) {
      var corr = this$1.getMirror(i);
      if (corr != null && corr > i && corr < this$1.to) {
        if (result.deleted) {
          i = corr;
          pos = this$1.maps[corr].recover(result.recover);
          continue
        } else {
          (recoverables || (recoverables = Object.create(null)))[corr] = result.recover;
        }
      }
    }

    if (result.deleted) { deleted = true; }
    pos = result.pos;
  }

  return simple ? pos : new MapResult(pos, deleted)
};

var TransformError = (function (Error) {
  function TransformError(message) { Error.call(this, message); }

  if ( Error ) TransformError.__proto__ = Error;
  TransformError.prototype = Object.create( Error && Error.prototype );
  TransformError.prototype.constructor = TransformError;

  var prototypeAccessors = { name: {} };
  prototypeAccessors.name.get = function () { return "TransformError" };

  Object.defineProperties( TransformError.prototype, prototypeAccessors );

  return TransformError;
}(Error));

// ::- Abstraction to build up and track an array of
// [steps](#transform.Step) representing a document transformation.
//
// Most transforming methods return the `Transform` object itself, so
// that they can be chained.
var Transform = function Transform(doc) {
  // :: Node
  // The current document (the result of applying the steps in the
  // transform).
  this.doc = doc;
  // :: [Step]
  // The steps in this transform.
  this.steps = [];
  // :: [Node]
  // The documents before each of the steps.
  this.docs = [];
  // :: Mapping
  // A mapping with the maps for each of the steps in this transform.
  this.mapping = new Mapping;
};

var prototypeAccessors$1 = { before: {},docChanged: {} };

// :: Node The starting document.
prototypeAccessors$1.before.get = function () { return this.docs.length ? this.docs[0] : this.doc };

// :: (step: Step) → this
// Apply a new step in this transform, saving the result. Throws an
// error when the step fails.
Transform.prototype.step = function step (object) {
  var result = this.maybeStep(object);
  if (result.failed) { throw new TransformError(result.failed) }
  return this
};

// :: (Step) → StepResult
// Try to apply a step in this transformation, ignoring it if it
// fails. Returns the step result.
Transform.prototype.maybeStep = function maybeStep (step) {
  var result = step.apply(this.doc);
  if (!result.failed) { this.addStep(step, result.doc); }
  return result
};

// :: bool
// True when the document has been changed (when there are any
// steps).
prototypeAccessors$1.docChanged.get = function () {
  return this.steps.length > 0
};

Transform.prototype.addStep = function addStep (step, doc) {
  this.docs.push(this.doc);
  this.steps.push(step);
  this.mapping.appendMap(step.getMap());
  this.doc = doc;
};

Object.defineProperties( Transform.prototype, prototypeAccessors$1 );

function mustOverride() { throw new Error("Override me") }

var stepsByID = Object.create(null);

// ::- A step object represents an atomic change. It generally applies
// only to the document it was created for, since the positions
// stored in it will only make sense for that document.
//
// New steps are defined by creating classes that extend `Step`,
// overriding the `apply`, `invert`, `map`, `getMap` and `fromJSON`
// methods, and registering your class with a unique
// JSON-serialization identifier using
// [`Step.jsonID`](#transform.Step^jsonID).
var Step = function Step () {};

Step.prototype.apply = function apply (_doc) { return mustOverride() };

// :: () → StepMap
// Get the step map that represents the changes made by this step,
// and which can be used to transform between positions in the old
// and the new document.
Step.prototype.getMap = function getMap () { return StepMap.empty };

// :: (doc: Node) → Step
// Create an inverted version of this step. Needs the document as it
// was before the step as argument.
Step.prototype.invert = function invert (_doc) { return mustOverride() };

// :: (mapping: Mappable) → ?Step
// Map this step through a mappable thing, returning either a
// version of that step with its positions adjusted, or `null` if
// the step was entirely deleted by the mapping.
Step.prototype.map = function map (_mapping) { return mustOverride() };

// :: (other: Step) → ?Step
// Try to merge this step with another one, to be applied directly
// after it. Returns the merged step when possible, null if the
// steps can't be merged.
Step.prototype.merge = function merge (_other) { return null };

// :: () → Object
// Create a JSON-serializeable representation of this step. When
// defining this for a custom subclass, make sure the result object
// includes the step type's [JSON id](#transform.Step^jsonID) under
// the `stepType` property.
Step.prototype.toJSON = function toJSON () { return mustOverride() };

// :: (Schema, Object) → Step
// Deserialize a step from its JSON representation. Will call
// through to the step class' own implementation of this method.
Step.fromJSON = function fromJSON (schema, json) {
  return stepsByID[json.stepType].fromJSON(schema, json)
};

// :: (string, constructor<Step>)
// To be able to serialize steps to JSON, each step needs a string
// ID to attach to its JSON representation. Use this method to
// register an ID for your step classes. Try to pick something
// that's unlikely to clash with steps from other modules.
Step.jsonID = function jsonID (id, stepClass) {
  if (id in stepsByID) { throw new RangeError("Duplicate use of step JSON ID " + id) }
  stepsByID[id] = stepClass;
  stepClass.prototype.jsonID = id;
  return stepClass
};

// ::- The result of [applying](#transform.Step.apply) a step. Contains either a
// new document or a failure value.
var StepResult = function StepResult(doc, failed) {
  // :: ?Node The transformed document.
  this.doc = doc;
  // :: ?string Text providing information about a failed step.
  this.failed = failed;
};

// :: (Node) → StepResult
// Create a successful step result.
StepResult.ok = function ok (doc) { return new StepResult(doc, null) };

// :: (string) → StepResult
// Create a failed step result.
StepResult.fail = function fail (message) { return new StepResult(null, message) };

// :: (Node, number, number, Slice) → StepResult
// Call [`Node.replace`](#model.Node.replace) with the given
// arguments. Create a successful result if it succeeds, and a
// failed one if it throws a `ReplaceError`.
StepResult.fromReplace = function fromReplace (doc, from, to, slice) {
  try {
    return StepResult.ok(doc.replace(from, to, slice))
  } catch (e) {
    if (e instanceof prosemirrorModel.ReplaceError) { return StepResult.fail(e.message) }
    throw e
  }
};

// ::- Replace a part of the document with a slice of new content.
var ReplaceStep = (function (Step$$1) {
  function ReplaceStep(from, to, slice, structure) {
    Step$$1.call(this);
    this.from = from;
    this.to = to;
    this.slice = slice;
    this.structure = !!structure;
  }

  if ( Step$$1 ) ReplaceStep.__proto__ = Step$$1;
  ReplaceStep.prototype = Object.create( Step$$1 && Step$$1.prototype );
  ReplaceStep.prototype.constructor = ReplaceStep;

  ReplaceStep.prototype.apply = function apply (doc) {
    if (this.structure && contentBetween(doc, this.from, this.to))
      { return StepResult.fail("Structure replace would overwrite content") }
    return StepResult.fromReplace(doc, this.from, this.to, this.slice)
  };

  ReplaceStep.prototype.getMap = function getMap () {
    return new StepMap([this.from, this.to - this.from, this.slice.size])
  };

  ReplaceStep.prototype.invert = function invert (doc) {
    return new ReplaceStep(this.from, this.from + this.slice.size, doc.slice(this.from, this.to))
  };

  ReplaceStep.prototype.map = function map (mapping) {
    var from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from.deleted && to.deleted) { return null }
    return new ReplaceStep(from.pos, Math.max(from.pos, to.pos), this.slice)
  };

  ReplaceStep.prototype.merge = function merge (other) {
    if (!(other instanceof ReplaceStep) || other.structure != this.structure) { return null }

    if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
      var slice = this.slice.size + other.slice.size == 0 ? prosemirrorModel.Slice.empty
          : new prosemirrorModel.Slice(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
      return new ReplaceStep(this.from, this.to + (other.to - other.from), slice, this.structure)
    } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
      var slice$1 = this.slice.size + other.slice.size == 0 ? prosemirrorModel.Slice.empty
          : new prosemirrorModel.Slice(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
      return new ReplaceStep(other.from, this.to, slice$1, this.structure)
    } else {
      return null
    }
  };

  ReplaceStep.prototype.toJSON = function toJSON () {
    var json = {stepType: "replace", from: this.from, to: this.to};
    if (this.slice.size) { json.slice = this.slice.toJSON(); }
    if (this.structure) { json.structure = true; }
    return json
  };

  ReplaceStep.fromJSON = function fromJSON (schema, json) {
    return new ReplaceStep(json.from, json.to, prosemirrorModel.Slice.fromJSON(schema, json.slice), !!json.structure)
  };

  return ReplaceStep;
}(Step));

Step.jsonID("replace", ReplaceStep);

// ::- Replace a part of the document with a slice of content, but
// preserve a range of the replaced content by moving it into the
// slice.
var ReplaceAroundStep = (function (Step$$1) {
  function ReplaceAroundStep(from, to, gapFrom, gapTo, slice, insert, structure) {
    Step$$1.call(this);
    this.from = from;
    this.to = to;
    this.gapFrom = gapFrom;
    this.gapTo = gapTo;
    this.slice = slice;
    this.insert = insert;
    this.structure = !!structure;
  }

  if ( Step$$1 ) ReplaceAroundStep.__proto__ = Step$$1;
  ReplaceAroundStep.prototype = Object.create( Step$$1 && Step$$1.prototype );
  ReplaceAroundStep.prototype.constructor = ReplaceAroundStep;

  ReplaceAroundStep.prototype.apply = function apply (doc) {
    if (this.structure && (contentBetween(doc, this.from, this.gapFrom) ||
                           contentBetween(doc, this.gapTo, this.to)))
      { return StepResult.fail("Structure gap-replace would overwrite content") }

    var gap = doc.slice(this.gapFrom, this.gapTo);
    if (gap.openStart || gap.openEnd)
      { return StepResult.fail("Gap is not a flat range") }
    var inserted = this.slice.insertAt(this.insert, gap.content);
    if (!inserted) { return StepResult.fail("Content does not fit in gap") }
    return StepResult.fromReplace(doc, this.from, this.to, inserted)
  };

  ReplaceAroundStep.prototype.getMap = function getMap () {
    return new StepMap([this.from, this.gapFrom - this.from, this.insert,
                        this.gapTo, this.to - this.gapTo, this.slice.size - this.insert])
  };

  ReplaceAroundStep.prototype.invert = function invert (doc) {
    var gap = this.gapTo - this.gapFrom;
    return new ReplaceAroundStep(this.from, this.from + this.slice.size + gap,
                                 this.from + this.insert, this.from + this.insert + gap,
                                 doc.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from),
                                 this.gapFrom - this.from, this.structure)
  };

  ReplaceAroundStep.prototype.map = function map (mapping) {
    var from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    var gapFrom = mapping.map(this.gapFrom, -1), gapTo = mapping.map(this.gapTo, 1);
    if ((from.deleted && to.deleted) || gapFrom < from.pos || gapTo > to.pos) { return null }
    return new ReplaceAroundStep(from.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure)
  };

  ReplaceAroundStep.prototype.toJSON = function toJSON () {
    var json = {stepType: "replaceAround", from: this.from, to: this.to,
                gapFrom: this.gapFrom, gapTo: this.gapTo, insert: this.insert};
    if (this.slice.size) { json.slice = this.slice.toJSON(); }
    if (this.structure) { json.structure = true; }
    return json
  };

  ReplaceAroundStep.fromJSON = function fromJSON (schema, json) {
    return new ReplaceAroundStep(json.from, json.to, json.gapFrom, json.gapTo,
                                 prosemirrorModel.Slice.fromJSON(schema, json.slice), json.insert, !!json.structure)
  };

  return ReplaceAroundStep;
}(Step));

Step.jsonID("replaceAround", ReplaceAroundStep);

function contentBetween(doc, from, to) {
  var $from = doc.resolve(from), dist = to - from, depth = $from.depth;
  while (dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount) {
    depth--;
    dist--;
  }
  if (dist > 0) {
    var next = $from.node(depth).maybeChild($from.indexAfter(depth));
    while (dist > 0) {
      if (!next || next.isLeaf) { return true }
      next = next.firstChild;
      dist--;
    }
  }
  return false
}

function canCut(node, start, end) {
  return (start == 0 || node.canReplace(start, node.childCount)) &&
    (end == node.childCount || node.canReplace(0, end))
}

// :: (NodeRange) → ?number
// Try to find a target depth to which the content in the given range
// can be lifted. Will not go across
// [isolating](#model.NodeSpec.isolating) parent nodes.
function liftTarget(range) {
  var parent = range.parent;
  var content = parent.content.cutByIndex(range.startIndex, range.endIndex);
  for (var depth = range.depth;; --depth) {
    var node = range.$from.node(depth);
    var index = range.$from.index(depth), endIndex = range.$to.indexAfter(depth);
    if (depth < range.depth && node.canReplace(index, endIndex, content))
      { return depth }
    if (depth == 0 || node.type.spec.isolating || !canCut(node, index, endIndex)) { break }
  }
}

// :: (NodeRange, number) → this
// Split the content in the given range off from its parent, if there
// is sibling content before or after it, and move it up the tree to
// the depth specified by `target`. You'll probably want to use
// [`liftTarget`](#transform.liftTarget) to compute `target`, to make
// sure the lift is valid.
Transform.prototype.lift = function(range, target) {
  var $from = range.$from;
  var $to = range.$to;
  var depth = range.depth;

  var gapStart = $from.before(depth + 1), gapEnd = $to.after(depth + 1);
  var start = gapStart, end = gapEnd;

  var before = prosemirrorModel.Fragment.empty, openStart = 0;
  for (var d = depth, splitting = false; d > target; d--)
    { if (splitting || $from.index(d) > 0) {
      splitting = true;
      before = prosemirrorModel.Fragment.from($from.node(d).copy(before));
      openStart++;
    } else {
      start--;
    } }
  var after = prosemirrorModel.Fragment.empty, openEnd = 0;
  for (var d$1 = depth, splitting$1 = false; d$1 > target; d$1--)
    { if (splitting$1 || $to.after(d$1 + 1) < $to.end(d$1)) {
      splitting$1 = true;
      after = prosemirrorModel.Fragment.from($to.node(d$1).copy(after));
      openEnd++;
    } else {
      end++;
    } }

  return this.step(new ReplaceAroundStep(start, end, gapStart, gapEnd,
                                         new prosemirrorModel.Slice(before.append(after), openStart, openEnd),
                                         before.size - openStart, true))
};

// :: (NodeRange, NodeType, ?Object) → ?[{type: NodeType, attrs: ?Object}]
// Try to find a valid way to wrap the content in the given range in a
// node of the given type. May introduce extra nodes around and inside
// the wrapper node, if necessary. Returns null if no valid wrapping
// could be found.
function findWrapping(range, nodeType, attrs, innerRange) {
  if ( innerRange === void 0 ) innerRange = range;

  var around = findWrappingOutside(range, nodeType);
  var inner = around && findWrappingInside(innerRange, nodeType);
  if (!inner) { return null }
  return around.map(withAttrs).concat({type: nodeType, attrs: attrs}).concat(inner.map(withAttrs))
}

function withAttrs(type) { return {type: type, attrs: null} }

function findWrappingOutside(range, type) {
  var parent = range.parent;
  var startIndex = range.startIndex;
  var endIndex = range.endIndex;
  var around = parent.contentMatchAt(startIndex).findWrapping(type);
  if (!around) { return null }
  var outer = around.length ? around[0] : type;
  return parent.canReplaceWith(startIndex, endIndex, outer) ? around : null
}

function findWrappingInside(range, type) {
  var parent = range.parent;
  var startIndex = range.startIndex;
  var endIndex = range.endIndex;
  var inner = parent.child(startIndex);
  var inside = type.contentMatch.findWrapping(inner.type);
  if (!inside) { return null }
  var lastType = inside.length ? inside[inside.length - 1] : type;
  var innerMatch = lastType.contentMatch;
  for (var i = startIndex; innerMatch && i < endIndex; i++)
    { innerMatch = innerMatch.matchType(parent.child(i).type); }
  if (!innerMatch || !innerMatch.validEnd) { return null }
  return inside
}

// :: (NodeRange, [{type: NodeType, attrs: ?Object}]) → this
// Wrap the given [range](#model.NodeRange) in the given set of wrappers.
// The wrappers are assumed to be valid in this position, and should
// probably be computed with [`findWrapping`](#transform.findWrapping).
Transform.prototype.wrap = function(range, wrappers) {
  var content = prosemirrorModel.Fragment.empty;
  for (var i = wrappers.length - 1; i >= 0; i--)
    { content = prosemirrorModel.Fragment.from(wrappers[i].type.create(wrappers[i].attrs, content)); }

  var start = range.start, end = range.end;
  return this.step(new ReplaceAroundStep(start, end, start, end, new prosemirrorModel.Slice(content, 0, 0), wrappers.length, true))
};

// :: (number, ?number, NodeType, ?Object) → this
// Set the type of all textblocks (partly) between `from` and `to` to
// the given node type with the given attributes.
Transform.prototype.setBlockType = function(from, to, type, attrs) {
  var this$1 = this;
  if ( to === void 0 ) to = from;

  if (!type.isTextblock) { throw new RangeError("Type given to setBlockType should be a textblock") }
  var mapFrom = this.steps.length;
  this.doc.nodesBetween(from, to, function (node, pos) {
    if (node.isTextblock && !node.hasMarkup(type, attrs)) {
      // Ensure all markup that isn't allowed in the new node type is cleared
      this$1.clearIncompatible(this$1.mapping.slice(mapFrom).map(pos, 1), type);
      var mapping = this$1.mapping.slice(mapFrom);
      var startM = mapping.map(pos, 1), endM = mapping.map(pos + node.nodeSize, 1);
      this$1.step(new ReplaceAroundStep(startM, endM, startM + 1, endM - 1,
                                      new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(type.create(attrs)), 0, 0), 1, true));
      return false
    }
  });
  return this
};

var warnedAboutSetNodeType = false;
Transform.prototype.setNodeType = function(pos, type, attrs, marks) {
  if (!warnedAboutSetNodeType && typeof console == "object" && console.warn) {
    warnedAboutSetNodeType = true;
    console.warn("setNodeType has been renamed to setNodeMarkup");
  }
  return this.setNodeMarkup(pos, type, attrs, marks)
};

// :: (number, ?NodeType, ?Object, ?[Mark]) → this
// Change the type, attributes, and/or marks of the node at `pos`.
// When `nodeType` is null, the existing node type is preserved,
Transform.prototype.setNodeMarkup = function(pos, type, attrs, marks) {
  var node = this.doc.nodeAt(pos);
  if (!node) { throw new RangeError("No node at given position") }
  if (!type) { type = node.type; }
  var newNode = type.create(attrs, null, marks || node.marks);
  if (node.isLeaf)
    { return this.replaceWith(pos, pos + node.nodeSize, newNode) }

  if (!type.validContent(node.content))
    { throw new RangeError("Invalid content for node type " + type.name) }

  return this.step(new ReplaceAroundStep(pos, pos + node.nodeSize, pos + 1, pos + node.nodeSize - 1,
                                         new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(newNode), 0, 0), 1, true))
};

// :: (Node, number, number, ?[?{type: NodeType, attrs: ?Object}]) → bool
// Check whether splitting at the given position is allowed.
function canSplit(doc, pos, depth, typesAfter) {
  if ( depth === void 0 ) depth = 1;

  var $pos = doc.resolve(pos), base = $pos.depth - depth;
  var innerType = (typesAfter && typesAfter[typesAfter.length - 1]) || $pos.parent;
  if (base < 0 ||
      !$pos.parent.canReplace($pos.index(), $pos.parent.childCount) ||
      !innerType.type.validContent($pos.parent.content.cutByIndex($pos.index(), $pos.parent.childCount)))
    { return false }
  for (var d = $pos.depth - 1, i = depth - 2; d > base; d--, i--) {
    var node = $pos.node(d), index$1 = $pos.index(d);
    var rest = node.content.cutByIndex(index$1, node.childCount);
    var after = (typesAfter && typesAfter[i]) || node;
    if (after != node) { rest = rest.replaceChild(0, after.type.create(after.attrs)); }
    if (!node.canReplace(index$1 + 1, node.childCount) || !after.type.validContent(rest))
      { return false }
  }
  var index = $pos.indexAfter(base);
  var baseType = typesAfter && typesAfter[0];
  return $pos.node(base).canReplaceWith(index, index, baseType ? baseType.type : $pos.node(base + 1).type)
}

// :: (number, ?number, ?[?{type: NodeType, attrs: ?Object}]) → this
// Split the node at the given position, and optionally, if `depth` is
// greater than one, any number of nodes above that. By default, the
// parts split off will inherit the node type of the original node.
// This can be changed by passing an array of types and attributes to
// use after the split.
Transform.prototype.split = function(pos, depth, typesAfter) {
  if ( depth === void 0 ) depth = 1;

  var $pos = this.doc.resolve(pos), before = prosemirrorModel.Fragment.empty, after = prosemirrorModel.Fragment.empty;
  for (var d = $pos.depth, e = $pos.depth - depth, i = depth - 1; d > e; d--, i--) {
    before = prosemirrorModel.Fragment.from($pos.node(d).copy(before));
    var typeAfter = typesAfter && typesAfter[i];
    after = prosemirrorModel.Fragment.from(typeAfter ? typeAfter.type.create(typeAfter.attrs, after) : $pos.node(d).copy(after));
  }
  return this.step(new ReplaceStep(pos, pos, new prosemirrorModel.Slice(before.append(after), depth, depth, true)))
};

// :: (Node, number) → bool
// Test whether the blocks before and after a given position can be
// joined.
function canJoin(doc, pos) {
  var $pos = doc.resolve(pos), index = $pos.index();
  return joinable($pos.nodeBefore, $pos.nodeAfter) &&
    $pos.parent.canReplace(index, index + 1)
}

function joinable(a, b) {
  return a && b && !a.isLeaf && a.canAppend(b)
}

// :: (Node, number, ?number) → ?number
// Find an ancestor of the given position that can be joined to the
// block before (or after if `dir` is positive). Returns the joinable
// point, if any.
function joinPoint(doc, pos, dir) {
  if ( dir === void 0 ) dir = -1;

  var $pos = doc.resolve(pos);
  for (var d = $pos.depth;; d--) {
    var before = (void 0), after = (void 0);
    if (d == $pos.depth) {
      before = $pos.nodeBefore;
      after = $pos.nodeAfter;
    } else if (dir > 0) {
      before = $pos.node(d + 1);
      after = $pos.node(d).maybeChild($pos.index(d) + 1);
    } else {
      before = $pos.node(d).maybeChild($pos.index(d) - 1);
      after = $pos.node(d + 1);
    }
    if (before && !before.isTextblock && joinable(before, after)) { return pos }
    if (d == 0) { break }
    pos = dir < 0 ? $pos.before(d) : $pos.after(d);
  }
}

// :: (number, ?number, ?bool) → this
// Join the blocks around the given position. If depth is 2, their
// last and first siblings are also joined, and so on.
Transform.prototype.join = function(pos, depth) {
  if ( depth === void 0 ) depth = 1;

  var step = new ReplaceStep(pos - depth, pos + depth, prosemirrorModel.Slice.empty, true);
  return this.step(step)
};

// :: (Node, number, NodeType) → ?number
// Try to find a point where a node of the given type can be inserted
// near `pos`, by searching up the node hierarchy when `pos` itself
// isn't a valid place but is at the start or end of a node. Return
// null if no position was found.
function insertPoint(doc, pos, nodeType) {
  var $pos = doc.resolve(pos);
  if ($pos.parent.canReplaceWith($pos.index(), $pos.index(), nodeType)) { return pos }

  if ($pos.parentOffset == 0)
    { for (var d = $pos.depth - 1; d >= 0; d--) {
      var index = $pos.index(d);
      if ($pos.node(d).canReplaceWith(index, index, nodeType)) { return $pos.before(d + 1) }
      if (index > 0) { return null }
    } }
  if ($pos.parentOffset == $pos.parent.content.size)
    { for (var d$1 = $pos.depth - 1; d$1 >= 0; d$1--) {
      var index$1 = $pos.indexAfter(d$1);
      if ($pos.node(d$1).canReplaceWith(index$1, index$1, nodeType)) { return $pos.after(d$1 + 1) }
      if (index$1 < $pos.node(d$1).childCount) { return null }
    } }
}

function mapFragment(fragment, f, parent) {
  var mapped = [];
  for (var i = 0; i < fragment.childCount; i++) {
    var child = fragment.child(i);
    if (child.content.size) { child = child.copy(mapFragment(child.content, f, child)); }
    if (child.isInline) { child = f(child, parent, i); }
    mapped.push(child);
  }
  return prosemirrorModel.Fragment.fromArray(mapped)
}

// ::- Add a mark to all inline content between two positions.
var AddMarkStep = (function (Step$$1) {
  function AddMarkStep(from, to, mark) {
    Step$$1.call(this);
    this.from = from;
    this.to = to;
    this.mark = mark;
  }

  if ( Step$$1 ) AddMarkStep.__proto__ = Step$$1;
  AddMarkStep.prototype = Object.create( Step$$1 && Step$$1.prototype );
  AddMarkStep.prototype.constructor = AddMarkStep;

  AddMarkStep.prototype.apply = function apply (doc) {
    var this$1 = this;

    var oldSlice = doc.slice(this.from, this.to), $from = doc.resolve(this.from);
    var parent = $from.node($from.sharedDepth(this.to));
    var slice = new prosemirrorModel.Slice(mapFragment(oldSlice.content, function (node, parent) {
      if (!parent.type.allowsMarkType(this$1.mark.type)) { return node }
      return node.mark(this$1.mark.addToSet(node.marks))
    }, parent), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc, this.from, this.to, slice)
  };

  AddMarkStep.prototype.invert = function invert () {
    return new RemoveMarkStep(this.from, this.to, this.mark)
  };

  AddMarkStep.prototype.map = function map (mapping) {
    var from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from.deleted && to.deleted || from.pos >= to.pos) { return null }
    return new AddMarkStep(from.pos, to.pos, this.mark)
  };

  AddMarkStep.prototype.merge = function merge (other) {
    if (other instanceof AddMarkStep &&
        other.mark.eq(this.mark) &&
        this.from <= other.to && this.to >= other.from)
      { return new AddMarkStep(Math.min(this.from, other.from),
                             Math.max(this.to, other.to), this.mark) }
  };

  AddMarkStep.prototype.toJSON = function toJSON () {
    return {stepType: "addMark", mark: this.mark.toJSON(),
            from: this.from, to: this.to}
  };

  AddMarkStep.fromJSON = function fromJSON (schema, json) {
    return new AddMarkStep(json.from, json.to, schema.markFromJSON(json.mark))
  };

  return AddMarkStep;
}(Step));

Step.jsonID("addMark", AddMarkStep);

// ::- Remove a mark from all inline content between two positions.
var RemoveMarkStep = (function (Step$$1) {
  function RemoveMarkStep(from, to, mark) {
    Step$$1.call(this);
    this.from = from;
    this.to = to;
    this.mark = mark;
  }

  if ( Step$$1 ) RemoveMarkStep.__proto__ = Step$$1;
  RemoveMarkStep.prototype = Object.create( Step$$1 && Step$$1.prototype );
  RemoveMarkStep.prototype.constructor = RemoveMarkStep;

  RemoveMarkStep.prototype.apply = function apply (doc) {
    var this$1 = this;

    var oldSlice = doc.slice(this.from, this.to);
    var slice = new prosemirrorModel.Slice(mapFragment(oldSlice.content, function (node) {
      return node.mark(this$1.mark.removeFromSet(node.marks))
    }), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc, this.from, this.to, slice)
  };

  RemoveMarkStep.prototype.invert = function invert () {
    return new AddMarkStep(this.from, this.to, this.mark)
  };

  RemoveMarkStep.prototype.map = function map (mapping) {
    var from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from.deleted && to.deleted || from.pos >= to.pos) { return null }
    return new RemoveMarkStep(from.pos, to.pos, this.mark)
  };

  RemoveMarkStep.prototype.merge = function merge (other) {
    if (other instanceof RemoveMarkStep &&
        other.mark.eq(this.mark) &&
        this.from <= other.to && this.to >= other.from)
      { return new RemoveMarkStep(Math.min(this.from, other.from),
                                Math.max(this.to, other.to), this.mark) }
  };

  RemoveMarkStep.prototype.toJSON = function toJSON () {
    return {stepType: "removeMark", mark: this.mark.toJSON(),
            from: this.from, to: this.to}
  };

  RemoveMarkStep.fromJSON = function fromJSON (schema, json) {
    return new RemoveMarkStep(json.from, json.to, schema.markFromJSON(json.mark))
  };

  return RemoveMarkStep;
}(Step));

Step.jsonID("removeMark", RemoveMarkStep);

// :: (number, number, Mark) → this
// Add the given mark to the inline content between `from` and `to`.
Transform.prototype.addMark = function(from, to, mark) {
  var this$1 = this;

  var removed = [], added = [], removing = null, adding = null;
  this.doc.nodesBetween(from, to, function (node, pos, parent) {
    if (!node.isInline) { return }
    var marks = node.marks;
    if (!mark.isInSet(marks) && parent.type.allowsMarkType(mark.type)) {
      var start = Math.max(pos, from), end = Math.min(pos + node.nodeSize, to);
      var newSet = mark.addToSet(marks);

      for (var i = 0; i < marks.length; i++) {
        if (!marks[i].isInSet(newSet)) {
          if (removing && removing.to == start && removing.mark.eq(marks[i]))
            { removing.to = end; }
          else
            { removed.push(removing = new RemoveMarkStep(start, end, marks[i])); }
        }
      }

      if (adding && adding.to == start)
        { adding.to = end; }
      else
        { added.push(adding = new AddMarkStep(start, end, mark)); }
    }
  });

  removed.forEach(function (s) { return this$1.step(s); });
  added.forEach(function (s) { return this$1.step(s); });
  return this
};

// :: (number, number, ?union<Mark, MarkType>) → this
// Remove marks from inline nodes between `from` and `to`. When `mark`
// is a single mark, remove precisely that mark. When it is a mark type,
// remove all marks of that type. When it is null, remove all marks of
// any type.
Transform.prototype.removeMark = function(from, to, mark) {
  var this$1 = this;
  if ( mark === void 0 ) mark = null;

  var matched = [], step = 0;
  this.doc.nodesBetween(from, to, function (node, pos) {
    if (!node.isInline) { return }
    step++;
    var toRemove = null;
    if (mark instanceof prosemirrorModel.MarkType) {
      var found = mark.isInSet(node.marks);
      if (found) { toRemove = [found]; }
    } else if (mark) {
      if (mark.isInSet(node.marks)) { toRemove = [mark]; }
    } else {
      toRemove = node.marks;
    }
    if (toRemove && toRemove.length) {
      var end = Math.min(pos + node.nodeSize, to);
      for (var i = 0; i < toRemove.length; i++) {
        var style = toRemove[i], found$1 = (void 0);
        for (var j = 0; j < matched.length; j++) {
          var m = matched[j];
          if (m.step == step - 1 && style.eq(matched[j].style)) { found$1 = m; }
        }
        if (found$1) {
          found$1.to = end;
          found$1.step = step;
        } else {
          matched.push({style: style, from: Math.max(pos, from), to: end, step: step});
        }
      }
    }
  });
  matched.forEach(function (m) { return this$1.step(new RemoveMarkStep(m.from, m.to, m.style)); });
  return this
};

// :: (number, NodeType, ?ContentMatch) → this
// Removes all marks and nodes from the content of the node at `pos`
// that don't match the given new parent node type. Accepts an
// optional starting [content match](#model.ContentMatch) as third
// argument.
Transform.prototype.clearIncompatible = function(pos, parentType, match) {
  var this$1 = this;
  if ( match === void 0 ) match = parentType.contentMatch;

  var node = this.doc.nodeAt(pos);
  var delSteps = [], cur = pos + 1;
  for (var i = 0; i < node.childCount; i++) {
    var child = node.child(i), end = cur + child.nodeSize;
    var allowed = match.matchType(child.type, child.attrs);
    if (!allowed) {
      delSteps.push(new ReplaceStep(cur, end, prosemirrorModel.Slice.empty));
    } else {
      match = allowed;
      for (var j = 0; j < child.marks.length; j++) { if (!parentType.allowsMarkType(child.marks[j].type))
        { this$1.step(new RemoveMarkStep(cur, end, child.marks[j])); } }
    }
    cur = end;
  }
  if (!match.validEnd) {
    var fill = match.fillBefore(prosemirrorModel.Fragment.empty, true);
    this.replace(cur, cur, new prosemirrorModel.Slice(fill, 0, 0));
  }
  for (var i$1 = delSteps.length - 1; i$1 >= 0; i$1--) { this$1.step(delSteps[i$1]); }
  return this
};

// :: (Node, number, ?number, ?Slice) → ?Step
// ‘Fit’ a slice into a given position in the document, producing a
// [step](#transform.Step) that inserts it. Will return null if
// there's no meaningful way to insert the slice here, or inserting it
// would be a no-op (an empty slice over an empty range).
function replaceStep(doc, from, to, slice) {
  if ( to === void 0 ) to = from;
  if ( slice === void 0 ) slice = prosemirrorModel.Slice.empty;

  if (from == to && !slice.size) { return null }

  var $from = doc.resolve(from), $to = doc.resolve(to);
  // Optimization -- avoid work if it's obvious that it's not needed.
  if (fitsTrivially($from, $to, slice)) { return new ReplaceStep(from, to, slice) }
  var placed = placeSlice($from, slice);

  var fittedLeft = fitLeft($from, placed);
  var fitted = fitRight($from, $to, fittedLeft);
  if (!fitted) { return null }
  if (fittedLeft.size != fitted.size && canMoveText($from, $to, fittedLeft)) {
    var d = $to.depth, after = $to.after(d);
    while (d > 1 && after == $to.end(--d)) { ++after; }
    var fittedAfter = fitRight($from, doc.resolve(after), fittedLeft);
    if (fittedAfter)
      { return new ReplaceAroundStep(from, after, to, $to.end(), fittedAfter, fittedLeft.size) }
  }
  return new ReplaceStep(from, to, fitted)
}

// :: (number, ?number, ?Slice) → this
// Replace the part of the document between `from` and `to` with the
// given `slice`.
Transform.prototype.replace = function(from, to, slice) {
  if ( to === void 0 ) to = from;
  if ( slice === void 0 ) slice = prosemirrorModel.Slice.empty;

  var step = replaceStep(this.doc, from, to, slice);
  if (step) { this.step(step); }
  return this
};

// :: (number, number, union<Fragment, Node, [Node]>) → this
// Replace the given range with the given content, which may be a
// fragment, node, or array of nodes.
Transform.prototype.replaceWith = function(from, to, content) {
  return this.replace(from, to, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(content), 0, 0))
};

// :: (number, number) → this
// Delete the content between the given positions.
Transform.prototype.delete = function(from, to) {
  return this.replace(from, to, prosemirrorModel.Slice.empty)
};

// :: (number, union<Fragment, Node, [Node]>) → this
// Insert the given content at the given position.
Transform.prototype.insert = function(pos, content) {
  return this.replaceWith(pos, pos, content)
};



function fitLeftInner($from, depth, placed, placedBelow) {
  var content = prosemirrorModel.Fragment.empty, openEnd = 0, placedHere = placed[depth];
  if ($from.depth > depth) {
    var inner = fitLeftInner($from, depth + 1, placed, placedBelow || placedHere);
    openEnd = inner.openEnd + 1;
    content = prosemirrorModel.Fragment.from($from.node(depth + 1).copy(inner.content));
  }

  if (placedHere) {
    content = content.append(placedHere.content);
    openEnd = placedHere.openEnd;
  }
  if (placedBelow) {
    content = content.append($from.node(depth).contentMatchAt($from.indexAfter(depth)).fillBefore(prosemirrorModel.Fragment.empty, true));
    openEnd = 0;
  }

  return {content: content, openEnd: openEnd}
}

function fitLeft($from, placed) {
  var ref = fitLeftInner($from, 0, placed, false);
  var content = ref.content;
  var openEnd = ref.openEnd;
  return new prosemirrorModel.Slice(content, $from.depth, openEnd || 0)
}

function fitRightJoin(content, parent, $from, $to, depth, openStart, openEnd) {
  var match, count = content.childCount, matchCount = count - (openEnd > 0 ? 1 : 0);
  if (openStart < 0)
    { match = parent.contentMatchAt(matchCount); }
  else if (count == 1 && openEnd > 0)
    { match = $from.node(depth).contentMatchAt(openStart ? $from.index(depth) : $from.indexAfter(depth)); }
  else
    { match = $from.node(depth).contentMatchAt($from.indexAfter(depth))
      .matchFragment(content, count > 0 && openStart ? 1 : 0, matchCount); }

  var toNode = $to.node(depth);
  if (openEnd > 0 && depth < $to.depth) {
    var after = toNode.content.cutByIndex($to.indexAfter(depth)).addToStart(content.lastChild);
    var joinable$1 = match.fillBefore(after, true);
    // Can't insert content if there's a single node stretched across this gap
    if (joinable$1 && joinable$1.size && openStart > 0 && count == 1) { joinable$1 = null; }

    if (joinable$1) {
      var inner = fitRightJoin(content.lastChild.content, content.lastChild, $from, $to,
                               depth + 1, count == 1 ? openStart - 1 : -1, openEnd - 1);
      if (inner) {
        var last = content.lastChild.copy(inner);
        if (joinable$1.size)
          { return content.cutByIndex(0, count - 1).append(joinable$1).addToEnd(last) }
        else
          { return content.replaceChild(count - 1, last) }
      }
    }
  }
  if (openEnd > 0)
    { match = match.matchType((count == 1 && openStart > 0 ? $from.node(depth + 1) : content.lastChild).type); }

  // If we're here, the next level can't be joined, so we see what
  // happens if we leave it open.
  var toIndex = $to.index(depth);
  if (toIndex == toNode.childCount && !toNode.type.compatibleContent(parent.type)) { return null }
  var joinable = match.fillBefore(toNode.content, true, toIndex);
  if (!joinable) { return null }

  if (openEnd > 0) {
    var closed = fitRightClosed(content.lastChild, openEnd - 1, $from, depth + 1,
                                count == 1 ? openStart - 1 : -1);
    content = content.replaceChild(count - 1, closed);
  }
  content = content.append(joinable);
  if ($to.depth > depth)
    { content = content.addToEnd(fitRightSeparate($to, depth + 1)); }
  return content
}

function fitRightClosed(node, openEnd, $from, depth, openStart) {
  var match, content = node.content, count = content.childCount;
  if (openStart >= 0)
    { match = $from.node(depth).contentMatchAt($from.indexAfter(depth))
      .matchFragment(content, openStart > 0 ? 1 : 0, count); }
  else
    { match = node.contentMatchAt(count); }

  if (openEnd > 0) {
    var closed = fitRightClosed(content.lastChild, openEnd - 1, $from, depth + 1,
                                count == 1 ? openStart - 1 : -1);
    content = content.replaceChild(count - 1, closed);
  }

  return node.copy(content.append(match.fillBefore(prosemirrorModel.Fragment.empty, true)))
}

function fitRightSeparate($to, depth) {
  var node = $to.node(depth);
  var fill = node.contentMatchAt(0).fillBefore(node.content, true, $to.index(depth));
  if ($to.depth > depth) { fill = fill.addToEnd(fitRightSeparate($to, depth + 1)); }
  return node.copy(fill)
}

function normalizeSlice(content, openStart, openEnd) {
  while (openStart > 0 && openEnd > 0 && content.childCount == 1) {
    content = content.firstChild.content;
    openStart--;
    openEnd--;
  }
  return new prosemirrorModel.Slice(content, openStart, openEnd)
}

// : (ResolvedPos, ResolvedPos, number, Slice) → Slice
function fitRight($from, $to, slice) {
  var fitted = fitRightJoin(slice.content, $from.node(0), $from, $to, 0, slice.openStart, slice.openEnd);
  if (!fitted) { return null }
  return normalizeSlice(fitted, slice.openStart, $to.depth)
}

function fitsTrivially($from, $to, slice) {
  return !slice.openStart && !slice.openEnd && $from.start() == $to.start() &&
    $from.parent.canReplace($from.index(), $to.index(), slice.content)
}

function canMoveText($from, $to, slice) {
  if (!$to.parent.isTextblock) { return false }

  var match;
  if (!slice.openEnd) {
    var parent = $from.node($from.depth - (slice.openStart - slice.openEnd));
    if (!parent.isTextblock) { return false }
    match = parent.contentMatchAt(parent.childCount);
    if (slice.size)
      { match = match.matchFragment(slice.content, slice.openStart ? 1 : 0); }
  } else {
    var parent$1 = nodeRight(slice.content, slice.openEnd);
    if (!parent$1.isTextblock) { return false }
    match = parent$1.contentMatchAt(parent$1.childCount);
  }
  match = match.matchFragment($to.parent.content, $to.index());
  return match && match.validEnd
}

// Algorithm for 'placing' the elements of a slice into a gap:
//
// We consider the content of each node that is open to the left to be
// independently placeable. I.e. in <p("foo"), p("bar")>, when the
// paragraph on the left is open, "foo" can be placed (somewhere on
// the left side of the replacement gap) independently from p("bar").
//
// So placeSlice splits up a slice into a number of sub-slices,
// along with information on where they can be placed on the given
// left-side edge. It works by walking the open side of the slice,
// from the inside out, and trying to find a landing spot for each
// element, by simultaneously scanning over the gap side. When no
// place is found for an open node's content, it is left in that node.
//
// If the outer content can't be placed, a set of wrapper nodes is
// made up for it (by rooting it in the document node type using
// findWrapping), and the algorithm continues to iterate over those.
// This is guaranteed to find a fit, since both stacks now start with
// the same node type (doc).

function nodeLeft(content, depth) {
  for (var i = 1; i < depth; i++) { content = content.firstChild.content; }
  return content.firstChild
}

function nodeRight(content, depth) {
  for (var i = 1; i < depth; i++) { content = content.lastChild.content; }
  return content.lastChild
}

// : (ResolvedPos, Slice) → [{content: Fragment, openEnd: number, depth: number}]
function placeSlice($from, slice) {
  var dFrom = $from.depth, unplaced = null;
  var placed = [], parents = null;

  // Loop over the open side of the slice, trying to find a place for
  // each open fragment.
  for (var dSlice = slice.openStart;; --dSlice) {
    // Get the components of the node at this level
    var curType = (void 0), curAttrs = (void 0), curMarks = (void 0), curFragment = (void 0);
    if (dSlice >= 0) {
      if (dSlice > 0) { // Inside slice
        var assign;
        ((assign = nodeLeft(slice.content, dSlice), curType = assign.type, curAttrs = assign.attrs, curFragment = assign.content, curMarks = assign.marks));
      } else if (dSlice == 0) { // Top of slice
        curFragment = slice.content;
        curMarks = prosemirrorModel.Mark.none;
      }
      if (dSlice < slice.openStart) { curFragment = curFragment.cutByIndex(1, curFragment.childCount); }
    } else { // Outside slice, in generated wrappers (see below)
      curFragment = prosemirrorModel.Fragment.empty
      ;var assign$1;
      ((assign$1 = parents[parents.length + dSlice - 1], curType = assign$1.type, curAttrs = assign$1.attrs, curMarks = assign$1.marks));
    }
    // If the last iteration left unplaced content, include it in the fragment
    if (unplaced) { curFragment = curFragment.addToStart(unplaced); }

    // If there's nothing left to place, we're done
    if (curFragment.size == 0 && dSlice <= 0) { break }

    // This will go through the positions in $from, down from dFrom,
    // to find a fit
    var found = findPlacement(curFragment, $from, dFrom, placed);
    if (found && unneccesaryFallthrough($from, dFrom, found.depth, slice, dSlice))
      { found = null; }

    if (found) {
      // If there was a fit, store it, and consider this content placed
      if (found.fragment.size > 0) {
        var openEnd = endOfContent(slice, dSlice) ? slice.openEnd - dSlice : 0;
        if (placed[found.depth] && curFragment.size == 0) { openEnd = placed[found.depth].openEnd; }
        placed[found.depth] = {content: found.fragment, openEnd: openEnd, depth: found.depth};
      }
      // If that was the last of the content, we're done
      if (dSlice <= 0) { break }
      unplaced = null;
      dFrom = found.depth - (curType == $from.node(found.depth).type ? 1 : 0);
    } else {
      if (dSlice == 0) {
        // This is the top of the slice, and we haven't found a place to insert it.
        var top = $from.node(0);
        // Try to find a wrapping that makes its first child fit in the top node.
        var wrap = top.contentMatchAt($from.index(0)).findWrapping(curFragment.firstChild.type);
        // If no such thing exists, give up.
        if (!wrap || wrap.length == 0) { break }
        var last = wrap[wrap.length - 1];
        // Check that the fragment actually fits in the wrapping.
        if (!last.validContent(curFragment)) { break }
        // Store the result for subsequent iterations.
        parents = [{type: top.type, attrs: top.attrs}].concat(wrap);
        curType = last;
        curAttrs = null;
      }
      if (curFragment.size) {
        curFragment = curType.contentMatch.fillBefore(curFragment, true).append(curFragment);
        unplaced = curType.create(curAttrs, curFragment, curMarks);
      } else {
        unplaced = null;
      }
    }
  }

  return placed
}

function endOfContent(slice, depth) {
  for (var i = 0, content = slice.content; i < depth; i++) {
    if (content.childCount > 1) { return false }
    content = content.firstChild.content;
  }
  return true
}

function findPlacement(fragment, $from, start, placed) {
  var hasMarks = false;
  for (var i = 0; i < fragment.childCount; i++)
    { if (fragment.child(i).marks.length) { hasMarks = true; } }
  for (var d = start; d >= 0; d--) {
    var parent = $from.node(d), startMatch = parent.contentMatchAt($from.indexAfter(d));
    var existing = placed[d];
    if (existing) { startMatch = startMatch.matchFragment(existing.content); }
    var match = startMatch.fillBefore(fragment);
    if (match) { return {depth: d, fragment: (existing ? existing.content.append(match) : match).append(fragment)} }
    if (hasMarks) {
      var stripped = matchStrippingMarks(parent.type, startMatch, fragment);
      if (stripped) { return {depth: d, fragment: existing ? existing.content.append(stripped) : stripped} }
    }
  }
}

function matchStrippingMarks(type, match, fragment) {
  var newNodes = [];
  for (var i = 0; i < fragment.childCount; i++) {
    var node = fragment.child(i);
    match = match.matchType(node.type);
    if (!match) { return null }
    newNodes.push(node.mark(type.allowedMarks(node.marks)));
  }
  return prosemirrorModel.Fragment.from(newNodes)
}

function unneccesaryFallthrough($from, dFrom, dFound, slice, dSlice) {
  if (dSlice < 1) { return false }
  for (; dFrom > dFound; dFrom--) {
    var parent = $from.node(dFrom), here = parent.contentMatchAt($from.indexAfter(dFrom));
    for (var d = dSlice - 1; d >= 0; d--) {
      var node = nodeLeft(slice.content, d);
      if (here.matchType(node.type) && parent.type.allowsMarks(node.marks)) { return true }
    }
  }
  return false
}

// :: (number, number, Slice) → this
// Replace a range of the document with a given slice, using `from`,
// `to`, and the slice's [`openStart`](#model.Slice.openStart) property
// as hints, rather than fixed start and end points. This method may
// grow the replaced area or close open nodes in the slice in order to
// get a fit that is more in line with WYSIWYG expectations, by
// dropping fully covered parent nodes of the replaced region when
// they are marked [non-defining](#model.NodeSpec.defining), or
// including an open parent node from the slice that _is_ marked as
// [defining](#model.NodeSpec.defining).
//
// This is the method, for example, to handle paste. The similar
// [`replace`](#transform.Transform.replace) method is a more
// primitive tool which will _not_ move the start and end of its given
// range, and is useful in situations where you need more precise
// control over what happens.
Transform.prototype.replaceRange = function(from, to, slice) {
  var this$1 = this;

  if (!slice.size) { return this.deleteRange(from, to) }

  var $from = this.doc.resolve(from), $to = this.doc.resolve(to);
  if (fitsTrivially($from, $to, slice))
    { return this.step(new ReplaceStep(from, to, slice)) }

  var targetDepths = coveredDepths($from, this.doc.resolve(to));
  // Can't replace the whole document, so remove 0 if it's present
  if (targetDepths[targetDepths.length - 1] == 0) { targetDepths.pop(); }
  // Negative numbers represent not expansion over the whole node at
  // that depth, but replacing from $from.before(-D) to $to.pos.
  var preferredTarget = -($from.depth + 1);
  targetDepths.unshift(preferredTarget);
  // This loop picks a preferred target depth, if one of the covering
  // depths is not outside of a defining node, and adds negative
  // depths for any depth that has $from at its start and does not
  // cross a defining node.
  for (var d = $from.depth, pos = $from.pos - 1; d > 0; d--, pos--) {
    var spec = $from.node(d).type.spec;
    if (spec.defining || spec.isolating) { break }
    if (targetDepths.indexOf(d) > -1) { preferredTarget = d; }
    else if ($from.before(d) == pos) { targetDepths.splice(1, 0, -d); }
  }

  var leftNodes = [], preferredDepth = slice.openStart;
  for (var content = slice.content, i = 0;; i++) {
    var node = content.firstChild;
    leftNodes.push(node);
    if (i == slice.openStart) { break }
    content = node.content;
  }
  // Back up if the node directly above openStart, or the node above
  // that separated only by a non-defining textblock node, is defining.
  if (preferredDepth > 0 && leftNodes[preferredDepth - 1].type.spec.defining)
    { preferredDepth -= 1; }
  else if (preferredDepth >= 2 && leftNodes[preferredDepth - 1].isTextblock && leftNodes[preferredDepth - 2].type.spec.defining)
    { preferredDepth -= 2; }

  // Try to fit each possible depth of the slice into each possible
  // target depth, starting with the preferred depths.
  var preferredTargetIndex = targetDepths.indexOf(preferredTarget);
  for (var j = slice.openStart; j >= 0; j--) {
    var openDepth = (j + preferredDepth + 1) % (slice.openStart + 1);
    var insert = leftNodes[openDepth];
    if (!insert) { continue }
    for (var i$1 = 0; i$1 < targetDepths.length; i$1++) {
      // Loop over possible expansion levels, starting with the
      // preferred one
      var targetDepth = targetDepths[(i$1 + preferredTargetIndex) % targetDepths.length], expand = true;
      if (targetDepth < 0) { expand = false; targetDepth = -targetDepth; }
      var parent = $from.node(targetDepth - 1), index = $from.index(targetDepth - 1);
      if (parent.canReplaceWith(index, index, insert.type, insert.marks))
        { return this$1.replace($from.before(targetDepth), expand ? $to.after(targetDepth) : to,
                            new prosemirrorModel.Slice(closeFragment(slice.content, 0, slice.openStart, openDepth),
                                      openDepth, slice.openEnd)) }
    }
  }

  return this.replace(from, to, slice)
};

function closeFragment(fragment, depth, oldOpen, newOpen, parent) {
  if (depth < oldOpen) {
    var first = fragment.firstChild;
    fragment = fragment.replaceChild(0, first.copy(closeFragment(first.content, depth + 1, oldOpen, newOpen, first)));
  }
  if (depth > newOpen)
    { fragment = parent.contentMatchAt(0).fillBefore(fragment).append(fragment); }
  return fragment
}

// :: (number, number, Node) → this
// Replace the given range with a node, but use `from` and `to` as
// hints, rather than precise positions. When from and to are the same
// and are at the start or end of a parent node in which the given
// node doesn't fit, this method may _move_ them out towards a parent
// that does allow the given node to be placed. When the given range
// completely covers a parent node, this method may completely replace
// that parent node.
Transform.prototype.replaceRangeWith = function(from, to, node) {
  if (!node.isInline && from == to && this.doc.resolve(from).parent.content.size) {
    var point = insertPoint(this.doc, from, node.type);
    if (point != null) { from = to = point; }
  }
  return this.replaceRange(from, to, new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(node), 0, 0))
};

// :: (number, number) → this
// Delete the given range, expanding it to cover fully covered
// parent nodes until a valid replace is found.
Transform.prototype.deleteRange = function(from, to) {
  var $from = this.doc.resolve(from), $to = this.doc.resolve(to);
  var covered = coveredDepths($from, $to);
  for (var i = 0; i < covered.length; i++) {
    var depth = covered[i], last = i == covered.length - 1;
    if ((last && depth == 0) || $from.node(depth).type.contentMatch.validEnd) {
      from = $from.start(depth);
      to = $to.end(depth);
      break
    }
    if (depth > 0 && (last || $from.node(depth - 1).canReplace($from.index(depth - 1), $to.indexAfter(depth - 1)))) {
      from = $from.before(depth);
      to = $to.after(depth);
      break
    }
  }
  return this.delete(from, to)
};

// : (ResolvedPos, ResolvedPos) → [number]
// Returns an array of all depths for which $from - $to spans the
// whole content of the nodes at that depth.
function coveredDepths($from, $to) {
  var result = [], minDepth = Math.min($from.depth, $to.depth);
  for (var d = minDepth; d >= 0; d--) {
    var start = $from.start(d);
    if (start < $from.pos - ($from.depth - d) ||
        $to.end(d) > $to.pos + ($to.depth - d) ||
        $from.node(d).type.spec.isolating ||
        $to.node(d).type.spec.isolating) { break }
    if (start == $to.start(d)) { result.push(d); }
  }
  return result
}

exports.Transform = Transform;
exports.TransformError = TransformError;
exports.Step = Step;
exports.StepResult = StepResult;
exports.joinPoint = joinPoint;
exports.canJoin = canJoin;
exports.canSplit = canSplit;
exports.insertPoint = insertPoint;
exports.liftTarget = liftTarget;
exports.findWrapping = findWrapping;
exports.StepMap = StepMap;
exports.MapResult = MapResult;
exports.Mapping = Mapping;
exports.AddMarkStep = AddMarkStep;
exports.RemoveMarkStep = RemoveMarkStep;
exports.ReplaceStep = ReplaceStep;
exports.ReplaceAroundStep = ReplaceAroundStep;
exports.replaceStep = replaceStep;
//# sourceMappingURL=index.js.map


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var OrderedMap = _interopDefault(__webpack_require__(333));

function findDiffStart(a, b, pos) {
  for (var i = 0;; i++) {
    if (i == a.childCount || i == b.childCount)
      { return a.childCount == b.childCount ? null : pos }

    var childA = a.child(i), childB = b.child(i);
    if (childA == childB) { pos += childA.nodeSize; continue }

    if (!childA.sameMarkup(childB)) { return pos }

    if (childA.isText && childA.text != childB.text) {
      for (var j = 0; childA.text[j] == childB.text[j]; j++)
        { pos++; }
      return pos
    }
    if (childA.content.size || childB.content.size) {
      var inner = findDiffStart(childA.content, childB.content, pos + 1);
      if (inner != null) { return inner }
    }
    pos += childA.nodeSize;
  }
}

function findDiffEnd(a, b, posA, posB) {
  for (var iA = a.childCount, iB = b.childCount;;) {
    if (iA == 0 || iB == 0)
      { return iA == iB ? null : {a: posA, b: posB} }

    var childA = a.child(--iA), childB = b.child(--iB), size = childA.nodeSize;
    if (childA == childB) {
      posA -= size; posB -= size;
      continue
    }

    if (!childA.sameMarkup(childB)) { return {a: posA, b: posB} }

    if (childA.isText && childA.text != childB.text) {
      var same = 0, minSize = Math.min(childA.text.length, childB.text.length);
      while (same < minSize && childA.text[childA.text.length - same - 1] == childB.text[childB.text.length - same - 1]) {
        same++; posA--; posB--;
      }
      return {a: posA, b: posB}
    }
    if (childA.content.size || childB.content.size) {
      var inner = findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
      if (inner) { return inner }
    }
    posA -= size; posB -= size;
  }
}

// ::- A fragment represents a node's collection of child nodes.
//
// Like nodes, fragments are persistent data structures, and you
// should not mutate them or their content. Rather, you create new
// instances whenever needed. The API tries to make this easy.
var Fragment = function Fragment(content, size) {
  var this$1 = this;

  this.content = content;
  // :: number
  // The size of the fragment, which is the total of the size of its
  // content nodes.
  this.size = size || 0;
  if (size == null) { for (var i = 0; i < content.length; i++)
    { this$1.size += content[i].nodeSize; } }
};

var prototypeAccessors$1 = { firstChild: {},lastChild: {},childCount: {} };

// :: (number, number, (node: Node, start: number, parent: Node, index: number) → ?bool)
// Invoke a callback for all descendant nodes between the given two
// positions (relative to start of this fragment). Doesn't descend
// into a node when the callback returns `false`.
Fragment.prototype.nodesBetween = function nodesBetween (from, to, f, nodeStart, parent) {
    var this$1 = this;
    if ( nodeStart === void 0 ) nodeStart = 0;

  for (var i = 0, pos = 0; pos < to; i++) {
    var child = this$1.content[i], end = pos + child.nodeSize;
    if (end > from && f(child, nodeStart + pos, parent, i) !== false && child.content.size) {
      var start = pos + 1;
      child.nodesBetween(Math.max(0, from - start),
                         Math.min(child.content.size, to - start),
                         f, nodeStart + start);
    }
    pos = end;
  }
};

// :: ((node: Node, pos: number, parent: Node) → ?bool)
// Call the given callback for every descendant node. The callback
// may return `false` to prevent traversal of a given node's children.
Fragment.prototype.descendants = function descendants (f) {
  this.nodesBetween(0, this.size, f);
};

// : (number, number, ?string, ?string) → string
Fragment.prototype.textBetween = function textBetween (from, to, blockSeparator, leafText) {
  var text = "", separated = true;
  this.nodesBetween(from, to, function (node, pos) {
    if (node.isText) {
      text += node.text.slice(Math.max(from, pos) - pos, to - pos);
      separated = !blockSeparator;
    } else if (node.isLeaf && leafText) {
      text += leafText;
      separated = !blockSeparator;
    } else if (!separated && node.isBlock) {
      text += blockSeparator;
      separated = true;
    }
  }, 0);
  return text
};

// :: (Fragment) → Fragment
// Create a new fragment containing the combined content of this
// fragment and the other.
Fragment.prototype.append = function append (other) {
  if (!other.size) { return this }
  if (!this.size) { return other }
  var last = this.lastChild, first = other.firstChild, content = this.content.slice(), i = 0;
  if (last.isText && last.sameMarkup(first)) {
    content[content.length - 1] = last.withText(last.text + first.text);
    i = 1;
  }
  for (; i < other.content.length; i++) { content.push(other.content[i]); }
  return new Fragment(content, this.size + other.size)
};

// :: (number, ?number) → Fragment
// Cut out the sub-fragment between the two given positions.
Fragment.prototype.cut = function cut (from, to) {
    var this$1 = this;

  if (to == null) { to = this.size; }
  if (from == 0 && to == this.size) { return this }
  var result = [], size = 0;
  if (to > from) { for (var i = 0, pos = 0; pos < to; i++) {
    var child = this$1.content[i], end = pos + child.nodeSize;
    if (end > from) {
      if (pos < from || end > to) {
        if (child.isText)
          { child = child.cut(Math.max(0, from - pos), Math.min(child.text.length, to - pos)); }
        else
          { child = child.cut(Math.max(0, from - pos - 1), Math.min(child.content.size, to - pos - 1)); }
      }
      result.push(child);
      size += child.nodeSize;
    }
    pos = end;
  } }
  return new Fragment(result, size)
};

Fragment.prototype.cutByIndex = function cutByIndex (from, to) {
  if (from == to) { return Fragment.empty }
  if (from == 0 && to == this.content.length) { return this }
  return new Fragment(this.content.slice(from, to))
};

// :: (number, Node) → Fragment
// Create a new fragment in which the node at the given index is
// replaced by the given node.
Fragment.prototype.replaceChild = function replaceChild (index, node) {
  var current = this.content[index];
  if (current == node) { return this }
  var copy = this.content.slice();
  var size = this.size + node.nodeSize - current.nodeSize;
  copy[index] = node;
  return new Fragment(copy, size)
};

// : (Node) → Fragment
// Create a new fragment by prepending the given node to this
// fragment.
Fragment.prototype.addToStart = function addToStart (node) {
  return new Fragment([node].concat(this.content), this.size + node.nodeSize)
};

// : (Node) → Fragment
// Create a new fragment by appending the given node to this
// fragment.
Fragment.prototype.addToEnd = function addToEnd (node) {
  return new Fragment(this.content.concat(node), this.size + node.nodeSize)
};

// :: (Fragment) → bool
// Compare this fragment to another one.
Fragment.prototype.eq = function eq (other) {
    var this$1 = this;

  if (this.content.length != other.content.length) { return false }
  for (var i = 0; i < this.content.length; i++)
    { if (!this$1.content[i].eq(other.content[i])) { return false } }
  return true
};

// :: ?Node
// The first child of the fragment, or `null` if it is empty.
prototypeAccessors$1.firstChild.get = function () { return this.content.length ? this.content[0] : null };

// :: ?Node
// The last child of the fragment, or `null` if it is empty.
prototypeAccessors$1.lastChild.get = function () { return this.content.length ? this.content[this.content.length - 1] : null };

// :: number
// The number of child nodes in this fragment.
prototypeAccessors$1.childCount.get = function () { return this.content.length };

// :: (number) → Node
// Get the child node at the given index. Raise an error when the
// index is out of range.
Fragment.prototype.child = function child (index) {
  var found = this.content[index];
  if (!found) { throw new RangeError("Index " + index + " out of range for " + this) }
  return found
};

// :: (number) → ?Node
// Get the child node at the given index, if it exists.
Fragment.prototype.maybeChild = function maybeChild (index) {
  return this.content[index]
};

// :: ((node: Node, offset: number, index: number))
// Call `f` for every child node, passing the node, its offset
// into this parent node, and its index.
Fragment.prototype.forEach = function forEach (f) {
    var this$1 = this;

  for (var i = 0, p = 0; i < this.content.length; i++) {
    var child = this$1.content[i];
    f(child, p, i);
    p += child.nodeSize;
  }
};

// :: (Fragment) → ?number
// Find the first position at which this fragment and another
// fragment differ, or `null` if they are the same.
Fragment.prototype.findDiffStart = function findDiffStart$1 (other, pos) {
    if ( pos === void 0 ) pos = 0;

  return findDiffStart(this, other, pos)
};

// :: (Node) → ?{a: number, b: number}
// Find the first position, searching from the end, at which this
// fragment and the given fragment differ, or `null` if they are the
// same. Since this position will not be the same in both nodes, an
// object with two separate positions is returned.
Fragment.prototype.findDiffEnd = function findDiffEnd$1 (other, pos, otherPos) {
    if ( pos === void 0 ) pos = this.size;
    if ( otherPos === void 0 ) otherPos = other.size;

  return findDiffEnd(this, other, pos, otherPos)
};

// : (number, ?number) → {index: number, offset: number}
// Find the index and inner offset corresponding to a given relative
// position in this fragment. The result object will be reused
// (overwritten) the next time the function is called. (Not public.)
Fragment.prototype.findIndex = function findIndex (pos, round) {
    var this$1 = this;
    if ( round === void 0 ) round = -1;

  if (pos == 0) { return retIndex(0, pos) }
  if (pos == this.size) { return retIndex(this.content.length, pos) }
  if (pos > this.size || pos < 0) { throw new RangeError(("Position " + pos + " outside of fragment (" + (this) + ")")) }
  for (var i = 0, curPos = 0;; i++) {
    var cur = this$1.child(i), end = curPos + cur.nodeSize;
    if (end >= pos) {
      if (end == pos || round > 0) { return retIndex(i + 1, end) }
      return retIndex(i, curPos)
    }
    curPos = end;
  }
};

// :: () → string
// Return a debugging string that describes this fragment.
Fragment.prototype.toString = function toString () { return "<" + this.toStringInner() + ">" };

Fragment.prototype.toStringInner = function toStringInner () { return this.content.join(", ") };

// :: () → ?Object
// Create a JSON-serializeable representation of this fragment.
Fragment.prototype.toJSON = function toJSON () {
  return this.content.length ? this.content.map(function (n) { return n.toJSON(); }) : null
};

// :: (Schema, ?Object) → Fragment
// Deserialize a fragment from its JSON representation.
Fragment.fromJSON = function fromJSON (schema, value) {
  return value ? new Fragment(value.map(schema.nodeFromJSON)) : Fragment.empty
};

// :: ([Node]) → Fragment
// Build a fragment from an array of nodes. Ensures that adjacent
// text nodes with the same marks are joined together.
Fragment.fromArray = function fromArray (array) {
  if (!array.length) { return Fragment.empty }
  var joined, size = 0;
  for (var i = 0; i < array.length; i++) {
    var node = array[i];
    size += node.nodeSize;
    if (i && node.isText && array[i - 1].sameMarkup(node)) {
      if (!joined) { joined = array.slice(0, i); }
      joined[joined.length - 1] = node.withText(joined[joined.length - 1].text + node.text);
    } else if (joined) {
      joined.push(node);
    }
  }
  return new Fragment(joined || array, size)
};

// :: (?union<Fragment, Node, [Node]>) → Fragment
// Create a fragment from something that can be interpreted as a set
// of nodes. For `null`, it returns the empty fragment. For a
// fragment, the fragment itself. For a node or array of nodes, a
// fragment containing those nodes.
Fragment.from = function from (nodes) {
  if (!nodes) { return Fragment.empty }
  if (nodes instanceof Fragment) { return nodes }
  if (Array.isArray(nodes)) { return this.fromArray(nodes) }
  return new Fragment([nodes], nodes.nodeSize)
};

Object.defineProperties( Fragment.prototype, prototypeAccessors$1 );

var found = {index: 0, offset: 0};
function retIndex(index, offset) {
  found.index = index;
  found.offset = offset;
  return found
}

// :: Fragment
// An empty fragment. Intended to be reused whenever a node doesn't
// contain anything (rather than allocating a new empty fragment for
// each leaf node).
Fragment.empty = new Fragment([], 0);

function compareDeep(a, b) {
  if (a === b) { return true }
  if (!(a && typeof a == "object") ||
      !(b && typeof b == "object")) { return false }
  var array = Array.isArray(a);
  if (Array.isArray(b) != array) { return false }
  if (array) {
    if (a.length != b.length) { return false }
    for (var i = 0; i < a.length; i++) { if (!compareDeep(a[i], b[i])) { return false } }
  } else {
    for (var p in a) { if (!(p in b) || !compareDeep(a[p], b[p])) { return false } }
    for (var p$1 in b) { if (!(p$1 in a)) { return false } }
  }
  return true
}

// ::- A mark is a piece of information that can be attached to a node,
// such as it being emphasized, in code font, or a link. It has a type
// and optionally a set of attributes that provide further information
// (such as the target of the link). Marks are created through a
// `Schema`, which controls which types exist and which
// attributes they have.
var Mark = function Mark(type, attrs) {
  // :: MarkType
  // The type of this mark.
  this.type = type;
  // :: Object
  // The attributes associated with this mark.
  this.attrs = attrs;
};

// :: ([Mark]) → [Mark]
// Given a set of marks, create a new set which contains this one as
// well, in the right position. If this mark is already in the set,
// the set itself is returned. If any marks that are set to be
// [exclusive](#model.MarkSpec.excludes) with this mark are present,
// those are replaced by this one.
Mark.prototype.addToSet = function addToSet (set) {
    var this$1 = this;

  var copy, placed = false;
  for (var i = 0; i < set.length; i++) {
    var other = set[i];
    if (this$1.eq(other)) { return set }
    if (this$1.type.excludes(other.type)) {
      if (!copy) { copy = set.slice(0, i); }
    } else if (other.type.excludes(this$1.type)) {
      return set
    } else {
      if (!placed && other.type.rank > this$1.type.rank) {
        if (!copy) { copy = set.slice(0, i); }
        copy.push(this$1);
        placed = true;
      }
      if (copy) { copy.push(other); }
    }
  }
  if (!copy) { copy = set.slice(); }
  if (!placed) { copy.push(this); }
  return copy
};

// :: ([Mark]) → [Mark]
// Remove this mark from the given set, returning a new set. If this
// mark is not in the set, the set itself is returned.
Mark.prototype.removeFromSet = function removeFromSet (set) {
    var this$1 = this;

  for (var i = 0; i < set.length; i++)
    { if (this$1.eq(set[i]))
      { return set.slice(0, i).concat(set.slice(i + 1)) } }
  return set
};

// :: ([Mark]) → bool
// Test whether this mark is in the given set of marks.
Mark.prototype.isInSet = function isInSet (set) {
    var this$1 = this;

  for (var i = 0; i < set.length; i++)
    { if (this$1.eq(set[i])) { return true } }
  return false
};

// :: (Mark) → bool
// Test whether this mark has the same type and attributes as
// another mark.
Mark.prototype.eq = function eq (other) {
  return this == other ||
    (this.type == other.type && compareDeep(this.attrs, other.attrs))
};

// :: () → Object
// Convert this mark to a JSON-serializeable representation.
Mark.prototype.toJSON = function toJSON () {
    var this$1 = this;

  var obj = {type: this.type.name};
  for (var _ in this$1.attrs) {
    obj.attrs = this$1.attrs;
    break
  }
  return obj
};

// :: (Schema, Object) → Mark
Mark.fromJSON = function fromJSON (schema, json) {
  var type = schema.marks[json.type];
  if (!type) { throw new RangeError(("There is no mark type " + (json.type) + " in this schema")) }
  return type.create(json.attrs)
};

// :: ([Mark], [Mark]) → bool
// Test whether two sets of marks are identical.
Mark.sameSet = function sameSet (a, b) {
  if (a == b) { return true }
  if (a.length != b.length) { return false }
  for (var i = 0; i < a.length; i++)
    { if (!a[i].eq(b[i])) { return false } }
  return true
};

// :: (?union<Mark, [Mark]>) → [Mark]
// Create a properly sorted mark set from null, a single mark, or an
// unsorted array of marks.
Mark.setFrom = function setFrom (marks) {
  if (!marks || marks.length == 0) { return Mark.none }
  if (marks instanceof Mark) { return [marks] }
  var copy = marks.slice();
  copy.sort(function (a, b) { return a.type.rank - b.type.rank; });
  return copy
};

// :: [Mark] The empty set of marks.
Mark.none = [];

// ::- Error type raised by [`Node.replace`](#model.Node.replace) when
// given an invalid replacement.
var ReplaceError = (function (Error) {
  function ReplaceError(message) {
    Error.call(this, message);
    this.message = message;
  }

  if ( Error ) ReplaceError.__proto__ = Error;
  ReplaceError.prototype = Object.create( Error && Error.prototype );
  ReplaceError.prototype.constructor = ReplaceError;

  var prototypeAccessors = { name: {} };
  prototypeAccessors.name.get = function () { return "ReplaceError" };

  Object.defineProperties( ReplaceError.prototype, prototypeAccessors );

  return ReplaceError;
}(Error));

// ::- A slice represents a piece cut out of a larger document. It
// stores not only a fragment, but also the depth up to which nodes on
// both side are ‘open’ (cut through).
var Slice = function Slice(content, openStart, openEnd) {
  // :: Fragment The slice's content.
  this.content = content;
  // :: number The open depth at the start.
  this.openStart = openStart;
  // :: number The open depth at the end.
  this.openEnd = openEnd;
};

var prototypeAccessors$1$1 = { size: {} };

// :: number
// The size this slice would add when inserted into a document.
prototypeAccessors$1$1.size.get = function () {
  return this.content.size - this.openStart - this.openEnd
};

Slice.prototype.insertAt = function insertAt (pos, fragment) {
  var content = insertInto(this.content, pos + this.openStart, fragment, null);
  return content && new Slice(content, this.openStart, this.openEnd)
};

Slice.prototype.removeBetween = function removeBetween (from, to) {
  return new Slice(removeRange(this.content, from + this.openStart, to + this.openStart), this.openStart, this.openEnd)
};

// :: (Slice) → bool
// Tests whether this slice is equal to another slice.
Slice.prototype.eq = function eq (other) {
  return this.content.eq(other.content) && this.openStart == other.openStart && this.openEnd == other.openEnd
};

Slice.prototype.toString = function toString () {
  return this.content + "(" + this.openStart + "," + this.openEnd + ")"
};

// :: () → ?Object
// Convert a slice to a JSON-serializable representation.
Slice.prototype.toJSON = function toJSON () {
  if (!this.content.size) { return null }
  var json = {content: this.content.toJSON()};
  if (this.openStart > 0) { json.openStart = this.openStart; }
  if (this.openEnd > 0) { json.openEnd = this.openEnd; }
  return json
};

// :: (Schema, ?Object) → Slice
// Deserialize a slice from its JSON representation.
Slice.fromJSON = function fromJSON (schema, json) {
  if (!json) { return Slice.empty }
  return new Slice(Fragment.fromJSON(schema, json.content), json.openStart || 0, json.openEnd || 0)
};

// :: (Fragment) → Slice
// Create a slice from a fragment by taking the maximum possible
// open value on both side of the fragment.
Slice.maxOpen = function maxOpen (fragment) {
  var openStart = 0, openEnd = 0;
  for (var n = fragment.firstChild; n && !n.isLeaf; n = n.firstChild) { openStart++; }
  for (var n$1 = fragment.lastChild; n$1 && !n$1.isLeaf; n$1 = n$1.lastChild) { openEnd++; }
  return new Slice(fragment, openStart, openEnd)
};

Object.defineProperties( Slice.prototype, prototypeAccessors$1$1 );

function removeRange(content, from, to) {
  var ref = content.findIndex(from);
  var index = ref.index;
  var offset = ref.offset;
  var child = content.maybeChild(index);
  var ref$1 = content.findIndex(to);
  var indexTo = ref$1.index;
  var offsetTo = ref$1.offset;
  if (offset == from || child.isText) {
    if (offsetTo != to && !content.child(indexTo).isText) { throw new RangeError("Removing non-flat range") }
    return content.cut(0, from).append(content.cut(to))
  }
  if (index != indexTo) { throw new RangeError("Removing non-flat range") }
  return content.replaceChild(index, child.copy(removeRange(child.content, from - offset - 1, to - offset - 1)))
}

function insertInto(content, dist, insert, parent) {
  var ref = content.findIndex(dist);
  var index = ref.index;
  var offset = ref.offset;
  var child = content.maybeChild(index);
  if (offset == dist || child.isText) {
    if (parent && !parent.canReplace(index, index, insert)) { return null }
    return content.cut(0, dist).append(insert).append(content.cut(dist))
  }
  var inner = insertInto(child.content, dist - offset - 1, insert);
  return inner && content.replaceChild(index, child.copy(inner))
}

// :: Slice
// The empty slice.
Slice.empty = new Slice(Fragment.empty, 0, 0);

function replace($from, $to, slice) {
  if (slice.openStart > $from.depth)
    { throw new ReplaceError("Inserted content deeper than insertion position") }
  if ($from.depth - slice.openStart != $to.depth - slice.openEnd)
    { throw new ReplaceError("Inconsistent open depths") }
  return replaceOuter($from, $to, slice, 0)
}

function replaceOuter($from, $to, slice, depth) {
  var index = $from.index(depth), node = $from.node(depth);
  if (index == $to.index(depth) && depth < $from.depth - slice.openStart) {
    var inner = replaceOuter($from, $to, slice, depth + 1);
    return node.copy(node.content.replaceChild(index, inner))
  } else if (!slice.content.size) {
    return close(node, replaceTwoWay($from, $to, depth))
  } else if (!slice.openStart && !slice.openEnd && $from.depth == depth && $to.depth == depth) { // Simple, flat case
    var parent = $from.parent, content = parent.content;
    return close(parent, content.cut(0, $from.parentOffset).append(slice.content).append(content.cut($to.parentOffset)))
  } else {
    var ref = prepareSliceForReplace(slice, $from);
    var start = ref.start;
    var end = ref.end;
    return close(node, replaceThreeWay($from, start, end, $to, depth))
  }
}

function checkJoin(main, sub) {
  if (!sub.type.compatibleContent(main.type))
    { throw new ReplaceError("Cannot join " + sub.type.name + " onto " + main.type.name) }
}

function joinable($before, $after, depth) {
  var node = $before.node(depth);
  checkJoin(node, $after.node(depth));
  return node
}

function addNode(child, target) {
  var last = target.length - 1;
  if (last >= 0 && child.isText && child.sameMarkup(target[last]))
    { target[last] = child.withText(target[last].text + child.text); }
  else
    { target.push(child); }
}

function addRange($start, $end, depth, target) {
  var node = ($end || $start).node(depth);
  var startIndex = 0, endIndex = $end ? $end.index(depth) : node.childCount;
  if ($start) {
    startIndex = $start.index(depth);
    if ($start.depth > depth) {
      startIndex++;
    } else if ($start.textOffset) {
      addNode($start.nodeAfter, target);
      startIndex++;
    }
  }
  for (var i = startIndex; i < endIndex; i++) { addNode(node.child(i), target); }
  if ($end && $end.depth == depth && $end.textOffset)
    { addNode($end.nodeBefore, target); }
}

function close(node, content) {
  if (!node.type.validContent(content))
    { throw new ReplaceError("Invalid content for node " + node.type.name) }
  return node.copy(content)
}

function replaceThreeWay($from, $start, $end, $to, depth) {
  var openStart = $from.depth > depth && joinable($from, $start, depth + 1);
  var openEnd = $to.depth > depth && joinable($end, $to, depth + 1);

  var content = [];
  addRange(null, $from, depth, content);
  if (openStart && openEnd && $start.index(depth) == $end.index(depth)) {
    checkJoin(openStart, openEnd);
    addNode(close(openStart, replaceThreeWay($from, $start, $end, $to, depth + 1)), content);
  } else {
    if (openStart)
      { addNode(close(openStart, replaceTwoWay($from, $start, depth + 1)), content); }
    addRange($start, $end, depth, content);
    if (openEnd)
      { addNode(close(openEnd, replaceTwoWay($end, $to, depth + 1)), content); }
  }
  addRange($to, null, depth, content);
  return new Fragment(content)
}

function replaceTwoWay($from, $to, depth) {
  var content = [];
  addRange(null, $from, depth, content);
  if ($from.depth > depth) {
    var type = joinable($from, $to, depth + 1);
    addNode(close(type, replaceTwoWay($from, $to, depth + 1)), content);
  }
  addRange($to, null, depth, content);
  return new Fragment(content)
}

function prepareSliceForReplace(slice, $along) {
  var extra = $along.depth - slice.openStart, parent = $along.node(extra);
  var node = parent.copy(slice.content);
  for (var i = extra - 1; i >= 0; i--)
    { node = $along.node(i).copy(Fragment.from(node)); }
  return {start: node.resolveNoCache(slice.openStart + extra),
          end: node.resolveNoCache(node.content.size - slice.openEnd - extra)}
}

// ::- You can [_resolve_](#model.Node.resolve) a position to get more
// information about it. Objects of this class represent such a
// resolved position, providing various pieces of context information,
// and some helper methods.
//
// Throughout this interface, methods that take an optional `depth`
// parameter will interpret undefined as `this.depth` and negative
// numbers as `this.depth + value`.
var ResolvedPos = function ResolvedPos(pos, path, parentOffset) {
  // :: number The position that was resolved.
  this.pos = pos;
  this.path = path;
  // :: number
  // The number of levels the parent node is from the root. If this
  // position points directly into the root node, it is 0. If it
  // points into a top-level paragraph, 1, and so on.
  this.depth = path.length / 3 - 1;
  // :: number The offset this position has into its parent node.
  this.parentOffset = parentOffset;
};

var prototypeAccessors$2 = { parent: {},doc: {},textOffset: {},nodeAfter: {},nodeBefore: {} };

ResolvedPos.prototype.resolveDepth = function resolveDepth (val) {
  if (val == null) { return this.depth }
  if (val < 0) { return this.depth + val }
  return val
};

// :: Node
// The parent node that the position points into. Note that even if
// a position points into a text node, that node is not considered
// the parent—text nodes are ‘flat’ in this model, and have no content.
prototypeAccessors$2.parent.get = function () { return this.node(this.depth) };

// :: Node
// The root node in which the position was resolved.
prototypeAccessors$2.doc.get = function () { return this.node(0) };

// :: (?number) → Node
// The ancestor node at the given level. `p.node(p.depth)` is the
// same as `p.parent`.
ResolvedPos.prototype.node = function node (depth) { return this.path[this.resolveDepth(depth) * 3] };

// :: (?number) → number
// The index into the ancestor at the given level. If this points at
// the 3rd node in the 2nd paragraph on the top level, for example,
// `p.index(0)` is 2 and `p.index(1)` is 3.
ResolvedPos.prototype.index = function index (depth) { return this.path[this.resolveDepth(depth) * 3 + 1] };

// :: (?number) → number
// The index pointing after this position into the ancestor at the
// given level.
ResolvedPos.prototype.indexAfter = function indexAfter (depth) {
  depth = this.resolveDepth(depth);
  return this.index(depth) + (depth == this.depth && !this.textOffset ? 0 : 1)
};

// :: (?number) → number
// The (absolute) position at the start of the node at the given
// level.
ResolvedPos.prototype.start = function start (depth) {
  depth = this.resolveDepth(depth);
  return depth == 0 ? 0 : this.path[depth * 3 - 1] + 1
};

// :: (?number) → number
// The (absolute) position at the end of the node at the given
// level.
ResolvedPos.prototype.end = function end (depth) {
  depth = this.resolveDepth(depth);
  return this.start(depth) + this.node(depth).content.size
};

// :: (?number) → number
// The (absolute) position directly before the wrapping node at the
// given level, or, when `level` is `this.depth + 1`, the original
// position.
ResolvedPos.prototype.before = function before (depth) {
  depth = this.resolveDepth(depth);
  if (!depth) { throw new RangeError("There is no position before the top-level node") }
  return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1]
};

// :: (?number) → number
// The (absolute) position directly after the wrapping node at the
// given level, or the original position when `level` is `this.depth + 1`.
ResolvedPos.prototype.after = function after (depth) {
  depth = this.resolveDepth(depth);
  if (!depth) { throw new RangeError("There is no position after the top-level node") }
  return depth == this.depth + 1 ? this.pos : this.path[depth * 3 - 1] + this.path[depth * 3].nodeSize
};

// :: number
// When this position points into a text node, this returns the
// distance between the position and the start of the text node.
// Will be zero for positions that point between nodes.
prototypeAccessors$2.textOffset.get = function () { return this.pos - this.path[this.path.length - 1] };

// :: ?Node
// Get the node directly after the position, if any. If the position
// points into a text node, only the part of that node after the
// position is returned.
prototypeAccessors$2.nodeAfter.get = function () {
  var parent = this.parent, index = this.index(this.depth);
  if (index == parent.childCount) { return null }
  var dOff = this.pos - this.path[this.path.length - 1], child = parent.child(index);
  return dOff ? parent.child(index).cut(dOff) : child
};

// :: ?Node
// Get the node directly before the position, if any. If the
// position points into a text node, only the part of that node
// before the position is returned.
prototypeAccessors$2.nodeBefore.get = function () {
  var index = this.index(this.depth);
  var dOff = this.pos - this.path[this.path.length - 1];
  if (dOff) { return this.parent.child(index).cut(0, dOff) }
  return index == 0 ? null : this.parent.child(index - 1)
};

// :: () → [Mark]
// Get the marks at this position, factoring in the surrounding
// marks' [`inclusive`](#model.MarkSpec.inclusive) property. If the
// position is at the start of a non-empty node, the marks of the
// node after it (if any) are returned.
ResolvedPos.prototype.marks = function marks () {
  var parent = this.parent, index = this.index();

  // In an empty parent, return the empty array
  if (parent.content.size == 0) { return Mark.none }

  // When inside a text node, just return the text node's marks
  if (this.textOffset) { return parent.child(index).marks }

  var main = parent.maybeChild(index - 1), other = parent.maybeChild(index);
  // If the `after` flag is true of there is no node before, make
  // the node after this position the main reference.
  if (!main) { var tmp = main; main = other; other = tmp; }

  // Use all marks in the main node, except those that have
  // `inclusive` set to false and are not present in the other node.
  var marks = main.marks;
  for (var i = 0; i < marks.length; i++)
    { if (marks[i].type.spec.inclusive === false && (!other || !marks[i].isInSet(other.marks)))
      { marks = marks[i--].removeFromSet(marks); } }

  return marks
};

// :: () → ?[Mark]
// Get the marks after the current position, if any, except those
// that are non-inclusive and not present at position `$end`. This
// is mostly useful for getting the set of marks to preserve after a
// deletion. Will return `null` if this position is at the end of
// its parent node or its parent node isn't a textblock (in which
// case no marks should be preserved).
ResolvedPos.prototype.marksAcross = function marksAcross ($end) {
  var after = this.parent.maybeChild(this.index());
  if (!after || !after.isInline) { return null }

  var marks = after.marks, next = $end.parent.maybeChild($end.index());
  for (var i = 0; i < marks.length; i++)
    { if (marks[i].type.spec.inclusive === false && (!next || !marks[i].isInSet(next.marks)))
      { marks = marks[i--].removeFromSet(marks); } }
  return marks
};

// :: (number) → number
// The depth up to which this position and the given (non-resolved)
// position share the same parent nodes.
ResolvedPos.prototype.sharedDepth = function sharedDepth (pos) {
    var this$1 = this;

  for (var depth = this.depth; depth > 0; depth--)
    { if (this$1.start(depth) <= pos && this$1.end(depth) >= pos) { return depth } }
  return 0
};

// :: (?ResolvedPos, ?(Node) → bool) → ?NodeRange
// Returns a range based on the place where this position and the
// given position diverge around block content. If both point into
// the same textblock, for example, a range around that textblock
// will be returned. If they point into different blocks, the range
// around those blocks in their shared ancestor is returned. You can
// pass in an optional predicate that will be called with a parent
// node to see if a range into that parent is acceptable.
ResolvedPos.prototype.blockRange = function blockRange (other, pred) {
    var this$1 = this;
    if ( other === void 0 ) other = this;

  if (other.pos < this.pos) { return other.blockRange(this) }
  for (var d = this.depth - (this.parent.inlineContent || this.pos == other.pos ? 1 : 0); d >= 0; d--)
    { if (other.pos <= this$1.end(d) && (!pred || pred(this$1.node(d))))
      { return new NodeRange(this$1, other, d) } }
};

// :: (ResolvedPos) → bool
// Query whether the given position shares the same parent node.
ResolvedPos.prototype.sameParent = function sameParent (other) {
  return this.pos - this.parentOffset == other.pos - other.parentOffset
};

// :: (ResolvedPos) → ResolvedPos
// Return the greater of this and the given position.
ResolvedPos.prototype.max = function max (other) {
  return other.pos > this.pos ? other : this
};

// :: (ResolvedPos) → ResolvedPos
// Return the smaller of this and the given position.
ResolvedPos.prototype.min = function min (other) {
  return other.pos < this.pos ? other : this
};

ResolvedPos.prototype.toString = function toString () {
    var this$1 = this;

  var str = "";
  for (var i = 1; i <= this.depth; i++)
    { str += (str ? "/" : "") + this$1.node(i).type.name + "_" + this$1.index(i - 1); }
  return str + ":" + this.parentOffset
};

ResolvedPos.resolve = function resolve (doc, pos) {
  if (!(pos >= 0 && pos <= doc.content.size)) { throw new RangeError("Position " + pos + " out of range") }
  var path = [];
  var start = 0, parentOffset = pos;
  for (var node = doc;;) {
    var ref = node.content.findIndex(parentOffset);
      var index = ref.index;
      var offset = ref.offset;
    var rem = parentOffset - offset;
    path.push(node, index, start + offset);
    if (!rem) { break }
    node = node.child(index);
    if (node.isText) { break }
    parentOffset = rem - 1;
    start += offset + 1;
  }
  return new ResolvedPos(pos, path, parentOffset)
};

ResolvedPos.resolveCached = function resolveCached (doc, pos) {
  for (var i = 0; i < resolveCache.length; i++) {
    var cached = resolveCache[i];
    if (cached.pos == pos && cached.node(0) == doc) { return cached }
  }
  var result = resolveCache[resolveCachePos] = ResolvedPos.resolve(doc, pos);
  resolveCachePos = (resolveCachePos + 1) % resolveCacheSize;
  return result
};

Object.defineProperties( ResolvedPos.prototype, prototypeAccessors$2 );

var resolveCache = [];
var resolveCachePos = 0;
var resolveCacheSize = 6;

// ::- Represents a flat range of content, i.e. one that starts and
// ends in the same node.
var NodeRange = function NodeRange($from, $to, depth) {
  // :: ResolvedPos A resolved position along the start of the
  // content. May have a `depth` greater than this object's `depth`
  // property, since these are the positions that were used to
  // compute the range, not re-resolved positions directly at its
  // boundaries.
  this.$from = $from;
  // :: ResolvedPos A position along the end of the content. See
  // caveat for [`$from`](#model.NodeRange.$from).
  this.$to = $to;
  // :: number The depth of the node that this range points into.
  this.depth = depth;
};

var prototypeAccessors$1$2 = { start: {},end: {},parent: {},startIndex: {},endIndex: {} };

// :: number The position at the start of the range.
prototypeAccessors$1$2.start.get = function () { return this.$from.before(this.depth + 1) };
// :: number The position at the end of the range.
prototypeAccessors$1$2.end.get = function () { return this.$to.after(this.depth + 1) };

// :: Node The parent node that the range points into.
prototypeAccessors$1$2.parent.get = function () { return this.$from.node(this.depth) };
// :: number The start index of the range in the parent node.
prototypeAccessors$1$2.startIndex.get = function () { return this.$from.index(this.depth) };
// :: number The end index of the range in the parent node.
prototypeAccessors$1$2.endIndex.get = function () { return this.$to.indexAfter(this.depth) };

Object.defineProperties( NodeRange.prototype, prototypeAccessors$1$2 );

var emptyAttrs = Object.create(null);

// ::- This class represents a node in the tree that makes up a
// ProseMirror document. So a document is an instance of `Node`, with
// children that are also instances of `Node`.
//
// Nodes are persistent data structures. Instead of changing them, you
// create new ones with the content you want. Old ones keep pointing
// at the old document shape. This is made cheaper by sharing
// structure between the old and new data as much as possible, which a
// tree shape like this (without back pointers) makes easy.
//
// **Do not** directly mutate the properties of a `Node` object. See
// [the guide](/docs/guide/#doc) for more information.
var Node = function Node(type, attrs, content, marks) {
  // :: NodeType
  // The type of node that this is.
  this.type = type;

  // :: Object
  // An object mapping attribute names to values. The kind of
  // attributes allowed and required are
  // [determined](#model.NodeSpec.attrs) by the node type.
  this.attrs = attrs;

  // :: Fragment
  // A container holding the node's children.
  this.content = content || Fragment.empty;

  // :: [Mark]
  // The marks (things like whether it is emphasized or part of a
  // link) applied to this node.
  this.marks = marks || Mark.none;
};

var prototypeAccessors = { nodeSize: {},childCount: {},textContent: {},firstChild: {},lastChild: {},isBlock: {},isTextblock: {},inlineContent: {},isInline: {},isText: {},isLeaf: {},isAtom: {} };

// text:: ?string
// For text nodes, this contains the node's text content.

// :: number
// The size of this node, as defined by the integer-based [indexing
// scheme](/docs/guide/#doc.indexing). For text nodes, this is the
// amount of characters. For other leaf nodes, it is one. For
// non-leaf nodes, it is the size of the content plus two (the start
// and end token).
prototypeAccessors.nodeSize.get = function () { return this.isLeaf ? 1 : 2 + this.content.size };

// :: number
// The number of children that the node has.
prototypeAccessors.childCount.get = function () { return this.content.childCount };

// :: (number) → Node
// Get the child node at the given index. Raises an error when the
// index is out of range.
Node.prototype.child = function child (index) { return this.content.child(index) };

// :: (number) → ?Node
// Get the child node at the given index, if it exists.
Node.prototype.maybeChild = function maybeChild (index) { return this.content.maybeChild(index) };

// :: ((node: Node, offset: number, index: number))
// Call `f` for every child node, passing the node, its offset
// into this parent node, and its index.
Node.prototype.forEach = function forEach (f) { this.content.forEach(f); };

// :: (number, number, (node: Node, pos: number, parent: Node, index: number) → ?bool)
// Invoke a callback for all descendant nodes recursively between
// the given two positions that are relative to start of this node's
// content. The callback is invoked with the node, its
// parent-relative position, its parent node, and its child index.
// When the callback returns false for a given node, that node's
// children will not be recursed over.
Node.prototype.nodesBetween = function nodesBetween (from, to, f, pos) {
    if ( pos === void 0 ) pos = 0;

  this.content.nodesBetween(from, to, f, pos, this);
};

// :: ((node: Node, pos: number, parent: Node) → ?bool)
// Call the given callback for every descendant node. Doesn't
// descend into a node when the callback returns `false`.
Node.prototype.descendants = function descendants (f) {
  this.nodesBetween(0, this.content.size, f);
};

// :: string
// Concatenates all the text nodes found in this fragment and its
// children.
prototypeAccessors.textContent.get = function () { return this.textBetween(0, this.content.size, "") };

// :: (number, number, ?string, ?string) → string
// Get all text between positions `from` and `to`. When
// `blockSeparator` is given, it will be inserted whenever a new
// block node is started. When `leafText` is given, it'll be
// inserted for every non-text leaf node encountered.
Node.prototype.textBetween = function textBetween (from, to, blockSeparator, leafText) {
  return this.content.textBetween(from, to, blockSeparator, leafText)
};

// :: ?Node
// Returns this node's first child, or `null` if there are no
// children.
prototypeAccessors.firstChild.get = function () { return this.content.firstChild };

// :: ?Node
// Returns this node's last child, or `null` if there are no
// children.
prototypeAccessors.lastChild.get = function () { return this.content.lastChild };

// :: (Node) → bool
// Test whether two nodes represent the same piece of document.
Node.prototype.eq = function eq (other) {
  return this == other || (this.sameMarkup(other) && this.content.eq(other.content))
};

// :: (Node) → bool
// Compare the markup (type, attributes, and marks) of this node to
// those of another. Returns `true` if both have the same markup.
Node.prototype.sameMarkup = function sameMarkup (other) {
  return this.hasMarkup(other.type, other.attrs, other.marks)
};

// :: (NodeType, ?Object, ?[Mark]) → bool
// Check whether this node's markup correspond to the given type,
// attributes, and marks.
Node.prototype.hasMarkup = function hasMarkup (type, attrs, marks) {
  return this.type == type &&
    compareDeep(this.attrs, attrs || type.defaultAttrs || emptyAttrs) &&
    Mark.sameSet(this.marks, marks || Mark.none)
};

// :: (?Fragment) → Node
// Create a new node with the same markup as this node, containing
// the given content (or empty, if no content is given).
Node.prototype.copy = function copy (content) {
    if ( content === void 0 ) content = null;

  if (content == this.content) { return this }
  return new this.constructor(this.type, this.attrs, content, this.marks)
};

// :: ([Mark]) → Node
// Create a copy of this node, with the given set of marks instead
// of the node's own marks.
Node.prototype.mark = function mark (marks) {
  return marks == this.marks ? this : new this.constructor(this.type, this.attrs, this.content, marks)
};

// :: (number, ?number) → Node
// Create a copy of this node with only the content between the
// given positions. If `to` is not given, it defaults to the end of
// the node.
Node.prototype.cut = function cut (from, to) {
  if (from == 0 && to == this.content.size) { return this }
  return this.copy(this.content.cut(from, to))
};

// :: (number, ?number) → Slice
// Cut out the part of the document between the given positions, and
// return it as a `Slice` object.
Node.prototype.slice = function slice (from, to, includeParents) {
    if ( to === void 0 ) to = this.content.size;
    if ( includeParents === void 0 ) includeParents = false;

  if (from == to) { return Slice.empty }

  var $from = this.resolve(from), $to = this.resolve(to);
  var depth = includeParents ? 0 : $from.sharedDepth(to);
  var start = $from.start(depth), node = $from.node(depth);
  var content = node.content.cut($from.pos - start, $to.pos - start);
  return new Slice(content, $from.depth - depth, $to.depth - depth)
};

// :: (number, number, Slice) → Node
// Replace the part of the document between the given positions with
// the given slice. The slice must 'fit', meaning its open sides
// must be able to connect to the surrounding content, and its
// content nodes must be valid children for the node they are placed
// into. If any of this is violated, an error of type
// [`ReplaceError`](#model.ReplaceError) is thrown.
Node.prototype.replace = function replace$1 (from, to, slice) {
  return replace(this.resolve(from), this.resolve(to), slice)
};

// :: (number) → ?Node
// Find the node starting at the given position.
Node.prototype.nodeAt = function nodeAt (pos) {
  for (var node = this;;) {
    var ref = node.content.findIndex(pos);
      var index = ref.index;
      var offset = ref.offset;
    node = node.maybeChild(index);
    if (!node) { return null }
    if (offset == pos || node.isText) { return node }
    pos -= offset + 1;
  }
};

// :: (number) → {node: ?Node, index: number, offset: number}
// Find the (direct) child node after the given offset, if any,
// and return it along with its index and offset relative to this
// node.
Node.prototype.childAfter = function childAfter (pos) {
  var ref = this.content.findIndex(pos);
    var index = ref.index;
    var offset = ref.offset;
  return {node: this.content.maybeChild(index), index: index, offset: offset}
};

// :: (number) → {node: ?Node, index: number, offset: number}
// Find the (direct) child node before the given offset, if any,
// and return it along with its index and offset relative to this
// node.
Node.prototype.childBefore = function childBefore (pos) {
  if (pos == 0) { return {node: null, index: 0, offset: 0} }
  var ref = this.content.findIndex(pos);
    var index = ref.index;
    var offset = ref.offset;
  if (offset < pos) { return {node: this.content.child(index), index: index, offset: offset} }
  var node = this.content.child(index - 1);
  return {node: node, index: index - 1, offset: offset - node.nodeSize}
};

// :: (number) → ResolvedPos
// Resolve the given position in the document, returning an
// [object](#model.ResolvedPos) with information about its context.
Node.prototype.resolve = function resolve (pos) { return ResolvedPos.resolveCached(this, pos) };

Node.prototype.resolveNoCache = function resolveNoCache (pos) { return ResolvedPos.resolve(this, pos) };

// :: (number, number, MarkType) → bool
// Test whether a mark of the given type occurs in this document
// between the two given positions.
Node.prototype.rangeHasMark = function rangeHasMark (from, to, type) {
  var found = false;
  this.nodesBetween(from, to, function (node) {
    if (type.isInSet(node.marks)) { found = true; }
    return !found
  });
  return found
};

// :: bool
// True when this is a block (non-inline node)
prototypeAccessors.isBlock.get = function () { return this.type.isBlock };

// :: bool
// True when this is a textblock node, a block node with inline
// content.
prototypeAccessors.isTextblock.get = function () { return this.type.isTextblock };

// :: bool
// True when this node has inline content.
prototypeAccessors.inlineContent.get = function () { return this.type.inlineContent };

// :: bool
// True when this is an inline node (a text node or a node that can
// appear among text).
prototypeAccessors.isInline.get = function () { return this.type.isInline };

// :: bool
// True when this is a text node.
prototypeAccessors.isText.get = function () { return this.type.isText };

// :: bool
// True when this is a leaf node.
prototypeAccessors.isLeaf.get = function () { return this.type.isLeaf };

// :: bool
// True when this is an atom, i.e. when it does not have directly
// editable content. This is usually the same as `isLeaf`, but can
// be configured with the [`atom` property](#model.NodeSpec.atom) on
// a node's spec (typically used when the node is displayed as an
// uneditable [node view](#view.NodeView)).
prototypeAccessors.isAtom.get = function () { return this.type.isAtom };

// :: () → string
// Return a string representation of this node for debugging
// purposes.
Node.prototype.toString = function toString () {
  var name = this.type.name;
  if (this.content.size)
    { name += "(" + this.content.toStringInner() + ")"; }
  return wrapMarks(this.marks, name)
};

// :: (number) → ContentMatch
// Get the content match in this node at the given index.
Node.prototype.contentMatchAt = function contentMatchAt (index) {
  return this.type.contentMatch.matchFragment(this.content, 0, index)
};

// :: (number, number, ?Fragment, ?number, ?number) → bool
// Test whether replacing the range between `from` and `to` (by
// child index) with the given replacement fragment (which defaults
// to the empty fragment) would leave the node's content valid. You
// can optionally pass `start` and `end` indices into the
// replacement fragment.
Node.prototype.canReplace = function canReplace (from, to, replacement, start, end) {
    var this$1 = this;
    if ( replacement === void 0 ) replacement = Fragment.empty;
    if ( start === void 0 ) start = 0;
    if ( end === void 0 ) end = replacement.childCount;

  var one = this.contentMatchAt(from).matchFragment(replacement, start, end);
  var two = one && one.matchFragment(this.content, to);
  if (!two || !two.validEnd) { return false }
  for (var i = start; i < end; i++) { if (!this$1.type.allowsMarks(replacement.child(i).marks)) { return false } }
  return true
};

// :: (number, number, NodeType, ?[Mark]) → bool
// Test whether replacing the range `from` to `to` (by index) with a
// node of the given type.
Node.prototype.canReplaceWith = function canReplaceWith (from, to, type, marks) {
  if (marks && !this.type.allowsMarks(marks)) { return false }
  var start = this.contentMatchAt(from).matchType(type);
  var end = start && start.matchFragment(this.content, to);
  return end ? end.validEnd : false
};

// :: (Node) → bool
// Test whether the given node's content could be appended to this
// node. If that node is empty, this will only return true if there
// is at least one node type that can appear in both nodes (to avoid
// merging completely incompatible nodes).
Node.prototype.canAppend = function canAppend (other) {
  if (other.content.size) { return this.canReplace(this.childCount, this.childCount, other.content) }
  else { return this.type.compatibleContent(other.type) }
};

Node.prototype.defaultContentType = function defaultContentType (at) {
  return this.contentMatchAt(at).defaultType
};

// :: ()
// Check whether this node and its descendants conform to the
// schema, and raise error when they do not.
Node.prototype.check = function check () {
  if (!this.type.validContent(this.content))
    { throw new RangeError(("Invalid content for node " + (this.type.name) + ": " + (this.content.toString().slice(0, 50)))) }
  this.content.forEach(function (node) { return node.check(); });
};

// :: () → Object
// Return a JSON-serializeable representation of this node.
Node.prototype.toJSON = function toJSON () {
    var this$1 = this;

  var obj = {type: this.type.name};
  for (var _ in this$1.attrs) {
    obj.attrs = this$1.attrs;
    break
  }
  if (this.content.size)
    { obj.content = this.content.toJSON(); }
  if (this.marks.length)
    { obj.marks = this.marks.map(function (n) { return n.toJSON(); }); }
  return obj
};

// :: (Schema, Object) → Node
// Deserialize a node from its JSON representation.
Node.fromJSON = function fromJSON (schema, json) {
  var marks = json.marks && json.marks.map(schema.markFromJSON);
  if (json.type == "text") { return schema.text(json.text, marks) }
  var type = schema.nodeType(json.type);
  if (!type) { throw new RangeError(("There is no node type " + (json.type) + " in this schema")) }
  return type.create(json.attrs, Fragment.fromJSON(schema, json.content), marks)
};

Object.defineProperties( Node.prototype, prototypeAccessors );

var TextNode = (function (Node) {
  function TextNode(type, attrs, content, marks) {
    Node.call(this, type, attrs, null, marks);

    if (!content) { throw new RangeError("Empty text nodes are not allowed") }

    this.text = content;
  }

  if ( Node ) TextNode.__proto__ = Node;
  TextNode.prototype = Object.create( Node && Node.prototype );
  TextNode.prototype.constructor = TextNode;

  var prototypeAccessors$1 = { textContent: {},nodeSize: {} };

  TextNode.prototype.toString = function toString () { return wrapMarks(this.marks, JSON.stringify(this.text)) };

  prototypeAccessors$1.textContent.get = function () { return this.text };

  TextNode.prototype.textBetween = function textBetween (from, to) { return this.text.slice(from, to) };

  prototypeAccessors$1.nodeSize.get = function () { return this.text.length };

  TextNode.prototype.mark = function mark (marks) {
    return marks == this.marks ? this : new TextNode(this.type, this.attrs, this.text, marks)
  };

  TextNode.prototype.withText = function withText (text) {
    if (text == this.text) { return this }
    return new TextNode(this.type, this.attrs, text, this.marks)
  };

  TextNode.prototype.cut = function cut (from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.text.length;

    if (from == 0 && to == this.text.length) { return this }
    return this.withText(this.text.slice(from, to))
  };

  TextNode.prototype.eq = function eq (other) {
    return this.sameMarkup(other) && this.text == other.text
  };

  TextNode.prototype.toJSON = function toJSON () {
    var base = Node.prototype.toJSON.call(this);
    base.text = this.text;
    return base
  };

  Object.defineProperties( TextNode.prototype, prototypeAccessors$1 );

  return TextNode;
}(Node));

function wrapMarks(marks, str) {
  for (var i = marks.length - 1; i >= 0; i--)
    { str = marks[i].type.name + "(" + str + ")"; }
  return str
}

// ::- Instances of this class represent a match state of a node
// type's [content expression](#model.NodeSpec.content), and can be
// used to find out whether further content matches here, and whether
// a given position is a valid end of the node.
var ContentMatch = function ContentMatch(validEnd) {
  // :: bool
  // True when this match state represents a valid end of the node.
  this.validEnd = validEnd;
  this.next = [];
  this.wrapCache = [];
};

var prototypeAccessors$4 = { inlineContent: {},defaultType: {} };

ContentMatch.parse = function parse (string, nodeTypes) {
  var stream = new TokenStream(string, nodeTypes);
  if (stream.next == null) { return ContentMatch.empty }
  var expr = parseExpr(stream);
  if (stream.next) { stream.err("Unexpected trailing text"); }
  var match = dfa(nfa(expr));
  checkForDeadEnds(match, stream);
  return match
};

// :: (NodeType) → ?ContentMatch
// Match a node type and marks, returning a match after that node
// if successful.
ContentMatch.prototype.matchType = function matchType (type) {
    var this$1 = this;

  for (var i = 0; i < this.next.length; i += 2)
    { if (this$1.next[i] == type) { return this$1.next[i + 1] } }
  return null
};

// :: (Fragment, ?number, ?number) → ?ContentMatch
// Try to match a fragment. Returns the resulting match when
// successful.
ContentMatch.prototype.matchFragment = function matchFragment (frag, start, end) {
    if ( start === void 0 ) start = 0;
    if ( end === void 0 ) end = frag.childCount;

  var cur = this;
  for (var i = start; cur && i < end; i++)
    { cur = cur.matchType(frag.child(i).type); }
  return cur
};

prototypeAccessors$4.inlineContent.get = function () {
  var first = this.next[0];
  return first ? first.isInline : false
};

prototypeAccessors$4.defaultType.get = function () {
  return this.next[0]
};

ContentMatch.prototype.compatible = function compatible (other) {
    var this$1 = this;

  for (var i = 0; i < this.next.length; i += 2)
    { for (var j = 0; j < other.next.length; j += 2)
      { if (this$1.next[i] == other.next[j]) { return true } } }
  return false
};

// :: (Fragment, bool, ?number) → ?Fragment
// Try to match the given fragment, and if that fails, see if it can
// be made to match by inserting nodes in front of it. When
// successful, return a fragment of inserted nodes (which may be
// empty if nothing had to be inserted). When `toEnd` is true, only
// return a fragment if the resulting match goes to the end of the
// content expression.
ContentMatch.prototype.fillBefore = function fillBefore (after, toEnd, startIndex) {
    if ( toEnd === void 0 ) toEnd = false;
    if ( startIndex === void 0 ) startIndex = 0;

  var seen = [this];
  function search(match, types) {
    var finished = match.matchFragment(after, startIndex);
    if (finished && (!toEnd || finished.validEnd))
      { return Fragment.from(types.map(function (tp) { return tp.createAndFill(); })) }

    for (var i = 0; i < match.next.length; i += 2) {
      var type = match.next[i], next = match.next[i + 1];
      if (!type.hasRequiredAttrs() && seen.indexOf(next) == -1) {
        seen.push(next);
        var found = search(next, types.concat(type));
        if (found) { return found }
      }
    }
  }

  return search(this, [])
};

// :: (NodeType) → ?[NodeType]
// Find a set of wrapping node types that would allow a node of the
// given type to appear at this position. The result may be empty
// (when it fits directly) and will be null when no such wrapping
// exists.
ContentMatch.prototype.findWrapping = function findWrapping (target) {
    var this$1 = this;

  for (var i = 0; i < this.wrapCache.length; i += 2)
    { if (this$1.wrapCache[i] == target) { return this$1.wrapCache[i + 1] } }
  var computed = this.computeWrapping(target);
  this.wrapCache.push(target, computed);
  return computed
};

ContentMatch.prototype.computeWrapping = function computeWrapping (target) {
  var seen = Object.create(null), active = [{match: this, type: null, via: null}];
  while (active.length) {
    var current = active.shift(), match = current.match;
    if (match.matchType(target)) {
      var result = [];
      for (var obj = current; obj.type; obj = obj.via)
        { result.push(obj.type); }
      return result.reverse()
    }
    for (var i = 0; i < match.next.length; i += 2) {
      var type = match.next[i];
      if (!type.isLeaf && !(type.name in seen) && (!current.type || match.next[i + 1].validEnd)) {
        active.push({match: type.contentMatch, type: type, via: current});
        seen[type.name] = true;
      }
    }
  }
};

ContentMatch.prototype.toString = function toString () {
  var seen = [];
  function scan(m) {
    seen.push(m);
    for (var i = 1; i < m.next.length; i += 2)
      { if (seen.indexOf(m.next[i]) == -1) { scan(m.next[i]); } }
  }
  scan(this);
  return seen.map(function (m, i) {
    var out = i + (m.validEnd ? "*" : " ") + " ";
    for (var i$1 = 0; i$1 < m.next.length; i$1 += 2)
      { out += (i$1 ? ", " : "") + m.next[i$1].name + "->" + seen.indexOf(m.next[i$1 + 1]); }
    return out
  }).join("\n")
};

Object.defineProperties( ContentMatch.prototype, prototypeAccessors$4 );

ContentMatch.empty = new ContentMatch(true);

var TokenStream = function TokenStream(string, nodeTypes) {
  this.string = string;
  this.nodeTypes = nodeTypes;
  this.inline = null;
  this.pos = 0;
  this.tokens = string.split(/\s*(?=\b|\W|$)/);
  if (this.tokens[this.tokens.length - 1] == "") { this.tokens.pop(); }
  if (this.tokens[0] == "") { this.tokens.unshift(); }
};

var prototypeAccessors$1$4 = { next: {} };

prototypeAccessors$1$4.next.get = function () { return this.tokens[this.pos] };

TokenStream.prototype.eat = function eat (tok) { return this.next == tok && (this.pos++ || true) };

TokenStream.prototype.err = function err (str) { throw new SyntaxError(str + " (in content expression '" + this.string + "')") };

Object.defineProperties( TokenStream.prototype, prototypeAccessors$1$4 );

function parseExpr(stream) {
  var exprs = [];
  do { exprs.push(parseExprSeq(stream)); }
  while (stream.eat("|"))
  return exprs.length == 1 ? exprs[0] : {type: "choice", exprs: exprs}
}

function parseExprSeq(stream) {
  var exprs = [];
  do { exprs.push(parseExprSubscript(stream)); }
  while (stream.next && stream.next != ")" && stream.next != "|")
  return exprs.length == 1 ? exprs[0] : {type: "seq", exprs: exprs}
}

function parseExprSubscript(stream) {
  var expr = parseExprAtom(stream);
  for (;;) {
    if (stream.eat("+"))
      { expr = {type: "plus", expr: expr}; }
    else if (stream.eat("*"))
      { expr = {type: "star", expr: expr}; }
    else if (stream.eat("?"))
      { expr = {type: "opt", expr: expr}; }
    else if (stream.eat("{"))
      { expr = parseExprRange(stream, expr); }
    else { break }
  }
  return expr
}

function parseNum(stream) {
  if (/\D/.test(stream.next)) { stream.err("Expected number, got '" + stream.next + "'"); }
  var result = Number(stream.next);
  stream.pos++;
  return result
}

function parseExprRange(stream, expr) {
  var min = parseNum(stream), max = min;
  if (stream.eat(",")) {
    if (stream.next != "}") { max = parseNum(stream); }
    else { max = -1; }
  }
  if (!stream.eat("}")) { stream.err("Unclosed braced range"); }
  return {type: "range", min: min, max: max, expr: expr}
}

function resolveName(stream, name) {
  var types = stream.nodeTypes, type = types[name];
  if (type) { return [type] }
  var result = [];
  for (var typeName in types) {
    var type$1 = types[typeName];
    if (type$1.groups.indexOf(name) > -1) { result.push(type$1); }
  }
  if (result.length == 0) { stream.err("No node type or group '" + name + "' found"); }
  return result
}

function parseExprAtom(stream) {
  if (stream.eat("(")) {
    var expr = parseExpr(stream);
    if (!stream.eat(")")) { stream.err("Missing closing paren"); }
    return expr
  } else if (!/\W/.test(stream.next)) {
    var exprs = resolveName(stream, stream.next).map(function (type) {
      if (stream.inline == null) { stream.inline = type.isInline; }
      else if (stream.inline != type.isInline) { stream.err("Mixing inline and block content"); }
      return {type: "name", value: type}
    });
    stream.pos++;
    return exprs.length == 1 ? exprs[0] : {type: "choice", exprs: exprs}
  } else {
    stream.err("Unexpected token '" + stream.next + "'");
  }
}

// The code below helps compile a regular-expression-like language
// into a deterministic finite automaton. For a good introduction to
// these concepts, see https://swtch.com/~rsc/regexp/regexp1.html

// : (Object) → [[{term: ?any, to: number}]]
// Construct an NFA from an expression as returned by the parser. The
// NFA is represented as an array of states, which are themselves
// arrays of edges, which are `{term, to}` objects. The first state is
// the entry state and the last node is the success state.
//
// Note that unlike typical NFAs, the edge ordering in this one is
// significant, in that it is used to contruct filler content when
// necessary.
function nfa(expr) {
  var nfa = [[]];
  connect(compile(expr, 0), node());
  return nfa

  function node() { return nfa.push([]) - 1 }
  function edge(from, to, term) {
    var edge = {term: term, to: to};
    nfa[from].push(edge);
    return edge
  }
  function connect(edges, to) { edges.forEach(function (edge) { return edge.to = to; }); }

  function compile(expr, from) {
    if (expr.type == "choice") {
      return expr.exprs.reduce(function (out, expr) { return out.concat(compile(expr, from)); }, [])
    } else if (expr.type == "seq") {
      for (var i = 0;; i++) {
        var next = compile(expr.exprs[i], from);
        if (i == expr.exprs.length - 1) { return next }
        connect(next, from = node());
      }
    } else if (expr.type == "star") {
      var loop = node();
      edge(from, loop);
      connect(compile(expr.expr, loop), loop);
      return [edge(loop)]
    } else if (expr.type == "plus") {
      var loop$1 = node();
      connect(compile(expr.expr, from), loop$1);
      connect(compile(expr.expr, loop$1), loop$1);
      return [edge(loop$1)]
    } else if (expr.type == "opt") {
      return [edge(from)].concat(compile(expr.expr, from))
    } else if (expr.type == "range") {
      var cur = from;
      for (var i$1 = 0; i$1 < expr.min; i$1++) {
        var next$1 = node();
        connect(compile(expr.expr, cur), next$1);
        cur = next$1;
      }
      if (expr.max == -1) {
        connect(compile(expr.expr, cur), cur);
      } else {
        for (var i$2 = expr.min; i$2 < expr.max; i$2++) {
          var next$2 = node();
          edge(cur, next$2);
          connect(compile(expr.expr, cur), next$2);
          cur = next$2;
        }
      }
      return [edge(cur)]
    } else if (expr.type == "name") {
      return [edge(from, null, expr.value)]
    }
  }
}

function cmp(a, b) { return a - b }

function nullFrom(nfa, node) {
  var result = [];
  scan(node);
  return result.sort(cmp)

  function scan(node) {
    result.push(node);
    for (var a = nfa[node], i = 0; i < a.length; i++) {
      var ref = a[i];
      var term = ref.term;
      var to = ref.to;
      if (!term && result.indexOf(to) == -1) { scan(to); }
    }
  }
}

// : ([[{term: ?any, to: number}]]) → ContentMatch
// Compiles an NFA as produced by `nfa` into a DFA, modeled as a set
// of state objects (`ContentMatch` instances) with transitions
// between them.
function dfa(nfa) {
  var labeled = Object.create(null);
  return explore(nullFrom(nfa, 0))

  function explore(states) {
    var out = [];
    states.forEach(function (node) {
      nfa[node].forEach(function (ref) {
        var term = ref.term;
        var to = ref.to;

        if (!term) { return }
        var known = out.indexOf(term), set = known > -1 && out[known + 1];
        nullFrom(nfa, to).forEach(function (node) {
          if (!set) { out.push(term, set = []); }
          if (set.indexOf(node) == -1) { set.push(node); }
        });
      });
    });
    var state = labeled[states.join(",")] = new ContentMatch(states.indexOf(nfa.length - 1) > -1);
    for (var i = 0; i < out.length; i += 2) {
      var states$1 = out[i + 1].sort(cmp);
      state.next.push(out[i], labeled[states$1.join(",")] || explore(states$1));
    }
    return state
  }
}

function checkForDeadEnds(match, stream) {
  for (var i = 0, work = [match]; i < work.length; i++) {
    var state = work[i], dead = !state.validEnd, nodes = [];
    for (var j = 0; j < state.next.length; j += 2) {
      var node = state.next[j], next = state.next[j + 1];
      nodes.push(node.name);
      if (dead && !state.next[j].hasRequiredAttrs()) { dead = false; }
      if (work.indexOf(next) == -1) { work.push(next); }
    }
    if (dead) { stream.err("Only non-generatable nodes (" + nodes.join(", ") + ") after a match state"); }
  }
}

// For node types where all attrs have a default value (or which don't
// have any attributes), build up a single reusable default attribute
// object, and use it for all nodes that don't specify specific
// attributes.
function defaultAttrs(attrs) {
  var defaults = Object.create(null);
  for (var attrName in attrs) {
    var attr = attrs[attrName];
    if (!attr.hasDefault) { return null }
    defaults[attrName] = attr.default;
  }
  return defaults
}

function computeAttrs(attrs, value) {
  var built = Object.create(null);
  for (var name in attrs) {
    var given = value && value[name];
    if (given === undefined) {
      var attr = attrs[name];
      if (attr.hasDefault) { given = attr.default; }
      else { throw new RangeError("No value supplied for attribute " + name) }
    }
    built[name] = given;
  }
  return built
}

function initAttrs(attrs) {
  var result = Object.create(null);
  if (attrs) { for (var name in attrs) { result[name] = new Attribute(attrs[name]); } }
  return result
}

// ::- Node types are objects allocated once per `Schema` and used to
// [tag](#model.Node.type) `Node` instances. They contain information
// about the node type, such as its name and what kind of node it
// represents.
var NodeType = function NodeType(name, schema, spec) {
  // :: string
  // The name the node type has in this schema.
  this.name = name;

  // :: Schema
  // A link back to the `Schema` the node type belongs to.
  this.schema = schema;

  // :: NodeSpec
  // The spec that this type is based on
  this.spec = spec;

  this.groups = spec.group ? spec.group.split(" ") : [];
  this.attrs = initAttrs(spec.attrs);

  this.defaultAttrs = defaultAttrs(this.attrs);

  // :: ContentMatch
  // The starting match of the node type's content expression.
  this.contentMatch = null;

  // : ?[MarkType]
  // The set of marks allowed in this node. `null` means all marks
  // are allowed.
  this.markSet = null;

  // :: bool
  // True if this node type has inline content.
  this.inlineContent = null;

  // :: bool
  // True if this is a block type
  this.isBlock = !(spec.inline || name == "text");

  // :: bool
  // True if this is the text node type.
  this.isText = name == "text";
};

var prototypeAccessors$3 = { isInline: {},isTextblock: {},isLeaf: {},isAtom: {} };

// :: bool
// True if this is an inline type.
prototypeAccessors$3.isInline.get = function () { return !this.isBlock };

// :: bool
// True if this is a textblock type, a block that contains inline
// content.
prototypeAccessors$3.isTextblock.get = function () { return this.isBlock && this.inlineContent };

// :: bool
// True for node types that allow no content.
prototypeAccessors$3.isLeaf.get = function () { return this.contentMatch == ContentMatch.empty };

// :: bool
// True when this node is an atom, i.e. when it does not have
// directly editable content.
prototypeAccessors$3.isAtom.get = function () { return this.isLeaf || this.spec.atom };

NodeType.prototype.hasRequiredAttrs = function hasRequiredAttrs (ignore) {
    var this$1 = this;

  for (var n in this$1.attrs)
    { if (this$1.attrs[n].isRequired && (!ignore || !(n in ignore))) { return true } }
  return false
};

NodeType.prototype.compatibleContent = function compatibleContent (other) {
  return this == other || this.contentMatch.compatible(other.contentMatch)
};

NodeType.prototype.computeAttrs = function computeAttrs$1 (attrs) {
  if (!attrs && this.defaultAttrs) { return this.defaultAttrs }
  else { return computeAttrs(this.attrs, attrs) }
};

// :: (?Object, ?union<Fragment, Node, [Node]>, ?[Mark]) → Node
// Create a `Node` of this type. The given attributes are
// checked and defaulted (you can pass `null` to use the type's
// defaults entirely, if no required attributes exist). `content`
// may be a `Fragment`, a node, an array of nodes, or
// `null`. Similarly `marks` may be `null` to default to the empty
// set of marks.
NodeType.prototype.create = function create (attrs, content, marks) {
  if (typeof content == "string") { throw new Error("Calling create with string") }
  if (this.isText) { throw new Error("NodeType.create can't construct text nodes") }
  return new Node(this, this.computeAttrs(attrs), Fragment.from(content), Mark.setFrom(marks))
};

// :: (?Object, ?union<Fragment, Node, [Node]>, ?[Mark]) → Node
// Like [`create`](#model.NodeType.create), but check the given content
// against the node type's content restrictions, and throw an error
// if it doesn't match.
NodeType.prototype.createChecked = function createChecked (attrs, content, marks) {
  content = Fragment.from(content);
  if (!this.validContent(content))
    { throw new RangeError("Invalid content for node " + this.name) }
  return new Node(this, this.computeAttrs(attrs), content, Mark.setFrom(marks))
};

// :: (?Object, ?union<Fragment, Node, [Node]>, ?[Mark]) → ?Node
// Like [`create`](#model.NodeType.create), but see if it is necessary to
// add nodes to the start or end of the given fragment to make it
// fit the node. If no fitting wrapping can be found, return null.
// Note that, due to the fact that required nodes can always be
// created, this will always succeed if you pass null or
// `Fragment.empty` as content.
NodeType.prototype.createAndFill = function createAndFill (attrs, content, marks) {
  attrs = this.computeAttrs(attrs);
  content = Fragment.from(content);
  if (content.size) {
    var before = this.contentMatch.fillBefore(content);
    if (!before) { return null }
    content = before.append(content);
  }
  var after = this.contentMatch.matchFragment(content).fillBefore(Fragment.empty, true);
  if (!after) { return null }
  return new Node(this, attrs, content.append(after), Mark.setFrom(marks))
};

// :: (Fragment) → bool
// Returns true if the given fragment is valid content for this node
// type with the given attributes.
NodeType.prototype.validContent = function validContent (content) {
    var this$1 = this;

  var result = this.contentMatch.matchFragment(content);
  if (!result || !result.validEnd) { return false }
  for (var i = 0; i < content.childCount; i++)
    { if (!this$1.allowsMarks(content.child(i).marks)) { return false } }
  return true
};

// :: (MarkType) → bool
// Check whether the given mark type is allowed in this node.
NodeType.prototype.allowsMarkType = function allowsMarkType (markType) {
  return this.markSet == null || this.markSet.indexOf(markType) > -1
};

// :: ([Mark]) → bool
// Test whether the given set of marks are allowed in this node.
NodeType.prototype.allowsMarks = function allowsMarks (marks) {
    var this$1 = this;

  if (this.markSet == null) { return true }
  for (var i = 0; i < marks.length; i++) { if (!this$1.allowsMarkType(marks[i].type)) { return false } }
  return true
};

// :: ([Mark]) → [Mark]
// Removes the marks that are not allowed in this node from the given set.
NodeType.prototype.allowedMarks = function allowedMarks (marks) {
    var this$1 = this;

  if (this.markSet == null) { return marks }
  var copy;
  for (var i = 0; i < marks.length; i++) {
    if (!this$1.allowsMarkType(marks[i].type)) {
      if (!copy) { copy = marks.slice(0, i); }
    } else if (copy) {
      copy.push(marks[i]);
    }
  }
  return !copy ? marks : copy.length ? copy : Mark.empty
};

NodeType.compile = function compile (nodes, schema) {
  var result = Object.create(null);
  nodes.forEach(function (name, spec) { return result[name] = new NodeType(name, schema, spec); });

  var topType = schema.spec.topNode || "doc";
  if (!result[topType]) { throw new RangeError("Schema is missing its top node type ('" + topType + "')") }
  if (!result.text) { throw new RangeError("Every schema needs a 'text' type") }
  for (var _ in result.text.attrs) { throw new RangeError("The text node type should not have attributes") }

  return result
};

Object.defineProperties( NodeType.prototype, prototypeAccessors$3 );

// Attribute descriptors

var Attribute = function Attribute(options) {
  this.hasDefault = Object.prototype.hasOwnProperty.call(options, "default");
  this.default = options.default;
};

var prototypeAccessors$1$3 = { isRequired: {} };

prototypeAccessors$1$3.isRequired.get = function () {
  return !this.hasDefault
};

Object.defineProperties( Attribute.prototype, prototypeAccessors$1$3 );

// Marks

// ::- Like nodes, marks (which are associated with nodes to signify
// things like emphasis or being part of a link) are
// [tagged](#model.Mark.type) with type objects, which are
// instantiated once per `Schema`.
var MarkType = function MarkType(name, rank, schema, spec) {
  // :: string
  // The name of the mark type.
  this.name = name;

  // :: Schema
  // The schema that this mark type instance is part of.
  this.schema = schema;

  // :: MarkSpec
  // The spec on which the type is based.
  this.spec = spec;

  this.attrs = initAttrs(spec.attrs);

  this.rank = rank;
  this.excluded = null;
  var defaults = defaultAttrs(this.attrs);
  this.instance = defaults && new Mark(this, defaults);
};

// :: (?Object) → Mark
// Create a mark of this type. `attrs` may be `null` or an object
// containing only some of the mark's attributes. The others, if
// they have defaults, will be added.
MarkType.prototype.create = function create (attrs) {
  if (!attrs && this.instance) { return this.instance }
  return new Mark(this, computeAttrs(this.attrs, attrs))
};

MarkType.compile = function compile (marks, schema) {
  var result = Object.create(null), rank = 0;
  marks.forEach(function (name, spec) { return result[name] = new MarkType(name, rank++, schema, spec); });
  return result
};

// :: ([Mark]) → [Mark]
// When there is a mark of this type in the given set, a new set
// without it is returned. Otherwise, the input set is returned.
MarkType.prototype.removeFromSet = function removeFromSet (set) {
    var this$1 = this;

  for (var i = 0; i < set.length; i++)
    { if (set[i].type == this$1)
      { return set.slice(0, i).concat(set.slice(i + 1)) } }
  return set
};

// :: ([Mark]) → ?Mark
// Tests whether there is a mark of this type in the given set.
MarkType.prototype.isInSet = function isInSet (set) {
    var this$1 = this;

  for (var i = 0; i < set.length; i++)
    { if (set[i].type == this$1) { return set[i] } }
};

// :: (MarkType) → bool
// Queries whether a given mark type is
// [excluded](#model.MarkSpec.excludes) by this one.
MarkType.prototype.excludes = function excludes (other) {
  return this.excluded.indexOf(other) > -1
};

// SchemaSpec:: interface
// An object describing a schema, as passed to the [`Schema`](#model.Schema)
// constructor.
//
//   nodes:: union<Object<NodeSpec>, OrderedMap<NodeSpec>>
//   The node types in this schema. Maps names to
//   [`NodeSpec`](#model.NodeSpec) objects that describe the node type
//   associated with that name. Their order is significant—it
//   determines which [parse rules](#model.NodeSpec.parseDOM) take
//   precedence by default, and which nodes come first in a given
//   [group](#model.NodeSpec.group).
//
//   marks:: ?union<Object<MarkSpec>, OrderedMap<MarkSpec>>
//   The mark types that exist in this schema. The order in which they
//   are provided determines the order in which [mark
//   sets](#model.Mark.addToSet) are sorted and in which [parse
//   rules](#model.MarkSpec.parseDOM) are tried.
//
//   topNode:: ?string
//   The name of the default top-level node for the schema. Defaults
//   to `"doc"`.

// NodeSpec:: interface
//
//   content:: ?string
//   The content expression for this node, as described in the [schema
//   guide](/docs/guide/#schema.content_expressions). When not given,
//   the node does not allow any content.
//
//   marks:: ?string
//   The marks that are allowed inside of this node. May be a
//   space-separated string referring to mark names or groups, `"_"`
//   to explicitly allow all marks, or `""` to disallow marks. When
//   not given, nodes with inline content default to allowing all
//   marks, other nodes default to not allowing marks.
//
//   group:: ?string
//   The group or space-separated groups to which this node belongs,
//   which can be referred to in the content expressions for the
//   schema.
//
//   inline:: ?bool
//   Should be set to true for inline nodes. (Implied for text nodes.)
//
//   atom:: ?bool
//   Can be set to true to indicate that, though this isn't a [leaf
//   node](#model.NodeType.isLeaf), it doesn't have directly editable
//   content and should be treated as a single unit in the view.
//
//   attrs:: ?Object<AttributeSpec>
//   The attributes that nodes of this type get.
//
//   selectable:: ?bool
//   Controls whether nodes of this type can be selected as a [node
//   selection](#state.NodeSelection). Defaults to true for non-text
//   nodes.
//
//   draggable:: ?bool
//   Determines whether nodes of this type can be dragged without
//   being selected. Defaults to false.
//
//   code:: ?bool
//   Can be used to indicate that this node contains code, which
//   causes some commands to behave differently.
//
//   defining:: ?bool
//   Determines whether this node is considered an important parent
//   node during replace operations (such as paste). Non-defining (the
//   default) nodes get dropped when their entire content is replaced,
//   whereas defining nodes persist and wrap the inserted content.
//   Likewise, in _inserted_ content the defining parents of the
//   content are preserved when possible. Typically,
//   non-default-paragraph textblock types, and possibly list items,
//   are marked as defining.
//
//   isolating:: ?bool
//   When enabled (default is false), the sides of nodes of this type
//   count as boundaries that regular editing operations, like
//   backspacing or lifting, won't cross. An example of a node that
//   should probably have this enabled is a table cell.
//
//   toDOM:: ?(node: Node) → DOMOutputSpec
//   Defines the default way a node of this type should be serialized
//   to DOM/HTML (as used by
//   [`DOMSerializer.fromSchema`](#model.DOMSerializer^fromSchema)).
//   Should return a DOM node or an [array
//   structure](#model.DOMOutputSpec) that describes one, with an
//   optional number zero (“hole”) in it to indicate where the node's
//   content should be inserted.
//
//   For text nodes, the default is to create a text DOM node. Though
//   it is possible to create a serializer where text is rendered
//   differently, this is not supported inside the editor, so you
//   shouldn't override that in your text node spec.
//
//   parseDOM:: ?[ParseRule]
//   Associates DOM parser information with this node, which can be
//   used by [`DOMParser.fromSchema`](#model.DOMParser^fromSchema) to
//   automatically derive a parser. The `node` field in the rules is
//   implied (the name of this node will be filled in automatically).
//   If you supply your own parser, you do not need to also specify
//   parsing rules in your schema.

// MarkSpec:: interface
//
//   attrs:: ?Object<AttributeSpec>
//   The attributes that marks of this type get.
//
//   inclusive:: ?bool
//   Whether this mark should be active when the cursor is positioned
//   at its end (or at its start when that is also the start of the
//   parent node). Defaults to true.
//
//   excludes:: ?string
//   Determines which other marks this mark can coexist with. Should
//   be a space-separated strings naming other marks or groups of marks.
//   When a mark is [added](#model.Mark.addToSet) to a set, all marks
//   that it excludes are removed in the process. If the set contains
//   any mark that excludes the new mark but is not, itself, excluded
//   by the new mark, the mark can not be added an the set. You can
//   use the value `"_"` to indicate that the mark excludes all
//   marks in the schema.
//
//   Defaults to only being exclusive with marks of the same type. You
//   can set it to an empty string (or any string not containing the
//   mark's own name) to allow multiple marks of a given type to
//   coexist (as long as they have different attributes).
//
//   group:: ?string
//   The group or space-separated groups to which this mark belongs.
//
//   toDOM:: ?(mark: Mark, inline: bool) → DOMOutputSpec
//   Defines the default way marks of this type should be serialized
//   to DOM/HTML.
//
//   parseDOM:: ?[ParseRule]
//   Associates DOM parser information with this mark (see the
//   corresponding [node spec field](#model.NodeSpec.parseDOM)). The
//   `mark` field in the rules is implied.

// AttributeSpec:: interface
//
// Used to [define](#model.NodeSpec.attrs) attributes on nodes or
// marks.
//
//   default:: ?any
//   The default value for this attribute, to use when no explicit
//   value is provided. Attributes that have no default must be
//   provided whenever a node or mark of a type that has them is
//   created.

var warnedAboutMarkSyntax = false;

// ::- A document schema. Holds [node](#model.NodeType) and [mark
// type](#model.MarkType) objects for the nodes and marks that may
// occur in conforming documents, and provides functionality for
// creating and deserializing such documents.
var Schema = function Schema(spec) {
  var this$1 = this;

  // :: SchemaSpec
  // The [spec](#model.SchemaSpec) on which the schema is based,
  // with the added guarantee that its `nodes` and `marks`
  // properties are
  // [`OrderedMap`](https://github.com/marijnh/orderedmap) instances
  // (not raw objects).
  this.spec = {};
  for (var prop in spec) { this$1.spec[prop] = spec[prop]; }
  this.spec.nodes = OrderedMap.from(spec.nodes);
  this.spec.marks = OrderedMap.from(spec.marks);

  // :: Object<NodeType>
  // An object mapping the schema's node names to node type objects.
  this.nodes = NodeType.compile(this.spec.nodes, this);

  // :: Object<MarkType>
  // A map from mark names to mark type objects.
  this.marks = MarkType.compile(this.spec.marks, this);

  for (var prop$1 in this$1.nodes) {
    if (prop$1 in this$1.marks)
      { throw new RangeError(prop$1 + " can not be both a node and a mark") }
    var type = this$1.nodes[prop$1], contentExpr = type.spec.content || "", markExpr = type.spec.marks;
    var oldStyle = /<(.*?)>/.test(contentExpr);
    if (oldStyle) {
      if (!warnedAboutMarkSyntax && typeof console != "undefined" && console.warn) {
        warnedAboutMarkSyntax = true;
        console.warn("Angle-bracket syntax for marks in content expressions is deprecated. Use the `marks` spec property instead.");
      }
      markExpr = oldStyle[1];
      contentExpr = contentExpr.replace(/<(.*?)>/g, "");
    }
    type.contentMatch = ContentMatch.parse(contentExpr, this$1.nodes);
    type.inlineContent = type.contentMatch.inlineContent;
    type.markSet = markExpr == "_" ? null :
      markExpr ? gatherMarks(this$1, markExpr.split(" ")) :
      markExpr == "" || !type.inlineContent ? [] : null;
  }
  for (var prop$2 in this$1.marks) {
    var type$1 = this$1.marks[prop$2], excl = type$1.spec.excludes;
    type$1.excluded = excl == null ? [type$1] : excl == "" ? [] : gatherMarks(this$1, excl.split(" "));
  }

  this.nodeFromJSON = this.nodeFromJSON.bind(this);
  this.markFromJSON = this.markFromJSON.bind(this);

  // :: NodeType
  // The type of the [default top node](#model.SchemaSpec.topNode)
  // for this schema.
  this.topNodeType = this.nodes[this.spec.topNode || "doc"];

  // :: Object
  // An object for storing whatever values modules may want to
  // compute and cache per schema. (If you want to store something
  // in it, try to use property names unlikely to clash.)
  this.cached = Object.create(null);
  this.cached.wrappings = Object.create(null);
};

// :: (union<string, NodeType>, ?Object, ?union<Fragment, Node, [Node]>, ?[Mark]) → Node
// Create a node in this schema. The `type` may be a string or a
// `NodeType` instance. Attributes will be extended
// with defaults, `content` may be a `Fragment`,
// `null`, a `Node`, or an array of nodes.
Schema.prototype.node = function node (type, attrs, content, marks) {
  if (typeof type == "string")
    { type = this.nodeType(type); }
  else if (!(type instanceof NodeType))
    { throw new RangeError("Invalid node type: " + type) }
  else if (type.schema != this)
    { throw new RangeError("Node type from different schema used (" + type.name + ")") }

  return type.createChecked(attrs, content, marks)
};

// :: (string, ?[Mark]) → Node
// Create a text node in the schema. Empty text nodes are not
// allowed.
Schema.prototype.text = function text (text$1, marks) {
  var type = this.nodes.text;
  return new TextNode(type, type.defaultAttrs, text$1, Mark.setFrom(marks))
};

// :: (union<string, MarkType>, ?Object) → Mark
// Create a mark with the given type and attributes.
Schema.prototype.mark = function mark (type, attrs) {
  if (typeof type == "string") { type = this.marks[type]; }
  return type.create(attrs)
};

// :: (Object) → Node
// Deserialize a node from its JSON representation. This method is
// bound.
Schema.prototype.nodeFromJSON = function nodeFromJSON (json) {
  return Node.fromJSON(this, json)
};

// :: (Object) → Mark
// Deserialize a mark from its JSON representation. This method is
// bound.
Schema.prototype.markFromJSON = function markFromJSON (json) {
  return Mark.fromJSON(this, json)
};

Schema.prototype.nodeType = function nodeType (name) {
  var found = this.nodes[name];
  if (!found) { throw new RangeError("Unknown node type: " + name) }
  return found
};

function gatherMarks(schema, marks) {
  var found = [];
  for (var i = 0; i < marks.length; i++) {
    var name = marks[i], mark = schema.marks[name], ok = mark;
    if (mark) {
      found.push(mark);
    } else {
      for (var prop in schema.marks) {
        var mark$1 = schema.marks[prop];
        if (name == "_" || (mark$1.spec.group && mark$1.spec.group.split(" ").indexOf(name) > -1))
          { found.push(ok = mark$1); }
      }
    }
    if (!ok) { throw new SyntaxError("Unknown mark type: '" + marks[i] + "'") }
  }
  return found
}

// ParseOptions:: interface
// These are the options recognized by the
// [`parse`](#model.DOMParser.parse) and
// [`parseSlice`](#model.DOMParser.parseSlice) methods.
//
//   preserveWhitespace:: ?union<bool, "full">
//   By default, whitespace is collapsed as per HTML's rules. Pass
//   `true` to preserve whitespace, but normalize newlines to
//   spaces, and `"full"` to preserve whitespace entirely.
//
//   findPositions:: ?[{node: dom.Node, offset: number}]
//   When given, the parser will, beside parsing the content,
//   record the document positions of the given DOM positions. It
//   will do so by writing to the objects, adding a `pos` property
//   that holds the document position. DOM positions that are not
//   in the parsed content will not be written to.
//
//   from:: ?number
//   The child node index to start parsing from.
//
//   to:: ?number
//   The child node index to stop parsing at.
//
//   topNode:: ?Node
//   By default, the content is parsed into the schema's default
//   [top node type](#model.Schema.topNodeType). You can pass this
//   option to use the type and attributes from a different node
//   as the top container.
//
//   topMatch:: ?ContentMatch
//   Provide the starting content match that content parsed into the
//   top node is matched against.
//
//   context:: ?ResolvedPos
//   A set of additional nodes to count as
//   [context](#model.ParseRule.context) when parsing, above the
//   given [top node](#model.ParseOptions.topNode).

// ParseRule:: interface
// A value that describes how to parse a given DOM node or inline
// style as a ProseMirror node or mark.
//
//   tag:: ?string
//   A CSS selector describing the kind of DOM elements to match. A
//   single rule should have _either_ a `tag` or a `style` property.
//
//   namespace:: ?string
//   The namespace to match. This should be used with `tag`.
//   Nodes are only matched when the namespace matches or this property
//   is null.
//
//   style:: ?string
//   A CSS property name to match. When given, this rule matches
//   inline styles that list that property. May also have the form
//   `"property=value"`, in which case the rule only matches if the
//   propery's value exactly matches the given value. (For more
//   complicated filters, use [`getAttrs`](#model.ParseRule.getAttrs)
//   and return undefined to indicate that the match failed.)
//
//   priority:: ?number
//   Can be used to change the order in which the parse rules in a
//   schema are tried. Those with higher priority come first. Rules
//   without a priority are counted as having priority 50. This
//   property is only meaningful in a schema—when directly
//   constructing a parser, the order of the rule array is used.
//
//   context:: ?string
//   When given, restricts this rule to only match when the current
//   context—the parent nodes into which the content is being
//   parsed—matches this expression. Should contain one or more node
//   names or node group names followed by single or double slashes.
//   For example `"paragraph/"` means the rule only matches when the
//   parent node is a paragraph, `"blockquote/paragraph/"` restricts
//   it to be in a paragraph that is inside a blockquote, and
//   `"section//"` matches any position inside a section—a double
//   slash matches any sequence of ancestor nodes.
//
//   node:: ?string
//   The name of the node type to create when this rule matches. Only
//   valid for rules with a `tag` property, not for style rules. Each
//   rule should have one of a `node`, `mark`, or `ignore` property
//   (except when it appears in a [node](#model.NodeSpec.parseDOM) or
//   [mark spec](#model.MarkSpec.parseDOM), in which case the `node`
//   or `mark` property will be derived from its position).
//
//   mark:: ?string
//   The name of the mark type to wrap the matched content in.
//
//   ignore:: ?bool
//   When true, ignore content that matches this rule.
//
//   skip:: ?bool
//   When true, ignore the node that matches this rule, but do parse
//   its content.
//
//   attrs:: ?Object
//   Attributes for the node or mark created by this rule. When
//   `getAttrs` is provided, it takes precedence.
//
//   getAttrs:: ?(union<dom.Node, string>) → ?union<Object, false>
//   A function used to compute the attributes for the node or mark
//   created by this rule. Can also be used to describe further
//   conditions the DOM element or style must match. When it returns
//   `false`, the rule won't match. When it returns null or undefined,
//   that is interpreted as an empty/default set of attributes.
//
//   Called with a DOM Element for `tag` rules, and with a string (the
//   style's value) for `style` rules.
//
//   contentElement:: ?union<string, (dom.Node) → dom.Node>
//   For `tag` rules that produce non-leaf nodes or marks, by default
//   the content of the DOM element is parsed as content of the mark
//   or node. If the child nodes are in a descendent node, this may be
//   a CSS selector string that the parser must use to find the actual
//   content element, or a function that returns the actual content
//   element to the parser.
//
//   getContent:: ?(dom.Node) → Fragment
//   Can be used to override the content of a matched node. When
//   present, instead of parsing the node's child nodes, the result of
//   this function is used.
//
//   preserveWhitespace:: ?union<bool, "full">
//   Controls whether whitespace should be preserved when parsing the
//   content inside the matched element. `false` means whitespace may
//   be collapsed, `true` means that whitespace should be preserved
//   but newlines normalized to spaces, and `"full"` means that
//   newlines should also be preserved.

// ::- A DOM parser represents a strategy for parsing DOM content into
// a ProseMirror document conforming to a given schema. Its behavior
// is defined by an array of [rules](#model.ParseRule).
var DOMParser = function DOMParser(schema, rules) {
  var this$1 = this;

  // :: Schema
  // The schema into which the parser parses.
  this.schema = schema;
  // :: [ParseRule]
  // The set of [parse rules](#model.ParseRule) that the parser
  // uses, in order of precedence.
  this.rules = rules;
  this.tags = [];
  this.styles = [];

  rules.forEach(function (rule) {
    if (rule.tag) { this$1.tags.push(rule); }
    else if (rule.style) { this$1.styles.push(rule); }
  });
};

// :: (dom.Node, ?ParseOptions) → Node
// Parse a document from the content of a DOM node.
DOMParser.prototype.parse = function parse (dom, options) {
    if ( options === void 0 ) options = {};

  var context = new ParseContext(this, options, false);
  context.addAll(dom, null, options.from, options.to);
  return context.finish()
};

// :: (dom.Node, ?ParseOptions) → Slice
// Parses the content of the given DOM node, like
// [`parse`](#model.DOMParser.parse), and takes the same set of
// options. But unlike that method, which produces a whole node,
// this one returns a slice that is open at the sides, meaning that
// the schema constraints aren't applied to the start of nodes to
// the left of the input and the end of nodes at the end.
DOMParser.prototype.parseSlice = function parseSlice (dom, options) {
    if ( options === void 0 ) options = {};

  var context = new ParseContext(this, options, true);
  context.addAll(dom, null, options.from, options.to);
  return Slice.maxOpen(context.finish())
};

DOMParser.prototype.matchTag = function matchTag (dom, context) {
    var this$1 = this;

  for (var i = 0; i < this.tags.length; i++) {
    var rule = this$1.tags[i];
    if (matches(dom, rule.tag) &&
        (rule.namespace === undefined || dom.namespaceURI == rule.namespace) &&
        (!rule.context || context.matchesContext(rule.context))) {
      if (rule.getAttrs) {
        var result = rule.getAttrs(dom);
        if (result === false) { continue }
        rule.attrs = result;
      }
      return rule
    }
  }
};

DOMParser.prototype.matchStyle = function matchStyle (prop, value, context) {
    var this$1 = this;

  for (var i = 0; i < this.styles.length; i++) {
    var rule = this$1.styles[i];
    if (rule.style.indexOf(prop) != 0 ||
        rule.context && !context.matchesContext(rule.context) ||
        // Test that the style string either precisely matches the prop,
        // or has an '=' sign after the prop, followed by the given
        // value.
        rule.style.length > prop.length &&
        (rule.style.charCodeAt(prop.length) != 61 || rule.style.slice(prop.length + 1) != value))
      { continue }
    if (rule.getAttrs) {
      var result = rule.getAttrs(value);
      if (result === false) { continue }
      rule.attrs = result;
    }
    return rule
  }
};

// : (Schema) → [ParseRule]
DOMParser.schemaRules = function schemaRules (schema) {
  var result = [];
  function insert(rule) {
    var priority = rule.priority == null ? 50 : rule.priority, i = 0;
    for (; i < result.length; i++) {
      var next = result[i], nextPriority = next.priority == null ? 50 : next.priority;
      if (nextPriority < priority) { break }
    }
    result.splice(i, 0, rule);
  }

  var loop = function ( name ) {
    var rules = schema.marks[name].spec.parseDOM;
    if (rules) { rules.forEach(function (rule) {
      insert(rule = copy(rule));
      rule.mark = name;
    }); }
  };

    for (var name in schema.marks) loop( name );
  var loop$1 = function ( name ) {
    var rules$1 = schema.nodes[name$1].spec.parseDOM;
    if (rules$1) { rules$1.forEach(function (rule) {
      insert(rule = copy(rule));
      rule.node = name$1;
    }); }
  };

    for (var name$1 in schema.nodes) loop$1( name );
  return result
};

// :: (Schema) → DOMParser
// Construct a DOM parser using the parsing rules listed in a
// schema's [node specs](#model.NodeSpec.parseDOM), reordered by
// [priority](#model.ParseRule.priority).
DOMParser.fromSchema = function fromSchema (schema) {
  return schema.cached.domParser ||
    (schema.cached.domParser = new DOMParser(schema, DOMParser.schemaRules(schema)))
};

// : Object<bool> The block-level tags in HTML5
var blockTags = {
  address: true, article: true, aside: true, blockquote: true, canvas: true,
  dd: true, div: true, dl: true, fieldset: true, figcaption: true, figure: true,
  footer: true, form: true, h1: true, h2: true, h3: true, h4: true, h5: true,
  h6: true, header: true, hgroup: true, hr: true, li: true, noscript: true, ol: true,
  output: true, p: true, pre: true, section: true, table: true, tfoot: true, ul: true
};

// : Object<bool> The tags that we normally ignore.
var ignoreTags = {
  head: true, noscript: true, object: true, script: true, style: true, title: true
};

// : Object<bool> List tags.
var listTags = {ol: true, ul: true};

// Using a bitfield for node context options
var OPT_PRESERVE_WS = 1;
var OPT_PRESERVE_WS_FULL = 2;
var OPT_OPEN_LEFT = 4;

function wsOptionsFor(preserveWhitespace) {
  return (preserveWhitespace ? OPT_PRESERVE_WS : 0) | (preserveWhitespace === "full" ? OPT_PRESERVE_WS_FULL : 0)
}

var NodeContext = function NodeContext(type, attrs, solid, match, options) {
  this.type = type;
  this.attrs = attrs;
  this.solid = solid;
  this.match = match || (options & OPT_OPEN_LEFT ? null : type.contentMatch);
  this.options = options;
  this.content = [];
};

NodeContext.prototype.findWrapping = function findWrapping (node) {
  if (!this.match) {
    if (!this.type) { return [] }
    var fill = this.type.contentMatch.fillBefore(Fragment.from(node));
    if (fill) {
      this.match = this.type.contentMatch.matchFragment(fill);
    } else {
      var start = this.type.contentMatch, wrap;
      if (wrap = start.findWrapping(node.type)) {
        this.match = start;
        return wrap
      } else {
        return null
      }
    }
  }
  return this.match.findWrapping(node.type)
};

NodeContext.prototype.finish = function finish (openEnd) {
  if (!(this.options & OPT_PRESERVE_WS)) { // Strip trailing whitespace
    var last = this.content[this.content.length - 1], m;
    if (last && last.isText && (m = /\s+$/.exec(last.text))) {
      if (last.text.length == m[0].length) { this.content.pop(); }
      else { this.content[this.content.length - 1] = last.withText(last.text.slice(0, last.text.length - m[0].length)); }
    }
  }
  var content = Fragment.from(this.content);
  if (!openEnd && this.match)
    { content = content.append(this.match.fillBefore(Fragment.empty, true)); }
  return this.type ? this.type.create(this.attrs, content) : content
};

var ParseContext = function ParseContext(parser, options, open) {
  // : DOMParser The parser we are using.
  this.parser = parser;
  // : Object The options passed to this parse.
  this.options = options;
  this.isOpen = open;
  var topNode = options.topNode, topContext;
  var topOptions = wsOptionsFor(options.preserveWhitespace) | (open ? OPT_OPEN_LEFT : 0);
  if (topNode)
    { topContext = new NodeContext(topNode.type, topNode.attrs, true,
                                 options.topMatch || topNode.type.contentMatch, topOptions); }
  else if (open)
    { topContext = new NodeContext(null, null, true, null, topOptions); }
  else
    { topContext = new NodeContext(parser.schema.topNodeType, null, true, null, topOptions); }
  this.nodes = [topContext];
  // : [Mark] The current set of marks
  this.marks = Mark.none;
  this.open = 0;
  this.find = options.findPositions;
  this.needsBlock = false;
};

var prototypeAccessors$5 = { top: {},currentPos: {} };

prototypeAccessors$5.top.get = function () {
  return this.nodes[this.open]
};

// : (Mark) → [Mark]
// Add a mark to the current set of marks, return the old set.
ParseContext.prototype.addMark = function addMark (mark) {
  var old = this.marks;
  this.marks = mark.addToSet(this.marks);
  return old
};

// : (dom.Node)
// Add a DOM node to the content. Text is inserted as text node,
// otherwise, the node is passed to `addElement` or, if it has a
// `style` attribute, `addElementWithStyles`.
ParseContext.prototype.addDOM = function addDOM (dom) {
  if (dom.nodeType == 3) {
    this.addTextNode(dom);
  } else if (dom.nodeType == 1) {
    var style = dom.getAttribute("style");
    if (style) { this.addElementWithStyles(parseStyles(style), dom); }
    else { this.addElement(dom); }
  }
};

ParseContext.prototype.addTextNode = function addTextNode (dom) {
  var value = dom.nodeValue;
  var top = this.top;
  if ((top.type ? top.type.inlineContent : top.content.length && top.content[0].isInline) || /\S/.test(value)) {
    if (!(top.options & OPT_PRESERVE_WS)) {
      value = value.replace(/\s+/g, " ");
      // If this starts with whitespace, and there is either no node
      // before it or a node that ends with whitespace, strip the
      // leading space.
      if (/^\s/.test(value) && this.open == this.nodes.length - 1) {
        var nodeBefore = top.content[top.content.length - 1];
        if (!nodeBefore || nodeBefore.isText && /\s$/.test(nodeBefore.text))
          { value = value.slice(1); }
      }
    } else if (!(top.options & OPT_PRESERVE_WS_FULL)) {
      value = value.replace(/\r?\n|\r/g, " ");
    }
    if (value) { this.insertNode(this.parser.schema.text(value, this.marks)); }
    this.findInText(dom);
  } else {
    this.findInside(dom);
  }
};

// : (dom.Element)
// Try to find a handler for the given tag and use that to parse. If
// none is found, the element's content nodes are added directly.
ParseContext.prototype.addElement = function addElement (dom) {
  var name = dom.nodeName.toLowerCase();
  if (listTags.hasOwnProperty(name)) { normalizeList(dom); }
  var rule = (this.options.ruleFromNode && this.options.ruleFromNode(dom)) || this.parser.matchTag(dom, this);
  if (rule ? rule.ignore : ignoreTags.hasOwnProperty(name)) {
    this.findInside(dom);
  } else if (!rule || rule.skip) {
    if (rule && rule.skip.nodeType) { dom = rule.skip; }
    var sync, oldNeedsBlock = this.needsBlock;
    if (blockTags.hasOwnProperty(name)) {
      sync = this.top;
      if (!sync.type) { this.needsBlock = true; }
    }
    this.addAll(dom);
    if (sync) { this.sync(sync); }
    this.needsBlock = oldNeedsBlock;
  } else {
    this.addElementByRule(dom, rule);
  }
};

// Run any style parser associated with the node's styles. After
// that, if no style parser suppressed the node's content, pass it
// through to `addElement`.
ParseContext.prototype.addElementWithStyles = function addElementWithStyles (styles, dom) {
    var this$1 = this;

  var oldMarks = this.marks, ignore = false;
  for (var i = 0; i < styles.length; i += 2) {
    var rule = this$1.parser.matchStyle(styles[i], styles[i + 1], this$1);
    if (!rule) { continue }
    if (rule.ignore) { ignore = true; break }
    this$1.addMark(this$1.parser.schema.marks[rule.mark].create(rule.attrs));
  }
  if (!ignore) { this.addElement(dom); }
  this.marks = oldMarks;
};

// : (dom.Element, ParseRule) → bool
// Look up a handler for the given node. If none are found, return
// false. Otherwise, apply it, use its return value to drive the way
// the node's content is wrapped, and return true.
ParseContext.prototype.addElementByRule = function addElementByRule (dom, rule) {
    var this$1 = this;

  var sync, before, nodeType, markType, mark;
  if (rule.node) {
    nodeType = this.parser.schema.nodes[rule.node];
    if (nodeType.isLeaf) { this.insertNode(nodeType.create(rule.attrs, null, this.marks)); }
    else { sync = this.enter(nodeType, rule.attrs, rule.preserveWhitespace) && this.top; }
  } else {
    markType = this.parser.schema.marks[rule.mark];
    before = this.addMark(mark = markType.create(rule.attrs));
  }

  if (nodeType && nodeType.isLeaf) {
    this.findInside(dom);
  } else if (rule.getContent) {
    this.findInside(dom);
    rule.getContent(dom).forEach(function (node) { return this$1.insertNode(mark ? node.mark(mark.addToSet(node.marks)) : node); });
  } else {
    var contentDOM = rule.contentElement;
    if (typeof contentDOM == "string") { contentDOM = dom.querySelector(contentDOM); }
    else if (typeof contentDOM == "function") { contentDOM = contentDOM(dom); }
    if (!contentDOM) { contentDOM = dom; }
    this.findAround(dom, contentDOM, true);
    this.addAll(contentDOM, sync);
  }
  if (sync) { this.sync(sync); this.open--; }
  else if (before) { this.marks = before; }
  return true
};

// : (dom.Node, ?NodeBuilder, ?number, ?number)
// Add all child nodes between `startIndex` and `endIndex` (or the
// whole node, if not given). If `sync` is passed, use it to
// synchronize after every block element.
ParseContext.prototype.addAll = function addAll (parent, sync, startIndex, endIndex) {
    var this$1 = this;

  var index = startIndex || 0;
  for (var dom = startIndex ? parent.childNodes[startIndex] : parent.firstChild,
           end = endIndex == null ? null : parent.childNodes[endIndex];
       dom != end; dom = dom.nextSibling, ++index) {
    this$1.findAtPoint(parent, index);
    this$1.addDOM(dom);
    if (sync && blockTags.hasOwnProperty(dom.nodeName.toLowerCase()))
      { this$1.sync(sync); }
  }
  this.findAtPoint(parent, index);
};

// Try to find a way to fit the given node type into the current
// context. May add intermediate wrappers and/or leave non-solid
// nodes that we're in.
ParseContext.prototype.findPlace = function findPlace (node) {
    var this$1 = this;

  var route, sync;
  for (var depth = this.open; depth >= 0; depth--) {
    var cx = this$1.nodes[depth];
    var found = cx.findWrapping(node);
    if (found && (!route || route.length > found.length)) {
      route = found;
      sync = cx;
      if (!found.length) { break }
    }
    if (cx.solid) { break }
  }
  if (!route) { return false }
  this.sync(sync);
  for (var i = 0; i < route.length; i++)
    { this$1.enterInner(route[i], null, false); }
  return true
};

// : (Node) → ?Node
// Try to insert the given node, adjusting the context when needed.
ParseContext.prototype.insertNode = function insertNode (node) {
  if (node.isInline && this.needsBlock && !this.top.type) {
    var block = this.textblockFromContext();
    if (block) { this.enter(block); }
  }
  if (this.findPlace(node)) {
    this.closeExtra();
    var top = this.top;
    if (top.match) {
      top.match = top.match.matchType(node.type);
      if (top.type) { node = node.mark(top.type.allowedMarks(node.marks)); }
    }
    top.content.push(node);
  }
};

// : (NodeType, ?Object) → bool
// Try to start a node of the given type, adjusting the context when
// necessary.
ParseContext.prototype.enter = function enter (type, attrs, preserveWS) {
  var ok = this.findPlace(type.create(attrs));
  if (ok) { this.enterInner(type, attrs, true, preserveWS); }
  return ok
};

// Open a node of the given type
ParseContext.prototype.enterInner = function enterInner (type, attrs, solid, preserveWS) {
  this.closeExtra();
  var top = this.top;
  top.match = top.match && top.match.matchType(type, attrs);
  var options = preserveWS == null ? top.options & ~OPT_OPEN_LEFT : wsOptionsFor(preserveWS);
  if ((top.options & OPT_OPEN_LEFT) && top.content.length == 0) { options |= OPT_OPEN_LEFT; }
  this.nodes.push(new NodeContext(type, attrs, solid, null, options));
  this.open++;
};

// Make sure all nodes above this.open are finished and added to
// their parents
ParseContext.prototype.closeExtra = function closeExtra (openEnd) {
    var this$1 = this;

  var i = this.nodes.length - 1;
  if (i > this.open) {
    this.marks = Mark.none;
    for (; i > this.open; i--) { this$1.nodes[i - 1].content.push(this$1.nodes[i].finish(openEnd)); }
    this.nodes.length = this.open + 1;
  }
};

ParseContext.prototype.finish = function finish () {
  this.open = 0;
  this.closeExtra(this.isOpen);
  return this.nodes[0].finish(this.isOpen || this.options.topOpen)
};

ParseContext.prototype.sync = function sync (to) {
    var this$1 = this;

  for (var i = this.open; i >= 0; i--) { if (this$1.nodes[i] == to) {
    this$1.open = i;
    return
  } }
};

prototypeAccessors$5.currentPos.get = function () {
    var this$1 = this;

  this.closeExtra();
  var pos = 0;
  for (var i = this.open; i >= 0; i--) {
    var content = this$1.nodes[i].content;
    for (var j = content.length - 1; j >= 0; j--)
      { pos += content[j].nodeSize; }
    if (i) { pos++; }
  }
  return pos
};

ParseContext.prototype.findAtPoint = function findAtPoint (parent, offset) {
    var this$1 = this;

  if (this.find) { for (var i = 0; i < this.find.length; i++) {
    if (this$1.find[i].node == parent && this$1.find[i].offset == offset)
      { this$1.find[i].pos = this$1.currentPos; }
  } }
};

ParseContext.prototype.findInside = function findInside (parent) {
    var this$1 = this;

  if (this.find) { for (var i = 0; i < this.find.length; i++) {
    if (this$1.find[i].pos == null && parent.nodeType == 1 && parent.contains(this$1.find[i].node))
      { this$1.find[i].pos = this$1.currentPos; }
  } }
};

ParseContext.prototype.findAround = function findAround (parent, content, before) {
    var this$1 = this;

  if (parent != content && this.find) { for (var i = 0; i < this.find.length; i++) {
    if (this$1.find[i].pos == null && parent.nodeType == 1 && parent.contains(this$1.find[i].node)) {
      var pos = content.compareDocumentPosition(this$1.find[i].node);
      if (pos & (before ? 2 : 4))
        { this$1.find[i].pos = this$1.currentPos; }
    }
  } }
};

ParseContext.prototype.findInText = function findInText (textNode) {
    var this$1 = this;

  if (this.find) { for (var i = 0; i < this.find.length; i++) {
    if (this$1.find[i].node == textNode)
      { this$1.find[i].pos = this$1.currentPos - (textNode.nodeValue.length - this$1.find[i].offset); }
  } }
};

// : (string) → bool
// Determines whether the given [context
// string](#ParseRule.context) matches this context.
ParseContext.prototype.matchesContext = function matchesContext (context) {
    var this$1 = this;

  var parts = context.split("/");
  var option = this.options.context;
  var useRoot = !this.isOpen && (!option || option.parent.type == this.nodes[0].type);
  var minDepth = -(option ? option.depth + 1 : 0) + (useRoot ? 0 : 1);
  var match = function (i, depth) {
    for (; i >= 0; i--) {
      var part = parts[i];
      if (part == "") {
        if (i == parts.length - 1 || i == 0) { continue }
        for (; depth >= minDepth; depth--)
          { if (match(i - 1, depth)) { return true } }
        return false
      } else {
        var next = depth > 0 || (depth == 0 && useRoot) ? this$1.nodes[depth].type
            : option && depth >= minDepth ? option.node(depth - minDepth).type
            : null;
        if (!next || (next.name != part && next.groups.indexOf(part) == -1))
          { return false }
        depth--;
      }
    }
    return true
  };
  return match(parts.length - 1, this.open)
};

ParseContext.prototype.textblockFromContext = function textblockFromContext () {
    var this$1 = this;

  var $context = this.options.context;
  if ($context) { for (var d = $context.depth; d >= 0; d--) {
    var deflt = $context.node(d).defaultContentType($context.indexAfter(d));
    if (deflt && deflt.isTextblock && deflt.defaultAttrs) { return deflt }
  } }
  for (var name in this$1.parser.schema.nodes) {
    var type = this$1.parser.schema.nodes[name];
    if (type.isTextblock && type.defaultAttrs) { return type }
  }
};

Object.defineProperties( ParseContext.prototype, prototypeAccessors$5 );

// Kludge to work around directly nested list nodes produced by some
// tools and allowed by browsers to mean that the nested list is
// actually part of the list item above it.
function normalizeList(dom) {
  for (var child = dom.firstChild, prevItem = null; child; child = child.nextSibling) {
    var name = child.nodeType == 1 ? child.nodeName.toLowerCase() : null;
    if (name && listTags.hasOwnProperty(name) && prevItem) {
      prevItem.appendChild(child);
      child = prevItem;
    } else if (name == "li") {
      prevItem = child;
    } else if (name) {
      prevItem = null;
    }
  }
}

// Apply a CSS selector.
function matches(dom, selector) {
  return (dom.matches || dom.msMatchesSelector || dom.webkitMatchesSelector || dom.mozMatchesSelector).call(dom, selector)
}

// : (string) → [string]
// Tokenize a style attribute into property/value pairs.
function parseStyles(style) {
  var re = /\s*([\w-]+)\s*:\s*([^;]+)/g, m, result = [];
  while (m = re.exec(style)) { result.push(m[1], m[2].trim()); }
  return result
}

function copy(obj) {
  var copy = {};
  for (var prop in obj) { copy[prop] = obj[prop]; }
  return copy
}

// DOMOutputSpec:: interface
// A description of a DOM structure. Can be either a string, which is
// interpreted as a text node, a DOM node, which is interpreted as
// itself, or an array.
//
// An array describes a DOM element. The first value in the array
// should be a string—the name of the DOM element. If the second
// element is plain object object, it is interpreted as an set of
// attributes for the element. Any elements after that (including the
// 2nd if it's not an attribute object) are interpreted as children of
// the DOM elements, and must either be valid `DOMOutputSpec` values,
// or the number zero.
//
// The number zero (pronounced “hole”) is used to indicate the place
// where a node's child nodes should be inserted. It it occurs in an
// output spec, it should be the only child element in its parent
// node.

// ::- A DOM serializer knows how to convert ProseMirror nodes and
// marks of various types to DOM nodes.
var DOMSerializer = function DOMSerializer(nodes, marks) {
  // :: Object<(node: Node) → DOMOutputSpec>
  // The node serialization functions.
  this.nodes = nodes || {};
  // :: Object<?(mark: Mark, inline: bool) → DOMOutputSpec>
  // The mark serialization functions.
  this.marks = marks || {};
};

// :: (Fragment, ?Object) → dom.DocumentFragment
// Serialize the content of this fragment to a DOM fragment. When
// not in the browser, the `document` option, containing a DOM
// document, should be passed so that the serializer can create
// nodes.
DOMSerializer.prototype.serializeFragment = function serializeFragment (fragment, options, target) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

  if (!target) { target = doc(options).createDocumentFragment(); }

  var top = target, active = null;
  fragment.forEach(function (node) {
    if (active || node.marks.length) {
      if (!active) { active = []; }
      var keep = 0;
      for (; keep < Math.min(active.length, node.marks.length); ++keep)
        { if (!node.marks[keep].eq(active[keep])) { break } }
      while (keep < active.length) {
        var removed = active.pop();
        if (this$1.marks[removed.type.name]) { top = top.parentNode; }
      }
      while (active.length < node.marks.length) {
        var add = node.marks[active.length];
        active.push(add);
        var markDOM = this$1.serializeMark(add, node.isInline, options);
        if (markDOM) { top = top.appendChild(markDOM); }
      }
    }
    top.appendChild(this$1.serializeNode(node, options));
  });

  return target
};

// :: (Node, ?Object) → dom.Node
// Serialize this node to a DOM node. This can be useful when you
// need to serialize a part of a document, as opposed to the whole
// document. To serialize a whole document, use
// [`serializeFragment`](#model.DOMSerializer.serializeFragment) on
// its [content](#model.Node.content).
DOMSerializer.prototype.serializeNode = function serializeNode (node, options) {
    if ( options === void 0 ) options = {};

  return this.renderStructure(this.nodes[node.type.name](node), node, options)
};

DOMSerializer.prototype.serializeNodeAndMarks = function serializeNodeAndMarks (node, options) {
    var this$1 = this;
    if ( options === void 0 ) options = {};

  var dom = this.serializeNode(node, options);
  for (var i = node.marks.length - 1; i >= 0; i--) {
    var wrap = this$1.serializeMark(node.marks[i], node.isInline, options);
    if (wrap) {
      wrap.appendChild(dom);
      dom = wrap;
    }
  }
  return dom
};

DOMSerializer.prototype.serializeMark = function serializeMark (mark, inline, options) {
    if ( options === void 0 ) options = {};

  var toDOM = this.marks[mark.type.name];
  return toDOM && this.renderStructure(toDOM(mark, inline), null, options)
};

// :: (dom.Document, DOMOutputSpec) → {dom: dom.Node, contentDOM: ?dom.Node}
// Render an [output spec](#model.DOMOutputSpec) to a DOM node. If
// the spec has a hole (zero) in it, `contentDOM` will point at the
// node with the hole.
DOMSerializer.renderSpec = function renderSpec (doc, structure) {
  if (typeof structure == "string")
    { return {dom: doc.createTextNode(structure)} }
  if (structure.nodeType != null)
    { return {dom: structure} }
  var dom = doc.createElement(structure[0]), contentDOM = null;
  var attrs = structure[1], start = 1;
  if (attrs && typeof attrs == "object" && attrs.nodeType == null && !Array.isArray(attrs)) {
    start = 2;
    for (var name in attrs) {
      if (name == "style") { dom.style.cssText = attrs[name]; }
      else if (attrs[name] != null) { dom.setAttribute(name, attrs[name]); }
    }
  }
  for (var i = start; i < structure.length; i++) {
    var child = structure[i];
    if (child === 0) {
      if (i < structure.length - 1 || i > start)
        { throw new RangeError("Content hole must be the only child of its parent node") }
      return {dom: dom, contentDOM: dom}
    } else {
      var ref = DOMSerializer.renderSpec(doc, child);
        var inner = ref.dom;
        var innerContent = ref.contentDOM;
      dom.appendChild(inner);
      if (innerContent) {
        if (contentDOM) { throw new RangeError("Multiple content holes") }
        contentDOM = innerContent;
      }
    }
  }
  return {dom: dom, contentDOM: contentDOM}
};

DOMSerializer.prototype.renderStructure = function renderStructure (structure, node, options) {
  var ref = DOMSerializer.renderSpec(doc(options), structure);
    var dom = ref.dom;
    var contentDOM = ref.contentDOM;
  if (contentDOM) {
    if (!node || node.isLeaf)
      { throw new RangeError("Content hole not allowed in a mark or leaf node spec") }
    if (options.onContent)
      { options.onContent(node, contentDOM, options); }
    else
      { this.serializeFragment(node.content, options, contentDOM); }
  }
  return dom
};

// :: (Schema) → DOMSerializer
// Build a serializer using the [`toDOM`](#model.NodeSpec.toDOM)
// properties in a schema's node and mark specs.
DOMSerializer.fromSchema = function fromSchema (schema) {
  return schema.cached.domSerializer ||
    (schema.cached.domSerializer = new DOMSerializer(this.nodesFromSchema(schema), this.marksFromSchema(schema)))
};

// : (Schema) → Object<(node: Node) → DOMOutputSpec>
// Gather the serializers in a schema's node specs into an object.
// This can be useful as a base to build a custom serializer from.
DOMSerializer.nodesFromSchema = function nodesFromSchema (schema) {
  var result = gatherToDOM(schema.nodes);
  if (!result.text) { result.text = function (node) { return node.text; }; }
  return result
};

// : (Schema) → Object<(mark: Mark) → DOMOutputSpec>
// Gather the serializers in a schema's mark specs into an object.
DOMSerializer.marksFromSchema = function marksFromSchema (schema) {
  return gatherToDOM(schema.marks)
};

function gatherToDOM(obj) {
  var result = {};
  for (var name in obj) {
    var toDOM = obj[name].spec.toDOM;
    if (toDOM) { result[name] = toDOM; }
  }
  return result
}

function doc(options) {
  // declare global: window
  return options.document || window.document
}

exports.Node = Node;
exports.ResolvedPos = ResolvedPos;
exports.NodeRange = NodeRange;
exports.Fragment = Fragment;
exports.Slice = Slice;
exports.ReplaceError = ReplaceError;
exports.Mark = Mark;
exports.Schema = Schema;
exports.NodeType = NodeType;
exports.MarkType = MarkType;
exports.ContentMatch = ContentMatch;
exports.DOMParser = DOMParser;
exports.DOMSerializer = DOMSerializer;
//# sourceMappingURL=index.js.map


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);
var toAbsoluteIndex = __webpack_require__(35);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(19);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(19);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__(12);
var redefine = __webpack_require__(13);
var fails = __webpack_require__(3);
var defined = __webpack_require__(23);
var wks = __webpack_require__(5);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var redefineAll = __webpack_require__(41);
var meta = __webpack_require__(29);
var forOf = __webpack_require__(40);
var anInstance = __webpack_require__(39);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(57);
var setToStringTag = __webpack_require__(42);
var inheritIfRequired = __webpack_require__(73);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var uid = __webpack_require__(32);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(33) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete __webpack_require__(2)[K];
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(18);
var forOf = __webpack_require__(40);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var core = __webpack_require__(21);
var LIBRARY = __webpack_require__(33);
var wksExt = __webpack_require__(94);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(52)('keys');
var uid = __webpack_require__(32);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(18)(Function.call, __webpack_require__(16).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(71).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(24);
var defined = __webpack_require__(23);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var $iterCreate = __webpack_require__(79);
var setToStringTag = __webpack_require__(42);
var getPrototypeOf = __webpack_require__(17);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(36);
var descriptor = __webpack_require__(31);
var setToStringTag = __webpack_require__(42);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(5)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(56);
var defined = __webpack_require__(23);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(44);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(31);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(49);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(44);
module.exports = __webpack_require__(21).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(222);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(30);
var step = __webpack_require__(110);
var Iterators = __webpack_require__(44);
var toIObject = __webpack_require__(15);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(78)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(18);
var invoke = __webpack_require__(100);
var html = __webpack_require__(70);
var cel = __webpack_require__(66);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(19)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var macrotask = __webpack_require__(88).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(19)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(6);
var LIBRARY = __webpack_require__(33);
var $typed = __webpack_require__(62);
var hide = __webpack_require__(12);
var redefineAll = __webpack_require__(41);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(39);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var toIndex = __webpack_require__(119);
var gOPN = __webpack_require__(37).f;
var dP = __webpack_require__(7).f;
var arrayFill = __webpack_require__(86);
var setToStringTag = __webpack_require__(42);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),
/* 92 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(6) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(66)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(15);
var arrayIndexOf = __webpack_require__(53)(false);
var IE_PROTO = __webpack_require__(68)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(34);

module.exports = __webpack_require__(6) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(15);
var gOPN = __webpack_require__(37).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(54);
var pIE = __webpack_require__(48);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(47);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(100);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};


/***/ }),
/* 100 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(43).trim;
var ws = __webpack_require__(72);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(43).trim;

module.exports = 1 / $parseFloat(__webpack_require__(72) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(19);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};


/***/ }),
/* 105 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(75);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(47);
var toLength = __webpack_require__(8);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(6) && /./g.flags != 'g') __webpack_require__(7).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(58)
});


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(90);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(115);
var validate = __webpack_require__(45);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(61)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(36);
var redefineAll = __webpack_require__(41);
var ctx = __webpack_require__(18);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var $iterDefine = __webpack_require__(78);
var step = __webpack_require__(110);
var setSpecies = __webpack_require__(38);
var DESCRIPTORS = __webpack_require__(6);
var fastKey = __webpack_require__(29).fastKey;
var validate = __webpack_require__(45);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(115);
var validate = __webpack_require__(45);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(61)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each = __webpack_require__(26)(0);
var redefine = __webpack_require__(13);
var meta = __webpack_require__(29);
var assign = __webpack_require__(98);
var weak = __webpack_require__(118);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var validate = __webpack_require__(45);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(61)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll = __webpack_require__(41);
var getWeak = __webpack_require__(29).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var createArrayMethod = __webpack_require__(26);
var $has = __webpack_require__(11);
var validate = __webpack_require__(45);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(37);
var gOPS = __webpack_require__(54);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = __webpack_require__(55);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(8);
var ctx = __webpack_require__(18);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8);
var repeat = __webpack_require__(74);
var defined = __webpack_require__(23);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(34);
var toIObject = __webpack_require__(15);
var isEnum = __webpack_require__(48).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(49);
var from = __webpack_require__(125);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(40);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 126 */
/***/ (function(module, exports) {

// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var prosemirrorTransform = __webpack_require__(50);
var prosemirrorModel = __webpack_require__(51);
var prosemirrorState = __webpack_require__(46);

// :: (EditorState, ?(tr: Transaction)) → bool
// Delete the selection, if there is one.
function deleteSelection(state, dispatch) {
  if (state.selection.empty) { return false }
  if (dispatch) { dispatch(state.tr.deleteSelection().scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction), ?EditorView) → bool
// If the selection is empty and at the start of a textblock, try to
// reduce the distance between that block and the one before it—if
// there's a block directly before it that can be joined, join them.
// If not, try to move the selected block closer to the next one in
// the document structure by lifting it out of its parent or moving it
// into a parent of the previous block. Will use the view for accurate
// (bidi-aware) start-of-textblock detection if given.
function joinBackward(state, dispatch, view) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("backward", state)
                        : $cursor.parentOffset > 0))
    { return false }

  var $cut = findCutBefore($cursor);

  // If there is no node before this, try to lift
  if (!$cut) {
    var range = $cursor.blockRange(), target = range && prosemirrorTransform.liftTarget(range);
    if (target == null) { return false }
    if (dispatch) { dispatch(state.tr.lift(range, target).scrollIntoView()); }
    return true
  }

  var before = $cut.nodeBefore;
  // Apply the joining algorithm
  if (!before.type.spec.isolating && deleteBarrier(state, $cut, dispatch))
    { return true }

  // If the node below has no content and the node above is
  // selectable, delete the node below and select the one above.
  if ($cursor.parent.content.size == 0 &&
      (textblockAt(before, "end") || prosemirrorState.NodeSelection.isSelectable(before))) {
    if (dispatch) {
      var tr = state.tr.deleteRange($cursor.before(), $cursor.after());
      tr.setSelection(textblockAt(before, "end") ? prosemirrorState.Selection.findFrom($cut, -1)
                      : prosemirrorState.NodeSelection.create(tr.doc, $cut.pos - before.nodeSize));
      dispatch(tr.scrollIntoView());
    }
    return true
  }

  // If the node before is an atom, delete it
  if (before.isAtom && $cut.depth == $cursor.depth - 1) {
    if (dispatch) { dispatch(state.tr.delete($cut.pos - before.nodeSize, $cut.pos).scrollIntoView()); }
    return true
  }

  return false
}

function textblockAt(node, side) {
  for (; node; node = (side == "start" ? node.firstChild : node.lastChild))
    { if (node.isTextblock) { return true } }
  return false
}

// :: (EditorState, ?(tr: Transaction), ?EditorView) → bool
// When the selection is empty and at the start of a textblock, select
// the node before that textblock, if possible. This is intended to be
// bound to keys like backspace, after
// [`joinBackward`](#commands.joinBackward) or other deleting
// commands, as a fall-back behavior when the schema doesn't allow
// deletion at the selected point.
function selectNodeBackward(state, dispatch, view) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("backward", state)
                        : $cursor.parentOffset > 0))
    { return false }

  var $cut = findCutBefore($cursor), node = $cut && $cut.nodeBefore;
  if (!node || !prosemirrorState.NodeSelection.isSelectable(node)) { return false }
  if (dispatch)
    { dispatch(state.tr.setSelection(prosemirrorState.NodeSelection.create(state.doc, $cut.pos - node.nodeSize)).scrollIntoView()); }
  return true
}

function findCutBefore($pos) {
  if (!$pos.parent.type.spec.isolating) { for (var i = $pos.depth - 1; i >= 0; i--) {
    if ($pos.index(i) > 0) { return $pos.doc.resolve($pos.before(i + 1)) }
    if ($pos.node(i).type.spec.isolating) { break }
  } }
  return null
}

// :: (EditorState, ?(tr: Transaction), ?EditorView) → bool
// If the selection is empty and the cursor is at the end of a
// textblock, try to reduce or remove the boundary between that block
// and the one after it, either by joining them or by moving the other
// block closer to this one in the tree structure. Will use the view
// for accurate start-of-textblock detection if given.
function joinForward(state, dispatch, view) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("forward", state)
                        : $cursor.parentOffset < $cursor.parent.content.size))
    { return false }

  var $cut = findCutAfter($cursor);

  // If there is no node after this, there's nothing to do
  if (!$cut) { return false }

  var after = $cut.nodeAfter;
  // Try the joining algorithm
  if (deleteBarrier(state, $cut, dispatch)) { return true }

  // If the node above has no content and the node below is
  // selectable, delete the node above and select the one below.
  if ($cursor.parent.content.size == 0 &&
      (textblockAt(after, "start") || prosemirrorState.NodeSelection.isSelectable(after))) {
    if (dispatch) {
      var tr = state.tr.deleteRange($cursor.before(), $cursor.after());
      tr.setSelection(textblockAt(after, "start") ? prosemirrorState.Selection.findFrom($cut, 1)
                      : prosemirrorState.NodeSelection.create(tr.doc, tr.mapping.map($cut.pos)));
      dispatch(tr.scrollIntoView());
    }
    return true
  }

  // If the next node is an atom, delete it
  if (after.isAtom && $cut.depth == $cursor.depth - 1) {
    if (dispatch) { dispatch(state.tr.delete($cut.pos, $cut.pos + after.nodeSize).scrollIntoView()); }
    return true
  }

  return false
}

// :: (EditorState, ?(tr: Transaction), ?EditorView) → bool
// When the selection is empty and at the end of a textblock, select
// the node coming after that textblock, if possible. This is intended
// to be bound to keys like delete, after
// [`joinForward`](#commands.joinForward) and similar deleting
// commands, to provide a fall-back behavior when the schema doesn't
// allow deletion at the selected point.
function selectNodeForward(state, dispatch, view) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || (view ? !view.endOfTextblock("forward", state)
                        : $cursor.parentOffset < $cursor.parent.content.size))
    { return false }

  var $cut = findCutAfter($cursor), node = $cut && $cut.nodeAfter;
  if (!node || !prosemirrorState.NodeSelection.isSelectable(node)) { return false }
  if (dispatch)
    { dispatch(state.tr.setSelection(prosemirrorState.NodeSelection.create(state.doc, $cut.pos)).scrollIntoView()); }
  return true
}

function findCutAfter($pos) {
  if (!$pos.parent.type.spec.isolating) { for (var i = $pos.depth - 1; i >= 0; i--) {
    var parent = $pos.node(i);
    if ($pos.index(i) + 1 < parent.childCount) { return $pos.doc.resolve($pos.after(i + 1)) }
    if (parent.type.spec.isolating) { break }
  } }
  return null
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Join the selected block or, if there is a text selection, the
// closest ancestor block of the selection that can be joined, with
// the sibling above it.
function joinUp(state, dispatch) {
  var sel = state.selection, nodeSel = sel instanceof prosemirrorState.NodeSelection, point;
  if (nodeSel) {
    if (sel.node.isTextblock || !prosemirrorTransform.canJoin(state.doc, sel.from)) { return false }
    point = sel.from;
  } else {
    point = prosemirrorTransform.joinPoint(state.doc, sel.from, -1);
    if (point == null) { return false }
  }
  if (dispatch) {
    var tr = state.tr.join(point);
    if (nodeSel) { tr.setSelection(prosemirrorState.NodeSelection.create(tr.doc, point - state.doc.resolve(point).nodeBefore.nodeSize)); }
    dispatch(tr.scrollIntoView());
  }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Join the selected block, or the closest ancestor of the selection
// that can be joined, with the sibling after it.
function joinDown(state, dispatch) {
  var sel = state.selection, point;
  if (sel instanceof prosemirrorState.NodeSelection) {
    if (sel.node.isTextblock || !prosemirrorTransform.canJoin(state.doc, sel.to)) { return false }
    point = sel.to;
  } else {
    point = prosemirrorTransform.joinPoint(state.doc, sel.to, 1);
    if (point == null) { return false }
  }
  if (dispatch)
    { dispatch(state.tr.join(point).scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Lift the selected block, or the closest ancestor block of the
// selection that can be lifted, out of its parent node.
function lift(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var $to = ref.$to;
  var range = $from.blockRange($to), target = range && prosemirrorTransform.liftTarget(range);
  if (target == null) { return false }
  if (dispatch) { dispatch(state.tr.lift(range, target).scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// If the selection is in a node whose type has a truthy
// [`code`](#model.NodeSpec.code) property in its spec, replace the
// selection with a newline character.
function newlineInCode(state, dispatch) {
  var ref = state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) { return false }
  if (dispatch) { dispatch(state.tr.insertText("\n").scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// When the selection is in a node with a truthy
// [`code`](#model.NodeSpec.code) property in its spec, create a
// default block after the code block, and move the cursor there.
function exitCode(state, dispatch) {
  var ref = state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  if (!$head.parent.type.spec.code || !$head.sameParent($anchor)) { return false }
  var above = $head.node(-1), after = $head.indexAfter(-1), type = above.defaultContentType(after);
  if (!above.canReplaceWith(after, after, type)) { return false }
  if (dispatch) {
    var pos = $head.after(), tr = state.tr.replaceWith(pos, pos, type.createAndFill());
    tr.setSelection(prosemirrorState.Selection.near(tr.doc.resolve(pos), 1));
    dispatch(tr.scrollIntoView());
  }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// If a block node is selected, create an empty paragraph before (if
// it is its parent's first child) or after it.
function createParagraphNear(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var $to = ref.$to;
  if ($from.parent.inlineContent || $to.parent.inlineContent) { return false }
  var type = $from.parent.defaultContentType($to.indexAfter());
  if (!type || !type.isTextblock) { return false }
  if (dispatch) {
    var side = (!$from.parentOffset && $to.index() < $to.parent.childCount ? $from : $to).pos;
    var tr = state.tr.insert(side, type.createAndFill());
    tr.setSelection(prosemirrorState.TextSelection.create(tr.doc, side + 1));
    dispatch(tr.scrollIntoView());
  }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// If the cursor is in an empty textblock that can be lifted, lift the
// block.
function liftEmptyBlock(state, dispatch) {
  var ref = state.selection;
  var $cursor = ref.$cursor;
  if (!$cursor || $cursor.parent.content.size) { return false }
  if ($cursor.depth > 1 && $cursor.after() != $cursor.end(-1)) {
    var before = $cursor.before();
    if (prosemirrorTransform.canSplit(state.doc, before)) {
      if (dispatch) { dispatch(state.tr.split(before).scrollIntoView()); }
      return true
    }
  }
  var range = $cursor.blockRange(), target = range && prosemirrorTransform.liftTarget(range);
  if (target == null) { return false }
  if (dispatch) { dispatch(state.tr.lift(range, target).scrollIntoView()); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Split the parent block of the selection. If the selection is a text
// selection, also delete its content.
function splitBlock(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var $to = ref.$to;
  if (state.selection instanceof prosemirrorState.NodeSelection && state.selection.node.isBlock) {
    if (!$from.parentOffset || !prosemirrorTransform.canSplit(state.doc, $from.pos)) { return false }
    if (dispatch) { dispatch(state.tr.split($from.pos).scrollIntoView()); }
    return true
  }

  if (dispatch) {
    var atEnd = $to.parentOffset == $to.parent.content.size;
    var tr = state.tr;
    if (state.selection instanceof prosemirrorState.TextSelection) { tr.deleteSelection(); }
    var deflt = $from.depth == 0 ? null : $from.node(-1).defaultContentType($from.indexAfter(-1));
    var types = atEnd ? [{type: deflt}] : null;
    var can = prosemirrorTransform.canSplit(tr.doc, $from.pos, 1, types);
    if (!types && !can && prosemirrorTransform.canSplit(tr.doc, tr.mapping.map($from.pos), 1, [{type: deflt}])) {
      types = [{type: deflt}];
      can = true;
    }
    if (can) {
      tr.split(tr.mapping.map($from.pos), 1, types);
      if (!atEnd && !$from.parentOffset && $from.parent.type != deflt &&
          $from.node(-1).canReplace($from.index(-1), $from.indexAfter(-1), prosemirrorModel.Fragment.from(deflt.create(), $from.parent)))
        { tr.setNodeMarkup(tr.mapping.map($from.before()), deflt); }
    }
    dispatch(tr.scrollIntoView());
  }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Acts like [`splitBlock`](#commands.splitBlock), but without
// resetting the set of active marks at the cursor.
function splitBlockKeepMarks(state, dispatch) {
  return splitBlock(state, dispatch && (function (tr) {
    var marks = state.storedMarks || (state.selection.$to.parentOffset && state.selection.$from.marks());
    if (marks) { tr.ensureMarks(marks); }
    dispatch(tr);
  }))
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Move the selection to the node wrapping the current selection, if
// any. (Will not select the document node.)
function selectParentNode(state, dispatch) {
  var ref = state.selection;
  var $from = ref.$from;
  var to = ref.to;
  var pos;
  var same = $from.sharedDepth(to);
  if (same == 0) { return false }
  pos = $from.before(same);
  if (dispatch) { dispatch(state.tr.setSelection(prosemirrorState.NodeSelection.create(state.doc, pos))); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// Select the whole document.
function selectAll(state, dispatch) {
  if (dispatch) { dispatch(state.tr.setSelection(new prosemirrorState.AllSelection(state.doc))); }
  return true
}

function joinMaybeClear(state, $pos, dispatch) {
  var before = $pos.nodeBefore, after = $pos.nodeAfter, index = $pos.index();
  if (!before || !after || !before.type.compatibleContent(after.type)) { return false }
  if (!before.content.size && $pos.parent.canReplace(index - 1, index)) {
    if (dispatch) { dispatch(state.tr.delete($pos.pos - before.nodeSize, $pos.pos).scrollIntoView()); }
    return true
  }
  if (!$pos.parent.canReplace(index, index + 1) || !(after.isTextblock || prosemirrorTransform.canJoin(state.doc, $pos.pos)))
    { return false }
  if (dispatch)
    { dispatch(state.tr
             .clearIncompatible($pos.pos, before.type, before.contentMatchAt(before.childCount))
             .join($pos.pos)
             .scrollIntoView()); }
  return true
}

function deleteBarrier(state, $cut, dispatch) {
  var before = $cut.nodeBefore, after = $cut.nodeAfter, conn, match;
  if (joinMaybeClear(state, $cut, dispatch)) { return true }

  if ($cut.parent.canReplace($cut.index(), $cut.index() + 1) &&
      (conn = (match = before.contentMatchAt(before.childCount)).findWrapping(after.type)) &&
      match.matchType(conn[0] || after.type).validEnd) {
    if (dispatch) {
      var end = $cut.pos + after.nodeSize, wrap = prosemirrorModel.Fragment.empty;
      for (var i = conn.length - 1; i >= 0; i--)
        { wrap = prosemirrorModel.Fragment.from(conn[i].create(null, wrap)); }
      wrap = prosemirrorModel.Fragment.from(before.copy(wrap));
      var tr = state.tr.step(new prosemirrorTransform.ReplaceAroundStep($cut.pos - 1, end, $cut.pos, end, new prosemirrorModel.Slice(wrap, 1, 0), conn.length, true));
      var joinAt = end + 2 * conn.length;
      if (prosemirrorTransform.canJoin(tr.doc, joinAt)) { tr.join(joinAt); }
      dispatch(tr.scrollIntoView());
    }
    return true
  }

  var selAfter = prosemirrorState.Selection.findFrom($cut, 1);
  var range = selAfter && selAfter.$from.blockRange(selAfter.$to), target = range && prosemirrorTransform.liftTarget(range);
  if (target != null && target >= $cut.depth) {
    if (dispatch) { dispatch(state.tr.lift(range, target).scrollIntoView()); }
    return true
  }

  return false
}

// Parameterized commands

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Wrap the selection in a node of the given type with the given
// attributes.
function wrapIn(nodeType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    var range = $from.blockRange($to), wrapping = range && prosemirrorTransform.findWrapping(range, nodeType, attrs);
    if (!wrapping) { return false }
    if (dispatch) { dispatch(state.tr.wrap(range, wrapping).scrollIntoView()); }
    return true
  }
}

// :: (NodeType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Returns a command that tries to set the textblock around the
// selection to the given node type with the given attributes.
function setBlockType(nodeType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var $from = ref.$from;
    var $to = ref.$to;
    var depth, target;
    if (state.selection instanceof prosemirrorState.NodeSelection) {
      depth = $from.depth;
      target = state.selection.node;
    } else {
      if (!$from.depth || $to.pos > $from.end()) { return false }
      depth = $from.depth - 1;
      target = $from.parent;
    }
    if (!target.isTextblock || target.hasMarkup(nodeType, attrs)) { return false }
    var index = $from.index(depth);
    if (!$from.node(depth).canReplaceWith(index, index + 1, nodeType)) { return false }
    if (dispatch) {
      var where = $from.before(depth + 1);
      dispatch(state.tr
               .clearIncompatible(where, nodeType)
               .setNodeMarkup(where, nodeType, attrs)
               .scrollIntoView());
    }
    return true
  }
}

function markApplies(doc, ranges, type) {
  var loop = function ( i ) {
    var ref = ranges[i];
    var $from = ref.$from;
    var $to = ref.$to;
    var can = $from.depth == 0 ? doc.type.allowsMarkType(type) : false;
    doc.nodesBetween($from.pos, $to.pos, function (node) {
      if (can) { return false }
      can = node.inlineContent && node.type.allowsMarkType(type);
    });
    if (can) { return { v: true } }
  };

  for (var i = 0; i < ranges.length; i++) {
    var returned = loop( i );

    if ( returned ) return returned.v;
  }
  return false
}

// :: (MarkType, ?Object) → (state: EditorState, dispatch: ?(tr: Transaction)) → bool
// Create a command function that toggles the given mark with the
// given attributes. Will return `false` when the current selection
// doesn't support that mark. This will remove the mark if any marks
// of that type exist in the selection, or add it otherwise. If the
// selection is empty, this applies to the [stored
// marks](#state.EditorState.storedMarks) instead of a range of the
// document.
function toggleMark(markType, attrs) {
  return function(state, dispatch) {
    var ref = state.selection;
    var empty = ref.empty;
    var $cursor = ref.$cursor;
    var ranges = ref.ranges;
    if ((empty && !$cursor) || !markApplies(state.doc, ranges, markType)) { return false }
    if (dispatch) {
      if ($cursor) {
        if (markType.isInSet(state.storedMarks || $cursor.marks()))
          { dispatch(state.tr.removeStoredMark(markType)); }
        else
          { dispatch(state.tr.addStoredMark(markType.create(attrs))); }
      } else {
        var has = false, tr = state.tr;
        for (var i = 0; !has && i < ranges.length; i++) {
          var ref$1 = ranges[i];
          var $from = ref$1.$from;
          var $to = ref$1.$to;
          has = state.doc.rangeHasMark($from.pos, $to.pos, markType);
        }
        for (var i$1 = 0; i$1 < ranges.length; i$1++) {
          var ref$2 = ranges[i$1];
          var $from$1 = ref$2.$from;
          var $to$1 = ref$2.$to;
          if (has) { tr.removeMark($from$1.pos, $to$1.pos, markType); }
          else { tr.addMark($from$1.pos, $to$1.pos, markType.create(attrs)); }
        }
        dispatch(tr.scrollIntoView());
      }
    }
    return true
  }
}

function wrapDispatchForJoin(dispatch, isJoinable) {
  return function (tr) {
    if (!tr.isGeneric) { return dispatch(tr) }

    var ranges = [];
    for (var i = 0; i < tr.mapping.maps.length; i++) {
      var map = tr.mapping.maps[i];
      for (var j = 0; j < ranges.length; j++)
        { ranges[j] = map.map(ranges[j]); }
      map.forEach(function (_s, _e, from, to) { return ranges.push(from, to); });
    }

    // Figure out which joinable points exist inside those ranges,
    // by checking all node boundaries in their parent nodes.
    var joinable = [];
    for (var i$1 = 0; i$1 < ranges.length; i$1 += 2) {
      var from = ranges[i$1], to = ranges[i$1 + 1];
      var $from = tr.doc.resolve(from), depth = $from.sharedDepth(to), parent = $from.node(depth);
      for (var index = $from.indexAfter(depth), pos = $from.after(depth + 1); pos <= to; ++index) {
        var after = parent.maybeChild(index);
        if (!after) { break }
        if (index && joinable.indexOf(pos) == -1) {
          var before = parent.child(index - 1);
          if (before.type == after.type && isJoinable(before, after))
            { joinable.push(pos); }
        }
        pos += after.nodeSize;
      }
    }
    // Join the joinable points
    joinable.sort(function (a, b) { return a - b; });
    for (var i$2 = joinable.length - 1; i$2 >= 0; i$2--) {
      if (prosemirrorTransform.canJoin(tr.doc, joinable[i$2])) { tr.join(joinable[i$2]); }
    }
    dispatch(tr);
  }
}

// :: ((state: EditorState, ?(tr: Transaction)) → bool, union<(before: Node, after: Node) → bool, [string]>) → (state: EditorState, ?(tr: Transaction)) → bool
// Wrap a command so that, when it produces a transform that causes
// two joinable nodes to end up next to each other, those are joined.
// Nodes are considered joinable when they are of the same type and
// when the `isJoinable` predicate returns true for them or, if an
// array of strings was passed, if their node type name is in that
// array.
function autoJoin(command, isJoinable) {
  if (Array.isArray(isJoinable)) {
    var types = isJoinable;
    isJoinable = function (node) { return types.indexOf(node.type.name) > -1; };
  }
  return function (state, dispatch) { return command(state, dispatch && wrapDispatchForJoin(dispatch, isJoinable)); }
}

// :: (...[(EditorState, ?(tr: Transaction), ?EditorView) → bool]) → (EditorState, ?(tr: Transaction), ?EditorView) → bool
// Combine a number of command functions into a single function (which
// calls them one by one until one returns true).
function chainCommands() {
  var commands = [], len = arguments.length;
  while ( len-- ) commands[ len ] = arguments[ len ];

  return function(state, dispatch, view) {
    for (var i = 0; i < commands.length; i++)
      { if (commands[i](state, dispatch, view)) { return true } }
    return false
  }
}

var backspace = chainCommands(deleteSelection, joinBackward, selectNodeBackward);
var del = chainCommands(deleteSelection, joinForward, selectNodeForward);

// :: Object
// A basic keymap containing bindings not specific to any schema.
// Binds the following keys (when multiple commands are listed, they
// are chained with [`chainCommands`](#commands.chainCommands)):
//
// * **Enter** to `newlineInCode`, `createParagraphNear`, `liftEmptyBlock`, `splitBlock`
// * **Mod-Enter** to `exitCode`
// * **Backspace** and **Mod-Backspace** to `deleteSelection`, `joinBackward`, `selectNodeBackward`
// * **Delete** and **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
// * **Mod-Delete** to `deleteSelection`, `joinForward`, `selectNodeForward`
// * **Mod-a** to `selectAll`
var baseKeymap = {
  "Enter": chainCommands(newlineInCode, createParagraphNear, liftEmptyBlock, splitBlock),
  "Mod-Enter": exitCode,
  "Backspace": backspace,
  "Mod-Backspace": backspace,
  "Delete": del,
  "Mod-Delete": del,
  "Mod-a": selectAll
};

// declare global: os, navigator
var mac = typeof navigator != "undefined" ? /Mac/.test(navigator.platform)
          : typeof os != "undefined" ? os.platform() == "darwin" : false;

if (mac) {
  var extra = {
    "Ctrl-h": baseKeymap["Backspace"],
    "Alt-Backspace": baseKeymap["Mod-Backspace"],
    "Ctrl-d": baseKeymap["Delete"],
    "Ctrl-Alt-Backspace": baseKeymap["Mod-Delete"],
    "Alt-Delete": baseKeymap["Mod-Delete"],
    "Alt-d": baseKeymap["Mod-Delete"]
  };
  for (var prop in extra) { baseKeymap[prop] = extra[prop]; }
}

exports.deleteSelection = deleteSelection;
exports.joinBackward = joinBackward;
exports.selectNodeBackward = selectNodeBackward;
exports.joinForward = joinForward;
exports.selectNodeForward = selectNodeForward;
exports.joinUp = joinUp;
exports.joinDown = joinDown;
exports.lift = lift;
exports.newlineInCode = newlineInCode;
exports.exitCode = exitCode;
exports.createParagraphNear = createParagraphNear;
exports.liftEmptyBlock = liftEmptyBlock;
exports.splitBlock = splitBlock;
exports.splitBlockKeepMarks = splitBlockKeepMarks;
exports.selectParentNode = selectParentNode;
exports.selectAll = selectAll;
exports.wrapIn = wrapIn;
exports.setBlockType = setBlockType;
exports.toggleMark = toggleMark;
exports.autoJoin = autoJoin;
exports.chainCommands = chainCommands;
exports.baseKeymap = baseKeymap;
//# sourceMappingURL=commands.js.map


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var RopeSequence = _interopDefault(__webpack_require__(334));
var prosemirrorTransform = __webpack_require__(50);
var prosemirrorState = __webpack_require__(46);

// ProseMirror's history isn't simply a way to roll back to a previous
// state, because ProseMirror supports applying changes without adding
// them to the history (for example during collaboration).
//
// To this end, each 'Branch' (one for the undo history and one for
// the redo history) keeps an array of 'Items', which can optionally
// hold a step (an actual undoable change), and always hold a position
// map (which is needed to move changes below them to apply to the
// current document).
//
// An item that has both a step and a selection bookmark is the start
// of an 'event' — a group of changes that will be undone or redone at
// once. (It stores only the bookmark, since that way we don't have to
// provide a document until the selection is actually applied, which
// is useful when compressing.)

// Used to schedule history compression
var max_empty_items = 500;

var Branch = function Branch(items, eventCount) {
  this.items = items;
  this.eventCount = eventCount;
};

// : (Node, bool, ?Item) → ?{transform: Transform, selection: Object}
// Pop the latest event off the branch's history and apply it
// to a document transform.
Branch.prototype.popEvent = function popEvent (state, preserveItems) {
    var this$1 = this;

  if (this.eventCount == 0) { return null }

  var end = this.items.length;
  for (;; end--) {
    var next = this$1.items.get(end - 1);
    if (next.selection) { --end; break }
  }

  var remap, mapFrom;
  if (preserveItems) {
    remap = this.remapping(end, this.items.length);
    mapFrom = remap.maps.length;
  }
  var transform = state.tr;
  var selection, remaining;
  var addAfter = [], addBefore = [];

  this.items.forEach(function (item, i) {
    if (!item.step) {
      if (!remap) {
        remap = this$1.remapping(end, i + 1);
        mapFrom = remap.maps.length;
      }
      mapFrom--;
      addBefore.push(item);
      return
    }

    if (remap) {
      addBefore.push(new Item(item.map));
      var step = item.step.map(remap.slice(mapFrom)), map;

      if (step && transform.maybeStep(step).doc) {
        map = transform.mapping.maps[transform.mapping.maps.length - 1];
        addAfter.push(new Item(map, null, null, addAfter.length + addBefore.length));
      }
      mapFrom--;
      if (map) { remap.appendMap(map, mapFrom); }
    } else {
      transform.maybeStep(item.step);
    }

    if (item.selection) {
      selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
      remaining = new Branch(this$1.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this$1.eventCount - 1);
      return false
    }
  }, this.items.length, 0);

  return {remaining: remaining, transform: transform, selection: selection}
};

// : (Transform, Selection, Object)
// Create a new branch with the given transform added.
Branch.prototype.addTransform = function addTransform (transform, selection, histOptions, preserveItems) {
  var newItems = [], eventCount = this.eventCount + (selection ? 1 : 0);
  var oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;

  for (var i = 0; i < transform.steps.length; i++) {
    var step = transform.steps[i].invert(transform.docs[i]);
    var item = new Item(transform.mapping.maps[i], step, selection), merged = (void 0);
    if (merged = lastItem && lastItem.merge(item)) {
      item = merged;
      if (i) { newItems.pop(); }
      else { oldItems = oldItems.slice(0, oldItems.length - 1); }
    }
    newItems.push(item);
    selection = null;
    if (!preserveItems) { lastItem = item; }
  }
  var overflow = eventCount - histOptions.depth;
  if (overflow > DEPTH_OVERFLOW) {
    oldItems = cutOffEvents(oldItems, overflow);
    eventCount -= overflow;
  }
  return new Branch(oldItems.append(newItems), eventCount)
};

Branch.prototype.remapping = function remapping (from, to) {
  var maps = [], mirrors = [];
  this.items.forEach(function (item, i) {
    if (item.mirrorOffset != null) {
      var mirrorPos = i - item.mirrorOffset;
      if (mirrorPos >= from) { mirrors.push(maps.length - item.mirrorOffset, maps.length); }
    }
    maps.push(item.map);
  }, from, to);
  return new prosemirrorTransform.Mapping(maps, mirrors)
};

Branch.prototype.addMaps = function addMaps (array) {
  if (this.eventCount == 0) { return this }
  return new Branch(this.items.append(array.map(function (map) { return new Item(map); })), this.eventCount)
};

// : ([StepMap], Transform, [number])
// When the collab module receives remote changes, the history has
// to know about those, so that it can adjust the steps that were
// rebased on top of the remote changes, and include the position
// maps for the remote changes in its array of items.
Branch.prototype.rebased = function rebased (rebasedTransform, rebasedCount) {
  if (!this.eventCount) { return this }

  var rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);

  var mapping = rebasedTransform.mapping;
  var newUntil = rebasedTransform.steps.length;
  var eventCount = this.eventCount;

  var iRebased = rebasedCount;
  this.items.forEach(function (item) {
    var pos = mapping.getMirror(--iRebased);
    if (pos == null) { return }
    newUntil = Math.min(newUntil, pos);
    var map = mapping.maps[pos];
    if (item.step) {
      var step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
      var selection = item.selection && item.selection.map(mapping.slice(iRebased, pos));
      rebasedItems.push(new Item(map, step, selection));
    } else {
      if (item.selection) { eventCount--; }
      rebasedItems.push(new Item(map));
    }
  }, start);

  var newMaps = [];
  for (var i = rebasedCount; i < newUntil; i++)
    { newMaps.push(new Item(mapping.maps[i])); }
  var items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
  var branch = new Branch(items, eventCount);
  if (branch.emptyItemCount() > max_empty_items)
    { branch = branch.compress(this.items.length - rebasedItems.length); }
  return branch
};

Branch.prototype.emptyItemCount = function emptyItemCount () {
  var count = 0;
  this.items.forEach(function (item) { if (!item.step) { count++; } });
  return count
};

// Compressing a branch means rewriting it to push the air (map-only
// items) out. During collaboration, these naturally accumulate
// because each remote change adds one. The `upto` argument is used
// to ensure that only the items below a given level are compressed,
// because `rebased` relies on a clean, untouched set of items in
// order to associate old items with rebased steps.
Branch.prototype.compress = function compress (upto) {
    if ( upto === void 0 ) upto = this.items.length;

  var remap = this.remapping(0, upto), mapFrom = remap.maps.length;
  var items = [], events = 0;
  this.items.forEach(function (item, i) {
    if (i >= upto) {
      items.push(item);
      if (item.selection) { events++; }
    } else if (item.step) {
      var step = item.step.map(remap.slice(mapFrom)), map = step && step.getMap();
      mapFrom--;
      if (map) { remap.appendMap(map, mapFrom); }
      if (step) {
        var selection = item.selection && item.selection.map(remap.slice(mapFrom));
        if (selection) { events++; }
        var newItem = new Item(map.invert(), step, selection), merged, last = items.length - 1;
        if (merged = items.length && items[last].merge(newItem))
          { items[last] = merged; }
        else
          { items.push(newItem); }
      }
    } else if (item.map) {
      mapFrom--;
    }
  }, this.items.length, 0);
  return new Branch(RopeSequence.from(items.reverse()), events)
};

Branch.empty = new Branch(RopeSequence.empty, 0);

function cutOffEvents(items, n) {
  var cutPoint;
  items.forEach(function (item, i) {
    if (item.selection && (n-- == 0)) {
      cutPoint = i;
      return false
    }
  });
  return items.slice(cutPoint)
}

var Item = function Item(map, step, selection, mirrorOffset) {
  this.map = map;
  this.step = step;
  this.selection = selection;
  this.mirrorOffset = mirrorOffset;
};

Item.prototype.merge = function merge (other) {
  if (this.step && other.step && !other.selection) {
    var step = other.step.merge(this.step);
    if (step) { return new Item(step.getMap().invert(), step, this.selection) }
  }
};

// The value of the state field that tracks undo/redo history for that
// state. Will be stored in the plugin state when the history plugin
// is active.
var HistoryState = function HistoryState(done, undone, prevMap, prevTime) {
  this.done = done;
  this.undone = undone;
  this.prevMap = prevMap;
  this.prevTime = prevTime;
};

var DEPTH_OVERFLOW = 20;

// : (EditorState, EditorState, Selection, Object)
// Record a transformation in undo history.
function applyTransaction(history, state, tr, options) {
  var newState = tr.getMeta(historyKey), rebased;
  if (newState) { return newState }

  if (tr.getMeta(closeHistoryKey)) { history = new HistoryState(history.done, history.undone, null, 0); }

  var appended = tr.getMeta("appendedTransaction");
  if (tr.steps.length == 0) {
    return history
  } else if ((appended || tr).getMeta("addToHistory") !== false) {
    // Group transforms that occur in quick succession into one event.
    var newGroup = history.prevTime < (tr.time || 0) - options.newGroupDelay ||
        !appended && !isAdjacentToLastStep(tr, history.prevMap, history.done);
    return new HistoryState(history.done.addTransform(tr, newGroup ? state.selection.getBookmark() : null,
                                                      options, mustPreserveItems(state)),
                            Branch.empty, tr.mapping.maps[tr.steps.length - 1], tr.time)
  } else if (rebased = tr.getMeta("rebased")) {
    // Used by the collab module to tell the history that some of its
    // content has been rebased.
    return new HistoryState(history.done.rebased(tr, rebased),
                            history.undone.rebased(tr, rebased),
                            history.prevMap && tr.mapping.maps[tr.steps.length - 1], history.prevTime)
  } else {
    return new HistoryState(history.done.addMaps(tr.mapping.maps),
                            history.undone.addMaps(tr.mapping.maps),
                            history.prevMap, history.prevTime)
  }
}

function isAdjacentToLastStep(transform, prevMap, done) {
  if (!prevMap) { return false }
  var firstMap = transform.mapping.maps[0], adjacent = false;
  if (!firstMap) { return true }
  firstMap.forEach(function (start, end) {
    done.items.forEach(function (item) {
      if (item.step) {
        prevMap.forEach(function (_start, _end, rStart, rEnd) {
          if (start <= rEnd && end >= rStart) { adjacent = true; }
        });
        return false
      } else {
        start = item.map.invert().map(start, -1);
        end = item.map.invert().map(end, 1);
      }
    }, done.items.length, 0);
  });
  return adjacent
}

// : (HistoryState, EditorState, (tr: Transaction), bool)
// Apply the latest event from one branch to the document and optionally
// shift the event onto the other branch. Returns true when an event could
// be shifted.
function histTransaction(history, state, dispatch, redo) {
  var preserveItems = mustPreserveItems(state), histOptions = historyKey.get(state).spec.config;
  var pop = (redo ? history.undone : history.done).popEvent(state, preserveItems);
  if (!pop) { return }

  var selection = pop.selection.resolve(pop.transform.doc);
  var added = (redo ? history.done : history.undone).addTransform(pop.transform, state.selection.getBookmark(),
                                                                  histOptions, preserveItems);

  var newHist = new HistoryState(redo ? added : pop.remaining, redo ? pop.remaining : added, null, 0);
  dispatch(pop.transform.setSelection(selection).setMeta(historyKey, newHist).scrollIntoView());
}

var cachedPreserveItems = false;
var cachedPreserveItemsPlugins = null;
// Check whether any plugin in the given state has a
// `historyPreserveItems` property in its spec, in which case we must
// preserve steps exactly as they came in, so that they can be
// rebased.
function mustPreserveItems(state) {
  var plugins = state.plugins;
  if (cachedPreserveItemsPlugins != plugins) {
    cachedPreserveItems = false;
    cachedPreserveItemsPlugins = plugins;
    for (var i = 0; i < plugins.length; i++) { if (plugins[i].spec.historyPreserveItems) {
      cachedPreserveItems = true;
      break
    } }
  }
  return cachedPreserveItems
}

// :: (Transaction) → Transaction
// Set a flag on the given transaction that will prevent further steps
// from being appended to an existing history event (so that they
// require a separate undo command to undo).
function closeHistory(tr) {
  return tr.setMeta(closeHistoryKey, true)
}

var historyKey = new prosemirrorState.PluginKey("history");
var closeHistoryKey = new prosemirrorState.PluginKey("closeHistory");

// :: (?Object) → Plugin
// Returns a plugin that enables the undo history for an editor. The
// plugin will track undo and redo stacks, which can be used with the
// [`undo`](#history.undo) and [`redo`](#history.redo) commands.
//
// You can set an `"addToHistory"` [metadata
// property](#state.Transaction.setMeta) of `false` on a transaction
// to prevent it from being rolled back by undo.
//
//   config::-
//   Supports the following configuration options:
//
//     depth:: ?number
//     The amount of history events that are collected before the
//     oldest events are discarded. Defaults to 100.
//
//     newGroupDelay:: ?number
//     The delay between changes after which a new group should be
//     started. Defaults to 500 (milliseconds). Note that when changes
//     aren't adjacent, a new group is always started.
function history(config) {
  config = {depth: config && config.depth || 100,
            newGroupDelay: config && config.newGroupDelay || 500};
  return new prosemirrorState.Plugin({
    key: historyKey,

    state: {
      init: function init() {
        return new HistoryState(Branch.empty, Branch.empty, null, 0)
      },
      apply: function apply(tr, hist, state) {
        return applyTransaction(hist, state, tr, config)
      }
    },

    config: config
  })
}

// :: (EditorState, ?(tr: Transaction)) → bool
// A command function that undoes the last change, if any.
function undo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.done.eventCount == 0) { return false }
  if (dispatch) { histTransaction(hist, state, dispatch, false); }
  return true
}

// :: (EditorState, ?(tr: Transaction)) → bool
// A command function that redoes the last undone change, if any.
function redo(state, dispatch) {
  var hist = historyKey.getState(state);
  if (!hist || hist.undone.eventCount == 0) { return false }
  if (dispatch) { histTransaction(hist, state, dispatch, true); }
  return true
}

// :: (EditorState) → number
// The amount of undoable events available in a given state.
function undoDepth(state) {
  var hist = historyKey.getState(state);
  return hist ? hist.done.eventCount : 0
}

// :: (EditorState) → number
// The amount of redoable events available in a given editor state.
function redoDepth(state) {
  var hist = historyKey.getState(state);
  return hist ? hist.undone.eventCount : 0
}

exports.HistoryState = HistoryState;
exports.closeHistory = closeHistory;
exports.history = history;
exports.undo = undo;
exports.redo = redo;
exports.undoDepth = undoDepth;
exports.redoDepth = redoDepth;
//# sourceMappingURL=history.js.map


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(130);
module.exports = __webpack_require__(332);


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(131);

__webpack_require__(328);

__webpack_require__(329);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(92)))

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(132);
__webpack_require__(134);
__webpack_require__(135);
__webpack_require__(136);
__webpack_require__(137);
__webpack_require__(138);
__webpack_require__(139);
__webpack_require__(140);
__webpack_require__(141);
__webpack_require__(142);
__webpack_require__(143);
__webpack_require__(144);
__webpack_require__(145);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(223);
__webpack_require__(224);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(87);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(111);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(114);
__webpack_require__(116);
__webpack_require__(117);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(319);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
module.exports = __webpack_require__(21);


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(2);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(6);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(13);
var META = __webpack_require__(29).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(52);
var setToStringTag = __webpack_require__(42);
var uid = __webpack_require__(32);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(94);
var wksDefine = __webpack_require__(67);
var enumKeys = __webpack_require__(133);
var isArray = __webpack_require__(55);
var anObject = __webpack_require__(1);
var toIObject = __webpack_require__(15);
var toPrimitive = __webpack_require__(22);
var createDesc = __webpack_require__(31);
var _create = __webpack_require__(36);
var gOPNExt = __webpack_require__(97);
var $GOPD = __webpack_require__(16);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(34);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(37).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(48).f = $propertyIsEnumerable;
  __webpack_require__(54).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(33)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(34);
var gOPS = __webpack_require__(54);
var pIE = __webpack_require__(48);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(36) });


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(6), 'Object', { defineProperties: __webpack_require__(96) });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(15);
var $getOwnPropertyDescriptor = __webpack_require__(16).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(17);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(34);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(97).f;
});


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(29).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(98) });


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(149) });


/***/ }),
/* 149 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(71).set });


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(49);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(13)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(99) });


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(6) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(17);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(7).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(101);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(102);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(2);
var has = __webpack_require__(11);
var cof = __webpack_require__(19);
var inheritIfRequired = __webpack_require__(73);
var toPrimitive = __webpack_require__(22);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(37).f;
var gOPD = __webpack_require__(16).f;
var dP = __webpack_require__(7).f;
var $trim = __webpack_require__(43).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(36)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(6) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(13)(global, NUMBER, $Number);
}


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toInteger = __webpack_require__(24);
var aNumberValue = __webpack_require__(103);
var repeat = __webpack_require__(74);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(103);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(104) });


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(104);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(102);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(101);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(105);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(75);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(76);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(106) });


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(105) });


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(75) });


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(76);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(76);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(35);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toLength = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(43)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(77)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(78)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $at = __webpack_require__(77)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(80);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(81)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__(0);
var context = __webpack_require__(80);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(81)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(74)
});


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__(0);
var toLength = __webpack_require__(8);
var context = __webpack_require__(80);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(81)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(14)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(14)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(14)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(14)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(14)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(14)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(14)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(14)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(14)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(14)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(14)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(14)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(14)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(211);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(13)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(12)(proto, TO_PRIMITIVE, __webpack_require__(214));


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(55) });


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(18);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(107);
var isArrayIter = __webpack_require__(82);
var toLength = __webpack_require__(8);
var createProperty = __webpack_require__(83);
var getIterFn = __webpack_require__(84);

$export($export.S + $export.F * !__webpack_require__(57)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var createProperty = __webpack_require__(83);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(47) != Object || !__webpack_require__(20)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var html = __webpack_require__(70);
var cof = __webpack_require__(19);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(20)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $forEach = __webpack_require__(26)(0);
var STRICT = __webpack_require__(20)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
var isArray = __webpack_require__(55);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $map = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(20)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(20)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $some = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(20)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $every = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(20)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(108);

$export($export.P + $export.F * !__webpack_require__(20)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});


/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $reduce = __webpack_require__(108);

$export($export.P + $export.F * !__webpack_require__(20)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});


/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(53)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});


/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(15);
var toInteger = __webpack_require__(24);
var toLength = __webpack_require__(8);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(20)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});


/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(109) });

__webpack_require__(30)('copyWithin');


/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(86) });

__webpack_require__(30)('fill');


/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);


/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0);
var $find = __webpack_require__(26)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(30)(KEY);


/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(38)('Array');


/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(73);
var dP = __webpack_require__(7).f;
var gOPN = __webpack_require__(37).f;
var isRegExp = __webpack_require__(56);
var $flags = __webpack_require__(58);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(6) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(13)(global, 'RegExp', $RegExp);
}

__webpack_require__(38)('RegExp');


/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(111);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(58);
var DESCRIPTORS = __webpack_require__(6);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__(13)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(59)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});


/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(59)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(59)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});


/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(59)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = __webpack_require__(56);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});


/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(33);
var global = __webpack_require__(2);
var ctx = __webpack_require__(18);
var classof = __webpack_require__(49);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(39);
var forOf = __webpack_require__(40);
var speciesConstructor = __webpack_require__(60);
var task = __webpack_require__(88).set;
var microtask = __webpack_require__(89)();
var newPromiseCapabilityModule = __webpack_require__(90);
var perform = __webpack_require__(112);
var promiseResolve = __webpack_require__(113);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(41)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(42)($Promise, PROMISE);
__webpack_require__(38)(PROMISE);
Wrapper = __webpack_require__(21)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(57)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(118);
var validate = __webpack_require__(45);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(61)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);


/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $typed = __webpack_require__(62);
var buffer = __webpack_require__(91);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(35);
var toLength = __webpack_require__(8);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(60);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(38)(ARRAY_BUFFER);


/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(62).ABV, {
  DataView: __webpack_require__(91).DataView
});


/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);


/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(27)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});


/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(36);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(99);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(7);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(22);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(16).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});


/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
__webpack_require__(79)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});


/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });


/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(16);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});


/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(17);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});


/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});


/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});


/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(120) });


/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(7);
var gOPD = __webpack_require__(16);
var getPrototypeOf = __webpack_require__(17);
var has = __webpack_require__(11);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(31);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });


/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(71);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});


/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__(0);
var $includes = __webpack_require__(53)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(30)('includes');


/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(121);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(85);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(30)('flatMap');


/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(121);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(8);
var toInteger = __webpack_require__(24);
var arraySpeciesCreate = __webpack_require__(85);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(30)('flatten');


/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0);
var $at = __webpack_require__(77)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});


/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(122);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});


/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0);
var $pad = __webpack_require__(122);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});


/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');


/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(43)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');


/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export = __webpack_require__(0);
var defined = __webpack_require__(23);
var toLength = __webpack_require__(8);
var isRegExp = __webpack_require__(56);
var getFlags = __webpack_require__(58);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(79)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});


/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67)('asyncIterator');


/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(67)('observable');


/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(120);
var toIObject = __webpack_require__(15);
var gOPD = __webpack_require__(16);
var createProperty = __webpack_require__(83);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(123)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});


/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(123)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(6) && $export($export.P + __webpack_require__(63), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(7);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(6) && $export($export.P + __webpack_require__(63), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});


/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(63), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(22);
var getPrototypeOf = __webpack_require__(17);
var getOwnPropertyDescriptor = __webpack_require__(16).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(6) && $export($export.P + __webpack_require__(63), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});


/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(124)('Map') });


/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(124)('Set') });


/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(64)('Map');


/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(64)('Set');


/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(64)('WeakMap');


/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(64)('WeakSet');


/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(65)('Map');


/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(65)('Set');


/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(65)('WeakMap');


/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(65)('WeakSet');


/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });


/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });


/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(19);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});


/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});


/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });


/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});


/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(126);
var fround = __webpack_require__(106);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});


/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});


/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});


/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});


/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });


/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});


/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(126) });


/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});


/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });


/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(0);
var core = __webpack_require__(21);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(60);
var promiseResolve = __webpack_require__(113);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(90);
var perform = __webpack_require__(112);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });


/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });


/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var Set = __webpack_require__(116);
var from = __webpack_require__(125);
var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });


/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(17);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });


/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var $metadata = __webpack_require__(28);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });


/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(89)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(19)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});


/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(21);
var microtask = __webpack_require__(89)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(39);
var redefineAll = __webpack_require__(41);
var hide = __webpack_require__(12);
var forOf = __webpack_require__(40);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

__webpack_require__(38)('Observable');


/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});


/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
var $task = __webpack_require__(88);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});


/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__(87);
var getKeys = __webpack_require__(34);
var redefine = __webpack_require__(13);
var global = __webpack_require__(2);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(44);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(92)))

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(330);
module.exports = __webpack_require__(21).RegExp.escape;


/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(331)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });


/***/ }),
/* 331 */
/***/ (function(module, exports) {

module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};


/***/ }),
/* 332 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prosemirror_commands__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prosemirror_commands___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prosemirror_commands__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prosemirror_history__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prosemirror_history___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prosemirror_history__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prosemirror_keymap__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_prosemirror_keymap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_prosemirror_keymap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prosemirror_menu__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_prosemirror_menu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_prosemirror_menu__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prosemirror_model__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_prosemirror_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_prosemirror_model__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prosemirror_state__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prosemirror_state___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prosemirror_state__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prosemirror_transform__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_prosemirror_transform___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_prosemirror_transform__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prosemirror_view__ = __webpack_require__(339);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prosemirror_view___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prosemirror_view__);









const schema = new __WEBPACK_IMPORTED_MODULE_4_prosemirror_model__["Schema"]({
  nodes: {
    text: {},
    paragraph: {
      content: "text*",
      toDOM() {
        return ["p", { 'class': 'text' }, 0];
      },
      parseDOM: [{ tag: "p.text" }]
    },
    requirement: {
      content: "text*",
      toDOM() {
        return ["p", { 'class': 'req' }, 0];
      },
      parseDOM: [{ tag: "p.req" }]
    },
    doc: {
      content: "(paragraph | requirement)*"
    }
  }
});

function logState({ doc }) {
  const json = JSON.stringify(doc.toJSON(), null, 2);
  document.querySelector('#state').innerHTML = json;
  return true;
}

function toggleReq(state, dispatch) {
  const { $anchor } = state.selection;
  let nodeType = schema.nodes.requirement;
  if ($anchor.parent.type === schema.nodes.requirement) {
    nodeType = schema.nodes.paragraph;
  }
  if (dispatch) {
    const where = $anchor.before($anchor.depth);
    dispatch(state.tr.clearIncompatible(where, nodeType).setNodeMarkup(where, nodeType).scrollIntoView());
  }
  return true;
}

const state = __WEBPACK_IMPORTED_MODULE_5_prosemirror_state__["EditorState"].create({
  doc: __WEBPACK_IMPORTED_MODULE_4_prosemirror_model__["DOMParser"].fromSchema(schema).parse(document.querySelector('#content')),
  schema,
  plugins: [Object(__WEBPACK_IMPORTED_MODULE_3_prosemirror_menu__["menuBar"])({
    content: [[new __WEBPACK_IMPORTED_MODULE_3_prosemirror_menu__["MenuItem"]({
      title: "Toggle Requirement",
      icon: { text: 'Req' },
      enable: () => true,
      run: toggleReq
    }), new __WEBPACK_IMPORTED_MODULE_3_prosemirror_menu__["MenuItem"]({
      title: "Write State",
      icon: { text: "->" },
      run: logState
    })]]
  }), Object(__WEBPACK_IMPORTED_MODULE_1_prosemirror_history__["history"])(), Object(__WEBPACK_IMPORTED_MODULE_2_prosemirror_keymap__["keymap"])({ "Mod-z": __WEBPACK_IMPORTED_MODULE_1_prosemirror_history__["undo"], "Mod-y": __WEBPACK_IMPORTED_MODULE_1_prosemirror_history__["redo"] }), Object(__WEBPACK_IMPORTED_MODULE_2_prosemirror_keymap__["keymap"])(__WEBPACK_IMPORTED_MODULE_0_prosemirror_commands__["baseKeymap"]), Object(__WEBPACK_IMPORTED_MODULE_2_prosemirror_keymap__["keymap"])({ "Mod-b": toggleReq })]
});
new __WEBPACK_IMPORTED_MODULE_7_prosemirror_view__["EditorView"](document.querySelector('#editor'), { state });

/***/ }),
/* 333 */
/***/ (function(module, exports) {

// ::- Persistent data structure representing an ordered mapping from
// strings to values, with some convenient update methods.
function OrderedMap(content) {
  this.content = content
}

OrderedMap.prototype = {
  constructor: OrderedMap,

  find: function(key) {
    for (var i = 0; i < this.content.length; i += 2)
      if (this.content[i] === key) return i
    return -1
  },

  // :: (string) → ?any
  // Retrieve the value stored under `key`, or return undefined when
  // no such key exists.
  get: function(key) {
    var found = this.find(key)
    return found == -1 ? undefined : this.content[found + 1]
  },

  // :: (string, any, ?string) → OrderedMap
  // Create a new map by replacing the value of `key` with a new
  // value, or adding a binding to the end of the map. If `newKey` is
  // given, the key of the binding will be replaced with that key.
  update: function(key, value, newKey) {
    var self = newKey && newKey != key ? this.remove(newKey) : this
    var found = self.find(key), content = self.content.slice()
    if (found == -1) {
      content.push(newKey || key, value)
    } else {
      content[found + 1] = value
      if (newKey) content[found] = newKey
    }
    return new OrderedMap(content)
  },

  // :: (string) → OrderedMap
  // Return a map with the given key removed, if it existed.
  remove: function(key) {
    var found = this.find(key)
    if (found == -1) return this
    var content = this.content.slice()
    content.splice(found, 2)
    return new OrderedMap(content)
  },

  // :: (string, any) → OrderedMap
  // Add a new key to the start of the map.
  addToStart: function(key, value) {
    return new OrderedMap([key, value].concat(this.remove(key).content))
  },

  // :: (string, any) → OrderedMap
  // Add a new key to the end of the map.
  addToEnd: function(key, value) {
    var content = this.remove(key).content.slice()
    content.push(key, value)
    return new OrderedMap(content)
  },

  // :: (string, string, any) → OrderedMap
  // Add a key after the given key. If `place` is not found, the new
  // key is added to the end.
  addBefore: function(place, key, value) {
    var without = this.remove(key), content = without.content.slice()
    var found = without.find(place)
    content.splice(found == -1 ? content.length : found, 0, key, value)
    return new OrderedMap(content)
  },

  // :: ((key: string, value: any))
  // Call the given function for each key/value pair in the map, in
  // order.
  forEach: function(f) {
    for (var i = 0; i < this.content.length; i += 2)
      f(this.content[i], this.content[i + 1])
  },

  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by prepending the keys in this map that don't
  // appear in `map` before the keys in `map`.
  prepend: function(map) {
    map = OrderedMap.from(map)
    if (!map.size) return this
    return new OrderedMap(map.content.concat(this.subtract(map).content))
  },

  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a new map by appending the keys in this map that don't
  // appear in `map` after the keys in `map`.
  append: function(map) {
    map = OrderedMap.from(map)
    if (!map.size) return this
    return new OrderedMap(this.subtract(map).content.concat(map.content))
  },

  // :: (union<Object, OrderedMap>) → OrderedMap
  // Create a map containing all the keys in this map that don't
  // appear in `map`.
  subtract: function(map) {
    var result = this
    map = OrderedMap.from(map)
    for (var i = 0; i < map.content.length; i += 2)
      result = result.remove(map.content[i])
    return result
  },

  // :: number
  // The amount of keys in this map.
  get size() {
    return this.content.length >> 1
  }
}

// :: (?union<Object, OrderedMap>) → OrderedMap
// Return a map with the given content. If null, create an empty
// map. If given an ordered map, return that map itself. If given an
// object, create a map from the object's properties.
OrderedMap.from = function(value) {
  if (value instanceof OrderedMap) return value
  var content = []
  if (value) for (var prop in value) content.push(prop, value[prop])
  return new OrderedMap(content)
}

module.exports = OrderedMap


/***/ }),
/* 334 */
/***/ (function(module, exports) {

var GOOD_LEAF_SIZE = 200

// :: class<T> A rope sequence is a persistent sequence data structure
// that supports appending, prepending, and slicing without doing a
// full copy. It is represented as a mostly-balanced tree.
var RopeSequence = function RopeSequence () {};

RopeSequence.prototype.append = function append (other) {
  if (!other.length) { return this }
  other = RopeSequence.from(other)

  return (!this.length && other) ||
    (other.length < GOOD_LEAF_SIZE && this.leafAppend(other)) ||
    (this.length < GOOD_LEAF_SIZE && other.leafPrepend(this)) ||
    this.appendInner(other)
};

// :: (union<[T], RopeSequence<T>>) → RopeSequence<T>
// Prepend an array or other rope to this one, returning a new rope.
RopeSequence.prototype.prepend = function prepend (other) {
  if (!other.length) { return this }
  return RopeSequence.from(other).append(this)
};

RopeSequence.prototype.appendInner = function appendInner (other) {
  return new Append(this, other)
};

// :: (?number, ?number) → RopeSequence<T>
// Create a rope repesenting a sub-sequence of this rope.
RopeSequence.prototype.slice = function slice (from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from >= to) { return RopeSequence.empty }
  return this.sliceInner(Math.max(0, from), Math.min(this.length, to))
};

// :: (number) → T
// Retrieve the element at the given position from this rope.
RopeSequence.prototype.get = function get (i) {
  if (i < 0 || i >= this.length) { return undefined }
  return this.getInner(i)
};

// :: ((element: T, index: number) → ?bool, ?number, ?number)
// Call the given function for each element between the given
// indices. This tends to be more efficient than looping over the
// indices and calling `get`, because it doesn't have to descend the
// tree for every element.
RopeSequence.prototype.forEach = function forEach (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from <= to)
    { this.forEachInner(f, from, to, 0) }
  else
    { this.forEachInvertedInner(f, from, to, 0) }
};

// :: ((element: T, index: number) → U, ?number, ?number) → [U]
// Map the given functions over the elements of the rope, producing
// a flat array.
RopeSequence.prototype.map = function map (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  var result = []
  this.forEach(function (elt, i) { return result.push(f(elt, i)); }, from, to)
  return result
};

// :: (?union<[T], RopeSequence<T>>) → RopeSequence<T>
// Create a rope representing the given array, or return the rope
// itself if a rope was given.
RopeSequence.from = function from (values) {
  if (values instanceof RopeSequence) { return values }
  return values && values.length ? new Leaf(values) : RopeSequence.empty
};

var Leaf = (function (RopeSequence) {
  function Leaf(values) {
    RopeSequence.call(this)
    this.values = values
  }

  if ( RopeSequence ) Leaf.__proto__ = RopeSequence;
  Leaf.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Leaf.prototype.constructor = Leaf;

  var prototypeAccessors = { length: {},depth: {} };

  Leaf.prototype.flatten = function flatten () {
    return this.values
  };

  Leaf.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    return new Leaf(this.values.slice(from, to))
  };

  Leaf.prototype.getInner = function getInner (i) {
    return this.values[i]
  };

  Leaf.prototype.forEachInner = function forEachInner (f, from, to, start) {
    var this$1 = this;

    for (var i = from; i < to; i++)
      { if (f(this$1.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    var this$1 = this;

    for (var i = from - 1; i >= to; i--)
      { if (f(this$1.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.leafAppend = function leafAppend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(this.values.concat(other.flatten())) }
  };

  Leaf.prototype.leafPrepend = function leafPrepend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(other.flatten().concat(this.values)) }
  };

  prototypeAccessors.length.get = function () { return this.values.length };

  prototypeAccessors.depth.get = function () { return 0 };

  Object.defineProperties( Leaf.prototype, prototypeAccessors );

  return Leaf;
}(RopeSequence));

// :: RopeSequence
// The empty rope sequence.
RopeSequence.empty = new Leaf([])

var Append = (function (RopeSequence) {
  function Append(left, right) {
    RopeSequence.call(this)
    this.left = left
    this.right = right
    this.length = left.length + right.length
    this.depth = Math.max(left.depth, right.depth) + 1
  }

  if ( RopeSequence ) Append.__proto__ = RopeSequence;
  Append.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Append.prototype.constructor = Append;

  Append.prototype.flatten = function flatten () {
    return this.left.flatten().concat(this.right.flatten())
  };

  Append.prototype.getInner = function getInner (i) {
    return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length)
  };

  Append.prototype.forEachInner = function forEachInner (f, from, to, start) {
    var leftLen = this.left.length
    if (from < leftLen &&
        this.left.forEachInner(f, from, Math.min(to, leftLen), start) === false)
      { return false }
    if (to > leftLen &&
        this.right.forEachInner(f, Math.max(from - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false)
      { return false }
  };

  Append.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    var leftLen = this.left.length
    if (from > leftLen &&
        this.right.forEachInvertedInner(f, from - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false)
      { return false }
    if (to < leftLen &&
        this.left.forEachInvertedInner(f, Math.min(from, leftLen), to, start) === false)
      { return false }
  };

  Append.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    var leftLen = this.left.length
    if (to <= leftLen) { return this.left.slice(from, to) }
    if (from >= leftLen) { return this.right.slice(from - leftLen, to - leftLen) }
    return this.left.slice(from, leftLen).append(this.right.slice(0, to - leftLen))
  };

  Append.prototype.leafAppend = function leafAppend (other) {
    var inner = this.right.leafAppend(other)
    if (inner) { return new Append(this.left, inner) }
  };

  Append.prototype.leafPrepend = function leafPrepend (other) {
    var inner = this.left.leafPrepend(other)
    if (inner) { return new Append(inner, this.right) }
  };

  Append.prototype.appendInner = function appendInner (other) {
    if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1)
      { return new Append(this.left, new Append(this.right, other)) }
    return new Append(this, other)
  };

  return Append;
}(RopeSequence));

module.exports = RopeSequence


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var keyName = _interopDefault(__webpack_require__(336));
var prosemirrorState = __webpack_require__(46);

// declare global: navigator

var mac = typeof navigator != "undefined" ? /Mac/.test(navigator.platform) : false;

function normalizeKeyName(name) {
  var parts = name.split(/-(?!$)/), result = parts[parts.length - 1];
  if (result == "Space") { result = " "; }
  var alt, ctrl, shift, meta;
  for (var i = 0; i < parts.length - 1; i++) {
    var mod = parts[i];
    if (/^(cmd|meta|m)$/i.test(mod)) { meta = true; }
    else if (/^a(lt)?$/i.test(mod)) { alt = true; }
    else if (/^(c|ctrl|control)$/i.test(mod)) { ctrl = true; }
    else if (/^s(hift)?$/i.test(mod)) { shift = true; }
    else if (/^mod$/i.test(mod)) { if (mac) { meta = true; } else { ctrl = true; } }
    else { throw new Error("Unrecognized modifier name: " + mod) }
  }
  if (alt) { result = "Alt-" + result; }
  if (ctrl) { result = "Ctrl-" + result; }
  if (meta) { result = "Meta-" + result; }
  if (shift) { result = "Shift-" + result; }
  return result
}

function normalize(map) {
  var copy = Object.create(null);
  for (var prop in map) { copy[normalizeKeyName(prop)] = map[prop]; }
  return copy
}

function modifiers(name, event, shift) {
  if (event.altKey) { name = "Alt-" + name; }
  if (event.ctrlKey) { name = "Ctrl-" + name; }
  if (event.metaKey) { name = "Meta-" + name; }
  if (shift !== false && event.shiftKey) { name = "Shift-" + name; }
  return name
}

// :: (Object) → Plugin
// Create a keymap plugin for the given set of bindings.
//
// Bindings should map key names to [command](#commands)-style
// functions, which will be called with `(EditorState, dispatch,
// EditorView)` arguments, and should return true when they've handled
// the key. Note that the view argument isn't part of the command
// protocol, but can be used as an escape hatch if a binding needs to
// directly interact with the UI.
//
// Key names may be strings like `"Shift-Ctrl-Enter"`—a key
// identifier prefixed with zero or more modifiers. Key identifiers
// are based on the strings that can appear in
// [`KeyEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key).
// Use lowercase letters to refer to letter keys (or uppercase letters
// if you want shift to be held). You may use `"Space"` as an alias
// for the `" "` name.
//
// Modifiers can be given in any order. `Shift-` (or `s-`), `Alt-` (or
// `a-`), `Ctrl-` (or `c-` or `Control-`) and `Cmd-` (or `m-` or
// `Meta-`) are recognized. For characters that are created by holding
// shift, the `Shift-` prefix is implied, and should not be added
// explicitly.
//
// You can use `Mod-` as a shorthand for `Cmd-` on Mac and `Ctrl-` on
// other platforms.
//
// You can add multiple keymap plugins to an editor. The order in
// which they appear determines their precedence (the ones early in
// the array get to dispatch first).
function keymap(bindings) {
  return new prosemirrorState.Plugin({props: {handleKeyDown: keydownHandler(bindings)}})
}

// :: (Object) → (view: EditorView, event: dom.Event) → bool
// Given a set of bindings (using the same format as
// [`keymap`](#keymap.keymap), return a [keydown
// handler](#view.EditorProps.handleKeyDown) handles them.
function keydownHandler(bindings) {
  var map = normalize(bindings);
  return function(view, event) {
    var name = keyName(event), isChar = name.length == 1 && name != " ", baseName;
    var direct = map[modifiers(name, event, !isChar)];
    if (direct && direct(view.state, view.dispatch, view)) { return true }
    if (isChar && (event.shiftKey || event.altKey || event.metaKey) &&
        (baseName = keyName.base[event.keyCode]) && baseName != name) {
      var fromCode = map[modifiers(baseName, event, true)];
      if (fromCode && fromCode(view.state, view.dispatch, view)) { return true }
    }
    return false
  }
}

exports.keymap = keymap;
exports.keydownHandler = keydownHandler;
//# sourceMappingURL=keymap.js.map


/***/ }),
/* 336 */
/***/ (function(module, exports) {

var base = {
  8: "Backspace",
  9: "Tab",
  10: "Enter",
  12: "NumLock",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  44: "PrintScreen",
  45: "Insert",
  46: "Delete",
  59: ";",
  61: "=",
  91: "Meta",
  92: "Meta",
  106: "*",
  107: "+",
  108: ",",
  109: "-",
  110: ".",
  111: "/",
  144: "NumLock",
  145: "ScrollLock",
  160: "Shift",
  161: "Shift",
  162: "Control",
  163: "Control",
  164: "Alt",
  165: "Alt",
  173: "-",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "'",
  229: "q"
}
var shift = {
  48: ")",
  49: "!",
  50: "@",
  51: "#",
  52: "$",
  53: "%",
  54: "^",
  55: "&",
  56: "*",
  57: "(",
  59: ";",
  61: "+",
  173: "_",
  186: ":",
  187: "+",
  188: "<",
  189: "_",
  190: ">",
  191: "?",
  192: "~",
  219: "{",
  220: "|",
  221: "}",
  222: "\"",
  229: "Q"
}

var chrome = typeof navigator != "undefined" && /Chrome\/(\d+)/.exec(navigator.userAgent)
var brokenModifierNames = chrome && +chrome[1] < 57

// Fill in the digit keys
for (var i = 0; i < 10; i++) base[48 + i] = base[96 + i] = String(i)

// The function keys
for (var i = 1; i <= 24; i++) base[i + 111] = "F" + i

// And the alphabetic keys
for (var i = 65; i <= 90; i++) {
  base[i] = String.fromCharCode(i + 32)
  shift[i] = String.fromCharCode(i)
}

// For each code that doesn't have a shift-equivalent, copy the base name
for (var code in base) if (!shift.hasOwnProperty(code)) shift[code] = base[code]

function keyName(event) {
  // Don't trust event.key in Chrome when there are modifiers until
  // they fix https://bugs.chromium.org/p/chromium/issues/detail?id=633838
  var name = ((!brokenModifierNames || !event.ctrlKey && !event.altKey && !event.metaKey) && event.key) ||
    (event.shiftKey ? shift : base)[event.keyCode] ||
    event.key || "Unidentified"
  // Edge sometimes produces wrong names (Issue #3)
  if (name == "Esc") name = "Escape"
  if (name == "Del") name = "Delete"
  // https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/8860571/
  if (name == "Left") name = "ArrowLeft"
  if (name == "Up") name = "ArrowUp"
  if (name == "Right") name = "ArrowRight"
  if (name == "Down") name = "ArrowDown"
  return name
}

module.exports = keyName
keyName.base = base
keyName.shift = shift


/***/ }),
/* 337 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var crel = _interopDefault(__webpack_require__(338));
var prosemirrorCommands = __webpack_require__(127);
var prosemirrorHistory = __webpack_require__(128);
var prosemirrorState = __webpack_require__(46);

var SVG = "http://www.w3.org/2000/svg";
var XLINK = "http://www.w3.org/1999/xlink";

var prefix$1 = "ProseMirror-icon";

function hashPath(path) {
  var hash = 0;
  for (var i = 0; i < path.length; i++)
    { hash = (((hash << 5) - hash) + path.charCodeAt(i)) | 0; }
  return hash
}

function getIcon(icon) {
  var node = document.createElement("div");
  node.className = prefix$1;
  if (icon.path) {
    var name = "pm-icon-" + hashPath(icon.path).toString(16);
    if (!document.getElementById(name)) { buildSVG(name, icon); }
    var svg = node.appendChild(document.createElementNS(SVG, "svg"));
    svg.style.width = (icon.width / icon.height) + "em";
    var use = svg.appendChild(document.createElementNS(SVG, "use"));
    use.setAttributeNS(XLINK, "href", /([^#]*)/.exec(document.location)[1] + "#" + name);
  } else if (icon.dom) {
    node.appendChild(icon.dom.cloneNode(true));
  } else {
    node.appendChild(document.createElement("span")).textContent = icon.text || '';
    if (icon.css) { node.firstChild.style.cssText = icon.css; }
  }
  return node
}

function buildSVG(name, data) {
  var collection = document.getElementById(prefix$1 + "-collection");
  if (!collection) {
    collection = document.createElementNS(SVG, "svg");
    collection.id = prefix$1 + "-collection";
    collection.style.display = "none";
    document.body.insertBefore(collection, document.body.firstChild);
  }
  var sym = document.createElementNS(SVG, "symbol");
  sym.id = name;
  sym.setAttribute("viewBox", "0 0 " + data.width + " " + data.height);
  var path = sym.appendChild(document.createElementNS(SVG, "path"));
  path.setAttribute("d", data.path);
  collection.appendChild(sym);
}

var prefix = "ProseMirror-menu";

// ::- An icon or label that, when clicked, executes a command.
var MenuItem = function MenuItem(spec) {
  // :: MenuItemSpec
  // The spec used to create the menu item.
  this.spec = spec;
};

// :: (EditorView) → {dom: dom.Node, update: (EditorState) → bool}
// Renders the icon according to its [display
// spec](#menu.MenuItemSpec.display), and adds an event handler which
// executes the command when the representation is clicked.
MenuItem.prototype.render = function render (view) {
  var spec = this.spec;
  var dom = spec. icon ? getIcon(spec.icon)
      : spec.label ? crel("div", null, translate(view, spec.label))
      : null;
  if (!dom) { throw new RangeError("MenuItem without icon or label property") }
  if (spec.title) {
    var title = (typeof spec.title === "function" ? spec.title(view.state) : spec.title);
    dom.setAttribute("title", translate(view, title));
  }
  if (spec.class) { dom.classList.add(spec.class); }
  if (spec.css) { dom.style.cssText += spec.css; }

  dom.addEventListener("mousedown", function (e) {
    e.preventDefault();
    spec.run(view.state, view.dispatch, view, e);
  });

  function update(state) {
    if (spec.select) {
      var selected = spec.select(state);
      dom.style.display = selected ? "" : "none";
      if (!selected) { return false }
    }
    var enabled = true;
    if (spec.enable) {
      enabled = spec.enable(state) || false;
      dom.classList.toggle(prefix + "-disabled", !enabled);
    }
    if (spec.active) {
      var active = enabled && spec.active(state) || false;
      dom.classList.toggle(prefix + "-active", active);
    }
    return true
  }

  return {dom: dom, update: update}
};

function translate(view, text) {
  return view._props.translate ? view._props.translate(text) : text
}

// MenuItemSpec:: interface
// The configuration object passed to the `MenuItem` constructor.
//
//   run:: (EditorState, (Transaction), EditorView, dom.Event)
//   The function to execute when the menu item is activated.
//
//   select:: ?(EditorState) → bool
//   Optional function that is used to determine whether the item is
//   appropriate at the moment. Deselected items will be hidden.
//
//   enable:: ?(EditorState) → bool
//   Function that is used to determine if the item is enabled. If
//   given and returning false, the item will be given a disabled
//   styling.
//
//   active:: ?(EditorState) → bool
//   A predicate function to determine whether the item is 'active' (for
//   example, the item for toggling the strong mark might be active then
//   the cursor is in strong text).
//
//   render:: ?(EditorView) → dom.Node
//   A function that renders the item. You must provide either this,
//   [`icon`](#menu.MenuItemSpec.icon), or [`label`](#MenuItemSpec.label).
//
//   icon:: ?Object
//   Describes an icon to show for this item. The object may specify
//   an SVG icon, in which case its `path` property should be an [SVG
//   path
//   spec](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d),
//   and `width` and `height` should provide the viewbox in which that
//   path exists. Alternatively, it may have a `text` property
//   specifying a string of text that makes up the icon, with an
//   optional `css` property giving additional CSS styling for the
//   text. _Or_ it may contain `dom` property containing a DOM node.
//
//   label:: ?string
//   Makes the item show up as a text label. Mostly useful for items
//   wrapped in a [drop-down](#menu.Dropdown) or similar menu. The object
//   should have a `label` property providing the text to display.
//
//   title:: ?union<string, (EditorState) → string>
//   Defines DOM title (mouseover) text for the item.
//
//   class:: string
//   Optionally adds a CSS class to the item's DOM representation.
//
//   css:: string
//   Optionally adds a string of inline CSS to the item's DOM
//   representation.
//
//   execEvent:: string
//   Defines which event on the command's DOM representation should
//   trigger the execution of the command. Defaults to mousedown.

var lastMenuEvent = {time: 0, node: null};
function markMenuEvent(e) {
  lastMenuEvent.time = Date.now();
  lastMenuEvent.node = e.target;
}
function isMenuEvent(wrapper) {
  return Date.now() - 100 < lastMenuEvent.time &&
    lastMenuEvent.node && wrapper.contains(lastMenuEvent.node)
}

// ::- A drop-down menu, displayed as a label with a downwards-pointing
// triangle to the right of it.
var Dropdown = function Dropdown(content, options) {
  this.options = options || {};
  this.content = Array.isArray(content) ? content : [content];
};

// :: (EditorView) → {dom: dom.Node, update: (EditorState)}
// Render the dropdown menu and sub-items.
Dropdown.prototype.render = function render (view) {
    var this$1 = this;

  var content = renderDropdownItems(this.content, view);

  var label = crel("div", {class: prefix + "-dropdown " + (this.options.class || ""),
                           style: this.options.css},
                   translate(view, this.options.label));
  if (this.options.title) { label.setAttribute("title", translate(view, this.options.title)); }
  var wrap = crel("div", {class: prefix + "-dropdown-wrap"}, label);
  var open = null, listeningOnClose = null;
  var close = function () {
    if (open && open.close()) {
      open = null;
      window.removeEventListener("mousedown", listeningOnClose);
    }
  };
  label.addEventListener("mousedown", function (e) {
    e.preventDefault();
    markMenuEvent(e);
    if (open) {
      close();
    } else {
      open = this$1.expand(wrap, content.dom);
      window.addEventListener("mousedown", listeningOnClose = function () {
        if (!isMenuEvent(wrap)) { close(); }
      });
    }
  });

  function update(state) {
    var inner = content.update(state);
    wrap.style.display = inner ? "" : "none";
    return inner
  }

  return {dom: wrap, update: update}
};

Dropdown.prototype.expand = function expand (dom, items) {
  var menuDOM = crel("div", {class: prefix + "-dropdown-menu " + (this.options.class || "")}, items);

  var done = false;
  function close() {
    if (done) { return }
    done = true;
    dom.removeChild(menuDOM);
    return true
  }
  dom.appendChild(menuDOM);
  return {close: close, node: menuDOM}
};

function renderDropdownItems(items, view) {
  var rendered = [], updates = [];
  for (var i = 0; i < items.length; i++) {
    var ref = items[i].render(view);
    var dom = ref.dom;
    var update = ref.update;
    rendered.push(crel("div", {class: prefix + "-dropdown-item"}, dom));
    updates.push(update);
  }
  return {dom: rendered, update: combineUpdates(updates, rendered)}
}

function combineUpdates(updates, nodes) {
  return function (state) {
    var something = false;
    for (var i = 0; i < updates.length; i++) {
      var up = updates[i](state);
      nodes[i].style.display = up ? "" : "none";
      if (up) { something = true; }
    }
    return something
  }
}

// ::- Represents a submenu wrapping a group of elements that start
// hidden and expand to the right when hovered over or tapped.
var DropdownSubmenu = function DropdownSubmenu(content, options) {
  this.options = options || {};
  this.content = Array.isArray(content) ? content : [content];
};

// :: (EditorView) → {dom: dom.Node, update: (EditorState) → bool}
// Renders the submenu.
DropdownSubmenu.prototype.render = function render (view) {
  var items = renderDropdownItems(this.content, view);

  var label = crel("div", {class: prefix + "-submenu-label"}, translate(view, this.options.label));
  var wrap = crel("div", {class: prefix + "-submenu-wrap"}, label,
                 crel("div", {class: prefix + "-submenu"}, items.dom));
  var listeningOnClose = null;
  label.addEventListener("mousedown", function (e) {
    e.preventDefault();
    markMenuEvent(e);
    wrap.classList.toggle(prefix + "-submenu-wrap-active");
    if (!listeningOnClose)
      { window.addEventListener("mousedown", listeningOnClose = function () {
        if (!isMenuEvent(wrap)) {
          wrap.classList.remove(prefix + "-submenu-wrap-active");
          window.removeEventListener("mousedown", listeningOnClose);
          listeningOnClose = null;
        }
      }); }
  });

  function update(state) {
    var inner = items.update(state);
    wrap.style.display = inner ? "" : "none";
    return inner
  }
  return {dom: wrap, update: update}
};

// :: (EditorView, [union<MenuElement, [MenuElement]>]) → {dom: ?dom.DocumentFragment, update: (EditorState) → bool}
// Render the given, possibly nested, array of menu elements into a
// document fragment, placing separators between them (and ensuring no
// superfluous separators appear when some of the groups turn out to
// be empty).
function renderGrouped(view, content) {
  var result = document.createDocumentFragment();
  var updates = [], separators = [];
  for (var i = 0; i < content.length; i++) {
    var items = content[i], localUpdates = [], localNodes = [];
    for (var j = 0; j < items.length; j++) {
      var ref = items[j].render(view);
      var dom = ref.dom;
      var update$1 = ref.update;
      var span = crel("span", {class: prefix + "item"}, dom);
      result.appendChild(span);
      localNodes.push(span);
      localUpdates.push(update$1);
    }
    if (localUpdates.length) {
      updates.push(combineUpdates(localUpdates, localNodes));
      if (i < content.length - 1)
        { separators.push(result.appendChild(separator())); }
    }
  }

  function update(state) {
    var something = false, needSep = false;
    for (var i = 0; i < updates.length; i++) {
      var hasContent = updates[i](state);
      if (i) { separators[i - 1].style.display = needSep && hasContent ? "" : "none"; }
      needSep = hasContent;
      if (hasContent) { something = true; }
    }
    return something
  }
  return {dom: result, update: update}
}

function separator() {
  return crel("span", {class: prefix + "separator"})
}

// :: Object
// A set of basic editor-related icons. Contains the properties
// `join`, `lift`, `selectParentNode`, `undo`, `redo`, `strong`, `em`,
// `code`, `link`, `bulletList`, `orderedList`, and `blockquote`, each
// holding an object that can be used as the `icon` option to
// `MenuItem`.
var icons = {
  join: {
    width: 800, height: 900,
    path: "M0 75h800v125h-800z M0 825h800v-125h-800z M250 400h100v-100h100v100h100v100h-100v100h-100v-100h-100z"
  },
  lift: {
    width: 1024, height: 1024,
    path: "M219 310v329q0 7-5 12t-12 5q-8 0-13-5l-164-164q-5-5-5-13t5-13l164-164q5-5 13-5 7 0 12 5t5 12zM1024 749v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12zM1024 530v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 310v109q0 7-5 12t-12 5h-621q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h621q7 0 12 5t5 12zM1024 91v109q0 7-5 12t-12 5h-987q-7 0-12-5t-5-12v-109q0-7 5-12t12-5h987q7 0 12 5t5 12z"
  },
  selectParentNode: {text: "\u2b1a", css: "font-weight: bold"},
  undo: {
    width: 1024, height: 1024,
    path: "M761 1024c113-206 132-520-313-509v253l-384-384 384-384v248c534-13 594 472 313 775z"
  },
  redo: {
    width: 1024, height: 1024,
    path: "M576 248v-248l384 384-384 384v-253c-446-10-427 303-313 509-280-303-221-789 313-775z"
  },
  strong: {
    width: 805, height: 1024,
    path: "M317 869q42 18 80 18 214 0 214-191 0-65-23-102-15-25-35-42t-38-26-46-14-48-6-54-1q-41 0-57 5 0 30-0 90t-0 90q0 4-0 38t-0 55 2 47 6 38zM309 442q24 4 62 4 46 0 81-7t62-25 42-51 14-81q0-40-16-70t-45-46-61-24-70-8q-28 0-74 7 0 28 2 86t2 86q0 15-0 45t-0 45q0 26 0 39zM0 950l1-53q8-2 48-9t60-15q4-6 7-15t4-19 3-18 1-21 0-19v-37q0-561-12-585-2-4-12-8t-25-6-28-4-27-2-17-1l-2-47q56-1 194-6t213-5q13 0 39 0t38 0q40 0 78 7t73 24 61 40 42 59 16 78q0 29-9 54t-22 41-36 32-41 25-48 22q88 20 146 76t58 141q0 57-20 102t-53 74-78 48-93 27-100 8q-25 0-75-1t-75-1q-60 0-175 6t-132 6z"
  },
  em: {
    width: 585, height: 1024,
    path: "M0 949l9-48q3-1 46-12t63-21q16-20 23-57 0-4 35-165t65-310 29-169v-14q-13-7-31-10t-39-4-33-3l10-58q18 1 68 3t85 4 68 1q27 0 56-1t69-4 56-3q-2 22-10 50-17 5-58 16t-62 19q-4 10-8 24t-5 22-4 26-3 24q-15 84-50 239t-44 203q-1 5-7 33t-11 51-9 47-3 32l0 10q9 2 105 17-1 25-9 56-6 0-18 0t-18 0q-16 0-49-5t-49-5q-78-1-117-1-29 0-81 5t-69 6z"
  },
  code: {
    width: 896, height: 1024,
    path: "M608 192l-96 96 224 224-224 224 96 96 288-320-288-320zM288 192l-288 320 288 320 96-96-224-224 224-224-96-96z"
  },
  link: {
    width: 951, height: 1024,
    path: "M832 694q0-22-16-38l-118-118q-16-16-38-16-24 0-41 18 1 1 10 10t12 12 8 10 7 14 2 15q0 22-16 38t-38 16q-8 0-15-2t-14-7-10-8-12-12-10-10q-18 17-18 41 0 22 16 38l117 118q15 15 38 15 22 0 38-14l84-83q16-16 16-38zM430 292q0-22-16-38l-117-118q-16-16-38-16-22 0-38 15l-84 83q-16 16-16 38 0 22 16 38l118 118q15 15 38 15 24 0 41-17-1-1-10-10t-12-12-8-10-7-14-2-15q0-22 16-38t38-16q8 0 15 2t14 7 10 8 12 12 10 10q18-17 18-41zM941 694q0 68-48 116l-84 83q-47 47-116 47-69 0-116-48l-117-118q-47-47-47-116 0-70 50-119l-50-50q-49 50-118 50-68 0-116-48l-118-118q-48-48-48-116t48-116l84-83q47-47 116-47 69 0 116 48l117 118q47 47 47 116 0 70-50 119l50 50q49-50 118-50 68 0 116 48l118 118q48 48 48 116z"
  },
  bulletList: {
    width: 768, height: 896,
    path: "M0 512h128v-128h-128v128zM0 256h128v-128h-128v128zM0 768h128v-128h-128v128zM256 512h512v-128h-512v128zM256 256h512v-128h-512v128zM256 768h512v-128h-512v128z"
  },
  orderedList: {
    width: 768, height: 896,
    path: "M320 512h448v-128h-448v128zM320 768h448v-128h-448v128zM320 128v128h448v-128h-448zM79 384h78v-256h-36l-85 23v50l43-2v185zM189 590c0-36-12-78-96-78-33 0-64 6-83 16l1 66c21-10 42-15 67-15s32 11 32 28c0 26-30 58-110 112v50h192v-67l-91 2c49-30 87-66 87-113l1-1z"
  },
  blockquote: {
    width: 640, height: 896,
    path: "M0 448v256h256v-256h-128c0 0 0-128 128-128v-128c0 0-256 0-256 256zM640 320v-128c0 0-256 0-256 256v256h256v-256h-128c0 0 0-128 128-128z"
  }
};

// :: MenuItem
// Menu item for the `joinUp` command.
var joinUpItem = new MenuItem({
  title: "Join with above block",
  run: prosemirrorCommands.joinUp,
  select: function (state) { return prosemirrorCommands.joinUp(state); },
  icon: icons.join
});

// :: MenuItem
// Menu item for the `lift` command.
var liftItem = new MenuItem({
  title: "Lift out of enclosing block",
  run: prosemirrorCommands.lift,
  select: function (state) { return prosemirrorCommands.lift(state); },
  icon: icons.lift
});

// :: MenuItem
// Menu item for the `selectParentNode` command.
var selectParentNodeItem = new MenuItem({
  title: "Select parent node",
  run: prosemirrorCommands.selectParentNode,
  select: function (state) { return prosemirrorCommands.selectParentNode(state); },
  icon: icons.selectParentNode
});

// :: (Object) → MenuItem
// Menu item for the `undo` command.
var undoItem = new MenuItem({
  title: "Undo last change",
  run: prosemirrorHistory.undo,
  enable: function (state) { return prosemirrorHistory.undo(state); },
  icon: icons.undo
});

// :: (Object) → MenuItem
// Menu item for the `redo` command.
var redoItem = new MenuItem({
  title: "Redo last undone change",
  run: prosemirrorHistory.redo,
  enable: function (state) { return prosemirrorHistory.redo(state); },
  icon: icons.redo
});

// :: (NodeType, Object) → MenuItem
// Build a menu item for wrapping the selection in a given node type.
// Adds `run` and `select` properties to the ones present in
// `options`. `options.attrs` may be an object or a function, as in
// `toggleMarkItem`.
function wrapItem(nodeType, options) {
  var passedOptions = {
    run: function run(state, dispatch) {
      // FIXME if (options.attrs instanceof Function) options.attrs(state, attrs => wrapIn(nodeType, attrs)(state))
      return prosemirrorCommands.wrapIn(nodeType, options.attrs)(state, dispatch)
    },
    select: function select(state) {
      return prosemirrorCommands.wrapIn(nodeType, options.attrs instanceof Function ? null : options.attrs)(state)
    }
  };
  for (var prop in options) { passedOptions[prop] = options[prop]; }
  return new MenuItem(passedOptions)
}

// :: (NodeType, Object) → MenuItem
// Build a menu item for changing the type of the textblock around the
// selection to the given type. Provides `run`, `active`, and `select`
// properties. Others must be given in `options`. `options.attrs` may
// be an object to provide the attributes for the textblock node.
function blockTypeItem(nodeType, options) {
  var command = prosemirrorCommands.setBlockType(nodeType, options.attrs);
  var passedOptions = {
    run: command,
    enable: function enable(state) { return command(state) },
    active: function active(state) {
      var ref = state.selection;
      var $from = ref.$from;
      var to = ref.to;
      var node = ref.node;
      if (node) { return node.hasMarkup(nodeType, options.attrs) }
      return to <= $from.end() && $from.parent.hasMarkup(nodeType, options.attrs)
    }
  };
  for (var prop in options) { passedOptions[prop] = options[prop]; }
  return new MenuItem(passedOptions)
}

var prefix$2 = "ProseMirror-menubar";

function isIOS() {
  if (typeof navigator == "undefined") { return false }
  var agent = navigator.userAgent;
  return !/Edge\/\d/.test(agent) && /AppleWebKit/.test(agent) && /Mobile\/\w+/.test(agent)
}

// :: (Object) → Plugin
// A plugin that will place a menu bar above the editor. Note that
// this involves wrapping the editor in an additional `<div>`.
//
//   options::-
//   Supports the following options:
//
//     content:: [[MenuElement]]
//     Provides the content of the menu, as a nested array to be
//     passed to `renderGrouped`.
//
//     floating:: ?bool
//     Determines whether the menu floats, i.e. whether it sticks to
//     the top of the viewport when the editor is partially scrolled
//     out of view.
function menuBar(options) {
  return new prosemirrorState.Plugin({
    view: function view(editorView) { return new MenuBarView(editorView, options) }
  })
}

var MenuBarView = function MenuBarView(editorView, options) {
  var this$1 = this;

  this.editorView = editorView;
  this.options = options;

  this.wrapper = crel("div", {class: prefix$2 + "-wrapper"});
  this.menu = this.wrapper.appendChild(crel("div", {class: prefix$2}));
  this.menu.className = prefix$2;
  this.spacer = null;

  editorView.dom.parentNode.replaceChild(this.wrapper, editorView.dom);
  this.wrapper.appendChild(editorView.dom);

  this.maxHeight = 0;
  this.widthForMaxHeight = 0;
  this.floating = false;

  var ref = renderGrouped(this.editorView, this.options.content);
  var dom = ref.dom;
  var update = ref.update;
  this.contentUpdate = update;
  this.menu.appendChild(dom);
  this.update();

  if (options.floating && !isIOS()) {
    this.updateFloat();
    this.scrollFunc = function () {
      var root = this$1.editorView.root;
      if (!(root.body || root).contains(this$1.wrapper))
        { window.removeEventListener("scroll", this$1.scrollFunc); }
      else
        { this$1.updateFloat(); }
    };
    window.addEventListener("scroll", this.scrollFunc);
  }
};

MenuBarView.prototype.update = function update () {
  this.contentUpdate(this.editorView.state);

  if (this.floating) {
    this.updateScrollCursor();
  } else {
    if (this.menu.offsetWidth != this.widthForMaxHeight) {
      this.widthForMaxHeight = this.menu.offsetWidth;
      this.maxHeight = 0;
    }
    if (this.menu.offsetHeight > this.maxHeight) {
      this.maxHeight = this.menu.offsetHeight;
      this.menu.style.minHeight = this.maxHeight + "px";
    }
  }
};

MenuBarView.prototype.updateScrollCursor = function updateScrollCursor () {
  var selection = this.editorView.root.getSelection();
  if (!selection.focusNode) { return }
  var rects = selection.getRangeAt(0).getClientRects();
  var selRect = rects[selectionIsInverted(selection) ? 0 : rects.length - 1];
  if (!selRect) { return }
  var menuRect = this.menu.getBoundingClientRect();
  if (selRect.top < menuRect.bottom && selRect.bottom > menuRect.top) {
    var scrollable = findWrappingScrollable(this.wrapper);
    if (scrollable) { scrollable.scrollTop -= (menuRect.bottom - selRect.top); }
  }
};

MenuBarView.prototype.updateFloat = function updateFloat () {
  var parent = this.wrapper, editorRect = parent.getBoundingClientRect();
  if (this.floating) {
    if (editorRect.top >= 0 || editorRect.bottom < this.menu.offsetHeight + 10) {
      this.floating = false;
      this.menu.style.position = this.menu.style.left = this.menu.style.width = "";
      this.menu.style.display = "";
      this.spacer.parentNode.removeChild(this.spacer);
      this.spacer = null;
    } else {
      var border = (parent.offsetWidth - parent.clientWidth) / 2;
      this.menu.style.left = (editorRect.left + border) + "px";
      this.menu.style.display = (editorRect.top > window.innerHeight ? "none" : "");
    }
  } else {
    if (editorRect.top < 0 && editorRect.bottom >= this.menu.offsetHeight + 10) {
      this.floating = true;
      var menuRect = this.menu.getBoundingClientRect();
      this.menu.style.left = menuRect.left + "px";
      this.menu.style.width = menuRect.width + "px";
      this.menu.style.position = "fixed";
      this.spacer = crel("div", {class: prefix$2 + "-spacer", style: ("height: " + (menuRect.height) + "px")});
      parent.insertBefore(this.spacer, this.menu);
    }
  }
};

MenuBarView.prototype.destroy = function destroy () {
  if (this.wrapper.parentNode)
    { this.wrapper.parentNode.replaceChild(this.editorView.dom, this.wrapper); }
};

// Not precise, but close enough
function selectionIsInverted(selection) {
  if (selection.anchorNode == selection.focusNode) { return selection.anchorOffset > selection.focusOffset }
  return selection.anchorNode.compareDocumentPosition(selection.focusNode) == Node.DOCUMENT_POSITION_FOLLOWING
}

function findWrappingScrollable(node) {
  for (var cur = node.parentNode; cur; cur = cur.parentNode)
    { if (cur.scrollHeight > cur.clientHeight) { return cur } }
}

// !! This module defines a number of building blocks for ProseMirror
// menus, along with a [menu bar](#menu.menuBar) implementation.

// MenuElement:: interface
// The types defined in this module aren't the only thing you can
// display in your menu. Anything that conforms to this interface can
// be put into a menu structure.
//
//   render:: (pm: EditorView) → {dom: dom.Node, update: (EditorState) → bool}
//   Render the element for display in the menu. Must return a DOM
//   element and a function that can be used to update the element to
//   a new state. The `update` function will return false if the
//   update hid the entire element.

exports.MenuItem = MenuItem;
exports.Dropdown = Dropdown;
exports.DropdownSubmenu = DropdownSubmenu;
exports.renderGrouped = renderGrouped;
exports.icons = icons;
exports.joinUpItem = joinUpItem;
exports.liftItem = liftItem;
exports.selectParentNodeItem = selectParentNodeItem;
exports.undoItem = undoItem;
exports.redoItem = redoItem;
exports.wrapItem = wrapItem;
exports.blockTypeItem = blockTypeItem;
exports.menuBar = menuBar;
//# sourceMappingURL=index.js.map


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

//Copyright (C) 2012 Kory Nunn

//Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

//The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

/*

    This code is not formatted for readability, but rather run-speed and to assist compilers.

    However, the code's intention should be transparent.

    *** IE SUPPORT ***

    If you require this library to work in IE7, add the following after declaring crel.

    var testDiv = document.createElement('div'),
        testLabel = document.createElement('label');

    testDiv.setAttribute('class', 'a');
    testDiv['className'] !== 'a' ? crel.attrMap['class'] = 'className':undefined;
    testDiv.setAttribute('name','a');
    testDiv['name'] !== 'a' ? crel.attrMap['name'] = function(element, value){
        element.id = value;
    }:undefined;


    testLabel.setAttribute('for', 'a');
    testLabel['htmlFor'] !== 'a' ? crel.attrMap['for'] = 'htmlFor':undefined;



*/

(function (root, factory) {
    if (true) {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.crel = factory();
    }
}(this, function () {
    var fn = 'function',
        obj = 'object',
        nodeType = 'nodeType',
        textContent = 'textContent',
        setAttribute = 'setAttribute',
        attrMapString = 'attrMap',
        isNodeString = 'isNode',
        isElementString = 'isElement',
        d = typeof document === obj ? document : {},
        isType = function(a, type){
            return typeof a === type;
        },
        isNode = typeof Node === fn ? function (object) {
            return object instanceof Node;
        } :
        // in IE <= 8 Node is an object, obviously..
        function(object){
            return object &&
                isType(object, obj) &&
                (nodeType in object) &&
                isType(object.ownerDocument,obj);
        },
        isElement = function (object) {
            return crel[isNodeString](object) && object[nodeType] === 1;
        },
        isArray = function(a){
            return a instanceof Array;
        },
        appendChild = function(element, child) {
            if (isArray(child)) {
                child.map(function(subChild){
                    appendChild(element, subChild);
                });
                return;
            }
            if(!crel[isNodeString](child)){
                child = d.createTextNode(child);
            }
            element.appendChild(child);
        };


    function crel(){
        var args = arguments, //Note: assigned to a variable to assist compilers. Saves about 40 bytes in closure compiler. Has negligable effect on performance.
            element = args[0],
            child,
            settings = args[1],
            childIndex = 2,
            argumentsLength = args.length,
            attributeMap = crel[attrMapString];

        element = crel[isElementString](element) ? element : d.createElement(element);
        // shortcut
        if(argumentsLength === 1){
            return element;
        }

        if(!isType(settings,obj) || crel[isNodeString](settings) || isArray(settings)) {
            --childIndex;
            settings = null;
        }

        // shortcut if there is only one child that is a string
        if((argumentsLength - childIndex) === 1 && isType(args[childIndex], 'string') && element[textContent] !== undefined){
            element[textContent] = args[childIndex];
        }else{
            for(; childIndex < argumentsLength; ++childIndex){
                child = args[childIndex];

                if(child == null){
                    continue;
                }

                if (isArray(child)) {
                  for (var i=0; i < child.length; ++i) {
                    appendChild(element, child[i]);
                  }
                } else {
                  appendChild(element, child);
                }
            }
        }

        for(var key in settings){
            if(!attributeMap[key]){
                if(isType(settings[key],fn)){
                    element[key] = settings[key];
                }else{
                    element[setAttribute](key, settings[key]);
                }
            }else{
                var attr = attributeMap[key];
                if(typeof attr === fn){
                    attr(element, settings[key]);
                }else{
                    element[setAttribute](attr, settings[key]);
                }
            }
        }

        return element;
    }

    // Used for mapping one kind of attribute to the supported version of that in bad browsers.
    crel[attrMapString] = {};

    crel[isElementString] = isElement;

    crel[isNodeString] = isNode;

    if(typeof Proxy !== 'undefined'){
        crel.proxy = new Proxy(crel, {
            get: function(target, key){
                !(key in crel) && (crel[key] = crel.bind(null, key));
                return crel[key];
            }
        });
    }

    return crel;
}));


/***/ }),
/* 339 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var prosemirrorModel = __webpack_require__(51);
var prosemirrorState = __webpack_require__(46);
var prosemirrorTransform = __webpack_require__(50);

var result = {};
if (typeof navigator != "undefined") {
  var ie_edge = /Edge\/(\d+)/.exec(navigator.userAgent);
  var ie_upto10 = /MSIE \d/.test(navigator.userAgent);
  var ie_11up = /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);

  result.mac = /Mac/.test(navigator.platform);
  var ie = result.ie = !!(ie_upto10 || ie_11up || ie_edge);
  result.ie_version = ie_upto10 ? document.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : null;
  result.gecko = !ie && /gecko\/\d/i.test(navigator.userAgent);
  result.chrome = !ie && /Chrome\//.test(navigator.userAgent);
  result.ios = !ie && /AppleWebKit/.test(navigator.userAgent) && /Mobile\/\w+/.test(navigator.userAgent);
  result.webkit = !ie && 'WebkitAppearance' in document.documentElement.style;
}

var domIndex = function(node) {
  for (var index = 0;; index++) {
    node = node.previousSibling;
    if (!node) { return index }
  }
};

var parentNode = function(node) {
  var parent = node.parentNode;
  return parent && parent.nodeType == 11 ? parent.host : parent
};

var textRange = function(node, from, to) {
  var range = document.createRange();
  range.setEnd(node, to == null ? node.nodeValue.length : to);
  range.setStart(node, from || 0);
  return range
};

// Scans forward and backward through DOM positions equivalent to the
// given one to see if the two are in the same place (i.e. after a
// text node vs at the end of that text node)
var isEquivalentPosition = function(node, off, targetNode, targetOff) {
  return targetNode && (scanFor(node, off, targetNode, targetOff, -1) ||
                        scanFor(node, off, targetNode, targetOff, 1))
};

var atomElements = /^(img|br|input|textarea|hr)$/i;

function scanFor(node, off, targetNode, targetOff, dir) {
  for (;;) {
    if (node == targetNode && off == targetOff) { return true }
    if (off == (dir < 0 ? 0 : nodeSize(node))) {
      var parent = node.parentNode;
      if (parent.nodeType != 1 || hasBlockDesc(node) || atomElements.test(node.nodeName)) { return false }
      off = domIndex(node) + (dir < 0 ? 0 : 1);
      node = parent;
    } else if (node.nodeType == 1) {
      node = node.childNodes[off + (dir < 0 ? -1 : 0)];
      off = dir < 0 ? nodeSize(node) : 0;
    } else {
      return false
    }
  }
}

function nodeSize(node) {
  return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length
}

function hasBlockDesc(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.node && desc.node.isBlock
}

// Work around Chrome issue https://bugs.chromium.org/p/chromium/issues/detail?id=447523
// (isCollapsed inappropriately returns true in shadow dom)
var selectionCollapsed = function(domSel) {
  var collapsed = domSel.isCollapsed;
  if (collapsed && result.chrome && domSel.rangeCount && !domSel.getRangeAt(0).collapsed)
    { collapsed = false; }
  return collapsed
};

function windowRect(win) {
  return {left: 0, right: win.innerWidth,
          top: 0, bottom: win.innerHeight}
}

function scrollRectIntoView(view, rect) {
  var scrollThreshold = view.someProp("scrollThreshold") || 0, scrollMargin = view.someProp("scrollMargin");
  var doc = view.dom.ownerDocument, win = doc.defaultView;
  if (scrollMargin == null) { scrollMargin = 5; }
  for (var parent = view.dom;; parent = parentNode(parent)) {
    if (!parent) { break }
    var atBody = parent == doc.body;
    var bounding = atBody ? windowRect(win) : parent.getBoundingClientRect();
    var moveX = 0, moveY = 0;
    if (rect.top < bounding.top + scrollThreshold)
      { moveY = -(bounding.top - rect.top + scrollMargin); }
    else if (rect.bottom > bounding.bottom - scrollThreshold)
      { moveY = rect.bottom - bounding.bottom + scrollMargin; }
    if (rect.left < bounding.left + scrollThreshold)
      { moveX = -(bounding.left - rect.left + scrollMargin); }
    else if (rect.right > bounding.right - scrollThreshold)
      { moveX = rect.right - bounding.right + scrollMargin; }
    if (moveX || moveY) {
      if (atBody) {
        win.scrollBy(moveX, moveY);
      } else {
        if (moveY) { parent.scrollTop += moveY; }
        if (moveX) { parent.scrollLeft += moveX; }
      }
    }
    if (atBody) { break }
  }
}

// Store the scroll position of the editor's parent nodes, along with
// the top position of an element near the top of the editor, which
// will be used to make sure the visible viewport remains stable even
// when the size of the content above changes.
function storeScrollPos(view) {
  var rect = view.dom.getBoundingClientRect(), startY = Math.max(0, rect.top);
  var doc = view.dom.ownerDocument;
  var refDOM, refTop;
  for (var x = (rect.left + rect.right) / 2, y = startY + 1;
       y < Math.min(innerHeight, rect.bottom); y += 5) {
    var dom = view.root.elementFromPoint(x, y);
    if (dom == view.dom || !view.dom.contains(dom)) { continue }
    var localRect = dom.getBoundingClientRect();
    if (localRect.top >= startY - 20) {
      refDOM = dom;
      refTop = localRect.top;
      break
    }
  }
  var stack = [];
  for (var dom$1 = view.dom; dom$1; dom$1 = parentNode(dom$1)) {
    stack.push({dom: dom$1, top: dom$1.scrollTop, left: dom$1.scrollLeft});
    if (dom$1 == doc.body) { break }
  }
  return {refDOM: refDOM, refTop: refTop, stack: stack}
}

// Reset the scroll position of the editor's parent nodes to that what
// it was before, when storeScrollPos was called.
function resetScrollPos(ref) {
  var refDOM = ref.refDOM;
  var refTop = ref.refTop;
  var stack = ref.stack;

  var newRefTop = refDOM ? refDOM.getBoundingClientRect().top : 0;
  var dTop = newRefTop == 0 ? 0 : newRefTop - refTop;
  for (var i = 0; i < stack.length; i++) {
    var ref$1 = stack[i];
    var dom = ref$1.dom;
    var top = ref$1.top;
    var left = ref$1.left;
    if (dom.scrollTop != top + dTop) { dom.scrollTop = top + dTop; }
    if (dom.scrollLeft != left) { dom.scrollLeft = left; }
  }
}

function findOffsetInNode(node, coords) {
  var closest, dxClosest = 2e8, coordsClosest, offset = 0;
  var rowBot = coords.top, rowTop = coords.top;
  for (var child = node.firstChild, childIndex = 0; child; child = child.nextSibling, childIndex++) {
    var rects = (void 0);
    if (child.nodeType == 1) { rects = child.getClientRects(); }
    else if (child.nodeType == 3) { rects = textRange(child).getClientRects(); }
    else { continue }

    for (var i = 0; i < rects.length; i++) {
      var rect = rects[i];
      if (rect.top <= rowBot && rect.bottom >= rowTop) {
        rowBot = Math.max(rect.bottom, rowBot);
        rowTop = Math.min(rect.top, rowTop);
        var dx = rect.left > coords.left ? rect.left - coords.left
            : rect.right < coords.left ? coords.left - rect.right : 0;
        if (dx < dxClosest) {
          closest = child;
          dxClosest = dx;
          coordsClosest = dx && closest.nodeType == 3 ? {left: rect.right < coords.left ? rect.right : rect.left, top: coords.top} : coords;
          if (child.nodeType == 1 && dx)
            { offset = childIndex + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0); }
          continue
        }
      }
      if (!closest && (coords.left >= rect.right && coords.top >= rect.top ||
                       coords.left >= rect.left && coords.top >= rect.bottom))
        { offset = childIndex + 1; }
    }
  }
  if (closest && closest.nodeType == 3) { return findOffsetInText(closest, coordsClosest) }
  if (!closest || (dxClosest && closest.nodeType == 1)) { return {node: node, offset: offset} }
  return findOffsetInNode(closest, coordsClosest)
}

function findOffsetInText(node, coords) {
  var len = node.nodeValue.length;
  var range = document.createRange();
  for (var i = 0; i < len; i++) {
    range.setEnd(node, i + 1);
    range.setStart(node, i);
    var rect = singleRect(range, 1);
    if (rect.top == rect.bottom) { continue }
    if (rect.left - 1 <= coords.left && rect.right + 1 >= coords.left &&
        rect.top - 1 <= coords.top && rect.bottom + 1 >= coords.top)
      { return {node: node, offset: i + (coords.left >= (rect.left + rect.right) / 2 ? 1 : 0)} }
  }
  return {node: node, offset: 0}
}

function targetKludge(dom, coords) {
  if (/^[uo]l$/i.test(dom.nodeName)) {
    for (var child = dom.firstChild; child; child = child.nextSibling) {
      if (!child.pmViewDesc || !/^li$/i.test(child.nodeName)) { continue }
      var childBox = child.getBoundingClientRect();
      if (coords.left > childBox.left - 2) { break }
      if (childBox.top <= coords.top && childBox.bottom >= coords.top) { return child }
    }
  }
  return dom
}

function posFromElement(view, elt, coords) {
  elt = targetKludge(elt, coords);
  if (!view.dom.contains(elt.nodeType != 1 ? elt.parentNode : elt)) { return null }

  var ref = findOffsetInNode(elt, coords);
  var node = ref.node;
  var offset = ref.offset;
  var bias = -1;
  if (node.nodeType == 1 && !node.firstChild) {
    var rect = node.getBoundingClientRect();
    bias = rect.left != rect.right && coords.left > (rect.left + rect.right) / 2 ? 1 : -1;
  }
  return view.docView.posFromDOM(node, offset, bias)
}

function posFromCaret(view, node, offset, coords) {
  // Browser (in caretPosition/RangeFromPoint) will agressively
  // normalize towards nearby inline nodes. Since we are interested in
  // positions between block nodes too, we first walk up the hierarchy
  // of nodes to see if there are block nodes that the coordinates
  // fall outside of. If so, we take the position before/after that
  // block. If not, we call `posFromDOM` on the raw node/offset.
  var outside = -1;
  for (var cur = node;;) {
    if (cur == view.dom) { break }
    var desc = view.docView.nearestDesc(cur, true);
    if (!desc) { return null }
    if (desc.node.isBlock && desc.parent) {
      var rect = desc.dom.getBoundingClientRect();
      if (rect.left > coords.left || rect.top > coords.top) { outside = desc.posBefore; }
      else if (rect.right < coords.left || rect.bottom < coords.top) { outside = desc.posAfter; }
      else { break }
    }
    cur = desc.dom.parentNode;
  }
  return outside > -1 ? outside : view.docView.posFromDOM(node, offset)
}

// Given an x,y position on the editor, get the position in the document.
function posAtCoords(view, coords) {
  var root = view.root, node, offset;
  if (root.caretPositionFromPoint) {
    var pos$1 = root.caretPositionFromPoint(coords.left, coords.top);
    if (pos$1) { var assign;
      ((assign = pos$1, node = assign.offsetNode, offset = assign.offset)); }
  }
  if (!node && root.caretRangeFromPoint) {
    var range = root.caretRangeFromPoint(coords.left, coords.top);
    if (range) { var assign$1;
      ((assign$1 = range, node = assign$1.startContainer, offset = assign$1.startOffset)); }
  }

  var elt = root.elementFromPoint(coords.left, coords.top + 1), pos;
  if (!elt) { return null }
  if (node) {
    // Suspiciously specific kludge to work around caret*FromPoint
    // never returning a position at the end of the document
    if (node == view.dom && offset == node.childNodes.length - 1 && node.lastChild.nodeType == 1 &&
        coords.top > node.lastChild.getBoundingClientRect().bottom)
      { pos = view.state.doc.content.size; }
    // Ignore positions directly after a BR, since caret*FromPoint
    // 'round up' positions that would be more accurately places
    // before the BR node.
    else if (offset == 0 || node.nodeType != 1 || node.childNodes[offset - 1].nodeName != "BR")
      { pos = posFromCaret(view, node, offset, coords); }
  }
  if (pos == null) {
    pos = posFromElement(view, elt, coords);
    if (pos == null) { return null }
  }

  var desc = view.docView.nearestDesc(elt, true);
  return {pos: pos, inside: desc ? desc.posAtStart - desc.border : -1}
}

function singleRect(object, bias) {
  var rects = object.getClientRects();
  return !rects.length ? object.getBoundingClientRect() : rects[bias < 0 ? 0 : rects.length - 1]
}

// : (EditorView, number) → {left: number, top: number, right: number, bottom: number}
// Given a position in the document model, get a bounding box of the
// character at that position, relative to the window.
function coordsAtPos(view, pos) {
  var ref = view.docView.domFromPos(pos);
  var node = ref.node;
  var offset = ref.offset;
  var side, rect;
  if (node.nodeType == 3) {
    if (offset < node.nodeValue.length) {
      rect = singleRect(textRange(node, offset, offset + 1), -1);
      side = "left";
    }
    if ((!rect || rect.left == rect.right) && offset) {
      rect = singleRect(textRange(node, offset - 1, offset), 1);
      side = "right";
    }
  } else if (node.firstChild) {
    if (offset < node.childNodes.length) {
      var child = node.childNodes[offset];
      rect = singleRect(child.nodeType == 3 ? textRange(child) : child, -1);
      side = "left";
    }
    if ((!rect || rect.top == rect.bottom) && offset) {
      var child$1 = node.childNodes[offset - 1];
      rect = singleRect(child$1.nodeType == 3 ? textRange(child$1) : child$1, 1);
      side = "right";
    }
  } else {
    rect = node.getBoundingClientRect();
    side = "left";
  }
  var x = rect[side];
  return {top: rect.top, bottom: rect.bottom, left: x, right: x}
}

function withFlushedState(view, state, f) {
  var viewState = view.state, active = view.root.activeElement;
  if (viewState != state || !view.inDOMChange) { view.updateState(state); }
  if (active != view.dom) { view.focus(); }
  try {
    return f()
  } finally {
    if (viewState != state) { view.updateState(viewState); }
    if (active != view.dom) { active.focus(); }
  }
}

// : (EditorView, number, number)
// Whether vertical position motion in a given direction
// from a position would leave a text block.
function endOfTextblockVertical(view, state, dir) {
  var sel = state.selection;
  var $pos = dir == "up" ? sel.$anchor.min(sel.$head) : sel.$anchor.max(sel.$head);
  if (!$pos.depth) { return false }
  return withFlushedState(view, state, function () {
    var dom = view.docView.domAfterPos($pos.before());
    var coords = coordsAtPos(view, $pos.pos);
    for (var child = dom.firstChild; child; child = child.nextSibling) {
      var boxes = (void 0);
      if (child.nodeType == 1) { boxes = child.getClientRects(); }
      else if (child.nodeType == 3) { boxes = textRange(child, 0, child.nodeValue.length).getClientRects(); }
      else { continue }
      for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (dir == "up" ? box.bottom < coords.top + 1 : box.top > coords.bottom - 1)
          { return false }
      }
    }
    return true
  })
}

var maybeRTL = /[\u0590-\u08ac]/;

function endOfTextblockHorizontal(view, state, dir) {
  var ref = state.selection;
  var $head = ref.$head;
  if (!$head.parent.isTextblock || !$head.depth) { return false }
  var offset = $head.parentOffset, atStart = !offset, atEnd = offset == $head.parent.content.size;
  var sel = getSelection();
  // If the textblock is all LTR, or the browser doesn't support
  // Selection.modify (Edge), fall back to a primitive approach
  if (!maybeRTL.test($head.parent.textContent) || !sel.modify)
    { return dir == "left" || dir == "backward" ? atStart : atEnd }

  return withFlushedState(view, state, function () {
    // This is a huge hack, but appears to be the best we can
    // currently do: use `Selection.modify` to move the selection by
    // one character, and see if that moves the cursor out of the
    // textblock (or doesn't move it at all, when at the start/end of
    // the document).
    var oldRange = sel.getRangeAt(0), oldNode = sel.focusNode, oldOff = sel.focusOffset;
    sel.modify("move", dir, "character");
    var parentDOM = view.docView.domAfterPos($head.before());
    var result = !parentDOM.contains(sel.focusNode.nodeType == 1 ? sel.focusNode : sel.focusNode.parentNode) ||
        (oldNode == sel.focusNode && oldOff == sel.focusOffset);
    // Restore the previous selection
    sel.removeAllRanges();
    sel.addRange(oldRange);
    return result
  })
}

var cachedState = null;
var cachedDir = null;
var cachedResult = false;
function endOfTextblock(view, state, dir) {
  if (cachedState == state && cachedDir == dir) { return cachedResult }
  cachedState = state; cachedDir = dir;
  return cachedResult = dir == "up" || dir == "down"
    ? endOfTextblockVertical(view, state, dir)
    : endOfTextblockHorizontal(view, state, dir)
}

// NodeView:: interface
//
// By default, document nodes are rendered using the result of the
// [`toDOM`](#model.NodeSpec.toDOM) method of their spec, and managed
// entirely by the editor. For some use cases, such as embedded
// node-specific editing interfaces, you want more control over
// the behavior of a node's in-editor representation, and need to
// [define](#view.EditorProps.nodeViews) a custom node view.
//
// Objects returned as node views must conform to this interface.
//
//   dom:: ?dom.Node
//   The outer DOM node that represents the document node. When not
//   given, the default strategy is used to create a DOM node.
//
//   contentDOM:: ?dom.Node
//   The DOM node that should hold the node's content. Only meaningful
//   if the node view also defines a `dom` property and if its node
//   type is not a leaf node type. When this is present, ProseMirror
//   will take care of rendering the node's children into it. When it
//   is not present, the node view itself is responsible for rendering
//   (or deciding not to render) its child nodes.
//
//   update:: ?(node: Node, decorations: [Decoration]) → bool
//   When given, this will be called when the view is updating itself.
//   It will be given a node (possibly of a different type), and an
//   array of active decorations (which are automatically drawn, and
//   the node view may ignore if it isn't interested in them), and
//   should return true if it was able to update to that node, and
//   false otherwise. If the node view has a `contentDOM` property (or
//   no `dom` property), updating its child nodes will be handled by
//   ProseMirror.
//
//   selectNode:: ?()
//   Can be used to override the way the node's selected status (as a
//   node selection) is displayed.
//
//   deselectNode:: ?()
//   When defining a `selectNode` method, you should also provide a
//   `deselectNode` method to remove the effect again.
//
//   setSelection:: ?(anchor: number, head: number, root: dom.Document)
//   This will be called to handle setting the selection inside the
//   node. The `anchor` and `head` positions are relative to the start
//   of the node. By default, a DOM selection will be created between
//   the DOM positions corresponding to those positions, but if you
//   override it you can do something else.
//
//   stopEvent:: ?(event: dom.Event) → bool
//   Can be used to prevent the editor view from trying to handle some
//   or all DOM events that bubble up from the node view. Events for
//   which this returns true are not handled by the editor.
//
//   ignoreMutation:: ?(dom.MutationRecord) → bool
//   Called when a DOM
//   [mutation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
//   happens within the view. Return false if the editor should
//   re-parse the range around the mutation, true if it can safely be
//   ignored.
//
//   destroy:: ?()
//   Called when the node view is removed from the editor or the whole
//   editor is destroyed.

// View descriptions are data structures that describe the DOM that is
// used to represent the editor's content. They are used for:
//
// - Incremental redrawing when the document changes
//
// - Figuring out what part of the document a given DOM position
//   corresponds to
//
// - Wiring in custom implementations of the editing interface for a
//   given node
//
// They form a doubly-linked mutable tree, starting at `view.docView`.

var NOT_DIRTY = 0;
var CHILD_DIRTY = 1;
var CONTENT_DIRTY = 2;
var NODE_DIRTY = 3;

// Superclass for the various kinds of descriptions. Defines their
// basic structure and shared methods.
var ViewDesc = function ViewDesc(parent, children, dom, contentDOM) {
  this.parent = parent;
  this.children = children;
  this.dom = dom;
  // An expando property on the DOM node provides a link back to its
  // description.
  dom.pmViewDesc = this;
  // This is the node that holds the child views. It may be null for
  // descs that don't have children.
  this.contentDOM = contentDOM;
  this.dirty = NOT_DIRTY;
};

var prototypeAccessors$1 = { beforePosition: {},size: {},border: {},posBefore: {},posAtStart: {},posAfter: {},posAtEnd: {},contentLost: {} };

// Used to check whether a given description corresponds to a
// widget/mark/node.
ViewDesc.prototype.matchesWidget = function matchesWidget () { return false };
ViewDesc.prototype.matchesMark = function matchesMark () { return false };
ViewDesc.prototype.matchesNode = function matchesNode () { return false };
ViewDesc.prototype.matchesHack = function matchesHack () { return false };

prototypeAccessors$1.beforePosition.get = function () { return false };

// : () → ?ParseRule
// When parsing in-editor content (in domchange.js), we allow
// descriptions to determine the parse rules that should be used to
// parse them.
ViewDesc.prototype.parseRule = function parseRule () { return null };

// : (dom.Event) → bool
// Used by the editor's event handler to ignore events that come
// from certain descs.
ViewDesc.prototype.stopEvent = function stopEvent () { return false };

// The size of the content represented by this desc.
prototypeAccessors$1.size.get = function () {
    var this$1 = this;

  var size = 0;
  for (var i = 0; i < this.children.length; i++) { size += this$1.children[i].size; }
  return size
};

// For block nodes, this represents the space taken up by their
// start/end tokens.
prototypeAccessors$1.border.get = function () { return 0 };

ViewDesc.prototype.destroy = function destroy () {
    var this$1 = this;

  this.parent = null;
  if (this.dom.pmViewDesc == this) { this.dom.pmViewDesc = null; }
  for (var i = 0; i < this.children.length; i++)
    { this$1.children[i].destroy(); }
};

ViewDesc.prototype.posBeforeChild = function posBeforeChild (child) {
    var this$1 = this;

  for (var i = 0, pos = this.posAtStart; i < this.children.length; i++) {
    var cur = this$1.children[i];
    if (cur == child) { return pos }
    pos += cur.size;
  }
};

prototypeAccessors$1.posBefore.get = function () {
  return this.parent.posBeforeChild(this)
};

prototypeAccessors$1.posAtStart.get = function () {
  return this.parent ? this.parent.posBeforeChild(this) + this.border : 0
};

prototypeAccessors$1.posAfter.get = function () {
  return this.posBefore + this.size
};

prototypeAccessors$1.posAtEnd.get = function () {
  return this.posAtStart + this.size - 2 * this.border
};

// : (dom.Node, number, ?number) → number
ViewDesc.prototype.localPosFromDOM = function localPosFromDOM (dom, offset, bias) {
    var this$1 = this;

  // If the DOM position is in the content, use the child desc after
  // it to figure out a position.
  if (this.contentDOM && this.contentDOM.contains(dom.nodeType == 1 ? dom : dom.parentNode)) {
    if (bias < 0) {
      var domBefore, desc;
      if (dom == this.contentDOM) {
        domBefore = dom.childNodes[offset - 1];
      } else {
        while (dom.parentNode != this.contentDOM) { dom = dom.parentNode; }
        domBefore = dom.previousSibling;
      }
      while (domBefore && !((desc = domBefore.pmViewDesc) && desc.parent == this)) { domBefore = domBefore.previousSibling; }
      return domBefore ? this.posBeforeChild(desc) + desc.size : this.posAtStart
    } else {
      var domAfter, desc$1;
      if (dom == this.contentDOM) {
        domAfter = dom.childNodes[offset];
      } else {
        while (dom.parentNode != this.contentDOM) { dom = dom.parentNode; }
        domAfter = dom.nextSibling;
      }
      while (domAfter && !((desc$1 = domAfter.pmViewDesc) && desc$1.parent == this)) { domAfter = domAfter.nextSibling; }
      return domAfter ? this.posBeforeChild(desc$1) : this.posAtEnd
    }
  }
  // Otherwise, use various heuristics, falling back on the bias
  // parameter, to determine whether to return the position at the
  // start or at the end of this view desc.
  var atEnd;
  if (this.contentDOM && this.contentDOM != this.dom && this.dom.contains(this.contentDOM)) {
    atEnd = dom.compareDocumentPosition(this.contentDOM) & 2;
  } else if (this.dom.firstChild) {
    if (offset == 0) { for (var search = dom;; search = search.parentNode) {
      if (search == this$1.dom) { atEnd = false; break }
      if (search.parentNode.firstChild != search) { break }
    } }
    if (atEnd == null && offset == dom.childNodes.length) { for (var search$1 = dom;; search$1 = search$1.parentNode) {
      if (search$1 == this$1.dom) { atEnd = true; break }
      if (search$1.parentNode.lastChild != search$1) { break }
    } }
  }
  return (atEnd == null ? bias > 0 : atEnd) ? this.posAtEnd : this.posAtStart
};

// Scan up the dom finding the first desc that is a descendant of
// this one.
ViewDesc.prototype.nearestDesc = function nearestDesc (dom, onlyNodes) {
    var this$1 = this;

  for (var first = true, cur = dom; cur; cur = cur.parentNode) {
    var desc = this$1.getDesc(cur);
    if (desc && (!onlyNodes || desc.node)) {
      // If dom is outside of this desc's nodeDOM, don't count it.
      if (first && desc.nodeDOM && !(desc.nodeDOM.nodeType == 1 ? desc.nodeDOM.contains(dom) : desc.nodeDOM == dom)) { first = false; }
      else { return desc }
    }
  }
};

ViewDesc.prototype.getDesc = function getDesc (dom) {
    var this$1 = this;

  var desc = dom.pmViewDesc;
  for (var cur = desc; cur; cur = cur.parent) { if (cur == this$1) { return desc } }
};

ViewDesc.prototype.posFromDOM = function posFromDOM (dom, offset, bias) {
    var this$1 = this;

  for (var scan = dom;; scan = scan.parentNode) {
    var desc = this$1.getDesc(scan);
    if (desc) { return desc.localPosFromDOM(dom, offset, bias) }
  }
};

// : (number) → ?NodeViewDesc
// Find the desc for the node after the given pos, if any. (When a
// parent node overrode rendering, there might not be one.)
ViewDesc.prototype.descAt = function descAt (pos) {
    var this$1 = this;

  for (var i = 0, offset = 0; i < this.children.length; i++) {
    var child = this$1.children[i], end = offset + child.size;
    if (offset == pos && end != offset) {
      while (!child.border && child.children.length) { child = child.children[0]; }
      return child
    }
    if (pos < end) { return child.descAt(pos - offset - child.border) }
    offset = end;
  }
};

// : (number) → {node: dom.Node, offset: number}
ViewDesc.prototype.domFromPos = function domFromPos (pos) {
    var this$1 = this;

  if (!this.contentDOM) { return {node: this.dom, offset: 0} }
  for (var offset = 0, i = 0;; i++) {
    if (offset == pos) {
      while (i < this.children.length && this.children[i].beforePosition) { i++; }
      return {node: this$1.contentDOM, offset: i}
    }
    if (i == this$1.children.length) { throw new Error("Invalid position " + pos) }
    var child = this$1.children[i], end = offset + child.size;
    if (pos < end) { return child.domFromPos(pos - offset - child.border) }
    offset = end;
  }
};

// Used to find a DOM range in a single parent for a given changed
// range.
ViewDesc.prototype.parseRange = function parseRange (from, to, base) {
    var this$1 = this;
    if ( base === void 0 ) base = 0;

  if (this.children.length == 0)
    { return {node: this.contentDOM, from: from, to: to, fromOffset: 0, toOffset: this.contentDOM.childNodes.length} }

  var fromOffset = -1, toOffset = -1;
  for (var offset = 0, i = 0;; i++) {
    var child = this$1.children[i], end = offset + child.size;
    if (fromOffset == -1 && from <= end) {
      var childBase = offset + child.border;
      // FIXME maybe descend mark views to parse a narrower range?
      if (from >= childBase && to <= end - child.border && child.node &&
          child.contentDOM && this$1.contentDOM.contains(child.contentDOM))
        { return child.parseRange(from - childBase, to - childBase, base + childBase) }

      from = base + offset;
      for (var j = i; j > 0; j--) {
        var prev = this$1.children[j - 1];
        if (prev.size && prev.dom.parentNode == this$1.contentDOM && !prev.emptyChildAt(1)) {
          fromOffset = domIndex(prev.dom) + 1;
          break
        }
        from -= prev.size;
      }
      if (fromOffset == -1) { fromOffset = 0; }
    }
    if (fromOffset > -1 && to <= end) {
      to = base + end;
      for (var j$1 = i + 1; j$1 < this.children.length; j$1++) {
        var next = this$1.children[j$1];
        if (next.size && next.dom.parentNode == this$1.contentDOM && !next.emptyChildAt(-1)) {
          toOffset = domIndex(next.dom);
          break
        }
        to += next.size;
      }
      if (toOffset == -1) { toOffset = this$1.contentDOM.childNodes.length; }
      break
    }
    offset = end;
  }
  return {node: this.contentDOM, from: from, to: to, fromOffset: fromOffset, toOffset: toOffset}
};

ViewDesc.prototype.emptyChildAt = function emptyChildAt (side) {
  if (this.border || !this.contentDOM || !this.children.length) { return false }
  var child = this.children[side < 0 ? 0 : this.children.length - 1];
  return child.size == 0 || child.emptyChildAt(side)
};

// : (number) → dom.Node
ViewDesc.prototype.domAfterPos = function domAfterPos (pos) {
  var ref = this.domFromPos(pos);
    var node = ref.node;
    var offset = ref.offset;
  if (node.nodeType != 1 || offset == node.childNodes.length)
    { throw new RangeError("No node after pos " + pos) }
  return node.childNodes[offset]
};

// : (number, number, dom.Document)
// View descs are responsible for setting any selection that falls
// entirely inside of them, so that custom implementations can do
// custom things with the selection. Note that this falls apart when
// a selection starts in such a node and ends in another, in which
// case we just use whatever domFromPos produces as a best effort.
ViewDesc.prototype.setSelection = function setSelection (anchor, head, root) {
    var this$1 = this;

  // If the selection falls entirely in a child, give it to that child
  var from = Math.min(anchor, head), to = Math.max(anchor, head);
  for (var i = 0, offset = 0; i < this.children.length; i++) {
    var child = this$1.children[i], end = offset + child.size;
    if (from > offset && to < end)
      { return child.setSelection(anchor - offset - child.border, head - offset - child.border, root) }
    offset = end;
  }

  var anchorDOM = this.domFromPos(anchor), headDOM = this.domFromPos(head);
  var domSel = root.getSelection(), range = document.createRange();
  if (isEquivalentPosition(anchorDOM.node, anchorDOM.offset, domSel.anchorNode, domSel.anchorOffset) &&
      isEquivalentPosition(headDOM.node, headDOM.offset, domSel.focusNode, domSel.focusOffset))
    { return }

  // Selection.extend can be used to create an 'inverted' selection
  // (one where the focus is before the anchor), but not all
  // browsers support it yet.
  if (domSel.extend) {
    range.setEnd(anchorDOM.node, anchorDOM.offset);
    range.collapse(false);
  } else {
    if (anchor > head) { var tmp = anchorDOM; anchorDOM = headDOM; headDOM = tmp; }
    range.setEnd(headDOM.node, headDOM.offset);
    range.setStart(anchorDOM.node, anchorDOM.offset);
  }
  domSel.removeAllRanges();
  domSel.addRange(range);
  if (domSel.extend)
    { domSel.extend(headDOM.node, headDOM.offset); }
};

// : (dom.MutationRecord) → bool
ViewDesc.prototype.ignoreMutation = function ignoreMutation (_mutation) {
  return !this.contentDOM
};

prototypeAccessors$1.contentLost.get = function () {
  return this.contentDOM && this.contentDOM != this.dom && !this.dom.contains(this.contentDOM)
};

// Remove a subtree of the element tree that has been touched
// by a DOM change, so that the next update will redraw it.
ViewDesc.prototype.markDirty = function markDirty (from, to) {
    var this$1 = this;

  for (var offset = 0, i = 0; i < this.children.length; i++) {
    var child = this$1.children[i], end = offset + child.size;
    if (offset == end ? from <= end && to >= offset : from < end && to > offset) {
      var startInside = offset + child.border, endInside = end - child.border;
      if (from >= startInside && to <= endInside) {
        this$1.dirty = from == offset || to == end ? CONTENT_DIRTY : CHILD_DIRTY;
        if (from == startInside && to == endInside && child.contentLost) { child.dirty = NODE_DIRTY; }
        else { child.markDirty(from - startInside, to - startInside); }
        return
      } else {
        child.dirty = NODE_DIRTY;
      }
    }
    offset = end;
  }
  this.dirty = CONTENT_DIRTY;
};

Object.defineProperties( ViewDesc.prototype, prototypeAccessors$1 );

// Reused array to avoid allocating fresh arrays for things that will
// stay empty anyway.
var nothing = [];

// A widget desc represents a widget decoration, which is a DOM node
// drawn between the document nodes.
var WidgetViewDesc = (function (ViewDesc) {
  function WidgetViewDesc(parent, widget) {
    ViewDesc.call(this, parent, nothing, widget.type.widget, null);
    this.widget = widget;
  }

  if ( ViewDesc ) WidgetViewDesc.__proto__ = ViewDesc;
  WidgetViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  WidgetViewDesc.prototype.constructor = WidgetViewDesc;

  var prototypeAccessors$1 = { beforePosition: {} };

  prototypeAccessors$1.beforePosition.get = function () {
    return this.widget.type.side < 0
  };

  WidgetViewDesc.prototype.matchesWidget = function matchesWidget (widget) {
    return this.dirty == NOT_DIRTY && widget.type.eq(this.widget.type)
  };

  WidgetViewDesc.prototype.parseRule = function parseRule () { return {ignore: true} };

  WidgetViewDesc.prototype.stopEvent = function stopEvent (event) {
    var stop = this.widget.spec.stopEvent;
    return stop ? stop(event) : false
  };

  Object.defineProperties( WidgetViewDesc.prototype, prototypeAccessors$1 );

  return WidgetViewDesc;
}(ViewDesc));

// A cursor wrapper is used to put the cursor in when newly typed text
// needs to be styled differently from its surrounding text (for
// example through storedMarks), so that the style of the text doesn't
// visually 'pop' between typing it and actually updating the view.
var CursorWrapperDesc = (function (WidgetViewDesc) {
  function CursorWrapperDesc () {
    WidgetViewDesc.apply(this, arguments);
  }

  if ( WidgetViewDesc ) CursorWrapperDesc.__proto__ = WidgetViewDesc;
  CursorWrapperDesc.prototype = Object.create( WidgetViewDesc && WidgetViewDesc.prototype );
  CursorWrapperDesc.prototype.constructor = CursorWrapperDesc;

  CursorWrapperDesc.prototype.parseRule = function parseRule () {
    var content;
    for (var child = this.dom.firstChild; child; child = child.nextSibling) {
      var add = (void 0);
      if (child.nodeType == 3) {
        var text = child.nodeValue.replace(/\ufeff/g, "");
        if (!text) { continue }
        add = document.createTextNode(text);
      } else if (child.textContent == "\ufeff") {
        continue
      } else {
        add = child.cloneNode(true);
      }
      if (!content) { content = document.createDocumentFragment(); }
      content.appendChild(add);
    }
    if (content) { return {skip: content} }
    else { return WidgetViewDesc.prototype.parseRule.call(this) }
  };

  CursorWrapperDesc.prototype.ignoreMutation = function ignoreMutation () { return false };

  return CursorWrapperDesc;
}(WidgetViewDesc));

// A mark desc represents a mark. May have multiple children,
// depending on how the mark is split. Note that marks are drawn using
// a fixed nesting order, for simplicity and predictability, so in
// some cases they will be split more often than would appear
// necessary.
var MarkViewDesc = (function (ViewDesc) {
  function MarkViewDesc(parent, mark, dom) {
    ViewDesc.call(this, parent, [], dom, dom);
    this.mark = mark;
  }

  if ( ViewDesc ) MarkViewDesc.__proto__ = ViewDesc;
  MarkViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  MarkViewDesc.prototype.constructor = MarkViewDesc;

  MarkViewDesc.create = function create (parent, mark, inline, view) {
    var custom = customNodeViews(view)[mark.type.name];
    var spec = custom && custom(mark, view);
    var dom = spec && spec.dom || prosemirrorModel.DOMSerializer.renderSpec(document, mark.type.spec.toDOM(mark, inline)).dom;
    return new MarkViewDesc(parent, mark, dom)
  };

  MarkViewDesc.prototype.parseRule = function parseRule () { return {mark: this.mark.type.name, attrs: this.mark.attrs, contentElement: this.contentDOM} };

  MarkViewDesc.prototype.matchesMark = function matchesMark (mark) { return this.dirty != NODE_DIRTY && this.mark.eq(mark) };

  MarkViewDesc.prototype.markDirty = function markDirty (from, to) {
    ViewDesc.prototype.markDirty.call(this, from, to);
    // Move dirty info to nearest node view
    if (this.dirty != NOT_DIRTY) {
      var parent = this.parent;
      while (!parent.node) { parent = parent.parent; }
      if (parent.dirty < this.dirty) { parent.dirty = this.dirty; }
      this.dirty = NOT_DIRTY;
    }
  };

  return MarkViewDesc;
}(ViewDesc));

// Node view descs are the main, most common type of view desc, and
// correspond to an actual node in the document. Unlike mark descs,
// they populate their child array themselves.
var NodeViewDesc = (function (ViewDesc) {
  function NodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view) {
    ViewDesc.call(this, parent, node.isLeaf ? nothing : [], dom, contentDOM);
    this.nodeDOM = nodeDOM;
    this.node = node;
    this.outerDeco = outerDeco;
    this.innerDeco = innerDeco;
    if (contentDOM) { this.updateChildren(view); }
  }

  if ( ViewDesc ) NodeViewDesc.__proto__ = ViewDesc;
  NodeViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  NodeViewDesc.prototype.constructor = NodeViewDesc;

  var prototypeAccessors$2 = { size: {},border: {} };

  // By default, a node is rendered using the `toDOM` method from the
  // node type spec. But client code can use the `nodeViews` spec to
  // supply a custom node view, which can influence various aspects of
  // the way the node works.
  //
  // (Using subclassing for this was intentionally decided against,
  // since it'd require exposing a whole slew of finnicky
  // implementation details to the user code that they probably will
  // never need.)
  NodeViewDesc.create = function create (parent, node, outerDeco, innerDeco, view) {
    var custom = customNodeViews(view)[node.type.name], descObj;
    var spec = custom && custom(node, view, function () {
      // (This is a function that allows the custom view to find its
      // own position)
      if (descObj && descObj.parent) { return descObj.parent.posBeforeChild(descObj) }
    }, outerDeco);

    var dom = spec && spec.dom, contentDOM = spec && spec.contentDOM;
    if (node.isText) {
      if (!dom) { dom = document.createTextNode(node.text); }
      else if (dom.nodeType != 3) { throw new RangeError("Text must be rendered as a DOM text node") }
    } else if (!dom) {
      var assign;
      ((assign = prosemirrorModel.DOMSerializer.renderSpec(document, node.type.spec.toDOM(node)), dom = assign.dom, contentDOM = assign.contentDOM));
    }
    if (!contentDOM && !node.isText) { dom.contentEditable = false; }

    var nodeDOM = dom;
    dom = applyOuterDeco(dom, outerDeco, node);

    if (spec)
      { return descObj = new CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view) }
    else if (node.isText)
      { return new TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view) }
    else
      { return new NodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view) }
  };

  NodeViewDesc.prototype.parseRule = function parseRule () {
    var this$1 = this;

    // FIXME the assumption that this can always return the current
    // attrs means that if the user somehow manages to change the
    // attrs in the dom, that won't be picked up. Not entirely sure
    // whether this is a problem
    if (this.contentDOM && !this.contentLost)
      { return {node: this.node.type.name, attrs: this.node.attrs, contentElement: this.contentDOM} }
    else
      { return {node: this.node.type.name, attrs: this.node.attrs, getContent: function () { return this$1.contentDOM ? prosemirrorModel.Fragment.empty : this$1.node.content; }} }
  };

  NodeViewDesc.prototype.matchesNode = function matchesNode (node, outerDeco, innerDeco) {
    return this.dirty == NOT_DIRTY && node.eq(this.node) &&
      sameOuterDeco(outerDeco, this.outerDeco) && innerDeco.eq(this.innerDeco)
  };

  prototypeAccessors$2.size.get = function () { return this.node.nodeSize };

  prototypeAccessors$2.border.get = function () { return this.node.isLeaf ? 0 : 1 };

  // Syncs `this.children` to match `this.node.content` and the local
  // decorations, possibly introducing nesting for marks. Then, in a
  // separate step, syncs the DOM inside `this.contentDOM` to
  // `this.children`.
  NodeViewDesc.prototype.updateChildren = function updateChildren (view) {
    var updater = new ViewTreeUpdater(this), inline = this.node.inlineContent;
    iterDeco(this.node, this.innerDeco, function (widget) {
      if (widget.spec.isCursorWrapper)
        { updater.syncToMarks(widget.spec.marks, inline, view); }
      // If the next node is a desc matching this widget, reuse it,
      // otherwise insert the widget as a new view desc.
      updater.placeWidget(widget);
    }, function (child, outerDeco, innerDeco, i) {
      // Make sure the wrapping mark descs match the node's marks.
      updater.syncToMarks(child.marks, inline, view);
      // Either find an existing desc that exactly matches this node,
      // and drop the descs before it.
      updater.findNodeMatch(child, outerDeco, innerDeco, i) ||
        // Or try updating the next desc to reflect this node.
        updater.updateNextNode(child, outerDeco, innerDeco, view, i) ||
        // Or just add it as a new desc.
        updater.addNode(child, outerDeco, innerDeco, view);
    });
    // Drop all remaining descs after the current position.
    updater.syncToMarks(nothing, inline, view);
    if (this.node.isTextblock) { updater.addTextblockHacks(); }
    updater.destroyRest();

    // Sync the DOM if anything changed
    if (updater.changed || this.dirty == CONTENT_DIRTY) { this.renderChildren(); }
  };

  NodeViewDesc.prototype.renderChildren = function renderChildren () {
    renderDescs(this.contentDOM, this.children, NodeViewDesc.is);
    if (result.ios) { iosHacks(this.dom); }
  };

  // : (Node, [Decoration], DecorationSet, EditorView) → bool
  // If this desc be updated to match the given node decoration,
  // do so and return true.
  NodeViewDesc.prototype.update = function update (node, outerDeco, innerDeco, view) {
    if (this.dirty == NODE_DIRTY ||
        !node.sameMarkup(this.node)) { return false }
    this.updateInner(node, outerDeco, innerDeco, view);
    return true
  };

  NodeViewDesc.prototype.updateInner = function updateInner (node, outerDeco, innerDeco, view) {
    this.updateOuterDeco(outerDeco);
    this.node = node;
    this.innerDeco = innerDeco;
    if (this.contentDOM) { this.updateChildren(view); }
    this.dirty = NOT_DIRTY;
  };

  NodeViewDesc.prototype.updateOuterDeco = function updateOuterDeco (outerDeco) {
    if (sameOuterDeco(outerDeco, this.outerDeco)) { return }
    var needsWrap = this.nodeDOM.nodeType != 1;
    var oldDOM = this.dom;
    this.dom = patchOuterDeco(this.dom, this.nodeDOM,
                              computeOuterDeco(this.outerDeco, this.node, needsWrap),
                              computeOuterDeco(outerDeco, this.node, needsWrap));
    if (this.dom != oldDOM) {
      oldDOM.pmViewDesc = null;
      this.dom.pmViewDesc = this;
    }
    this.outerDeco = outerDeco;
  };

  // Mark this node as being the selected node.
  NodeViewDesc.prototype.selectNode = function selectNode () {
    this.nodeDOM.classList.add("ProseMirror-selectednode");
  };

  // Remove selected node marking from this node.
  NodeViewDesc.prototype.deselectNode = function deselectNode () {
    this.nodeDOM.classList.remove("ProseMirror-selectednode");
  };

  Object.defineProperties( NodeViewDesc.prototype, prototypeAccessors$2 );

  return NodeViewDesc;
}(ViewDesc));

// Create a view desc for the top-level document node, to be exported
// and used by the view class.
function docViewDesc(doc, outerDeco, innerDeco, dom, view) {
  applyOuterDeco(dom, outerDeco, doc, true);
  return new NodeViewDesc(null, doc, outerDeco, innerDeco, dom, dom, dom, view)
}

var TextViewDesc = (function (NodeViewDesc) {
  function TextViewDesc(parent, node, outerDeco, innerDeco, dom, nodeDOM, view) {
    NodeViewDesc.call(this, parent, node, outerDeco, innerDeco, dom, null, nodeDOM, view);
  }

  if ( NodeViewDesc ) TextViewDesc.__proto__ = NodeViewDesc;
  TextViewDesc.prototype = Object.create( NodeViewDesc && NodeViewDesc.prototype );
  TextViewDesc.prototype.constructor = TextViewDesc;

  TextViewDesc.prototype.parseRule = function parseRule () {
    var parent = this.nodeDOM.parentNode;
    return parent ? {skip: parent} : {ignore: true}
  };

  TextViewDesc.prototype.update = function update (node, outerDeco) {
    if (this.dirty == NODE_DIRTY || (this.dirty != NOT_DIRTY && !this.inParent()) ||
        !node.sameMarkup(this.node)) { return false }
    this.updateOuterDeco(outerDeco);
    if ((this.dirty != NOT_DIRTY || node.text != this.node.text) && node.text != this.nodeDOM.nodeValue)
      { this.nodeDOM.nodeValue = node.text; }
    this.node = node;
    this.dirty = NOT_DIRTY;
    return true
  };

  TextViewDesc.prototype.inParent = function inParent () {
    var parentDOM = this.parent.contentDOM;
    for (var n = this.nodeDOM; n; n = n.parentNode) { if (n == parentDOM) { return true } }
    return false
  };

  TextViewDesc.prototype.domFromPos = function domFromPos (pos) {
    return {node: this.nodeDOM, offset: pos}
  };

  TextViewDesc.prototype.localPosFromDOM = function localPosFromDOM (dom, offset, bias) {
    if (dom == this.nodeDOM) { return this.posAtStart + Math.min(offset, this.node.text.length) }
    return NodeViewDesc.prototype.localPosFromDOM.call(this, dom, offset, bias)
  };

  TextViewDesc.prototype.ignoreMutation = function ignoreMutation (mutation) {
    return mutation.type != "characterData"
  };

  return TextViewDesc;
}(NodeViewDesc));

// A dummy desc used to tag trailing BR or span nodes created to work
// around contentEditable terribleness.
var BRHackViewDesc = (function (ViewDesc) {
  function BRHackViewDesc () {
    ViewDesc.apply(this, arguments);
  }

  if ( ViewDesc ) BRHackViewDesc.__proto__ = ViewDesc;
  BRHackViewDesc.prototype = Object.create( ViewDesc && ViewDesc.prototype );
  BRHackViewDesc.prototype.constructor = BRHackViewDesc;

  BRHackViewDesc.prototype.parseRule = function parseRule () { return {ignore: true} };
  BRHackViewDesc.prototype.matchesHack = function matchesHack () { return this.dirty == NOT_DIRTY };

  return BRHackViewDesc;
}(ViewDesc));

// A separate subclass is used for customized node views, so that the
// extra checks only have to be made for nodes that are actually
// customized.
var CustomNodeViewDesc = (function (NodeViewDesc) {
  function CustomNodeViewDesc(parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, spec, view) {
    NodeViewDesc.call(this, parent, node, outerDeco, innerDeco, dom, contentDOM, nodeDOM, view);
    this.spec = spec;
  }

  if ( NodeViewDesc ) CustomNodeViewDesc.__proto__ = NodeViewDesc;
  CustomNodeViewDesc.prototype = Object.create( NodeViewDesc && NodeViewDesc.prototype );
  CustomNodeViewDesc.prototype.constructor = CustomNodeViewDesc;

  // A custom `update` method gets to decide whether the update goes
  // through. If it does, and there's a `contentDOM` node, our logic
  // updates the children.
  CustomNodeViewDesc.prototype.update = function update (node, outerDeco, innerDeco, view) {
    if (this.dirty == NODE_DIRTY) { return false }
    if (this.spec.update) {
      var result$$1 = this.spec.update(node, outerDeco);
      if (result$$1) { this.updateInner(node, outerDeco, innerDeco, view); }
      return result$$1
    } else if (!this.contentDOM && !node.isLeaf) {
      return false
    } else {
      return NodeViewDesc.prototype.update.call(this, node, outerDeco, this.contentDOM ? this.innerDeco : innerDeco, view)
    }
  };

  CustomNodeViewDesc.prototype.selectNode = function selectNode () {
    this.spec.selectNode ? this.spec.selectNode() : NodeViewDesc.prototype.selectNode.call(this);
  };

  CustomNodeViewDesc.prototype.deselectNode = function deselectNode () {
    this.spec.deselectNode ? this.spec.deselectNode() : NodeViewDesc.prototype.deselectNode.call(this);
  };

  CustomNodeViewDesc.prototype.setSelection = function setSelection (anchor, head, root) {
    this.spec.setSelection ? this.spec.setSelection(anchor, head, root) : NodeViewDesc.prototype.setSelection.call(this, anchor, head, root);
  };

  CustomNodeViewDesc.prototype.destroy = function destroy () {
    if (this.spec.destroy) { this.spec.destroy(); }
    NodeViewDesc.prototype.destroy.call(this);
  };

  CustomNodeViewDesc.prototype.stopEvent = function stopEvent (event) {
    return this.spec.stopEvent ? this.spec.stopEvent(event) : false
  };

  CustomNodeViewDesc.prototype.ignoreMutation = function ignoreMutation (mutation) {
    return this.spec.ignoreMutation ? this.spec.ignoreMutation(mutation) : NodeViewDesc.prototype.ignoreMutation.call(this, mutation)
  };

  return CustomNodeViewDesc;
}(NodeViewDesc));

// : (dom.Node, [ViewDesc])
// Sync the content of the given DOM node with the nodes associated
// with the given array of view descs, recursing into mark descs
// because this should sync the subtree for a whole node at a time.
function renderDescs(parentDOM, descs) {
  var dom = parentDOM.firstChild;
  for (var i = 0; i < descs.length; i++) {
    var desc = descs[i], childDOM = desc.dom;
    if (childDOM.parentNode == parentDOM) {
      while (childDOM != dom) { dom = rm(dom); }
      dom = dom.nextSibling;
    } else {
      parentDOM.insertBefore(childDOM, dom);
    }
    if (desc instanceof MarkViewDesc) {
      var pos = dom ? dom.previousSibling : parentDOM.lastChild;
      renderDescs(desc.contentDOM, desc.children);
      dom = pos ? pos.nextSibling : parentDOM.firstChild;
    }
  }
  while (dom) { dom = rm(dom); }
}

function OuterDecoLevel(nodeName) {
  if (nodeName) { this.nodeName = nodeName; }
}
OuterDecoLevel.prototype = Object.create(null);

var noDeco = [new OuterDecoLevel];

function computeOuterDeco(outerDeco, node, needsWrap) {
  if (outerDeco.length == 0) { return noDeco }

  var top = needsWrap ? noDeco[0] : new OuterDecoLevel, result$$1 = [top];

  for (var i = 0; i < outerDeco.length; i++) {
    var attrs = outerDeco[i].type.attrs, cur = top;
    if (!attrs) { continue }
    if (attrs.nodeName)
      { result$$1.push(cur = new OuterDecoLevel(attrs.nodeName)); }

    for (var name in attrs) {
      var val = attrs[name];
      if (val == null) { continue }
      if (needsWrap && result$$1.length == 1)
        { result$$1.push(cur = top = new OuterDecoLevel(node.isInline ? "span" : "div")); }
      if (name == "class") { cur.class = (cur.class ? cur.class + " " : "") + val; }
      else if (name == "style") { cur.style = (cur.style ? cur.style + ";" : "") + val; }
      else if (name != "nodeName") { cur[name] = val; }
    }
  }

  return result$$1
}

function patchOuterDeco(outerDOM, nodeDOM, prevComputed, curComputed) {
  // Shortcut for trivial case
  if (prevComputed == noDeco && curComputed == noDeco) { return nodeDOM }

  var curDOM = nodeDOM;
  for (var i = 0; i < curComputed.length; i++) {
    var deco = curComputed[i], prev = prevComputed[i];
    if (i) {
      var parent = (void 0);
      if (prev && prev.nodeName == deco.nodeName && curDOM != outerDOM &&
          (parent = nodeDOM.parentNode) && parent.tagName.toLowerCase() == deco.nodeName) {
        curDOM = parent;
      } else {
        parent = document.createElement(deco.nodeName);
        parent.appendChild(curDOM);
        curDOM = parent;
      }
    }
    patchAttributes(curDOM, prev || noDeco[0], deco);
  }
  return curDOM
}

function patchAttributes(dom, prev, cur) {
  for (var name in prev)
    { if (name != "class" && name != "style" && name != "nodeName" && !(name in cur))
      { dom.removeAttribute(name); } }
  for (var name$1 in cur)
    { if (name$1 != "class" && name$1 != "style" && name$1 != "nodeName" && cur[name$1] != prev[name$1])
      { dom.setAttribute(name$1, cur[name$1]); } }
  if (prev.class != cur.class) {
    var prevList = prev.class ? prev.class.split(" ") : nothing;
    var curList = cur.class ? cur.class.split(" ") : nothing;
    for (var i = 0; i < prevList.length; i++) { if (curList.indexOf(prevList[i]) == -1)
      { dom.classList.remove(prevList[i]); } }
    for (var i$1 = 0; i$1 < curList.length; i$1++) { if (prevList.indexOf(curList[i$1]) == -1)
      { dom.classList.add(curList[i$1]); } }
  }
  if (prev.style != cur.style) {
    if (prev.style) {
      var prop = /\s*([\w\-\xa1-\uffff]+)\s*:(?:"(?:\\.|[^"])*"|'(?:\\.|[^'])*'|\(.*?\)|[^;])*/g, m;
      while (m = prop.exec(prev.style))
        { dom.style[m[1].toLowerCase()] = ""; }
    }
    if (cur.style)
      { dom.style.cssText += cur.style; }
  }
}

function applyOuterDeco(dom, deco, node) {
  return patchOuterDeco(dom, dom, noDeco, computeOuterDeco(deco, node, dom.nodeType != 1))
}

// : ([Decoration], [Decoration]) → bool
function sameOuterDeco(a, b) {
  if (a.length != b.length) { return false }
  for (var i = 0; i < a.length; i++) { if (!a[i].type.eq(b[i].type)) { return false } }
  return true
}

// Remove a DOM node and return its next sibling.
function rm(dom) {
  var next = dom.nextSibling;
  dom.parentNode.removeChild(dom);
  return next
}

// Helper class for incrementally updating a tree of mark descs and
// the widget and node descs inside of them.
var ViewTreeUpdater = function ViewTreeUpdater(top) {
  this.top = top;
  // Index into `this.top`'s child array, represents the current
  // update position.
  this.index = 0;
  // When entering a mark, the current top and index are pushed
  // onto this.
  this.stack = [];
  // Tracks whether anything was changed
  this.changed = false;

  this.preMatched = preMatch(top.node.content, top.children);
};

// Destroy and remove the children between the given indices in
// `this.top`.
ViewTreeUpdater.prototype.destroyBetween = function destroyBetween (start, end) {
    var this$1 = this;

  if (start == end) { return }
  for (var i = start; i < end; i++) { this$1.top.children[i].destroy(); }
  this.top.children.splice(start, end - start);
  this.changed = true;
};

// Destroy all remaining children in `this.top`.
ViewTreeUpdater.prototype.destroyRest = function destroyRest () {
  this.destroyBetween(this.index, this.top.children.length);
};

// : ([Mark], EditorView)
// Sync the current stack of mark descs with the given array of
// marks, reusing existing mark descs when possible.
ViewTreeUpdater.prototype.syncToMarks = function syncToMarks (marks, inline, view) {
    var this$1 = this;

  var keep = 0, depth = this.stack.length >> 1;
  var maxKeep = Math.min(depth, marks.length), next;
  while (keep < maxKeep &&
         (keep == depth - 1 ? this.top : this.stack[(keep + 1) << 1]).matchesMark(marks[keep]))
    { keep++; }

  while (keep < depth) {
    this$1.destroyRest();
    this$1.top.dirty = NOT_DIRTY;
    this$1.index = this$1.stack.pop();
    this$1.top = this$1.stack.pop();
    depth--;
  }
  while (depth < marks.length) {
    this$1.stack.push(this$1.top, this$1.index + 1);
    if (this$1.index < this$1.top.children.length &&
        (next = this$1.top.children[this$1.index]).matchesMark(marks[depth])) {
      this$1.top = next;
    } else {
      var markDesc = MarkViewDesc.create(this$1.top, marks[depth], inline, view);
      this$1.top.children.splice(this$1.index, 0, markDesc);
      this$1.top = markDesc;
      this$1.changed = true;
    }
    this$1.index = 0;
    depth++;
  }
};

// : (Node, [Decoration], DecorationSet) → bool
// Try to find a node desc matching the given data. Skip over it and
// return true when successful.
ViewTreeUpdater.prototype.findNodeMatch = function findNodeMatch (node, outerDeco, innerDeco, index) {
    var this$1 = this;

  for (var i = this.index, children = this.top.children, e = Math.min(children.length, i + 5); i < e; i++) {
    var child = children[i], preMatched = (void 0);
    if (child.matchesNode(node, outerDeco, innerDeco) &&
        ((preMatched = this$1.preMatched.indexOf(child)) == -1 || preMatched == index)) {
      this$1.destroyBetween(this$1.index, i);
      this$1.index++;
      return true
    }
  }
  return false
};

// : (Node, [Decoration], DecorationSet, EditorView, Fragment, number) → bool
// Try to update the next node, if any, to the given data. Checks
// pre-matches to avoid overwriting nodes that could still be used.
ViewTreeUpdater.prototype.updateNextNode = function updateNextNode (node, outerDeco, innerDeco, view, index) {
  if (this.index == this.top.children.length) { return false }
  var next = this.top.children[this.index];
  if (next instanceof NodeViewDesc) {
    var preMatch = this.preMatched.indexOf(next);
    if (preMatch > -1 && preMatch != index) { return false }
    var nextDOM = next.dom;
    if (next.update(node, outerDeco, innerDeco, view)) {
      if (next.dom != nextDOM) { this.changed = true; }
      this.index++;
      return true
    }
  }
  return false
};

// : (Node, [Decoration], DecorationSet, EditorView)
// Insert the node as a newly created node desc.
ViewTreeUpdater.prototype.addNode = function addNode (node, outerDeco, innerDeco, view) {
  this.top.children.splice(this.index++, 0, NodeViewDesc.create(this.top, node, outerDeco, innerDeco, view));
  this.changed = true;
};

ViewTreeUpdater.prototype.placeWidget = function placeWidget (widget) {
  if (this.index < this.top.children.length && this.top.children[this.index].matchesWidget(widget)) {
    this.index++;
  } else {
    var desc = new (widget.spec.isCursorWrapper ? CursorWrapperDesc : WidgetViewDesc)(this.top, widget);
    this.top.children.splice(this.index++, 0, desc);
    this.changed = true;
  }
};

// Make sure a textblock looks and behaves correctly in
// contentEditable.
ViewTreeUpdater.prototype.addTextblockHacks = function addTextblockHacks () {
  var lastChild = this.top.children[this.index - 1];
  while (lastChild instanceof MarkViewDesc) { lastChild = lastChild.children[lastChild.children.length - 1]; }

  if (!lastChild || // Empty textblock
      !(lastChild instanceof TextViewDesc) ||
      /\n$/.test(lastChild.node.text)) {
    if (this.index < this.top.children.length && this.top.children[this.index].matchesHack()) {
      this.index++;
    } else {
      var dom = document.createElement("br");
      this.top.children.splice(this.index++, 0, new BRHackViewDesc(this.top, nothing, dom, null));
      this.changed = true;
    }
  }
};

// : (Fragment, [ViewDesc]) → [ViewDesc]
// Iterate from the end of the fragment and array of descs to find
// directly matching ones, in order to avoid overeagerly reusing
// those for other nodes. Returns an array whose positions correspond
// to node positions in the fragment, and whose elements are either
// descs matched to the child at that index, or empty.
function preMatch(frag, descs) {
  var result$$1 = [], end = frag.childCount;
  for (var i = descs.length - 1; end > 0 && i >= 0; i--) {
    var desc = descs[i], node = desc.node;
    if (!node) { continue }
    if (node != frag.child(end - 1)) { break }
    result$$1[--end] = desc;
  }
  return result$$1
}

// : (ViewDesc, DecorationSet, (Decoration), (Node, [Decoration], DecorationSet, number))
// This function abstracts iterating over the nodes and decorations in
// a fragment. Calls `onNode` for each node, with its local and child
// decorations. Splits text nodes when there is a decoration starting
// or ending inside of them. Calls `onWidget` for each widget.
function iterDeco(parent, deco, onWidget, onNode) {
  var locals = deco.locals(parent), offset = 0;
  // Simple, cheap variant for when there are no local decorations
  if (locals.length == 0) {
    for (var i = 0; i < parent.childCount; i++) {
      var child = parent.child(i);
      onNode(child, locals, deco.forChild(offset, child), i);
      offset += child.nodeSize;
    }
    return
  }

  var decoIndex = 0, active = [], restNode = null;
  for (var parentIndex = 0;;) {
    if (decoIndex < locals.length && locals[decoIndex].to == offset) {
      var widget = locals[decoIndex++], widgets = (void 0);
      while (decoIndex < locals.length && locals[decoIndex].to == offset)
        { (widgets || (widgets = [widget])).push(locals[decoIndex++]); }
      if (widgets) {
        widgets.sort(function (a, b) { return a.type.side - b.type.side; });
        widgets.forEach(onWidget);
      } else {
        onWidget(widget);
      }
    }

    var child$1 = (void 0);
    if (restNode) {
      child$1 = restNode;
      restNode = null;
    } else if (parentIndex < parent.childCount) {
      child$1 = parent.child(parentIndex++);
    } else {
      break
    }

    for (var i$1 = 0; i$1 < active.length; i$1++) { if (active[i$1].to <= offset) { active.splice(i$1--, 1); } }
    while (decoIndex < locals.length && locals[decoIndex].from == offset) { active.push(locals[decoIndex++]); }

    var end = offset + child$1.nodeSize;
    if (child$1.isText) {
      var cutAt = end;
      if (decoIndex < locals.length && locals[decoIndex].from < cutAt) { cutAt = locals[decoIndex].from; }
      for (var i$2 = 0; i$2 < active.length; i$2++) { if (active[i$2].to < cutAt) { cutAt = active[i$2].to; } }
      if (cutAt < end) {
        restNode = child$1.cut(cutAt - offset);
        child$1 = child$1.cut(0, cutAt - offset);
        end = cutAt;
      }
    }

    onNode(child$1, active.length ? active.slice() : nothing, deco.forChild(offset, child$1), parentIndex - 1);
    offset = end;
  }
}

// Pre-calculate and cache the set of custom view specs for a given
// prop object.
var cachedCustomViews;
var cachedCustomFor;
function customNodeViews(view) {
  if (cachedCustomFor == view._props) { return cachedCustomViews }
  cachedCustomFor = view._props;
  return cachedCustomViews = buildCustomViews(view)
}
function buildCustomViews(view) {
  var result$$1 = {};
  view.someProp("nodeViews", function (obj) {
    for (var prop in obj) { if (!Object.prototype.hasOwnProperty.call(result$$1, prop))
      { result$$1[prop] = obj[prop]; } }
  });
  return result$$1
}

// List markers in Mobile Safari will mysteriously disappear
// sometimes. This works around that.
function iosHacks(dom) {
  if (dom.nodeName == "UL" || dom.nodeName == "OL") {
    var oldCSS = dom.style.cssText;
    dom.style.cssText = oldCSS + "; list-style: square !important";
    window.getComputedStyle(dom).listStyle;
    dom.style.cssText = oldCSS;
  }
}

function moveSelectionBlock(state, dir) {
  var ref = state.selection;
  var $anchor = ref.$anchor;
  var $head = ref.$head;
  var $side = dir > 0 ? $anchor.max($head) : $anchor.min($head);
  var $start = !$side.parent.inlineContent ? $side : $side.depth ? state.doc.resolve(dir > 0 ? $side.after() : $side.before()) : null;
  return $start && prosemirrorState.Selection.findFrom($start, dir)
}

function apply(view, sel) {
  view.dispatch(view.state.tr.setSelection(sel).scrollIntoView());
  return true
}

function selectHorizontally(view, dir) {
  var sel = view.state.selection;
  if (sel instanceof prosemirrorState.TextSelection) {
    if (!sel.empty) {
      return false
    } else if (view.endOfTextblock(dir > 0 ? "right" : "left")) {
      var next = moveSelectionBlock(view.state, dir);
      if (next && (next instanceof prosemirrorState.NodeSelection)) { return apply(view, next) }
      return false
    } else {
      var $head = sel.$head, node = $head.textOffset ? null : dir < 0 ? $head.nodeBefore : $head.nodeAfter, desc;
      if (node && prosemirrorState.NodeSelection.isSelectable(node) &&
          (node.isAtom || (desc = view.docView.descAt($head.pos)) && !desc.contentDOM))
        { return apply(view, new prosemirrorState.NodeSelection(dir < 0 ? view.state.doc.resolve($head.pos - node.nodeSize) : $head)) }
      return false
    }
  } else if (sel instanceof prosemirrorState.NodeSelection && sel.node.isInline) {
    return apply(view, new prosemirrorState.TextSelection(dir > 0 ? sel.$to : sel.$from))
  } else {
    var next$1 = moveSelectionBlock(view.state, dir);
    if (next$1) { return apply(view, next$1) }
    return false
  }
}

function nodeLen(node) {
  return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length
}

function isIgnorable(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.size == 0
}

// Make sure the cursor isn't directly after one or more ignored
// nodes, which will confuse the browser's cursor motion logic.
function skipIgnoredNodesLeft(view) {
  var sel = view.root.getSelection();
  var node = sel.anchorNode, offset = sel.anchorOffset;
  var moveNode, moveOffset;
  for (;;) {
    if (offset > 0) {
      if (node.nodeType != 1) {
        if (node.nodeType == 3 && node.nodeValue.charAt(offset - 1) == "\ufeff") {
          moveNode = node;
          moveOffset = --offset;
        } else { break }
      } else {
        var before = node.childNodes[offset - 1];
        if (isIgnorable(before)) {
          moveNode = node;
          moveOffset = --offset;
        } else if (before.nodeType == 3) {
          node = before;
          offset = node.nodeValue.length;
        } else { break }
      }
    } else if (isBlockNode(node)) {
      break
    } else {
      var prev = node.previousSibling;
      while (prev && isIgnorable(prev)) {
        moveNode = node.parentNode;
        moveOffset = domIndex(prev);
        prev = prev.previousSibling;
      }
      if (!prev) {
        node = node.parentNode;
        if (node == view.dom) { break }
        offset = 0;
      } else {
        node = prev;
        offset = nodeLen(node);
      }
    }
  }
  if (moveNode) { setSel(sel, moveNode, moveOffset); }
}

// Make sure the cursor isn't directly before one or more ignored
// nodes.
function skipIgnoredNodesRight(view) {
  var sel = view.root.getSelection();
  var node = sel.anchorNode, offset = sel.anchorOffset, len = nodeLen(node);
  var moveNode, moveOffset;
  for (;;) {
    if (offset < len) {
      if (node.nodeType != 1) { break }
      var after = node.childNodes[offset];
      if (isIgnorable(after)) {
        moveNode = node;
        moveOffset = ++offset;
      }
      else { break }
    } else if (isBlockNode(node)) {
      break
    } else {
      var next = node.nextSibling;
      while (next && isIgnorable(next)) {
        moveNode = next.parentNode;
        moveOffset = domIndex(next) + 1;
        next = next.nextSibling;
      }
      if (!next) {
        node = node.parentNode;
        if (node == view.dom) { break }
        offset = len = 0;
      } else {
        node = next;
        offset = 0;
        len = nodeLen(node);
      }
    }
  }
  if (moveNode) { setSel(sel, moveNode, moveOffset); }
}

function isBlockNode(dom) {
  var desc = dom.pmViewDesc;
  return desc && desc.node && desc.node.isBlock
}

function setSel(sel, node, offset) {
  var range = document.createRange();
  range.setEnd(node, offset);
  range.setStart(node, offset);
  sel.removeAllRanges();
  sel.addRange(range);
}

// : (EditorState, number)
// Check whether vertical selection motion would involve node
// selections. If so, apply it (if not, the result is left to the
// browser)
function selectVertically(view, dir) {
  var sel = view.state.selection;
  if (sel instanceof prosemirrorState.TextSelection && !sel.empty) { return false }
  var $from = sel.$from;
  var $to = sel.$to;

  if (!$from.parent.inlineContent || view.endOfTextblock(dir < 0 ? "up" : "down")) {
    var next = moveSelectionBlock(view.state, dir);
    if (next && (next instanceof prosemirrorState.NodeSelection))
      { return apply(view, next) }
  }
  if (!$from.parent.inlineContent) {
    var beyond = prosemirrorState.Selection.findFrom(dir < 0 ? $from : $to, dir);
    return beyond ? apply(view, beyond) : true
  }
  return false
}

function stopNativeHorizontalDelete(view, dir) {
  if (!(view.state.selection instanceof prosemirrorState.TextSelection)) { return true }
  var ref = view.state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  var empty = ref.empty;
  if (!$head.sameParent($anchor)) { return true }
  if (!empty) { return false }
  if (view.endOfTextblock(dir > 0 ? "forward" : "backward")) { return true }
  var nextNode = !$head.textOffset && (dir < 0 ? $head.nodeBefore : $head.nodeAfter);
  if (nextNode && !nextNode.isText) {
    var tr = view.state.tr;
    if (dir < 0) { tr.delete($head.pos - nextNode.nodeSize, $head.pos); }
    else { tr.delete($head.pos, $head.pos + nextNode.nodeSize); }
    view.dispatch(tr);
    return true
  }
  return false
}

// A backdrop key mapping used to make sure we always suppress keys
// that have a dangerous default effect, even if the commands they are
// bound to return false, and to make sure that cursor-motion keys
// find a cursor (as opposed to a node selection) when pressed. For
// cursor-motion keys, the code in the handlers also takes care of
// block selections.

function getMods(event) {
  var result$$1 = "";
  if (event.ctrlKey) { result$$1 += "c"; }
  if (event.metaKey) { result$$1 += "m"; }
  if (event.altKey) { result$$1 += "a"; }
  if (event.shiftKey) { result$$1 += "s"; }
  return result$$1
}

function captureKeyDown(view, event) {
  var code = event.keyCode, mods = getMods(event);
  if (code == 8 || (result.mac && code == 72 && mods == "c")) { // Backspace, Ctrl-h on Mac
    return stopNativeHorizontalDelete(view, -1) || skipIgnoredNodesLeft(view)
  } else if (code == 46 || (result.mac && code == 68 && mods == "c")) { // Delete, Ctrl-d on Mac
    return stopNativeHorizontalDelete(view, 1) || skipIgnoredNodesRight(view)
  } else if (code == 13 || code == 27) { // Enter, Esc
    return true
  } else if (code == 37) { // Left arrow
    return selectHorizontally(view, -1) || skipIgnoredNodesLeft(view)
  } else if (code == 39) { // Right arrow
    return selectHorizontally(view, 1) || skipIgnoredNodesRight(view)
  } else if (code == 38) { // Up arrow
    return selectVertically(view, -1) || skipIgnoredNodesLeft(view)
  } else if (code == 40) { // Down arrow
    return selectVertically(view, 1) || skipIgnoredNodesRight(view)
  } else if (mods == (result.mac ? "m" : "c") &&
             (code == 66 || code == 73 || code == 89 || code == 90)) { // Mod-[biyz]
    return true
  }
  return false
}

var TrackedRecord = function TrackedRecord(prev, mapping, state) {
  this.prev = prev;
  this.mapping = mapping;
  this.state = state;
};

var TrackMappings = function TrackMappings(state) {
  this.seen = [new TrackedRecord(null, null, state)];
  // Kludge to listen to state changes globally in order to be able
  // to find mappings from a given state to another.
  prosemirrorState.EditorState.addApplyListener(this.track = this.track.bind(this));
};

TrackMappings.prototype.destroy = function destroy () {
  prosemirrorState.EditorState.removeApplyListener(this.track);
};

TrackMappings.prototype.find = function find (state) {
    var this$1 = this;

  for (var i = this.seen.length - 1; i >= 0; i--) {
    var record = this$1.seen[i];
    if (record.state == state) { return record }
  }
};

TrackMappings.prototype.track = function track (old, tr, state) {
  var found = this.seen.length < 200 ? this.find(old) : null;
  if (found)
    { this.seen.push(new TrackedRecord(found, tr.docChanged ? tr.mapping : null, state)); }
};

TrackMappings.prototype.getMapping = function getMapping (state, appendTo) {
  var found = this.find(state);
  if (!found) { return null }
  var mappings = [];
  for (var rec = found; rec; rec = rec.prev)
    { if (rec.mapping) { mappings.push(rec.mapping); } }
  var result = appendTo || new prosemirrorTransform.Mapping;
  for (var i = mappings.length - 1; i >= 0; i--)
    { result.appendMapping(mappings[i]); }
  return result
};

// Track the state of the current editor selection. Keeps the editor
// selection in sync with the DOM selection by polling for changes,
// as there is no DOM event for DOM selection changes.
var SelectionReader = function SelectionReader(view) {
  var this$1 = this;

  this.view = view;

  // Track the state of the DOM selection.
  this.lastAnchorNode = this.lastHeadNode = this.lastAnchorOffset = this.lastHeadOffset = null;
  this.lastSelection = view.state.selection;
  this.ignoreUpdates = false;
  this.poller = poller(this);

  view.dom.addEventListener("focus", function () { return this$1.poller.start(hasFocusAndSelection(this$1.view)); });
  view.dom.addEventListener("blur", function () { return this$1.poller.stop(); });

  if (!view.editable) { this.poller.start(false); }
};

SelectionReader.prototype.destroy = function destroy () { this.poller.stop(); };

SelectionReader.prototype.poll = function poll (origin) { this.poller.poll(origin); };

SelectionReader.prototype.editableChanged = function editableChanged () {
  if (!this.view.editable) { this.poller.start(); }
  else if (!hasFocusAndSelection(this.view)) { this.poller.stop(); }
};

// : () → bool
// Whether the DOM selection has changed from the last known state.
SelectionReader.prototype.domChanged = function domChanged () {
  var sel = this.view.root.getSelection();
  return sel.anchorNode != this.lastAnchorNode || sel.anchorOffset != this.lastAnchorOffset ||
    sel.focusNode != this.lastHeadNode || sel.focusOffset != this.lastHeadOffset
};

// Store the current state of the DOM selection.
SelectionReader.prototype.storeDOMState = function storeDOMState (selection) {
  var sel = this.view.root.getSelection();
  this.lastAnchorNode = sel.anchorNode; this.lastAnchorOffset = sel.anchorOffset;
  this.lastHeadNode = sel.focusNode; this.lastHeadOffset = sel.focusOffset;
  this.lastSelection = selection;
};

SelectionReader.prototype.clearDOMState = function clearDOMState () {
  this.lastAnchorNode = this.lastSelection = null;
};

// : (?string) → bool
// When the DOM selection changes in a notable manner, modify the
// current selection state to match.
SelectionReader.prototype.readFromDOM = function readFromDOM (origin) {
  if (this.ignoreUpdates || !this.domChanged() || !hasFocusAndSelection(this.view)) { return }
  if (!this.view.inDOMChange) { this.view.domObserver.flush(); }
  if (this.view.inDOMChange) { return }

  var domSel = this.view.root.getSelection(), doc = this.view.state.doc;
  var nearestDesc = this.view.docView.nearestDesc(domSel.focusNode), inWidget = nearestDesc.size == 0;
  var head = this.view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
  var $head = doc.resolve(head), $anchor, selection;
  if (selectionCollapsed(domSel)) {
    $anchor = $head;
    while (nearestDesc && !nearestDesc.node) { nearestDesc = nearestDesc.parent; }
    if (nearestDesc && nearestDesc.node.isAtom && prosemirrorState.NodeSelection.isSelectable(nearestDesc.node) && nearestDesc.parent) {
      var pos = nearestDesc.posBefore;
      selection = new prosemirrorState.NodeSelection(head == pos ? $head : doc.resolve(pos));
    }
  } else {
    $anchor = doc.resolve(this.view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset));
  }

  if (!selection) {
    var bias = origin == "pointer" || (this.view.state.selection.head < $head.pos && !inWidget) ? 1 : -1;
    selection = selectionBetween(this.view, $anchor, $head, bias);
  }
  var preserve = !inWidget && !this.view.cursorWrapper && head == selection.head && $anchor.pos == selection.anchor;
  if (preserve) { this.storeDOMState(selection); }
  if (!this.view.state.selection.eq(selection)) {
    var tr = this.view.state.tr.setSelection(selection);
    if (origin == "pointer") { tr.setMeta("pointer", true); }
    this.view.dispatch(tr);
  } else if (!preserve) {
    selectionToDOM(this.view);
  }
};

// There's two polling models. On browsers that support the
// selectionchange event (everything except Firefox, basically), we
// register a listener for that whenever the editor is focused.
var SelectionChangePoller = function SelectionChangePoller(reader) {
  var this$1 = this;

  this.listening = false;
  this.curOrigin = null;
  this.originTime = 0;
  this.reader = reader;

  this.readFunc = function () { return reader.readFromDOM(this$1.originTime > Date.now() - 50 ? this$1.curOrigin : null); };
};

SelectionChangePoller.prototype.poll = function poll (origin) {
  this.curOrigin = origin;
  this.originTime = Date.now();
};

SelectionChangePoller.prototype.start = function start (andRead) {
  if (!this.listening) {
    var doc = this.reader.view.dom.ownerDocument;
    doc.addEventListener("selectionchange", this.readFunc);
    this.listening = true;
    if (andRead) { this.readFunc(); }
  }
};

SelectionChangePoller.prototype.stop = function stop () {
  if (this.listening) {
    var doc = this.reader.view.dom.ownerDocument;
    doc.removeEventListener("selectionchange", this.readFunc);
    this.listening = false;
  }
};

// On Firefox, we use timeout-based polling.
var TimeoutPoller = function TimeoutPoller(reader) {
  // The timeout ID for the poller when active.
  this.polling = null;
  this.reader = reader;
  this.pollFunc = this.doPoll.bind(this, null);
};

TimeoutPoller.prototype.doPoll = function doPoll (origin) {
  var view = this.reader.view;
  if (view.focused || !view.editable) {
    this.reader.readFromDOM(origin);
    this.polling = setTimeout(this.pollFunc, 100);
  } else {
    this.polling = null;
  }
};

TimeoutPoller.prototype.poll = function poll (origin) {
  clearTimeout(this.polling);
  this.polling = setTimeout(origin ? this.doPoll.bind(this, origin) : this.pollFunc, 0);
};

TimeoutPoller.prototype.start = function start () {
  if (this.polling == null) { this.poll(); }
};

TimeoutPoller.prototype.stop = function stop () {
  clearTimeout(this.polling);
  this.polling = null;
};

function poller(reader) {
  return new ("onselectionchange" in document ? SelectionChangePoller : TimeoutPoller)(reader)
}

function selectionToDOM(view, takeFocus) {
  var sel = view.state.selection;
  syncNodeSelection(view, sel);

  if (!view.hasFocus()) {
    if (!takeFocus) { return }
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=921444
    if (result.gecko && view.editable) {
      view.selectionReader.ignoreUpdates = true;
      view.dom.focus();
      view.selectionReader.ignoreUpdates = false;
    }
  }

  var reader = view.selectionReader;
  if (reader.lastSelection && reader.lastSelection.eq(sel) && !reader.domChanged()) { return }

  reader.ignoreUpdates = true;

  if (view.cursorWrapper) {
    selectCursorWrapper(view);
  } else {
    var anchor = sel.anchor;
    var head = sel.head;
    var resetEditableFrom, resetEditableTo;
    if (result.webkit && !(sel instanceof prosemirrorState.TextSelection)) {
      if (!sel.$from.parent.inlineContent)
        { resetEditableFrom = temporarilyEditableNear(view, sel.from); }
      if (!sel.empty && !sel.$from.parent.inlineContent)
        { resetEditableTo = temporarilyEditableNear(view, sel.to); }
    }
    view.docView.setSelection(anchor, head, view.root);
    if (result.webkit) {
      if (resetEditableFrom) { resetEditableFrom.contentEditable = "false"; }
      if (resetEditableTo) { resetEditableTo.contentEditable = "false"; }
    }
    if (sel.visible) {
      view.dom.classList.remove("ProseMirror-hideselection");
    } else if (anchor != head) {
      view.dom.classList.add("ProseMirror-hideselection");
      if ("onselectionchange" in document) { removeClassOnSelectionChange(view); }
    }
  }

  reader.storeDOMState(sel);
  reader.ignoreUpdates = false;
}

// Kludge to work around Webkit not allowing a selection to start/end
// between non-editable block nodes. We briefly make something
// editable, set the selection, then set it uneditable again.
function temporarilyEditableNear(view, pos) {
  var ref = view.docView.domFromPos(pos);
  var node = ref.node;
  var offset = ref.offset;
  var after = offset < node.childNodes.length ? node.childNodes[offset] : null;
  var before = offset ? node.childNodes[offset - 1] : null;
  if ((!after || after.contentEditable == "false") && (!before || before.contentEditable == "false")) {
    if (after) {
      after.contentEditable = "true";
      return after
    } else if (before) {
      before.contentEditable = "true";
      return before
    }
  }
}

function removeClassOnSelectionChange(view) {
  var doc = view.dom.ownerDocument;
  doc.removeEventListener("selectionchange", view.hideSelectionGuard);
  var domSel = view.root.getSelection();
  var node = domSel.anchorNode, offset = domSel.anchorOffset;
  doc.addEventListener("selectionchange", view.hideSelectionGuard = function () {
    if (domSel.anchorNode != node || domSel.anchorOffset != offset) {
      doc.removeEventListener("selectionchange", view.hideSelectionGuard);
      view.dom.classList.remove("ProseMirror-hideselection");
    }
  });
}

function selectCursorWrapper(view) {
  var domSel = view.root.getSelection(), range = document.createRange();
  var node = view.cursorWrapper.type.widget;
  range.setEnd(node, node.childNodes.length);
  range.collapse(false);
  domSel.removeAllRanges();
  domSel.addRange(range);
  // Kludge to kill 'control selection' in IE11 when selecting an
  // invisible cursor wrapper, since that would result in those weird
  // resize handles and a selection that considers the absolutely
  // positioned wrapper, rather than the root editable node, the
  // focused element.
  if (!view.state.selection.visible && result.ie && result.ie_version <= 11) {
    node.disabled = true;
    node.disabled = false;
  }
}

function syncNodeSelection(view, sel) {
  if (sel instanceof prosemirrorState.NodeSelection) {
    var desc = view.docView.descAt(sel.from);
    if (desc != view.lastSelectedViewDesc) {
      clearNodeSelection(view);
      if (desc) { desc.selectNode(); }
      view.lastSelectedViewDesc = desc;
    }
  } else {
    clearNodeSelection(view);
  }
}

// Clear all DOM statefulness of the last node selection.
function clearNodeSelection(view) {
  if (view.lastSelectedViewDesc) {
    view.lastSelectedViewDesc.deselectNode();
    view.lastSelectedViewDesc = null;
  }
}

function selectionBetween(view, $anchor, $head, bias) {
  return view.someProp("createSelectionBetween", function (f) { return f(view, $anchor, $head); })
    || prosemirrorState.TextSelection.between($anchor, $head, bias)
}

function hasFocusAndSelection(view) {
  if (view.editable && view.root.activeElement != view.dom) { return false }
  var sel = view.root.getSelection();
  if (!sel.anchorNode) { return false }
  try {
    // Firefox will raise 'permission denied' errors when accessing
    // properties of `sel.anchorNode` when it's in a generated CSS
    // element.
    return view.dom.contains(sel.anchorNode.nodeType == 3 ? sel.anchorNode.parentNode : sel.anchorNode)
  } catch(_) {
    return false
  }
}

var DOMChange = function DOMChange(view, composing) {
  var this$1 = this;

  this.view = view;
  this.state = view.state;
  this.composing = composing;
  this.from = this.to = null;
  this.typeOver = false;
  this.timeout = composing ? null : setTimeout(function () { return this$1.finish(); }, DOMChange.commitTimeout);
  this.trackMappings = new TrackMappings(view.state);

  // If there have been changes since this DOM update started, we must
  // map our start and end positions, as well as the new selection
  // positions, through them. This tracks that mapping.
  this.mapping = new prosemirrorTransform.Mapping;
  this.mappingTo = view.state;
};

DOMChange.prototype.addRange = function addRange (from, to) {
  if (this.from == null) {
    this.from = from;
    this.to = to;
  } else {
    this.from = Math.min(from, this.from);
    this.to = Math.max(to, this.to);
  }
};

DOMChange.prototype.changedRange = function changedRange () {
  if (this.from == null) { return rangeAroundSelection(this.state.selection) }
  var $from = this.state.doc.resolve(Math.min(this.from, this.state.selection.from)), $to = this.state.doc.resolve(this.to);
  var shared = $from.sharedDepth(this.to);
  return {from: $from.before(shared + 1), to: $to.after(shared + 1)}
};

DOMChange.prototype.markDirty = function markDirty (range) {
  if (this.from == null) { this.view.docView.markDirty((range = range || this.changedRange()).from, range.to); }
  else { this.view.docView.markDirty(this.from, this.to); }
};

DOMChange.prototype.stateUpdated = function stateUpdated (state) {
  if (this.trackMappings.getMapping(state, this.mapping)) {
    this.trackMappings.destroy();
    this.trackMappings = new TrackMappings(state);
    this.mappingTo = state;
    return true
  } else {
    this.markDirty();
    this.destroy();
    return false
  }
};

DOMChange.prototype.finish = function finish (force) {
  clearTimeout(this.timeout);
  if (this.composing && !force) { return }
  this.view.domObserver.flush();
  var range = this.changedRange();
  this.markDirty(range);

  this.destroy();
  var sel = this.state.selection, allowTypeOver = this.typeOver && sel instanceof prosemirrorState.TextSelection &&
      !sel.empty && sel.$head.sameParent(sel.$anchor);
  readDOMChange(this.view, this.mapping, this.state, range, allowTypeOver);

  // If the reading didn't result in a view update, force one by
  // resetting the view to its current state.
  if (this.view.docView.dirty) { this.view.updateState(this.view.state); }
};

DOMChange.prototype.destroy = function destroy () {
  clearTimeout(this.timeout);
  this.trackMappings.destroy();
  this.view.inDOMChange = null;
};

DOMChange.prototype.compositionEnd = function compositionEnd () {
    var this$1 = this;

  if (this.composing) {
    this.composing = false;
    this.timeout = setTimeout(function () { return this$1.finish(); }, 50);
  }
};

DOMChange.start = function start (view, composing) {
  if (view.inDOMChange) {
    if (composing) {
      clearTimeout(view.inDOMChange.timeout);
      view.inDOMChange.composing = true;
    }
  } else {
    view.inDOMChange = new DOMChange(view, composing);
  }
  return view.inDOMChange
};
DOMChange.commitTimeout = 20;

// Note that all referencing and parsing is done with the
// start-of-operation selection and document, since that's the one
// that the DOM represents. If any changes came in in the meantime,
// the modification is mapped over those before it is applied, in
// readDOMChange.

function parseBetween(view, oldState, range) {
  var ref = view.docView.parseRange(range.from, range.to);
  var parent = ref.node;
  var fromOffset = ref.fromOffset;
  var toOffset = ref.toOffset;
  var from = ref.from;
  var to = ref.to;

  var domSel = view.root.getSelection(), find = null, anchor = domSel.anchorNode;
  if (anchor && view.dom.contains(anchor.nodeType == 1 ? anchor : anchor.parentNode)) {
    find = [{node: anchor, offset: domSel.anchorOffset}];
    if (!selectionCollapsed(domSel))
      { find.push({node: domSel.focusNode, offset: domSel.focusOffset}); }
  }
  var startDoc = oldState.doc;
  var parser = view.someProp("domParser") || prosemirrorModel.DOMParser.fromSchema(view.state.schema);
  var $from = startDoc.resolve(from);
  var sel = null, doc = parser.parse(parent, {
    topNode: $from.parent,
    topMatch: $from.parent.contentMatchAt($from.index()),
    topOpen: true,
    from: fromOffset,
    to: toOffset,
    preserveWhitespace: $from.parent.type.spec.code ? "full" : true,
    editableContent: true,
    findPositions: find,
    ruleFromNode: ruleFromNode,
    context: $from
  });
  if (find && find[0].pos != null) {
    var anchor$1 = find[0].pos, head = find[1] && find[1].pos;
    if (head == null) { head = anchor$1; }
    sel = {anchor: anchor$1 + from, head: head + from};
  }
  return {doc: doc, sel: sel, from: from, to: to}
}

function ruleFromNode(dom) {
  var desc = dom.pmViewDesc;
  if (desc) { return desc.parseRule() }
  else if (dom.nodeName == "BR" && dom.parentNode && dom.parentNode.lastChild == dom) { return {ignore: true} }
}

function isAtEnd($pos, depth) {
  for (var i = depth || 0; i < $pos.depth; i++)
    { if ($pos.index(i) + 1 < $pos.node(i).childCount) { return false } }
  return $pos.parentOffset == $pos.parent.content.size
}
function isAtStart($pos, depth) {
  for (var i = depth || 0; i < $pos.depth; i++)
    { if ($pos.index(0) > 0) { return false } }
  return $pos.parentOffset == 0
}

function rangeAroundSelection(selection) {
  // Intentionally uses $head/$anchor because those will correspond to the DOM selection
  var $from = selection.$anchor.min(selection.$head), $to = selection.$anchor.max(selection.$head);

  if ($from.sameParent($to) && $from.parent.inlineContent && $from.parentOffset && $to.parentOffset < $to.parent.content.size) {
    var startOff = Math.max(0, $from.parentOffset);
    var size = $from.parent.content.size;
    var endOff = Math.min(size, $to.parentOffset);

    if (startOff > 0)
      { startOff = $from.parent.childBefore(startOff).offset; }
    if (endOff < size) {
      var after = $from.parent.childAfter(endOff);
      endOff = after.offset + after.node.nodeSize;
    }
    var nodeStart = $from.start();
    return {from: nodeStart + startOff, to: nodeStart + endOff}
  } else {
    for (var depth = 0;; depth++) {
      var fromStart = isAtStart($from, depth + 1), toEnd = isAtEnd($to, depth + 1);
      if (fromStart || toEnd || $from.index(depth) != $to.index(depth) || $to.node(depth).isTextblock) {
        var from = $from.before(depth + 1), to = $to.after(depth + 1);
        if (fromStart && $from.index(depth) > 0)
          { from -= $from.node(depth).child($from.index(depth) - 1).nodeSize; }
        if (toEnd && $to.index(depth) + 1 < $to.node(depth).childCount)
          { to += $to.node(depth).child($to.index(depth) + 1).nodeSize; }
        return {from: from, to: to}
      }
    }
  }
}

function keyEvent(keyCode, key) {
  var event = document.createEvent("Event");
  event.initEvent("keydown", true, true);
  event.keyCode = keyCode;
  event.key = event.code = key;
  return event
}

function readDOMChange(view, mapping, oldState, range, allowTypeOver) {
  var parse = parseBetween(view, oldState, range);

  var doc = oldState.doc, compare = doc.slice(parse.from, parse.to);
  var change = findDiff(compare.content, parse.doc.content, parse.from, oldState.selection.from);

  if (!change) {
    if (allowTypeOver) {
      var state = view.state, sel = state.selection;
      view.dispatch(state.tr.replaceSelectionWith(state.schema.text(state.doc.textBetween(sel.from, sel.to)), true).scrollIntoView());
    } else if (parse.sel) {
      var sel$1 = resolveSelection(view, view.state.doc, mapping, parse.sel);
      if (sel$1 && !sel$1.eq(view.state.selection)) { view.dispatch(view.state.tr.setSelection(sel$1)); }
    }
    return
  }

  var $from = parse.doc.resolveNoCache(change.start - parse.from);
  var $to = parse.doc.resolveNoCache(change.endB - parse.from);
  var nextSel;
  // If this looks like the effect of pressing Enter, just dispatch an
  // Enter key instead.
  if (!$from.sameParent($to) && $from.pos < parse.doc.content.size &&
      (nextSel = prosemirrorState.Selection.findFrom(parse.doc.resolve($from.pos + 1), 1, true)) &&
      nextSel.head == $to.pos &&
      view.someProp("handleKeyDown", function (f) { return f(view, keyEvent(13, "Enter")); }))
    { return }
  // Same for backspace
  if (oldState.selection.anchor > change.start &&
      looksLikeJoin(doc, change.start, change.endA, $from, $to) &&
      view.someProp("handleKeyDown", function (f) { return f(view, keyEvent(8, "Backspace")); }))
    { return }

  var from = mapping.map(change.start), to = mapping.map(change.endA, -1);

  var tr, storedMarks, markChange, $from1;
  if ($from.sameParent($to) && $from.parent.inlineContent) {
    if ($from.pos == $to.pos) { // Deletion
      tr = view.state.tr.delete(from, to);
      storedMarks = doc.resolve(change.start).marksAcross(doc.resolve(change.endA));
    } else if ( // Adding or removing a mark
      change.endA == change.endB && ($from1 = doc.resolve(change.start)) &&
      (markChange = isMarkChange($from.parent.content.cut($from.parentOffset, $to.parentOffset),
                                 $from1.parent.content.cut($from1.parentOffset, change.endA - $from1.start())))
    ) {
      tr = view.state.tr;
      if (markChange.type == "add") { tr.addMark(from, to, markChange.mark); }
      else { tr.removeMark(from, to, markChange.mark); }
    } else if ($from.parent.child($from.index()).isText && $from.index() == $to.index() - ($to.textOffset ? 0 : 1)) {
      // Both positions in the same text node -- simply insert text
      var text = $from.parent.textBetween($from.parentOffset, $to.parentOffset);
      if (view.someProp("handleTextInput", function (f) { return f(view, from, to, text); })) { return }
      tr = view.state.tr.insertText(text, from, to);
    }
  }

  if (!tr)
    { tr = view.state.tr.replace(from, to, parse.doc.slice(change.start - parse.from, change.endB - parse.from)); }
  if (parse.sel) {
    var sel$2 = resolveSelection(view, tr.doc, mapping, parse.sel);
    if (sel$2) { tr.setSelection(sel$2); }
  }
  if (storedMarks) { tr.ensureMarks(storedMarks); }
  view.dispatch(tr.scrollIntoView());
}

function resolveSelection(view, doc, mapping, parsedSel) {
  if (Math.max(parsedSel.anchor, parsedSel.head) > doc.content.size) { return null }
  return selectionBetween(view, doc.resolve(mapping.map(parsedSel.anchor)),
                          doc.resolve(mapping.map(parsedSel.head)))
}

// : (Fragment, Fragment) → ?{mark: Mark, type: string}
// Given two same-length, non-empty fragments of inline content,
// determine whether the first could be created from the second by
// removing or adding a single mark type.
function isMarkChange(cur, prev) {
  var curMarks = cur.firstChild.marks, prevMarks = prev.firstChild.marks;
  var added = curMarks, removed = prevMarks, type, mark, update;
  for (var i = 0; i < prevMarks.length; i++) { added = prevMarks[i].removeFromSet(added); }
  for (var i$1 = 0; i$1 < curMarks.length; i$1++) { removed = curMarks[i$1].removeFromSet(removed); }
  if (added.length == 1 && removed.length == 0) {
    mark = added[0];
    type = "add";
    update = function (node) { return node.mark(mark.addToSet(node.marks)); };
  } else if (added.length == 0 && removed.length == 1) {
    mark = removed[0];
    type = "remove";
    update = function (node) { return node.mark(mark.removeFromSet(node.marks)); };
  } else {
    return null
  }
  var updated = [];
  for (var i$2 = 0; i$2 < prev.childCount; i$2++) { updated.push(update(prev.child(i$2))); }
  if (prosemirrorModel.Fragment.from(updated).eq(cur)) { return {mark: mark, type: type} }
}

function looksLikeJoin(old, start, end, $newStart, $newEnd) {
  if (!$newStart.parent.isTextblock ||
      // The content must have shrunk
      end - start <= $newEnd.pos - $newStart.pos ||
      // newEnd must point directly at or after the end of the block that newStart points into
      skipClosingAndOpening($newStart, true, false) < $newEnd.pos)
    { return false }

  var $start = old.resolve(start);
  // Start must be at the end of a block
  if ($start.parentOffset < $start.parent.content.size || !$start.parent.isTextblock)
    { return false }
  var $next = old.resolve(skipClosingAndOpening($start, true, true));
  // The next textblock must start before end and end near it
  if (!$next.parent.isTextblock || $next.pos > end ||
      skipClosingAndOpening($next, true, false) < end)
    { return false }

  // The fragments after the join point must match
  return $newStart.parent.content.cut($newStart.parentOffset).eq($next.parent.content)
}

function skipClosingAndOpening($pos, fromEnd, mayOpen) {
  var depth = $pos.depth, end = fromEnd ? $pos.end() : $pos.pos;
  while (depth > 0 && (fromEnd || $pos.indexAfter(depth) == $pos.node(depth).childCount)) {
    depth--;
    end++;
    fromEnd = false;
  }
  if (mayOpen) {
    var next = $pos.node(depth).maybeChild($pos.indexAfter(depth));
    while (next && !next.isLeaf) {
      next = next.firstChild;
      end++;
    }
  }
  return end
}

function findDiff(a, b, pos, preferedStart) {
  var start = a.findDiffStart(b, pos);
  if (start == null) { return null }
  var ref = a.findDiffEnd(b, pos + a.size, pos + b.size);
  var endA = ref.a;
  var endB = ref.b;
  if (endA < start && a.size < b.size) {
    var move = preferedStart <= start && preferedStart >= endA ? start - preferedStart : 0;
    start -= move;
    endB = start + (endB - endA);
    endA = start;
  } else if (endB < start) {
    var move$1 = preferedStart <= start && preferedStart >= endB ? start - preferedStart : 0;
    start -= move$1;
    endA = start + (endA - endB);
    endB = start;
  }
  return {start: start, endA: endA, endB: endB}
}

function serializeForClipboard(view, slice) {
  var context = [];
  var content = slice.content;
  var openStart = slice.openStart;
  var openEnd = slice.openEnd;
  while (openStart > 1 && openEnd > 1 && content.childCount == 1 && content.firstChild.childCount == 1) {
    openStart--;
    openEnd--;
    var node = content.firstChild;
    context.push(node.type.name, node.type.hasRequiredAttrs() ? node.attrs : null);
    content = node.content;
  }

  var serializer = view.someProp("clipboardSerializer") || prosemirrorModel.DOMSerializer.fromSchema(view.state.schema);
  var wrap = document.createElement("div");
  wrap.appendChild(serializer.serializeFragment(content));

  var firstChild = wrap.firstChild, needsWrap;
  while (firstChild && firstChild.nodeType == 1 && (needsWrap = wrapMap[firstChild.nodeName.toLowerCase()])) {
    for (var i = needsWrap.length - 1; i >= 0; i--) {
      var wrapper = document.createElement(needsWrap[i]);
      while (wrap.firstChild) { wrapper.appendChild(wrap.firstChild); }
      wrap.appendChild(wrapper);
    }
    firstChild = wrap.firstChild;
  }

  if (firstChild && firstChild.nodeType == 1) {
    var singleNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1 && !slice.content.firstChild.isText;
    firstChild.setAttribute("data-pm-context", singleNode ? "none" : JSON.stringify(context));
  }

  var text = view.someProp("clipboardTextSerializer", function (f) { return f(slice); }) ||
      slice.content.textBetween(0, slice.content.size, "\n\n");

  return {dom: wrap, text: text}
}

// : (EditorView, string, string, ?bool, ResolvedPos) → ?Slice
// Read a slice of content from the clipboard (or drop data).
function parseFromClipboard(view, text, html, plainText, $context) {
  var dom, inCode = $context.parent.type.spec.code, slice;
  if (!html && !text) { return null }
  if ((plainText || inCode || !html) && text) {
    view.someProp("transformPastedText", function (f) { text = f(text); });
    if (inCode) { return new prosemirrorModel.Slice(prosemirrorModel.Fragment.from(view.state.schema.text(text)), 0, 0) }
    var parsed = view.someProp("clipboardTextParser", function (f) { return f(text, $context); });
    if (parsed) {
      slice = parsed;
    } else {
      dom = document.createElement("div");
      text.trim().split(/(?:\r\n?|\n)+/).forEach(function (block) {
        dom.appendChild(document.createElement("p")).textContent = block;
      });
    }
  } else {
    view.someProp("transformPastedHTML", function (f) { return html = f(html); });
    dom = readHTML(html);
  }

  if (!slice) {
    var parser = view.someProp("clipboardParser") || view.someProp("domParser") || prosemirrorModel.DOMParser.fromSchema(view.state.schema);
    slice = parser.parseSlice(dom, {preserveWhitespace: true, context: $context});
  }
  slice = closeIsolatingStart(slice);
  var contextNode = dom && dom.querySelector("[data-pm-context]");
  var context = contextNode && contextNode.getAttribute("data-pm-context");
  if (context == "none")
    { slice = new prosemirrorModel.Slice(slice.content, 0, 0); }
  else if (context)
    { slice = addContext(slice, context); }
  else // HTML wasn't created by ProseMirror. Make sure top-level siblings are coherent
    { slice = normalizeSiblings(slice, $context); }
  view.someProp("transformPasted", function (f) { slice = f(slice); });
  return slice
}

// Takes a slice parsed with parseSlice, which means there hasn't been
// any content-expression checking done on the top nodes, tries to
// find a parent node in the current context that might fit the nodes,
// and if successful, rebuilds the slice so that it fits into that parent.
//
// This addresses the problem that Transform.replace expects a
// coherent slice, and will fail to place a set of siblings that don't
// fit anywhere in the schema.
function normalizeSiblings(slice, $context) {
  if (slice.content.childCount < 2) { return slice }
  var loop = function ( d ) {
    var parent = $context.node(d);
    var match = parent.contentMatchAt($context.index(d));
    var lastWrap = (void 0), result = [];
    slice.content.forEach(function (node) {
      if (!result) { return }
      var wrap = match.findWrapping(node.type), inLast;
      if (!wrap) { return result = null }
      if (inLast = result.length && lastWrap.length && addToSibling(wrap, lastWrap, node, result[result.length - 1], 0)) {
        result[result.length - 1] = inLast;
      } else {
        if (result.length) { result[result.length - 1] = closeRight(result[result.length - 1], lastWrap.length); }
        var wrapped = withWrappers(node, wrap);
        result.push(wrapped);
        match = match.matchType(wrapped.type, wrapped.attrs);
        lastWrap = wrap;
      }
    });
    if (result) { return { v: prosemirrorModel.Slice.maxOpen(prosemirrorModel.Fragment.from(result)) } }
  };

  for (var d = $context.depth; d >= 0; d--) {
    var returned = loop( d );

    if ( returned ) return returned.v;
  }
  return slice
}

function withWrappers(node, wrap, from) {
  if ( from === void 0 ) from = 0;

  for (var i = wrap.length - 1; i >= from; i--)
    { node = wrap[i].create(null, prosemirrorModel.Fragment.from(node)); }
  return node
}

// Used to group adjacent nodes wrapped in similar parents by
// normalizeSiblings into the same parent node
function addToSibling(wrap, lastWrap, node, sibling, depth) {
  if (depth < wrap.length && depth < lastWrap.length && wrap[depth] == lastWrap[depth]) {
    var inner = addToSibling(wrap, lastWrap, node, sibling.lastChild, depth + 1);
    if (inner) { return sibling.copy(sibling.content.replaceChild(sibling.childCount - 1, inner)) }
    var match = sibling.contentMatchAt(sibling.childCount);
    if (match.matchType(depth == wrap.length - 1 ? node.type : wrap[depth + 1]))
      { return sibling.copy(sibling.content.append(prosemirrorModel.Fragment.from(withWrappers(node, wrap, depth + 1)))) }
  }
}

function closeRight(node, depth) {
  if (depth == 0) { return node }
  var fragment = node.content.replaceChild(node.childCount - 1, closeRight(node.lastChild, depth - 1));
  var fill = node.contentMatchAt(node.childCount).fillBefore(prosemirrorModel.Fragment.empty, true);
  return node.copy(fragment.append(fill))
}

// Trick from jQuery -- some elements must be wrapped in other
// elements for innerHTML to work. I.e. if you do `div.innerHTML =
// "<td>..</td>"` the table cells are ignored.
var wrapMap = {thead: ["table"], colgroup: ["table"], col: ["table", "colgroup"],
                 tr: ["table", "tbody"], td: ["table", "tbody", "tr"], th: ["table", "tbody", "tr"]};
var detachedDoc = null;
function readHTML(html) {
  var metas = /(\s*<meta [^>]*>)*/.exec(html);
  if (metas) { html = html.slice(metas[0].length); }
  var doc = detachedDoc || (detachedDoc = document.implementation.createHTMLDocument("title"));
  var elt = doc.createElement("div");
  var firstTag = /(?:<meta [^>]*>)*<([a-z][^>\s]+)/i.exec(html), wrap, depth = 0;
  if (wrap = firstTag && wrapMap[firstTag[1].toLowerCase()]) {
    html = wrap.map(function (n) { return "<" + n + ">"; }).join("") + html + wrap.map(function (n) { return "</" + n + ">"; }).reverse().join("");
    depth = wrap.length;
  }
  elt.innerHTML = html;
  for (var i = 0; i < depth; i++) { elt = elt.firstChild; }
  return elt
}

function addContext(slice, context) {
  if (!slice.size) { return slice }
  var schema = slice.content.firstChild.type.schema, array;
  try { array = JSON.parse(context); }
  catch(e) { return slice }
  var content = slice.content;
  var openStart = slice.openStart;
  var openEnd = slice.openEnd;
  for (var i = array.length - 2; i >= 0; i -= 2) {
    var type = schema.nodes[array[i]];
    if (!type || type.hasRequiredAttrs()) { break }
    content = prosemirrorModel.Fragment.from(type.create(array[i + 1], content));
    openStart++; openEnd++;
  }
  return new prosemirrorModel.Slice(content, openStart, openEnd)
}

function closeIsolatingStart(slice) {
  var closeTo = 0, frag = slice.content;
  for (var i = 1; i <= slice.openStart; i++) {
    var node = frag.firstChild;
    if (node.type.spec.isolating) { closeTo = i; break }
    frag = node.content;
  }

  if (closeTo == 0) { return slice }
  return new prosemirrorModel.Slice(closeFragment(slice.content, closeTo, slice.openEnd), slice.openStart - closeTo, slice.openEnd)
}

function closeFragment(frag, n, openEnd) {
  if (n == 0) { return frag }
  var node = frag.firstChild;
  var content = closeFragment(node.content, n - 1, openEnd - 1);
  var fill = node.contentMatchAt(0).fillBefore(node.content, openEnd <= 0);
  return frag.replaceChild(0, node.copy(fill.append(content)))
}

var observeOptions = {childList: true, characterData: true, attributes: true, subtree: true, characterDataOldValue: true};
// IE11 has very broken mutation observers, so we also listen to DOMCharacterDataModified
var useCharData = result.ie && result.ie_version <= 11;

var DOMObserver = function DOMObserver(view) {
  var this$1 = this;

  this.view = view;
  this.observer = window.MutationObserver &&
    new window.MutationObserver(function (mutations) { return this$1.registerMutations(mutations); });
  if (useCharData)
    { this.onCharData = function (e) { return this$1.registerMutation({target: e.target, type: "characterData", oldValue: e.prevValue}); }; }
};

DOMObserver.prototype.start = function start () {
  if (this.observer)
    { this.observer.observe(this.view.dom, observeOptions); }
  if (useCharData)
    { this.view.dom.addEventListener("DOMCharacterDataModified", this.onCharData); }
};

DOMObserver.prototype.stop = function stop () {
  if (this.observer) {
    this.flush();
    this.observer.disconnect();
  }
  if (useCharData)
    { this.view.dom.removeEventListener("DOMCharacterDataModified", this.onCharData); }
};

DOMObserver.prototype.flush = function flush () {
  if (this.observer)
    { this.registerMutations(this.observer.takeRecords()); }
};

DOMObserver.prototype.registerMutations = function registerMutations (mutations) {
    var this$1 = this;

  for (var i = 0; i < mutations.length; i++)
    { this$1.registerMutation(mutations[i]); }
};

DOMObserver.prototype.registerMutation = function registerMutation (mut) {
  if (!this.view.editable) { return }
  var desc = this.view.docView.nearestDesc(mut.target);
  if (mut.type == "attributes" &&
      (desc == this.view.docView || mut.attributeName == "contenteditable")) { return }
  if (!desc || desc.ignoreMutation(mut)) { return }

  var from, to;
  if (mut.type == "childList") {
    var fromOffset = mut.previousSibling && mut.previousSibling.parentNode == mut.target
        ? domIndex(mut.previousSibling) + 1 : 0;
    if (fromOffset == -1) { return }
    from = desc.localPosFromDOM(mut.target, fromOffset, -1);
    var toOffset = mut.nextSibling && mut.nextSibling.parentNode == mut.target
        ? domIndex(mut.nextSibling) : mut.target.childNodes.length;
    if (toOffset == -1) { return }
    to = desc.localPosFromDOM(mut.target, toOffset, 1);
  } else if (mut.type == "attributes") {
    from = desc.posAtStart - desc.border;
    to = desc.posAtEnd + desc.border;
  } else { // "characterData"
    from = desc.posAtStart;
    to = desc.posAtEnd;
    // An event was generated for a text change that didn't change
    // any text. Mark the dom change to fall back to assuming the
    // selection was typed over with an identical value if it can't
    // find another change.
    if (mut.target.nodeValue == mut.oldValue) { DOMChange.start(this.view).typeOver = true; }
  }

  DOMChange.start(this.view).addRange(from, to);
};

// A collection of DOM events that occur within the editor, and callback functions
// to invoke when the event fires.
var handlers = {};
var editHandlers = {};

function initInput(view) {
  view.shiftKey = false;
  view.mouseDown = null;
  view.dragging = null;
  view.inDOMChange = null;
  view.domObserver = new DOMObserver(view);
  view.domObserver.start();

  view.eventHandlers = Object.create(null);
  var loop = function ( event ) {
    var handler = handlers[event];
    view.dom.addEventListener(event, view.eventHandlers[event] = function (event) {
      if (eventBelongsToView(view, event) && !runCustomHandler(view, event) &&
          (view.editable || !(event.type in editHandlers)))
        { handler(view, event); }
    });
  };

  for (var event in handlers) loop( event );
  ensureListeners(view);
}

function destroyInput(view) {
  view.domObserver.stop();
  if (view.inDOMChange) { view.inDOMChange.destroy(); }
  for (var type in view.eventHandlers)
    { view.dom.removeEventListener(type, view.eventHandlers[type]); }
}

function ensureListeners(view) {
  view.someProp("handleDOMEvents", function (currentHandlers) {
    for (var type in currentHandlers) { if (!view.eventHandlers[type])
      { view.dom.addEventListener(type, view.eventHandlers[type] = function (event) { return runCustomHandler(view, event); }); } }
  });
}

function runCustomHandler(view, event) {
  return view.someProp("handleDOMEvents", function (handlers) {
    var handler = handlers[event.type];
    return handler ? handler(view, event) || event.defaultPrevented : false
  })
}

function eventBelongsToView(view, event) {
  if (!event.bubbles) { return true }
  if (event.defaultPrevented) { return false }
  for (var node = event.target; node != view.dom; node = node.parentNode)
    { if (!node || node.nodeType == 11 ||
        (node.pmViewDesc && node.pmViewDesc.stopEvent(event)))
      { return false } }
  return true
}

function dispatchEvent(view, event) {
  if (!runCustomHandler(view, event) && handlers[event.type] &&
      (view.editable || !(event.type in editHandlers)))
    { handlers[event.type](view, event); }
}

editHandlers.keydown = function (view, event) {
  if (event.keyCode == 16) { view.shiftKey = true; }
  if (view.inDOMChange) { return }
  if (view.someProp("handleKeyDown", function (f) { return f(view, event); }) || captureKeyDown(view, event))
    { event.preventDefault(); }
  else
    { view.selectionReader.poll(); }
};

editHandlers.keyup = function (view, e) {
  if (e.keyCode == 16) { view.shiftKey = false; }
};

editHandlers.keypress = function (view, event) {
  if (view.inDOMChange || !event.charCode ||
      event.ctrlKey && !event.altKey || result.mac && event.metaKey) { return }

  if (view.someProp("handleKeyPress", function (f) { return f(view, event); })) {
    event.preventDefault();
    return
  }

  var sel = view.state.selection;
  if (!(sel instanceof prosemirrorState.TextSelection) || !sel.$from.sameParent(sel.$to)) {
    var text = String.fromCharCode(event.charCode);
    if (!view.someProp("handleTextInput", function (f) { return f(view, sel.$from.pos, sel.$to.pos, text); }))
      { view.dispatch(view.state.tr.insertText(text).scrollIntoView()); }
    event.preventDefault();
  }
};

function eventCoords(event) { return {left: event.clientX, top: event.clientY} }

var lastClick = {time: 0, x: 0, y: 0};
var oneButLastClick = lastClick;

function isNear(event, click) {
  var dx = click.x - event.clientX, dy = click.y - event.clientY;
  return dx * dx + dy * dy < 100
}

function runHandlerOnContext(view, propName, pos, inside, event) {
  if (inside == -1) { return false }
  var $pos = view.state.doc.resolve(inside);
  var loop = function ( i ) {
    if (view.someProp(propName, function (f) { return i > $pos.depth ? f(view, pos, $pos.nodeAfter, $pos.before(i), event, true)
                                                    : f(view, pos, $pos.node(i), $pos.before(i), event, false); }))
      { return { v: true } }
  };

  for (var i = $pos.depth + 1; i > 0; i--) {
    var returned = loop( i );

    if ( returned ) return returned.v;
  }
  return false
}

function updateSelection(view, selection, origin) {
  if (!view.focused) { view.focus(); }
  var tr = view.state.tr.setSelection(selection);
  if (origin == "pointer") { tr.setMeta("pointer", true); }
  view.dispatch(tr);
}

function selectClickedLeaf(view, inside) {
  if (inside == -1) { return false }
  var $pos = view.state.doc.resolve(inside), node = $pos.nodeAfter;
  if (node && node.isAtom && prosemirrorState.NodeSelection.isSelectable(node)) {
    updateSelection(view, new prosemirrorState.NodeSelection($pos), "pointer");
    return true
  }
  return false
}

function selectClickedNode(view, inside) {
  if (inside == -1) { return false }
  var sel = view.state.selection, selectedNode, selectAt;
  if (sel instanceof prosemirrorState.NodeSelection) { selectedNode = sel.node; }

  var $pos = view.state.doc.resolve(inside);
  for (var i = $pos.depth + 1; i > 0; i--) {
    var node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
    if (prosemirrorState.NodeSelection.isSelectable(node)) {
      if (selectedNode && sel.$from.depth > 0 &&
          i >= sel.$from.depth && $pos.before(sel.$from.depth + 1) == sel.$from.pos)
        { selectAt = $pos.before(sel.$from.depth); }
      else
        { selectAt = $pos.before(i); }
      break
    }
  }

  if (selectAt != null) {
    updateSelection(view, prosemirrorState.NodeSelection.create(view.state.doc, selectAt), "pointer");
    return true
  } else {
    return false
  }
}

function handleSingleClick(view, pos, inside, event, selectNode) {
  return runHandlerOnContext(view, "handleClickOn", pos, inside, event) ||
    view.someProp("handleClick", function (f) { return f(view, pos, event); }) ||
    (selectNode ? selectClickedNode(view, inside) : selectClickedLeaf(view, inside))
}

function handleDoubleClick(view, pos, inside, event) {
  return runHandlerOnContext(view, "handleDoubleClickOn", pos, inside, event) ||
    view.someProp("handleDoubleClick", function (f) { return f(view, pos, event); })
}

function handleTripleClick(view, pos, inside, event) {
  return runHandlerOnContext(view, "handleTripleClickOn", pos, inside, event) ||
    view.someProp("handleTripleClick", function (f) { return f(view, pos, event); }) ||
    defaultTripleClick(view, inside)
}

function defaultTripleClick(view, inside) {
  var doc = view.state.doc;
  if (inside == -1) {
    if (doc.inlineContent) {
      updateSelection(view, prosemirrorState.TextSelection.create(doc, 0, doc.content.size), "pointer");
      return true
    }
    return false
  }

  var $pos = doc.resolve(inside);
  for (var i = $pos.depth + 1; i > 0; i--) {
    var node = i > $pos.depth ? $pos.nodeAfter : $pos.node(i);
    var nodePos = $pos.before(i);
    if (node.inlineContent)
      { updateSelection(view, prosemirrorState.TextSelection.create(doc, nodePos + 1, nodePos + 1 + node.content.size), "pointer"); }
    else if (prosemirrorState.NodeSelection.isSelectable(node))
      { updateSelection(view, prosemirrorState.NodeSelection.create(doc, nodePos), "pointer"); }
    else
      { continue }
    return true
  }
}

function forceDOMFlush(view) {
  if (!view.inDOMChange) { return false }
  view.inDOMChange.finish(true);
  return true
}

var selectNodeModifier = result.mac ? "metaKey" : "ctrlKey";

handlers.mousedown = function (view, event) {
  var flushed = forceDOMFlush(view);
  var now = Date.now(), type;
  if (now - lastClick.time >= 500 || !isNear(event, lastClick) || event[selectNodeModifier]) { type = "singleClick"; }
  else if (now - oneButLastClick.time >= 600 || !isNear(event, oneButLastClick)) { type = "doubleClick"; }
  else { type = "tripleClick"; }
  oneButLastClick = lastClick;
  lastClick = {time: now, x: event.clientX, y: event.clientY};

  var pos = view.posAtCoords(eventCoords(event));
  if (!pos) { return }

  if (type == "singleClick")
    { view.mouseDown = new MouseDown(view, pos, event, flushed); }
  else if ((type == "doubleClick" ? handleDoubleClick : handleTripleClick)(view, pos.pos, pos.inside, event))
    { event.preventDefault(); }
  else
    { view.selectionReader.poll("pointer"); }
};

var MouseDown = function MouseDown(view, pos, event, flushed) {
  var this$1 = this;

  this.view = view;
  this.pos = pos;
  this.event = event;
  this.flushed = flushed;
  this.selectNode = event[selectNodeModifier];
  this.allowDefault = event.shiftKey;

  var targetNode, targetPos;
  if (pos.inside > -1) {
    targetNode = view.state.doc.nodeAt(pos.inside);
    targetPos = pos.inside;
  } else {
    var $pos = view.state.doc.resolve(pos.pos);
    targetNode = $pos.parent;
    targetPos = $pos.depth ? $pos.before() : 0;
  }

  this.mightDrag = null;
  if (targetNode.type.spec.draggable && targetNode.type.spec.selectable !== false ||
      view.state.selection instanceof prosemirrorState.NodeSelection && targetPos == view.state.selection.from)
    { this.mightDrag = {node: targetNode, pos: targetPos}; }

  this.target = flushed ? null : event.target;
  if (this.target && this.mightDrag) {
    this.view.domObserver.stop();
    this.target.draggable = true;
    if (result.gecko && (this.setContentEditable = !this.target.hasAttribute("contentEditable")))
      { setTimeout(function () { return this$1.target.setAttribute("contentEditable", "false"); }, 20); }
    this.view.domObserver.start();
  }

  view.root.addEventListener("mouseup", this.up = this.up.bind(this));
  view.root.addEventListener("mousemove", this.move = this.move.bind(this));
  view.selectionReader.poll("pointer");
};

MouseDown.prototype.done = function done () {
  this.view.root.removeEventListener("mouseup", this.up);
  this.view.root.removeEventListener("mousemove", this.move);
  if (this.mightDrag && this.target) {
    this.view.domObserver.stop();
    this.target.draggable = false;
    if (result.gecko && this.setContentEditable)
      { this.target.removeAttribute("contentEditable"); }
    this.view.domObserver.start();
  }
};

MouseDown.prototype.up = function up (event) {
  this.done();

  if (!this.view.dom.contains(event.target.nodeType == 3 ? event.target.parentNode : event.target))
    { return }

  if (this.allowDefault) {
    this.view.selectionReader.poll("pointer");
  } else if (handleSingleClick(this.view, this.pos.pos, this.pos.inside, event, this.selectNode)) {
    event.preventDefault();
  } else if (this.flushed) {
    updateSelection(this.view, prosemirrorState.Selection.near(this.view.state.doc.resolve(this.pos.pos)), "pointer");
    event.preventDefault();
  } else {
    this.view.selectionReader.poll("pointer");
  }
};

MouseDown.prototype.move = function move (event) {
  if (!this.allowDefault && (Math.abs(this.event.x - event.clientX) > 4 ||
                             Math.abs(this.event.y - event.clientY) > 4))
    { this.allowDefault = true; }
  this.view.selectionReader.poll("pointer");
};

handlers.touchdown = function (view) {
  forceDOMFlush(view);
  view.selectionReader.poll("pointer");
};

handlers.contextmenu = function (view) { return forceDOMFlush(view); };

// Input compositions are hard. Mostly because the events fired by
// browsers are A) very unpredictable and inconsistent, and B) not
// cancelable.
//
// ProseMirror has the problem that it must not update the DOM during
// a composition, or the browser will cancel it. What it does is keep
// long-running operations (delayed DOM updates) when a composition is
// active.
//
// We _do not_ trust the information in the composition events which,
// apart from being very uninformative to begin with, is often just
// plain wrong. Instead, when a composition ends, we parse the dom
// around the original selection, and derive an update from that.

editHandlers.compositionstart = editHandlers.compositionupdate = function (view) {
  DOMChange.start(view, true);
};

editHandlers.compositionend = function (view, e) {
  if (!view.inDOMChange) {
    // We received a compositionend without having seen any previous
    // events for the composition. If there's data in the event
    // object, we assume that it's a real change, and start a
    // composition. Otherwise, we just ignore it.
    if (e.data) { DOMChange.start(view, true); }
    else { return }
  }

  view.inDOMChange.compositionEnd();
};

editHandlers.input = function (view) {
  var change = DOMChange.start(view);
  if (!change.composing) { change.finish(); }
};

function captureCopy(view, dom) {
  // The extra wrapper is somehow necessary on IE/Edge to prevent the
  // content from being mangled when it is put onto the clipboard
  var doc = dom.ownerDocument;
  var wrap = doc.body.appendChild(doc.createElement("div"));
  wrap.appendChild(dom);
  wrap.style.cssText = "position: fixed; left: -10000px; top: 10px";
  var sel = getSelection(), range = doc.createRange();
  range.selectNodeContents(dom);
  sel.removeAllRanges();
  sel.addRange(range);
  setTimeout(function () {
    doc.body.removeChild(wrap);
    view.focus();
  }, 50);
}

// This is very crude, but unfortunately both these browsers _pretend_
// that they have a clipboard API—all the objects and methods are
// there, they just don't work, and they are hard to test.
// FIXME when Edge/Mobile Safari fixes this, change this to a version
// range test
var brokenClipboardAPI = result.ie || result.ios;

handlers.copy = editHandlers.cut = function (view, e) {
  var sel = view.state.selection, cut = e.type == "cut";
  if (sel.empty) { return }

  // IE and Edge's clipboard interface is completely broken
  var data = brokenClipboardAPI ? null : e.clipboardData;
  var slice = sel.content();
  var ref = serializeForClipboard(view, slice);
  var dom = ref.dom;
  var text = ref.text;
  if (data) {
    e.preventDefault();
    data.clearData();
    data.setData("text/html", dom.innerHTML);
    data.setData("text/plain", text);
  } else {
    captureCopy(view, dom);
  }
  if (cut) { view.dispatch(view.state.tr.deleteSelection().scrollIntoView()); }
};

function sliceSingleNode(slice) {
  return slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1 ? slice.content.firstChild : null
}

function capturePaste(view, e) {
  var doc = view.dom.ownerDocument;
  var plainText = view.shiftKey || view.state.selection.$from.parent.type.spec.code;
  var target = doc.body.appendChild(doc.createElement(plainText ? "textarea" : "div"));
  if (!plainText) { target.contentEditable = "true"; }
  target.style.cssText = "position: fixed; left: -10000px; top: 10px";
  target.focus();
  setTimeout(function () {
    view.focus();
    doc.body.removeChild(target);
    if (plainText) { doPaste(view, target.value, null, e); }
    else { doPaste(view, target.textContent, target.innerHTML, e); }
  }, 50);
}

function doPaste(view, text, html, e) {
  var slice = parseFromClipboard(view, text, html, view.shiftKey, view.state.selection.$from);
  if (!slice) { return false }

  if (view.someProp("handlePaste", function (f) { return f(view, e, slice); })) { return true }

  var singleNode = sliceSingleNode(slice);
  var tr = singleNode ? view.state.tr.replaceSelectionWith(singleNode, view.shiftKey) : view.state.tr.replaceSelection(slice);
  view.dispatch(tr.scrollIntoView().setMeta("paste", true));
  return true
}

editHandlers.paste = function (view, e) {
  var data = brokenClipboardAPI ? null : e.clipboardData;
  if (data && doPaste(view, data.getData("text/plain"), data.getData("text/html"), e))
    { e.preventDefault(); }
  else
    { capturePaste(view, e); }
};

var Dragging = function Dragging(slice, move) {
  this.slice = slice;
  this.move = move;
};

function dropPos(slice, $pos) {
  if (!slice || !slice.content.size) { return $pos.pos }
  var content = slice.content;
  for (var i = 0; i < slice.openStart; i++) { content = content.firstChild.content; }
  for (var d = $pos.depth; d >= 0; d--) {
    var bias = d == $pos.depth ? 0 : $pos.pos <= ($pos.start(d + 1) + $pos.end(d + 1)) / 2 ? -1 : 1;
    var insertPos = $pos.index(d) + (bias > 0 ? 1 : 0);
    if ($pos.node(d).canReplace(insertPos, insertPos, content))
      { return bias == 0 ? $pos.pos : bias < 0 ? $pos.before(d + 1) : $pos.after(d + 1) }
  }
  return $pos.pos
}

handlers.dragstart = function (view, e) {
  var mouseDown = view.mouseDown;
  if (mouseDown) { mouseDown.done(); }
  if (!e.dataTransfer) { return }

  var sel = view.state.selection;
  var pos = sel.empty ? null : view.posAtCoords(eventCoords(e));
  if (pos && pos.pos >= sel.from && pos.pos <= sel.to) {
    // In selection
  } else if (mouseDown && mouseDown.mightDrag) {
    view.dispatch(view.state.tr.setSelection(prosemirrorState.NodeSelection.create(view.state.doc, mouseDown.mightDrag.pos)));
  } else {
    return
  }
  var slice = view.state.selection.content();
  var ref = serializeForClipboard(view, slice);
  var dom = ref.dom;
  var text = ref.text;
  e.dataTransfer.clearData();
  e.dataTransfer.setData("text/html", dom.innerHTML);
  e.dataTransfer.setData("text/plain", text);
  view.dragging = new Dragging(slice, !e.ctrlKey);
};

handlers.dragend = function (view) {
  window.setTimeout(function () { return view.dragging = null; }, 50);
};

editHandlers.dragover = editHandlers.dragenter = function (_, e) { return e.preventDefault(); };

editHandlers.drop = function (view, e) {
  var dragging = view.dragging;
  view.dragging = null;

  if (!e.dataTransfer) { return }

  var $mouse = view.state.doc.resolve(view.posAtCoords(eventCoords(e)).pos);
  if (!$mouse) { return }
  var slice = dragging && dragging.slice ||
      parseFromClipboard(view, e.dataTransfer.getData("text/plain"), e.dataTransfer.getData("text/html"), false, $mouse);
  if (!slice) { return }

  e.preventDefault();
  if (view.someProp("handleDrop", function (f) { return f(view, e, slice, dragging && dragging.move); })) { return }
  var insertPos = dropPos(slice, view.state.doc.resolve($mouse.pos));

  var tr = view.state.tr;
  if (dragging && dragging.move) { tr.deleteSelection(); }

  var pos = tr.mapping.map(insertPos);
  var isNode = slice.openStart == 0 && slice.openEnd == 0 && slice.content.childCount == 1;
  if (isNode)
    { tr.replaceRangeWith(pos, pos, slice.content.firstChild); }
  else
    { tr.replaceRange(pos, pos, slice); }
  var $pos = tr.doc.resolve(pos);
  if (isNode && prosemirrorState.NodeSelection.isSelectable(slice.content.firstChild) &&
      $pos.nodeAfter && $pos.nodeAfter.sameMarkup(slice.content.firstChild))
    { tr.setSelection(new prosemirrorState.NodeSelection($pos)); }
  else
    { tr.setSelection(selectionBetween(view, $pos, tr.doc.resolve(tr.mapping.map(insertPos)))); }
  view.focus();
  view.dispatch(tr);
};

handlers.focus = function (view) {
  if (!view.focused) {
    view.dom.classList.add("ProseMirror-focused");
    view.focused = true;
  }
};

handlers.blur = function (view) {
  if (view.focused) {
    view.dom.classList.remove("ProseMirror-focused");
    view.focused = false;
  }
};

// Make sure all handlers get registered
for (var prop in editHandlers) { handlers[prop] = editHandlers[prop]; }

function compareObjs(a, b) {
  if (a == b) { return true }
  for (var p in a) { if (a[p] !== b[p]) { return false } }
  for (var p$1 in b) { if (!(p$1 in a)) { return false } }
  return true
}

var WidgetType = function WidgetType(widget, spec) {
  this.spec = spec || noSpec;
  this.side = this.spec.side || 0;

  if (!this.spec.raw) {
    if (widget.nodeType != 1) {
      var wrap = document.createElement("span");
      wrap.appendChild(widget);
      widget = wrap;
    }
    widget.contentEditable = false;
    widget.classList.add("ProseMirror-widget");
  }
  this.widget = widget;
};

WidgetType.prototype.map = function map (mapping, span, offset, oldOffset) {
  var ref = mapping.mapResult(span.from + oldOffset, this.side < 0 ? -1 : 1);
    var pos = ref.pos;
    var deleted = ref.deleted;
  return deleted ? null : new Decoration(pos - offset, pos - offset, this)
};

WidgetType.prototype.valid = function valid () { return true };

WidgetType.prototype.eq = function eq (other) {
  return this == other ||
    (other instanceof WidgetType && (this.widget == other.widget || this.spec.key) &&
     compareObjs(this.spec, other.spec))
};

var InlineType = function InlineType(attrs, spec) {
  this.spec = spec || noSpec;
  this.attrs = attrs;
};

InlineType.prototype.map = function map (mapping, span, offset, oldOffset) {
  var from = mapping.map(span.from + oldOffset, this.spec.inclusiveStart ? -1 : 1) - offset;
  var to = mapping.map(span.to + oldOffset, this.spec.inclusiveEnd ? 1 : -1) - offset;
  return from >= to ? null : new Decoration(from, to, this)
};

InlineType.prototype.valid = function valid (_, span) { return span.from < span.to };

InlineType.prototype.eq = function eq (other) {
  return this == other ||
    (other instanceof InlineType && compareObjs(this.attrs, other.attrs) &&
     compareObjs(this.spec, other.spec))
};

InlineType.is = function is (span) { return span.type instanceof InlineType };

var NodeType = function NodeType(attrs, spec) {
  this.spec = spec || noSpec;
  this.attrs = attrs;
};

NodeType.prototype.map = function map (mapping, span, offset, oldOffset) {
  var from = mapping.mapResult(span.from + oldOffset, 1);
  if (from.deleted) { return null }
  var to = mapping.mapResult(span.to + oldOffset, -1);
  if (to.deleted || to.pos <= from.pos) { return null }
  return new Decoration(from.pos - offset, to.pos - offset, this)
};

NodeType.prototype.valid = function valid (node, span) {
  var ref = node.content.findIndex(span.from);
    var index = ref.index;
    var offset = ref.offset;
  return offset == span.from && offset + node.child(index).nodeSize == span.to
};

NodeType.prototype.eq = function eq (other) {
  return this == other ||
    (other instanceof NodeType && compareObjs(this.attrs, other.attrs) &&
     compareObjs(this.spec, other.spec))
};

// ::- Decoration objects can be provided to the view through the
// [`decorations` prop](#view.EditorProps.decorations). They come in
// several variants—see the static members of this class for details.
var Decoration = function Decoration(from, to, type) {
  // :: number
  // The start position of the decoration.
  this.from = from;
  // :: number
  // The end position. Will be the same as `from` for [widget
  // decorations](#view.Decoration^widget).
  this.to = to;
  this.type = type;
};

var prototypeAccessors$2 = { spec: {} };

Decoration.prototype.copy = function copy (from, to) {
  return new Decoration(from, to, this.type)
};

Decoration.prototype.eq = function eq (other) {
  return this.type.eq(other.type) && this.from == other.from && this.to == other.to
};

Decoration.prototype.map = function map (mapping, offset, oldOffset) {
  return this.type.map(mapping, this, offset, oldOffset)
};

// :: (number, dom.Node, ?Object) → Decoration
// Creates a widget decoration, which is a DOM node that's shown in
// the document at the given position.
//
// spec::- These options are supported:
//
//   side:: ?number
//   Controls which side of the document position this widget is
//   associated with. When negative, it is drawn before a cursor
//   at its position, and content inserted at that position ends
//   up after the widget. When zero (the default) or positive, the
//   widget is drawn after the cursor and content inserted there
//   ends up before the widget.
//
//   When there are multiple widgets at a given position, their
//   `side` values determine the order in which they appear. Those
//   with lower values appear first. The ordering of widgets with
//   the same `side` value is unspecified.
//
//   stopEvent:: ?(event: dom.Event) → bool
//   Can be used to control which DOM events, when they bubble out
//   of this widget, the editor view should ignore.
//
//   key:: ?string
//   When comparing decorations of this type (in order to decide
//   whether it needs to be redrawn), ProseMirror will by default
//   compare the widget DOM node by identity. If you pass a key,
//   that key will be compared instead, which can be useful when
//   you generate decorations on the fly and don't want to store
//   and reuse DOM nodes.
Decoration.widget = function widget (pos, dom, spec) {
  return new Decoration(pos, pos, new WidgetType(dom, spec))
};

// :: (number, number, DecorationAttrs, ?Object) → Decoration
// Creates an inline decoration, which adds the given attributes to
// each inline node between `from` and `to`.
//
// spec::- These options are recognized:
//
//   inclusiveStart:: ?bool
//   Determines how the left side of the decoration is
//   [mapped](#transform.Position_Mapping) when content is
//   inserted directly at that positon. By default, the decoration
//   won't include the new content, but you can set this to `true`
//   to make it inclusive.
//
//   inclusiveEnd:: ?bool
//   Determines how the right side of the decoration is mapped.
//   See
//   [`inclusiveStart`](#view.Decoration^inline^spec.inclusiveStart).
Decoration.inline = function inline (from, to, attrs, spec) {
  return new Decoration(from, to, new InlineType(attrs, spec))
};

// :: (number, number, DecorationAttrs, ?Object) → Decoration
// Creates a node decoration. `from` and `to` should point precisely
// before and after a node in the document. That node, and only that
// node, will receive the given attributes.
Decoration.node = function node (from, to, attrs, spec) {
  return new Decoration(from, to, new NodeType(attrs, spec))
};

// :: Object
// The spec provided when creating this decoration. Can be useful
// if you've stored extra information in that object.
prototypeAccessors$2.spec.get = function () { return this.type.spec };

Object.defineProperties( Decoration.prototype, prototypeAccessors$2 );

// DecorationAttrs:: interface
// A set of attributes to add to a decorated node. Most properties
// simply directly correspond to DOM attributes of the same name,
// which will be set to the property's value. These are exceptions:
//
//   class:: ?string
//   A CSS class name or a space-separated set of class names to be
//   _added_ to the classes that the node already had.
//
//   style:: ?string
//   A string of CSS to be _added_ to the node's existing `style` property.
//
//   nodeName:: ?string
//   When non-null, the target node is wrapped in a DOM element of
//   this type (and the other attributes are applied to this element).

var none = [];
var noSpec = {};

// ::- A collection of [decorations](#view.Decoration), organized in
// such a way that the drawing algorithm can efficiently use and
// compare them. This is a persistent data structure—it is not
// modified, updates create a new value.
var DecorationSet = function DecorationSet(local, children) {
  this.local = local && local.length ? local : none;
  this.children = children && children.length ? children : none;
};

// :: (Node, [Decoration]) → DecorationSet
// Create a set of decorations, using the structure of the given
// document.
DecorationSet.create = function create (doc, decorations) {
  return decorations.length ? buildTree(decorations, doc, 0, noSpec) : empty
};

// :: (?number, ?number, ?(spec: Object) → bool) → [Decoration]
// Find all decorations in this set which touch the given range
// (including decorations that start or end directly at the
// boundaries) and match the given predicate on their spec. When
// `start` and `end` are omitted, all decorations in the set are
// considered. When `predicate` isn't given, all decorations are
// asssumed to match.
DecorationSet.prototype.find = function find (start, end, predicate) {
  var result = [];
  this.findInner(start == null ? 0 : start, end == null ? 1e9 : end, result, 0, predicate);
  return result
};

DecorationSet.prototype.findInner = function findInner (start, end, result, offset, predicate) {
    var this$1 = this;

  for (var i = 0; i < this.local.length; i++) {
    var span = this$1.local[i];
    if (span.from <= end && span.to >= start && (!predicate || predicate(span.spec)))
      { result.push(span.copy(span.from + offset, span.to + offset)); }
  }
  for (var i$1 = 0; i$1 < this.children.length; i$1 += 3) {
    if (this$1.children[i$1] < end && this$1.children[i$1 + 1] > start) {
      var childOff = this$1.children[i$1] + 1;
      this$1.children[i$1 + 2].findInner(start - childOff, end - childOff, result, offset + childOff, predicate);
    }
  }
};

// :: (Mapping, Node, ?Object) → DecorationSet
// Map the set of decorations in response to a change in the
// document.
//
// options::- An optional set of options.
//
//   onRemove:: ?(decorationSpec: Object)
//   When given, this function will be called for each decoration
//   that gets dropped as a result of the mapping, passing the
//   spec of that decoration.
DecorationSet.prototype.map = function map (mapping, doc, options) {
  if (this == empty || mapping.maps.length == 0) { return this }
  return this.mapInner(mapping, doc, 0, 0, options || noSpec)
};

DecorationSet.prototype.mapInner = function mapInner (mapping, node, offset, oldOffset, options) {
    var this$1 = this;

  var newLocal;
  for (var i = 0; i < this.local.length; i++) {
    var mapped = this$1.local[i].map(mapping, offset, oldOffset);
    if (mapped && mapped.type.valid(node, mapped)) { (newLocal || (newLocal = [])).push(mapped); }
    else if (options.onRemove) { options.onRemove(this$1.local[i].spec); }
  }

  if (this.children.length)
    { return mapChildren(this.children, newLocal, mapping, node, offset, oldOffset, options) }
  else
    { return newLocal ? new DecorationSet(newLocal.sort(byPos)) : empty }
};

// :: (Node, [Decoration]) → DecorationSet
// Add the given array of decorations to the ones in the set,
// producing a new set. Needs access to the current document to
// create the appropriate tree structure.
DecorationSet.prototype.add = function add (doc, decorations) {
  if (!decorations.length) { return this }
  if (this == empty) { return DecorationSet.create(doc, decorations) }
  return this.addInner(doc, decorations, 0)
};

DecorationSet.prototype.addInner = function addInner (doc, decorations, offset) {
    var this$1 = this;

  var children, childIndex = 0;
  doc.forEach(function (childNode, childOffset) {
    var baseOffset = childOffset + offset, found;
    if (!(found = takeSpansForNode(decorations, childNode, baseOffset))) { return }

    if (!children) { children = this$1.children.slice(); }
    while (childIndex < children.length && children[childIndex] < childOffset) { childIndex += 3; }
    if (children[childIndex] == childOffset)
      { children[childIndex + 2] = children[childIndex + 2].addInner(childNode, found, baseOffset + 1); }
    else
      { children.splice(childIndex, 0, childOffset, childOffset + childNode.nodeSize, buildTree(found, childNode, baseOffset + 1, noSpec)); }
    childIndex += 3;
  });

  var local = moveSpans(childIndex ? withoutNulls(decorations) : decorations, -offset);
  return new DecorationSet(local.length ? this.local.concat(local).sort(byPos) : this.local,
                           children || this.children)
};

// :: ([Decoration]) → DecorationSet
// Create a new set that contains the decorations in this set, minus
// the ones in the given array.
DecorationSet.prototype.remove = function remove (decorations) {
  if (decorations.length == 0 || this == empty) { return this }
  return this.removeInner(decorations, 0)
};

DecorationSet.prototype.removeInner = function removeInner (decorations, offset) {
    var this$1 = this;

  var children = this.children, local = this.local;
  for (var i = 0; i < children.length; i += 3) {
    var found = (void 0), from = children[i] + offset, to = children[i + 1] + offset;
    for (var j = 0, span = (void 0); j < decorations.length; j++) { if (span = decorations[j]) {
      if (span.from > from && span.to < to) {
        decorations[j] = null
        ;(found || (found = [])).push(span);
      }
    } }
    if (!found) { continue }
    if (children == this$1.children) { children = this$1.children.slice(); }
    var removed = children[i + 2].removeInner(found, from + 1);
    if (removed != empty) {
      children[i + 2] = removed;
    } else {
      children.splice(i, 3);
      i -= 3;
    }
  }
  if (local.length) { for (var i$1 = 0, span$1 = (void 0); i$1 < decorations.length; i$1++) { if (span$1 = decorations[i$1]) {
    for (var j$1 = 0; j$1 < local.length; j$1++) { if (local[j$1].type == span$1.type) {
      if (local == this$1.local) { local = this$1.local.slice(); }
      local.splice(j$1--, 1);
    } }
  } } }
  if (children == this.children && local == this.local) { return this }
  return local.length || children.length ? new DecorationSet(local, children) : empty
};

DecorationSet.prototype.forChild = function forChild (offset, node) {
    var this$1 = this;

  if (this == empty) { return this }
  if (node.isLeaf) { return DecorationSet.empty }

  var child, local;
  for (var i = 0; i < this.children.length; i += 3) { if (this$1.children[i] >= offset) {
    if (this$1.children[i] == offset) { child = this$1.children[i + 2]; }
    break
  } }
  var start = offset + 1, end = start + node.content.size;
  for (var i$1 = 0; i$1 < this.local.length; i$1++) {
    var dec = this$1.local[i$1];
    if (dec.from < end && dec.to > start && (dec.type instanceof InlineType)) {
      var from = Math.max(start, dec.from) - start, to = Math.min(end, dec.to) - start;
      if (from < to) { (local || (local = [])).push(dec.copy(from, to)); }
    }
  }
  if (local) {
    var localSet = new DecorationSet(local);
    return child ? new DecorationGroup([localSet, child]) : localSet
  }
  return child || empty
};

DecorationSet.prototype.eq = function eq (other) {
    var this$1 = this;

  if (this == other) { return true }
  if (!(other instanceof DecorationSet) ||
      this.local.length != other.local.length ||
      this.children.length != other.children.length) { return false }
  for (var i = 0; i < this.local.length; i++)
    { if (!this$1.local[i].eq(other.local[i])) { return false } }
  for (var i$1 = 0; i$1 < this.children.length; i$1 += 3)
    { if (this$1.children[i$1] != other.children[i$1] ||
        this$1.children[i$1 + 1] != other.children[i$1 + 1] ||
        !this$1.children[i$1 + 2].eq(other.children[i$1 + 2])) { return false } }
  return false
};

DecorationSet.prototype.locals = function locals (node) {
  return removeOverlap(this.localsInner(node))
};

DecorationSet.prototype.localsInner = function localsInner (node) {
    var this$1 = this;

  if (this == empty) { return none }
  if (node.inlineContent || !this.local.some(InlineType.is)) { return this.local }
  var result = [];
  for (var i = 0; i < this.local.length; i++) {
    if (!(this$1.local[i].type instanceof InlineType))
      { result.push(this$1.local[i]); }
  }
  return result
};

var empty = new DecorationSet();

// :: DecorationSet
// The empty set of decorations.
DecorationSet.empty = empty;

DecorationSet.removeOverlap = removeOverlap;

// :- An abstraction that allows the code dealing with decorations to
// treat multiple DecorationSet objects as if it were a single object
// with (a subset of) the same interface.
var DecorationGroup = function DecorationGroup(members) {
  this.members = members;
};

DecorationGroup.prototype.forChild = function forChild (offset, child) {
    var this$1 = this;

  if (child.isLeaf) { return DecorationSet.empty }
  var found = [];
  for (var i = 0; i < this.members.length; i++) {
    var result = this$1.members[i].forChild(offset, child);
    if (result == empty) { continue }
    if (result instanceof DecorationGroup) { found = found.concat(result.members); }
    else { found.push(result); }
  }
  return DecorationGroup.from(found)
};

DecorationGroup.prototype.eq = function eq (other) {
    var this$1 = this;

  if (!(other instanceof DecorationGroup) ||
      other.members.length != this.members.length) { return false }
  for (var i = 0; i < this.members.length; i++)
    { if (!this$1.members[i].eq(other.members[i])) { return false } }
  return true
};

DecorationGroup.prototype.locals = function locals (node) {
    var this$1 = this;

  var result, sorted = true;
  for (var i = 0; i < this.members.length; i++) {
    var locals = this$1.members[i].localsInner(node);
    if (!locals.length) { continue }
    if (!result) {
      result = locals;
    } else {
      if (sorted) {
        result = result.slice();
        sorted = false;
      }
      for (var j = 0; j < locals.length; j++) { result.push(locals[j]); }
    }
  }
  return result ? removeOverlap(sorted ? result : result.sort(byPos)) : none
};

// : ([DecorationSet]) → union<DecorationSet, DecorationGroup>
// Create a group for the given array of decoration sets, or return
// a single set when possible.
DecorationGroup.from = function from (members) {
  switch (members.length) {
    case 0: return empty
    case 1: return members[0]
    default: return new DecorationGroup(members)
  }
};

function mapChildren(oldChildren, newLocal, mapping, node, offset, oldOffset, options) {
  var children = oldChildren.slice();

  // Mark the children that are directly touched by changes, and
  // move those that are after the changes.
  var shift = function (oldStart, oldEnd, newStart, newEnd) {
    for (var i = 0; i < children.length; i += 3) {
      var end = children[i + 1], dSize = (void 0);
      if (end == -1 || oldStart > end + oldOffset) { continue }
      if (oldEnd >= children[i] + oldOffset) {
        children[i + 1] = -1;
      } else if (dSize = (newEnd - newStart) - (oldEnd - oldStart)) {
        children[i] += dSize;
        children[i + 1] += dSize;
      }
    }
  };
  for (var i = 0; i < mapping.maps.length; i++) { mapping.maps[i].forEach(shift); }

  // Find the child nodes that still correspond to a single node,
  // recursively call mapInner on them and update their positions.
  var mustRebuild = false;
  for (var i$1 = 0; i$1 < children.length; i$1 += 3) { if (children[i$1 + 1] == -1) { // Touched nodes
    var from = mapping.map(children[i$1] + oldOffset), fromLocal = from - offset;
    if (fromLocal < 0 || fromLocal >= node.content.size) {
      mustRebuild = true;
      continue
    }
    // Must read oldChildren because children was tagged with -1
    var to = mapping.map(oldChildren[i$1 + 1] + oldOffset, -1), toLocal = to - offset;
    var ref = node.content.findIndex(fromLocal);
    var index = ref.index;
    var childOffset = ref.offset;
    var childNode = node.maybeChild(index);
    if (childNode && childOffset == fromLocal && childOffset + childNode.nodeSize == toLocal) {
      var mapped = children[i$1 + 2].mapInner(mapping, childNode, from + 1, children[i$1] + oldOffset + 1, options);
      if (mapped != empty) {
        children[i$1] = fromLocal;
        children[i$1 + 1] = toLocal;
        children[i$1 + 2] = mapped;
      } else {
        children.splice(i$1, 3);
        i$1 -= 3;
      }
    } else {
      mustRebuild = true;
    }
  } }

  // Remaining children must be collected and rebuilt into the appropriate structure
  if (mustRebuild) {
    var decorations = mapAndGatherRemainingDecorations(children, newLocal ? moveSpans(newLocal, offset) : [], mapping, oldOffset, options);
    var built = buildTree(decorations, node, 0, options);
    newLocal = built.local;
    for (var i$2 = 0; i$2 < children.length; i$2 += 3) { if (children[i$2 + 1] == -1) {
      children.splice(i$2, 3);
      i$2 -= 3;
    } }
    for (var i$3 = 0, j = 0; i$3 < built.children.length; i$3 += 3) {
      var from$1 = built.children[i$3];
      while (j < children.length && children[j] < from$1) { j += 3; }
      children.splice(j, 0, built.children[i$3], built.children[i$3 + 1], built.children[i$3 + 2]);
    }
  }

  return new DecorationSet(newLocal && newLocal.sort(byPos), children)
}

function moveSpans(spans, offset) {
  if (!offset || !spans.length) { return spans }
  var result = [];
  for (var i = 0; i < spans.length; i++) {
    var span = spans[i];
    result.push(new Decoration(span.from + offset, span.to + offset, span.type));
  }
  return result
}

function mapAndGatherRemainingDecorations(children, decorations, mapping, oldOffset, options) {
  // Gather all decorations from the remaining marked children
  function gather(set, oldOffset) {
    for (var i = 0; i < set.local.length; i++) {
      var mapped = set.local[i].map(mapping, 0, oldOffset);
      if (mapped) { decorations.push(mapped); }
      else if (options.onRemove) { options.onRemove(set.local[i].spec); }
    }
    for (var i$1 = 0; i$1 < set.children.length; i$1 += 3)
      { gather(set.children[i$1 + 2], set.children[i$1] + oldOffset + 1); }
  }
  for (var i = 0; i < children.length; i += 3) { if (children[i + 1] == -1)
    { gather(children[i + 2], children[i] + oldOffset + 1); } }

  return decorations
}

function takeSpansForNode(spans, node, offset) {
  if (node.isLeaf) { return null }
  var end = offset + node.nodeSize, found = null;
  for (var i = 0, span = (void 0); i < spans.length; i++) {
    if ((span = spans[i]) && span.from > offset && span.to < end) {
      (found || (found = [])).push(span);
      spans[i] = null;
    }
  }
  return found
}

function withoutNulls(array) {
  var result = [];
  for (var i = 0; i < array.length; i++)
    { if (array[i] != null) { result.push(array[i]); } }
  return result
}

// : ([Decoration], Node, number) → DecorationSet
// Build up a tree that corresponds to a set of decorations. `offset`
// is a base offset that should be subtractet from the `from` and `to`
// positions in the spans (so that we don't have to allocate new spans
// for recursive calls).
function buildTree(spans, node, offset, options) {
  var children = [], hasNulls = false;
  node.forEach(function (childNode, localStart) {
    var found = takeSpansForNode(spans, childNode, localStart + offset);
    if (found) {
      hasNulls = true;
      var subtree = buildTree(found, childNode, offset + localStart + 1, options);
      if (subtree != empty)
        { children.push(localStart, localStart + childNode.nodeSize, subtree); }
    }
  });
  var locals = moveSpans(hasNulls ? withoutNulls(spans) : spans, -offset).sort(byPos);
  for (var i = 0; i < locals.length; i++) { if (!locals[i].type.valid(node, locals[i])) {
    if (options.onRemove) { options.onRemove(locals[i].spec); }
    locals.splice(i--, 1);
  } }
  return locals.length || children.length ? new DecorationSet(locals, children) : empty
}

// : (Decoration, Decoration) → number
// Used to sort decorations so that ones with a low start position
// come first, and within a set with the same start position, those
// with an smaller end position come first.
function byPos(a, b) {
  return a.from - b.from || a.to - b.to
}

// : ([Decoration]) → [Decoration]
// Scan a sorted array of decorations for partially overlapping spans,
// and split those so that only fully overlapping spans are left (to
// make subsequent rendering easier). Will return the input array if
// no partially overlapping spans are found (the common case).
function removeOverlap(spans) {
  var working = spans;
  for (var i = 0; i < working.length - 1; i++) {
    var span = working[i];
    if (span.from != span.to) { for (var j = i + 1; j < working.length; j++) {
      var next = working[j];
      if (next.from == span.from) {
        if (next.to != span.to) {
          if (working == spans) { working = spans.slice(); }
          // Followed by a partially overlapping larger span. Split that
          // span.
          working[j] = next.copy(next.from, span.to);
          insertAhead(working, j + 1, next.copy(span.to, next.to));
        }
        continue
      } else {
        if (next.from < span.to) {
          if (working == spans) { working = spans.slice(); }
          // The end of this one overlaps with a subsequent span. Split
          // this one.
          working[i] = span.copy(span.from, next.from);
          insertAhead(working, j, span.copy(next.from, span.to));
        }
        break
      }
    } }
  }
  return working
}

function insertAhead(array, i, deco) {
  while (i < array.length && byPos(deco, array[i]) > 0) { i++; }
  array.splice(i, 0, deco);
}

// : (EditorView) → union<DecorationSet, DecorationGroup>
// Get the decorations associated with the current props of a view.
function viewDecorations(view) {
  var found = [];
  view.someProp("decorations", function (f) {
    var result = f(view.state);
    if (result && result != empty) { found.push(result); }
  });
  if (view.cursorWrapper)
    { found.push(DecorationSet.create(view.state.doc, [view.cursorWrapper])); }
  return DecorationGroup.from(found)
}

// ::- An editor view manages the DOM structure that represents an
// editable document. Its state and behavior are determined by its
// [props](#view.DirectEditorProps).
var EditorView = function EditorView(place, props) {
  this._props = props;
  // :: EditorState
  // The view's current [state](#state.EditorState).
  this.state = props.state;

  this.dispatch = this.dispatch.bind(this);

  this._root = null;
  this.focused = false;

  // :: dom.Element
  // An editable DOM node containing the document. (You probably
  // should not directly interfere with its content.)
  this.dom = (place && place.mount) || document.createElement("div");
  if (place) {
    if (place.appendChild) { place.appendChild(this.dom); }
    else if (place.apply) { place(this.dom); }
    else if (place.mount) { this.mounted = true; }
  }

  this.editable = getEditable(this);
  this.cursorWrapper = null;
  updateCursorWrapper(this);
  this.docView = docViewDesc(this.state.doc, computeDocDeco(this), viewDecorations(this), this.dom, this);

  this.lastSelectedViewDesc = null;
  initInput(this); // Must be done before creating a SelectionReader

  this.selectionReader = new SelectionReader(this);

  this.pluginViews = [];
  this.updatePluginViews();
};

var prototypeAccessors = { props: {},root: {} };

// :: DirectEditorProps
// The view's current [props](#view.EditorProps).
prototypeAccessors.props.get = function () {
    var this$1 = this;

  if (this._props.state != this.state) {
    var prev = this._props;
    this._props = {};
    for (var name in prev) { this$1._props[name] = prev[name]; }
    this._props.state = this.state;
  }
  return this._props
};

// :: (DirectEditorProps)
// Update the view's props. Will immediately cause an update to
// the DOM.
EditorView.prototype.update = function update (props) {
  if (props.handleDOMEvents != this._props.handleDOMEvents) { ensureListeners(this); }
  this._props = props;
  this.updateState(props.state);
};

// :: (DirectEditorProps)
// Update the view by updating existing props object with the object
// given as argument. Equivalent to `view.update(Object.assign({},
// view.props, props))`.
EditorView.prototype.setProps = function setProps (props) {
    var this$1 = this;

  var updated = {};
  for (var name in this$1._props) { updated[name] = this$1._props[name]; }
  updated.state = this.state;
  for (var name$1 in props) { updated[name$1] = props[name$1]; }
  this.update(updated);
};

// :: (EditorState)
// Update the editor's `state` prop, without touching any of the
// other props.
EditorView.prototype.updateState = function updateState (state) {
    var this$1 = this;

  var prev = this.state;
  this.state = state;
  if (prev.plugins != state.plugins) { ensureListeners(this); }

  this.domObserver.flush();
  if (this.inDOMChange && this.inDOMChange.stateUpdated(state)) { return }

  var prevEditable = this.editable;
  this.editable = getEditable(this);
  updateCursorWrapper(this);
  var innerDeco = viewDecorations(this), outerDeco = computeDocDeco(this);

  var scroll = prev.config != state.config ? "reset"
      : state.scrollToSelection > prev.scrollToSelection ? "to selection" : "preserve";
  var updateDoc = !this.docView.matchesNode(state.doc, outerDeco, innerDeco);
  var updateSel = updateDoc || !state.selection.eq(prev.selection) || this.selectionReader.domChanged();
  var oldScrollPos = scroll == "preserve" && updateSel && storeScrollPos(this);

  if (updateSel) {
    this.domObserver.stop();
    if (updateDoc) {
      if (!this.docView.update(state.doc, outerDeco, innerDeco, this)) {
        this.docView.destroy();
        this.docView = docViewDesc(state.doc, outerDeco, innerDeco, this.dom, this);
      }
      this.selectionReader.clearDOMState();
    }
    selectionToDOM(this);
    this.domObserver.start();
  }

  if (prevEditable != this.editable) { this.selectionReader.editableChanged(); }
  this.updatePluginViews(prev);

  if (scroll == "reset") {
    this.dom.scrollTop = 0;
  } else if (scroll == "to selection") {
    if (this.someProp("handleScrollToSelection", function (f) { return f(this$1); }))
      {} // Handled
    else if (state.selection instanceof prosemirrorState.NodeSelection)
      { scrollRectIntoView(this, this.docView.domAfterPos(state.selection.from).getBoundingClientRect()); }
    else
      { scrollRectIntoView(this, this.coordsAtPos(state.selection.head)); }
  } else if (oldScrollPos) {
    resetScrollPos(oldScrollPos);
  }
};

EditorView.prototype.destroyPluginViews = function destroyPluginViews () {
  var view;
  while (view = this.pluginViews.pop()) { if (view.destroy) { view.destroy(); } }
};

EditorView.prototype.updatePluginViews = function updatePluginViews (prevState) {
    var this$1 = this;

  var plugins = this.state.plugins;
  if (!prevState || prevState.plugins != plugins) {
    this.destroyPluginViews();
    for (var i = 0; i < plugins.length; i++) {
      var plugin = plugins[i];
      if (plugin.spec.view) { this$1.pluginViews.push(plugin.spec.view(this$1)); }
    }
  } else {
    for (var i$1 = 0; i$1 < this.pluginViews.length; i$1++) {
      var pluginView = this$1.pluginViews[i$1];
      if (pluginView.update) { pluginView.update(this$1, prevState); }
    }
  }
};

// :: (string, ?(prop: *) → *) → *
// Goes over the values of a prop, first those provided directly,
// then those from plugins (in order), and calls `f` every time a
// non-undefined value is found. When `f` returns a truthy value,
// that is immediately returned. When `f` isn't provided, it is
// treated as the identity function (the prop value is returned
// directly).
EditorView.prototype.someProp = function someProp (propName, f) {
  var prop = this._props && this._props[propName], value;
  if (prop != null && (value = f ? f(prop) : prop)) { return value }
  var plugins = this.state.plugins;
  if (plugins) { for (var i = 0; i < plugins.length; i++) {
    var prop$1 = plugins[i].props[propName];
    if (prop$1 != null && (value = f ? f(prop$1) : prop$1)) { return value }
  } }
};

// :: () → bool
// Query whether the view has focus.
EditorView.prototype.hasFocus = function hasFocus () {
  return this.root.activeElement == this.dom
};

// :: ()
// Focus the editor.
EditorView.prototype.focus = function focus () {
  this.domObserver.stop();
  selectionToDOM(this, true);
  this.domObserver.start();
  if (this.editable) { this.dom.focus(); }
};

// :: union<dom.Document, dom.DocumentFragment>
// Get the document root in which the editor exists. This will
// usually be the top-level `document`, but might be a [shadow
// DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM)
// root if the editor is inside one.
prototypeAccessors.root.get = function () {
    var this$1 = this;

  var cached = this._root;
  if (cached == null) { for (var search = this.dom.parentNode; search; search = search.parentNode) {
    if (search.nodeType == 9 || (search.nodeType == 11 && search.host))
      { return this$1._root = search }
  } }
  return cached || document
};

// :: ({left: number, top: number}) → ?{pos: number, inside: number}
// Given a pair of viewport coordinates, return the document
// position that corresponds to them. May return null if the given
// coordinates aren't inside of the visible editor. When an object
// is returned, its `pos` property is the position nearest to the
// coordinates, and its `inside` property holds the position of the
// inner node that the position falls inside of, or -1 if it is at
// the top level, not in any node.
EditorView.prototype.posAtCoords = function posAtCoords$1 (coords) {
  var pos = posAtCoords(this, coords);
  if (this.inDOMChange && pos) {
    pos.pos = this.inDOMChange.mapping.map(pos);
    if (pos.inside != -1) { pos.inside = this.inDOMChange.mapping.map(pos.inside); }
  }
  return pos
};

// :: (number) → {left: number, right: number, top: number, bottom: number}
// Returns the viewport rectangle at a given document position. `left`
// and `right` will be the same number, as this returns a flat
// cursor-ish rectangle.
EditorView.prototype.coordsAtPos = function coordsAtPos$1 (pos) {
  if (this.inDOMChange)
    { pos = this.inDOMChange.mapping.invert().map(pos); }
  return coordsAtPos(this, pos)
};

// :: (number) → {node: dom.Node, offset: number}
// Find the DOM position that corresponds to the given document
// position. Note that you should **not** mutate the editor's
// internal DOM, only inspect it (and even that is usually not
// necessary).
EditorView.prototype.domAtPos = function domAtPos (pos) {
  if (this.inDOMChange)
    { pos = this.inDOMChange.mapping.invert().map(pos); }
  return this.docView.domFromPos(pos)
};

// :: (union<"up", "down", "left", "right", "forward", "backward">, ?EditorState) → bool
// Find out whether the selection is at the end of a textblock when
// moving in a given direction. When, for example, given `"left"`,
// it will return true if moving left from the current cursor
// position would leave that position's parent textblock. Will apply
// to the view's current state by default, but it is possible to
// pass a different state.
EditorView.prototype.endOfTextblock = function endOfTextblock$1 (dir, state) {
  return endOfTextblock(this, state || this.state, dir)
};

// :: ()
// Removes the editor from the DOM and destroys all [node
// views](#view.NodeView).
EditorView.prototype.destroy = function destroy () {
  if (!this.docView) { return }
  destroyInput(this);
  this.destroyPluginViews();
  this.selectionReader.destroy();
  if (this.mounted) {
    this.docView.update(this.state.doc, [], viewDecorations(this), this);
    this.dom.textContent = "";
  } else if (this.dom.parentNode) {
    this.dom.parentNode.removeChild(this.dom);
  }
  this.docView.destroy();
  this.docView = null;
};

// Used for testing.
EditorView.prototype.dispatchEvent = function dispatchEvent$1 (event) {
  return dispatchEvent(this, event)
};

// :: (Transaction)
// Dispatch a transaction. Will call
// [`dispatchTransaction`](#view.DirectEditorProps.dispatchTransaction)
// when given, and otherwise defaults to applying the transaction to
// the current state and calling
// [`updateState`](#view.EditorView.updateState) with the result.
// This method is bound to the view instance, so that it can be
// easily passed around.
EditorView.prototype.dispatch = function dispatch (tr) {
  var dispatchTransaction = this._props.dispatchTransaction;
  if (dispatchTransaction) { dispatchTransaction(tr); }
  else { this.updateState(this.state.apply(tr)); }
};

Object.defineProperties( EditorView.prototype, prototypeAccessors );

function computeDocDeco(view) {
  var attrs = Object.create(null);
  attrs.class = "ProseMirror" + (view.focused ? " ProseMirror-focused" : "");
  attrs.contenteditable = String(view.editable);

  view.someProp("attributes", function (value) {
    if (typeof value == "function") { value = value(view.state); }
    if (value) { for (var attr in value) {
      if (attr == "class")
        { attrs.class += " " + value[attr]; }
      else if (!attrs[attr] && attr != "contenteditable" && attr != "nodeName")
        { attrs[attr] = String(value[attr]); }
    } }
  });

  return [Decoration.node(0, view.state.doc.content.size, attrs)]
}

function nonInclusiveMark(mark) {
  return mark.type.spec.inclusive === false
}

function cursorWrapperDOM(visible) {
  var span = document.createElement("span");
  span.textContent = "\ufeff"; // zero-width non-breaking space
  if (!visible) {
    span.style.position = "absolute";
    span.style.left = "-100000px";
  }
  return span
}

function updateCursorWrapper(view) {
  var ref = view.state.selection;
  var $head = ref.$head;
  var $anchor = ref.$anchor;
  var visible = ref.visible;
  var $pos = $head.pos == $anchor.pos && (!visible || $head.parent.inlineContent) ? $head : null;
  if ($pos && (!visible ||
               view.state.storedMarks ||
               $pos.parent.content.length == 0 ||
               $pos.parentOffset && !$pos.textOffset && $pos.nodeBefore.marks.some(nonInclusiveMark))) {
    // Needs a cursor wrapper
    var marks = view.state.storedMarks || $pos.marks();
    var spec = {isCursorWrapper: true, marks: marks, raw: true, visible: visible};
    if (!view.cursorWrapper || !prosemirrorModel.Mark.sameSet(view.cursorWrapper.spec.marks, marks) ||
        view.cursorWrapper.type.widget.textContent != "\ufeff" ||
        view.cursorWrapper.spec.visible != visible)
      { view.cursorWrapper = Decoration.widget($pos.pos, cursorWrapperDOM(visible), spec); }
    else if (view.cursorWrapper.pos != $pos.pos)
      { view.cursorWrapper = Decoration.widget($pos.pos, view.cursorWrapper.type.widget, spec); }
  } else {
    view.cursorWrapper = null;
  }
}

function getEditable(view) {
  return !view.someProp("editable", function (value) { return value(view.state) === false; })
}

// EditorProps:: interface
//
// Props are configuration values that can be passed to an editor view
// or included in a plugin. This interface lists the supported props.
//
// The various event-handling functions may all return `true` to
// indicate that they handled the given event. The view will then take
// care to call `preventDefault` on the event, except with
// `handleDOMEvents`, where the handler itself is responsible for that.
//
// How a prop is resolved depends on the prop. Handler functions are
// called one at a time, starting with the base props and then
// searching through the plugins (in order of appearance) until one of
// them returns true. For some props, the first plugin that yields a
// value gets precedence.
//
//   handleDOMEvents:: ?Object<(view: EditorView, event: dom.Event) → bool>
//   Can be an object mapping DOM event type names to functions that
//   handle them. Such functions will be called before any handling
//   ProseMirror does of events fired on the editable DOM element.
//   Contrary to the other event handling props, when returning true
//   from such a function, you are responsible for calling
//   `preventDefault` yourself (or not, if you want to allow the
//   default behavior).
//
//   handleKeyDown:: ?(view: EditorView, event: dom.KeyboardEvent) → bool
//   Called when the editor receives a `keydown` event.
//
//   handleKeyPress:: ?(view: EditorView, event: dom.KeyboardEvent) → bool
//   Handler for `keypress` events.
//
//   handleTextInput:: ?(view: EditorView, from: number, to: number, text: string) → bool
//   Whenever the user directly input text, this handler is called
//   before the input is applied. If it returns `true`, the default
//   behavior of actually inserting the text is suppressed.
//
//   handleClickOn:: ?(view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: bool) → bool
//   Called for each node around a click, from the inside out. The
//   `direct` flag will be true for the inner node.
//
//   handleClick:: ?(view: EditorView, pos: number, event: dom.MouseEvent) → bool
//   Called when the editor is clicked, after `handleClickOn` handlers
//   have been called.
//
//   handleDoubleClickOn:: ?(view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: bool) → bool
//   Called for each node around a double click.
//
//   handleDoubleClick:: ?(view: EditorView, pos: number, event: dom.MouseEvent) → bool
//   Called when the editor is double-clicked, after `handleDoubleClickOn`.
//
//   handleTripleClickOn:: ?(view: EditorView, pos: number, node: Node, nodePos: number, event: dom.MouseEvent, direct: bool) → bool
//   Called for each node around a triple click.
//
//   handleTripleClick:: ?(view: EditorView, pos: number, event: dom.MouseEvent) → bool
//   Called when the editor is triple-clicked, after `handleTripleClickOn`.
//
//   handlePaste:: ?(view: EditorView, event: dom.Event, slice: Slice) → bool
//   Can be used to override the behavior of pasting. `slice` is the
//   pasted content parsed by the editor, but you can directly access
//   the event to get at the raw content.
//
//   handleDrop:: ?(view: EditorView, event: dom.Event, slice: Slice, moved: bool) → bool
//   Called when something is dropped on the editor. `moved` will be
//   true if this drop moves from the current selection (which should
//   thus be deleted).
//
//   handleScrollToSelection:: ?(view: EditorView) → bool
//   Called when the view, after updating its state, tries to scroll
//   the selection into view. A handler function may return false to
//   indicate that it did not handle the scrolling and further
//   handlers or the default behavior should be tried.
//
//   createSelectionBetween:: ?(view: EditorView, anchor: ResolvedPos, head: ResolvedPos) → ?Selection
//   Can be used to override the way a selection is created when
//   reading a DOM selection between the given anchor and head.
//
//   domParser:: ?DOMParser
//   The [parser](#model.DOMParser) to use when reading editor changes
//   from the DOM. Defaults to calling
//   [`DOMParser.fromSchema`](#model.DOMParser^fromSchema) on the
//   editor's schema.
//
//   transformPastedHTML:: ?(html: string) → string
//   Can be used to transform pasted HTML text, _before_ it is parsed,
//   for example to clean it up.
//
//   clipboardParser:: ?DOMParser
//   The [parser](#model.DOMParser) to use when reading content from
//   the clipboard. When not given, the value of the
//   [`domParser`](#view.EditorProps.domParser) prop is used.
//
//   transformPastedText:: ?(text: string) → string
//   Transform pasted plain text.
//
//   clipboardTextParser:: ?(text: string, $context: ResolvedPos) → Slice
//   A function to parse text from the clipboard into a document
//   slice. Called after
//   [`transformPastedText`](#view.EditorProps.transformPastedText).
//   The default behavior is to split the text into lines, wrap them
//   in `<p>` tags, and call
//   [`clipboardParser`](#view.EditorProps.clipboardParser) on it.
//
//   transformPasted:: ?(Slice) → Slice
//   Can be used to transform pasted content before it is applied to
//   the document.
//
//   nodeViews:: ?Object<(node: Node, view: EditorView, getPos: () → number, decorations: [Decoration]) → NodeView>
//   Allows you to pass custom rendering and behavior logic for nodes
//   and marks. Should map node and mark names to constructor
//   functions that produce a [`NodeView`](#view.NodeView) object
//   implementing the node's display behavior. `getPos` is a function
//   that can be called to get the node's current position, which can
//   be useful when creating transactions to update it.
//
//   `decorations` is an array of node or inline decorations that are
//   active around the node. They are automatically drawn in the
//   normal way, and you will usually just want to ignore this, but
//   they can also be used as a way to provide context information to
//   the node view without adding it to the document itself.
//
//   clipboardSerializer:: ?DOMSerializer
//   The DOM serializer to use when putting content onto the
//   clipboard. If not given, the result of
//   [`DOMSerializer.fromSchema`](#model.DOMSerializer^fromSchema)
//   will be used.
//
//   clipboardTextSerializer:: ?(Slice) → string
//   A function that will be called to get the text for the current
//   selection when copying text to the clipboard. By default, the
//   editor will use [`textBetween`](#model.Node.textBetween) on the
//   selected range.
//
//   decorations:: ?(state: EditorState) → ?DecorationSet
//   A set of [document decorations](#view.Decoration) to show in the
//   view.
//
//   editable:: ?(state: EditorState) → bool
//   When this returns false, the content of the view is not directly
//   editable.
//
//   attributes:: ?union<Object<string>, (EditorState) → ?Object<string>>
//   Control the DOM attributes of the editable element. May be either
//   an object or a function going from an editor state to an object.
//   By default, the element will get a class `"ProseMirror"`, and
//   will have its `contentEditable` attribute determined by the
//   [`editable` prop](#view.EditorProps.editable). Additional classes
//   provided here will be added to the class. For other attributes,
//   the value provided first (as in
//   [`someProp`](#view.EditorView.someProp)) will be used.
//
//   scrollThreshold:: ?number
//   Determines the distance (in pixels) between the cursor and the
//   end of the visible viewport at which point, when scrolling the
//   cursor into view, scrolling takes place. Defaults to 0.
//
//   scrollMargin:: ?number
//   Determines the extra space (in pixels) that is left above or
//   below the cursor when it is scrolled into view. Defaults to 5.

// DirectEditorProps:: interface extends EditorProps
//
// The props object given directly to the editor view supports two
// fields that can't be used in plugins:
//
//   state:: EditorState
//   The current state of the editor.
//
//   dispatchTransaction:: ?(tr: Transaction)
//   The callback over which to send transactions (state updates)
//   produced by the view. If you specify this, you probably want to
//   make sure this ends up calling the view's
//   [`updateState`](#view.EditorView.updateState) method with a new
//   state that has the transaction
//   [applied](#state.EditorState.apply).

exports.EditorView = EditorView;
exports.Decoration = Decoration;
exports.DecorationSet = DecorationSet;
exports.__serializeForClipboard = serializeForClipboard;
exports.__parseFromClipboard = parseFromClipboard;
//# sourceMappingURL=index.js.map


/***/ })
/******/ ]);
//# sourceMappingURL=editor.js.map