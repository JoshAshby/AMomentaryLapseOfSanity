// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@bikeshaving/crank/esm/index-e98190bc.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = __generator;
exports.c = createElement;
exports.d = __extends;
exports.e = __values;
exports.g = __read;
exports.i = isElement;
exports.f = exports.b = exports.a = exports.T = exports.S = exports.R = exports.P = exports.F = exports.D = exports.C = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.f = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.f = __assign;

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2015 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */

/**
 * @typedef {object} PrivateData
 * @property {EventTarget} eventTarget The event target.
 * @property {{type:string}} event The original event object.
 * @property {number} eventPhase The current event phase.
 * @property {EventTarget|null} currentTarget The current event target.
 * @property {boolean} canceled The flag to prevent default.
 * @property {boolean} stopped The flag to stop propagation.
 * @property {boolean} immediateStopped The flag to stop propagation immediately.
 * @property {Function|null} passiveListener The listener if the current listener is passive. Otherwise this is null.
 * @property {number} timeStamp The unix time.
 * @private
 */

/**
 * Private data for event wrappers.
 * @type {WeakMap<Event, PrivateData>}
 * @private
 */


const privateData = new WeakMap();
/**
 * Cache for wrapper classes.
 * @type {WeakMap<Object, Function>}
 * @private
 */

const wrappers = new WeakMap();
/**
 * Get private data.
 * @param {Event} event The event object to get private data.
 * @returns {PrivateData} The private data of the event.
 * @private
 */

function pd(event) {
  const retv = privateData.get(event);
  console.assert(retv != null, "'this' is expected an Event object, but got", event);
  return retv;
}
/**
 * https://dom.spec.whatwg.org/#set-the-canceled-flag
 * @param data {PrivateData} private data.
 */


function setCancelFlag(data) {
  if (data.passiveListener != null) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error("Unable to preventDefault inside passive event listener invocation.", data.passiveListener);
    }

    return;
  }

  if (!data.event.cancelable) {
    return;
  }

  data.canceled = true;

  if (typeof data.event.preventDefault === "function") {
    data.event.preventDefault();
  }
}
/**
 * @see https://dom.spec.whatwg.org/#interface-event
 * @private
 */

/**
 * The event wrapper.
 * @constructor
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Event|{type:string}} event The original event to wrap.
 */


function Event(eventTarget, event) {
  privateData.set(this, {
    eventTarget,
    event,
    eventPhase: 2,
    currentTarget: eventTarget,
    canceled: false,
    stopped: false,
    immediateStopped: false,
    passiveListener: null,
    timeStamp: event.timeStamp || Date.now()
  }); // https://heycam.github.io/webidl/#Unforgeable

  Object.defineProperty(this, "isTrusted", {
    value: false,
    enumerable: true
  }); // Define accessors

  const keys = Object.keys(event);

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];

    if (!(key in this)) {
      Object.defineProperty(this, key, defineRedirectDescriptor(key));
    }
  }
} // Should be enumerable, but class methods are not enumerable.


Event.prototype = {
  /**
   * The type of this event.
   * @type {string}
   */
  get type() {
    return pd(this).event.type;
  },

  /**
   * The target of this event.
   * @type {EventTarget}
   */
  get target() {
    return pd(this).eventTarget;
  },

  /**
   * The target of this event.
   * @type {EventTarget}
   */
  get currentTarget() {
    return pd(this).currentTarget;
  },

  /**
   * @returns {EventTarget[]} The composed path of this event.
   */
  composedPath() {
    const currentTarget = pd(this).currentTarget;

    if (currentTarget == null) {
      return [];
    }

    return [currentTarget];
  },

  /**
   * Constant of NONE.
   * @type {number}
   */
  get NONE() {
    return 0;
  },

  /**
   * Constant of CAPTURING_PHASE.
   * @type {number}
   */
  get CAPTURING_PHASE() {
    return 1;
  },

  /**
   * Constant of AT_TARGET.
   * @type {number}
   */
  get AT_TARGET() {
    return 2;
  },

  /**
   * Constant of BUBBLING_PHASE.
   * @type {number}
   */
  get BUBBLING_PHASE() {
    return 3;
  },

  /**
   * The target of this event.
   * @type {number}
   */
  get eventPhase() {
    return pd(this).eventPhase;
  },

  /**
   * Stop event bubbling.
   * @returns {void}
   */
  stopPropagation() {
    const data = pd(this);
    data.stopped = true;

    if (typeof data.event.stopPropagation === "function") {
      data.event.stopPropagation();
    }
  },

  /**
   * Stop event bubbling.
   * @returns {void}
   */
  stopImmediatePropagation() {
    const data = pd(this);
    data.stopped = true;
    data.immediateStopped = true;

    if (typeof data.event.stopImmediatePropagation === "function") {
      data.event.stopImmediatePropagation();
    }
  },

  /**
   * The flag to be bubbling.
   * @type {boolean}
   */
  get bubbles() {
    return Boolean(pd(this).event.bubbles);
  },

  /**
   * The flag to be cancelable.
   * @type {boolean}
   */
  get cancelable() {
    return Boolean(pd(this).event.cancelable);
  },

  /**
   * Cancel this event.
   * @returns {void}
   */
  preventDefault() {
    setCancelFlag(pd(this));
  },

  /**
   * The flag to indicate cancellation state.
   * @type {boolean}
   */
  get defaultPrevented() {
    return pd(this).canceled;
  },

  /**
   * The flag to be composed.
   * @type {boolean}
   */
  get composed() {
    return Boolean(pd(this).event.composed);
  },

  /**
   * The unix time of this event.
   * @type {number}
   */
  get timeStamp() {
    return pd(this).timeStamp;
  },

  /**
   * The target of this event.
   * @type {EventTarget}
   * @deprecated
   */
  get srcElement() {
    return pd(this).eventTarget;
  },

  /**
   * The flag to stop event bubbling.
   * @type {boolean}
   * @deprecated
   */
  get cancelBubble() {
    return pd(this).stopped;
  },

  set cancelBubble(value) {
    if (!value) {
      return;
    }

    const data = pd(this);
    data.stopped = true;

    if (typeof data.event.cancelBubble === "boolean") {
      data.event.cancelBubble = true;
    }
  },

  /**
   * The flag to indicate cancellation state.
   * @type {boolean}
   * @deprecated
   */
  get returnValue() {
    return !pd(this).canceled;
  },

  set returnValue(value) {
    if (!value) {
      setCancelFlag(pd(this));
    }
  },

  /**
   * Initialize this event object. But do nothing under event dispatching.
   * @param {string} type The event type.
   * @param {boolean} [bubbles=false] The flag to be possible to bubble up.
   * @param {boolean} [cancelable=false] The flag to be possible to cancel.
   * @deprecated
   */
  initEvent() {// Do nothing.
  }

}; // `constructor` is not enumerable.

Object.defineProperty(Event.prototype, "constructor", {
  value: Event,
  configurable: true,
  writable: true
}); // Ensure `event instanceof window.Event` is `true`.

if (typeof window !== "undefined" && typeof window.Event !== "undefined") {
  Object.setPrototypeOf(Event.prototype, window.Event.prototype); // Make association for wrappers.

  wrappers.set(window.Event.prototype, Event);
}
/**
 * Get the property descriptor to redirect a given property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to redirect the property.
 * @private
 */


function defineRedirectDescriptor(key) {
  return {
    get() {
      return pd(this).event[key];
    },

    set(value) {
      pd(this).event[key] = value;
    },

    configurable: true,
    enumerable: true
  };
}
/**
 * Get the property descriptor to call a given method property.
 * @param {string} key Property name to define property descriptor.
 * @returns {PropertyDescriptor} The property descriptor to call the method property.
 * @private
 */


function defineCallDescriptor(key) {
  return {
    value() {
      const event = pd(this).event;
      return event[key].apply(event, arguments);
    },

    configurable: true,
    enumerable: true
  };
}
/**
 * Define new wrapper class.
 * @param {Function} BaseEvent The base wrapper class.
 * @param {Object} proto The prototype of the original event.
 * @returns {Function} The defined wrapper class.
 * @private
 */


function defineWrapper(BaseEvent, proto) {
  const keys = Object.keys(proto);

  if (keys.length === 0) {
    return BaseEvent;
  }
  /** CustomEvent */


  function CustomEvent(eventTarget, event) {
    BaseEvent.call(this, eventTarget, event);
  }

  CustomEvent.prototype = Object.create(BaseEvent.prototype, {
    constructor: {
      value: CustomEvent,
      configurable: true,
      writable: true
    }
  }); // Define accessors.

  for (let i = 0; i < keys.length; ++i) {
    const key = keys[i];

    if (!(key in BaseEvent.prototype)) {
      const descriptor = Object.getOwnPropertyDescriptor(proto, key);
      const isFunc = typeof descriptor.value === "function";
      Object.defineProperty(CustomEvent.prototype, key, isFunc ? defineCallDescriptor(key) : defineRedirectDescriptor(key));
    }
  }

  return CustomEvent;
}
/**
 * Get the wrapper class of a given prototype.
 * @param {Object} proto The prototype of the original event to get its wrapper.
 * @returns {Function} The wrapper class.
 * @private
 */


function getWrapper(proto) {
  if (proto == null || proto === Object.prototype) {
    return Event;
  }

  let wrapper = wrappers.get(proto);

  if (wrapper == null) {
    wrapper = defineWrapper(getWrapper(Object.getPrototypeOf(proto)), proto);
    wrappers.set(proto, wrapper);
  }

  return wrapper;
}
/**
 * Wrap a given event to management a dispatching.
 * @param {EventTarget} eventTarget The event target of this dispatching.
 * @param {Object} event The event to wrap.
 * @returns {Event} The wrapper instance.
 * @private
 */


function wrapEvent(eventTarget, event) {
  const Wrapper = getWrapper(Object.getPrototypeOf(event));
  return new Wrapper(eventTarget, event);
}
/**
 * Get the immediateStopped flag of a given event.
 * @param {Event} event The event to get.
 * @returns {boolean} The flag to stop propagation immediately.
 * @private
 */


function isStopped(event) {
  return pd(event).immediateStopped;
}
/**
 * Set the current event phase of a given event.
 * @param {Event} event The event to set current target.
 * @param {number} eventPhase New event phase.
 * @returns {void}
 * @private
 */


function setEventPhase(event, eventPhase) {
  pd(event).eventPhase = eventPhase;
}
/**
 * Set the current target of a given event.
 * @param {Event} event The event to set current target.
 * @param {EventTarget|null} currentTarget New current target.
 * @returns {void}
 * @private
 */


function setCurrentTarget(event, currentTarget) {
  pd(event).currentTarget = currentTarget;
}
/**
 * Set a passive listener of a given event.
 * @param {Event} event The event to set current target.
 * @param {Function|null} passiveListener New passive listener.
 * @returns {void}
 * @private
 */


function setPassiveListener(event, passiveListener) {
  pd(event).passiveListener = passiveListener;
}
/**
 * @typedef {object} ListenerNode
 * @property {Function} listener
 * @property {1|2|3} listenerType
 * @property {boolean} passive
 * @property {boolean} once
 * @property {ListenerNode|null} next
 * @private
 */

/**
 * @type {WeakMap<object, Map<string, ListenerNode>>}
 * @private
 */


const listenersMap = new WeakMap(); // Listener types

const CAPTURE = 1;
const BUBBLE = 2;
const ATTRIBUTE = 3;
/**
 * Check whether a given value is an object or not.
 * @param {any} x The value to check.
 * @returns {boolean} `true` if the value is an object.
 */

function isObject(x) {
  return x !== null && typeof x === "object"; //eslint-disable-line no-restricted-syntax
}
/**
 * Get listeners.
 * @param {EventTarget} eventTarget The event target to get.
 * @returns {Map<string, ListenerNode>} The listeners.
 * @private
 */


function getListeners(eventTarget) {
  const listeners = listenersMap.get(eventTarget);

  if (listeners == null) {
    throw new TypeError("'this' is expected an EventTarget object, but got another value.");
  }

  return listeners;
}
/**
 * Get the property descriptor for the event attribute of a given event.
 * @param {string} eventName The event name to get property descriptor.
 * @returns {PropertyDescriptor} The property descriptor.
 * @private
 */


function defineEventAttributeDescriptor(eventName) {
  return {
    get() {
      const listeners = getListeners(this);
      let node = listeners.get(eventName);

      while (node != null) {
        if (node.listenerType === ATTRIBUTE) {
          return node.listener;
        }

        node = node.next;
      }

      return null;
    },

    set(listener) {
      if (typeof listener !== "function" && !isObject(listener)) {
        listener = null; // eslint-disable-line no-param-reassign
      }

      const listeners = getListeners(this); // Traverse to the tail while removing old value.

      let prev = null;
      let node = listeners.get(eventName);

      while (node != null) {
        if (node.listenerType === ATTRIBUTE) {
          // Remove old value.
          if (prev !== null) {
            prev.next = node.next;
          } else if (node.next !== null) {
            listeners.set(eventName, node.next);
          } else {
            listeners.delete(eventName);
          }
        } else {
          prev = node;
        }

        node = node.next;
      } // Add new value.


      if (listener !== null) {
        const newNode = {
          listener,
          listenerType: ATTRIBUTE,
          passive: false,
          once: false,
          next: null
        };

        if (prev === null) {
          listeners.set(eventName, newNode);
        } else {
          prev.next = newNode;
        }
      }
    },

    configurable: true,
    enumerable: true
  };
}
/**
 * Define an event attribute (e.g. `eventTarget.onclick`).
 * @param {Object} eventTargetPrototype The event target prototype to define an event attrbite.
 * @param {string} eventName The event name to define.
 * @returns {void}
 */


function defineEventAttribute(eventTargetPrototype, eventName) {
  Object.defineProperty(eventTargetPrototype, `on${eventName}`, defineEventAttributeDescriptor(eventName));
}
/**
 * Define a custom EventTarget with event attributes.
 * @param {string[]} eventNames Event names for event attributes.
 * @returns {EventTarget} The custom EventTarget.
 * @private
 */


function defineCustomEventTarget(eventNames) {
  /** CustomEventTarget */
  function CustomEventTarget() {
    EventTarget.call(this);
  }

  CustomEventTarget.prototype = Object.create(EventTarget.prototype, {
    constructor: {
      value: CustomEventTarget,
      configurable: true,
      writable: true
    }
  });

  for (let i = 0; i < eventNames.length; ++i) {
    defineEventAttribute(CustomEventTarget.prototype, eventNames[i]);
  }

  return CustomEventTarget;
}
/**
 * EventTarget.
 *
 * - This is constructor if no arguments.
 * - This is a function which returns a CustomEventTarget constructor if there are arguments.
 *
 * For example:
 *
 *     class A extends EventTarget {}
 *     class B extends EventTarget("message") {}
 *     class C extends EventTarget("message", "error") {}
 *     class D extends EventTarget(["message", "error"]) {}
 */


function EventTarget() {
  /*eslint-disable consistent-return */
  if (this instanceof EventTarget) {
    listenersMap.set(this, new Map());
    return;
  }

  if (arguments.length === 1 && Array.isArray(arguments[0])) {
    return defineCustomEventTarget(arguments[0]);
  }

  if (arguments.length > 0) {
    const types = new Array(arguments.length);

    for (let i = 0; i < arguments.length; ++i) {
      types[i] = arguments[i];
    }

    return defineCustomEventTarget(types);
  }

  throw new TypeError("Cannot call a class as a function");
  /*eslint-enable consistent-return */
} // Should be enumerable, but class methods are not enumerable.


EventTarget.prototype = {
  /**
   * Add a given listener to this event target.
   * @param {string} eventName The event name to add.
   * @param {Function} listener The listener to add.
   * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
   * @returns {void}
   */
  addEventListener(eventName, listener, options) {
    if (listener == null) {
      return;
    }

    if (typeof listener !== "function" && !isObject(listener)) {
      throw new TypeError("'listener' should be a function or an object.");
    }

    const listeners = getListeners(this);
    const optionsIsObj = isObject(options);
    const capture = optionsIsObj ? Boolean(options.capture) : Boolean(options);
    const listenerType = capture ? CAPTURE : BUBBLE;
    const newNode = {
      listener,
      listenerType,
      passive: optionsIsObj && Boolean(options.passive),
      once: optionsIsObj && Boolean(options.once),
      next: null
    }; // Set it as the first node if the first node is null.

    let node = listeners.get(eventName);

    if (node === undefined) {
      listeners.set(eventName, newNode);
      return;
    } // Traverse to the tail while checking duplication..


    let prev = null;

    while (node != null) {
      if (node.listener === listener && node.listenerType === listenerType) {
        // Should ignore duplication.
        return;
      }

      prev = node;
      node = node.next;
    } // Add it.


    prev.next = newNode;
  },

  /**
   * Remove a given listener from this event target.
   * @param {string} eventName The event name to remove.
   * @param {Function} listener The listener to remove.
   * @param {boolean|{capture?:boolean,passive?:boolean,once?:boolean}} [options] The options for this listener.
   * @returns {void}
   */
  removeEventListener(eventName, listener, options) {
    if (listener == null) {
      return;
    }

    const listeners = getListeners(this);
    const capture = isObject(options) ? Boolean(options.capture) : Boolean(options);
    const listenerType = capture ? CAPTURE : BUBBLE;
    let prev = null;
    let node = listeners.get(eventName);

    while (node != null) {
      if (node.listener === listener && node.listenerType === listenerType) {
        if (prev !== null) {
          prev.next = node.next;
        } else if (node.next !== null) {
          listeners.set(eventName, node.next);
        } else {
          listeners.delete(eventName);
        }

        return;
      }

      prev = node;
      node = node.next;
    }
  },

  /**
   * Dispatch a given event.
   * @param {Event|{type:string}} event The event to dispatch.
   * @returns {boolean} `false` if canceled.
   */
  dispatchEvent(event) {
    if (event == null || typeof event.type !== "string") {
      throw new TypeError('"event.type" should be a string.');
    } // If listeners aren't registered, terminate.


    const listeners = getListeners(this);
    const eventName = event.type;
    let node = listeners.get(eventName);

    if (node == null) {
      return true;
    } // Since we cannot rewrite several properties, so wrap object.


    const wrappedEvent = wrapEvent(this, event); // This doesn't process capturing phase and bubbling phase.
    // This isn't participating in a tree.

    let prev = null;

    while (node != null) {
      // Remove this listener if it's once
      if (node.once) {
        if (prev !== null) {
          prev.next = node.next;
        } else if (node.next !== null) {
          listeners.set(eventName, node.next);
        } else {
          listeners.delete(eventName);
        }
      } else {
        prev = node;
      } // Call this listener


      setPassiveListener(wrappedEvent, node.passive ? node.listener : null);

      if (typeof node.listener === "function") {
        try {
          node.listener.call(this, wrappedEvent);
        } catch (err) {
          if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error(err);
          }
        }
      } else if (node.listenerType !== ATTRIBUTE && typeof node.listener.handleEvent === "function") {
        node.listener.handleEvent(wrappedEvent);
      } // Break if `event.stopImmediatePropagation` was called.


      if (isStopped(wrappedEvent)) {
        break;
      }

      node = node.next;
    }

    setPassiveListener(wrappedEvent, null);
    setEventPhase(wrappedEvent, 0);
    setCurrentTarget(wrappedEvent, null);
    return !wrappedEvent.defaultPrevented;
  }

}; // `constructor` is not enumerable.

Object.defineProperty(EventTarget.prototype, "constructor", {
  value: EventTarget,
  configurable: true,
  writable: true
}); // Ensure `eventTarget instanceof window.EventTarget` is `true`.

if (typeof window !== "undefined" && typeof window.EventTarget !== "undefined") {
  Object.setPrototypeOf(EventTarget.prototype, window.EventTarget.prototype);
}

function normalizeOptions(options) {
  var capture = false;
  var passive;
  var once;

  if (typeof options === "boolean") {
    capture = options;
  } else if (options != null) {
    capture = !!options.capture;
    passive = options.passive;
    once = options.once;
  }

  return {
    capture: capture,
    passive: passive,
    once: once
  };
}

function isEventTarget(value) {
  return value != null && typeof value.addEventListener === "function" && // TODO: maybe we don’t need these checks
  typeof value.removeEventListener === "function" && typeof value.dispatchEvent === "function";
}

var CrankEventTarget =
/** @class */
function (_super) {
  __extends(CrankEventTarget, _super);

  function CrankEventTarget(parent) {
    var _this = _super.call(this) || this;

    _this.parent = parent; // TODO: maybe use a helper class?
    // we need a map from:
    // type -> capture -> listener record
    // for efficient querying

    _this.listeners = undefined;
    _this.delegate = undefined;
    _this.delegates = undefined;
    return _this;
  }

  CrankEventTarget.prototype.setDelegate = function (delegate) {
    var e_1, _a, e_2, _b, e_3, _c, e_4, _d;

    if (this.delegates !== undefined) {
      if (this.listeners !== undefined) {
        try {
          for (var _e = __values(this.delegates), _f = _e.next(); !_f.done; _f = _e.next()) {
            var delegate_1 = _f.value;

            try {
              for (var _g = (e_2 = void 0, __values(this.listeners)), _h = _g.next(); !_h.done; _h = _g.next()) {
                var listener = _h.value;
                delegate_1.removeEventListener(listener.type, listener.callback, listener.options);
              }
            } catch (e_2_1) {
              e_2 = {
                error: e_2_1
              };
            } finally {
              try {
                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
              } finally {
                if (e_2) throw e_2.error;
              }
            }
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }

      this.delegates = undefined;
    }

    if (this.delegate !== delegate) {
      if (this.listeners !== undefined) {
        if (this.delegate !== undefined) {
          try {
            for (var _j = __values(this.listeners), _k = _j.next(); !_k.done; _k = _j.next()) {
              var listener = _k.value;
              this.delegate.removeEventListener(listener.type, listener.callback, listener.options);
            }
          } catch (e_3_1) {
            e_3 = {
              error: e_3_1
            };
          } finally {
            try {
              if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
            } finally {
              if (e_3) throw e_3.error;
            }
          }
        }

        try {
          for (var _l = __values(this.listeners), _m = _l.next(); !_m.done; _m = _l.next()) {
            var listener = _m.value;
            delegate.addEventListener(listener.type, listener.callback, listener.options);
          }
        } catch (e_4_1) {
          e_4 = {
            error: e_4_1
          };
        } finally {
          try {
            if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
          } finally {
            if (e_4) throw e_4.error;
          }
        }
      }

      this.delegate = delegate;
    }
  };

  CrankEventTarget.prototype.setDelegates = function (delegates) {
    var e_5, _a, e_6, _b, e_7, _c, e_8, _d;

    var _this = this;

    if (this.delegate !== undefined) {
      this.delegates = new Set([this.delegate]);
      this.delegate = undefined;
    }

    var delegates1 = new Set(Array.from(delegates).filter(isEventTarget));

    if (this.listeners !== undefined) {
      var removed = void 0;
      var added = void 0;

      if (this.delegates === undefined) {
        removed = new Set();
        added = delegates1;
      } else {
        removed = new Set(Array.from(this.delegates).filter(function (d) {
          return !delegates1.has(d);
        }));
        added = new Set(Array.from(delegates1).filter(function (d) {
          return !_this.delegates.has(d);
        }));
      }

      try {
        for (var removed_1 = __values(removed), removed_1_1 = removed_1.next(); !removed_1_1.done; removed_1_1 = removed_1.next()) {
          var delegate = removed_1_1.value;

          try {
            for (var _e = (e_6 = void 0, __values(this.listeners)), _f = _e.next(); !_f.done; _f = _e.next()) {
              var listener = _f.value;
              delegate.removeEventListener(listener.type, listener.callback, listener.options);
            }
          } catch (e_6_1) {
            e_6 = {
              error: e_6_1
            };
          } finally {
            try {
              if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            } finally {
              if (e_6) throw e_6.error;
            }
          }
        }
      } catch (e_5_1) {
        e_5 = {
          error: e_5_1
        };
      } finally {
        try {
          if (removed_1_1 && !removed_1_1.done && (_a = removed_1.return)) _a.call(removed_1);
        } finally {
          if (e_5) throw e_5.error;
        }
      }

      try {
        for (var added_1 = __values(added), added_1_1 = added_1.next(); !added_1_1.done; added_1_1 = added_1.next()) {
          var delegate = added_1_1.value;

          try {
            for (var _g = (e_8 = void 0, __values(this.listeners)), _h = _g.next(); !_h.done; _h = _g.next()) {
              var listener = _h.value;
              delegate.addEventListener(listener.type, listener.callback, listener.options);
            }
          } catch (e_8_1) {
            e_8 = {
              error: e_8_1
            };
          } finally {
            try {
              if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
            } finally {
              if (e_8) throw e_8.error;
            }
          }
        }
      } catch (e_7_1) {
        e_7 = {
          error: e_7_1
        };
      } finally {
        try {
          if (added_1_1 && !added_1_1.done && (_c = added_1.return)) _c.call(added_1);
        } finally {
          if (e_7) throw e_7.error;
        }
      }
    }

    this.delegates = delegates1;
  };

  CrankEventTarget.prototype.addEventListener = function (type, callback, options) {
    var e_9, _a;

    if (callback == null) {
      return;
    } else if (typeof callback === "object") {
      throw new Error("Listener objects are not supported");
    } else if (this.listeners === undefined) {
      this.listeners = [];
    }

    options = normalizeOptions(options);
    var record = {
      type: type,
      callback: callback,
      options: options
    };

    if (options.once) {
      var self_1 = this;

      record.callback = function (ev) {
        var result = callback.call(this, ev);
        self_1.removeEventListener(record.type, record.callback, record.options);
        return result;
      };
    }

    var idx = this.listeners.findIndex(function (record1) {
      return record.type === record1.type && record.callback === record1.callback && record.options.capture === record1.options.capture;
    });

    if (idx <= -1) {
      this.listeners.push(record);
    }

    if (this.delegate !== undefined) {
      this.delegate.addEventListener(type, callback, options);
    } else if (this.delegates !== undefined) {
      try {
        for (var _b = __values(this.delegates), _c = _b.next(); !_c.done; _c = _b.next()) {
          var delegate = _c.value;
          delegate.addEventListener(type, callback, options);
        }
      } catch (e_9_1) {
        e_9 = {
          error: e_9_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_9) throw e_9.error;
        }
      }
    }

    return _super.prototype.addEventListener.call(this, type, callback, options);
  };

  CrankEventTarget.prototype.removeEventListener = function (type, callback, options) {
    var e_10, _a;

    if (callback == null || this.listeners === undefined) {
      return;
    }

    var capture = typeof options === "boolean" ? options : !!(options && options.capture);
    var idx = this.listeners.findIndex(function (record) {
      return record.type === type && record.callback === callback && record.options.capture === capture;
    });
    var record = this.listeners[idx];

    if (record !== undefined) {
      this.listeners.splice(idx, 1);
    }

    if (this.delegate !== undefined) {
      this.delegate.removeEventListener(type, callback, options);
    } else if (this.delegates !== undefined) {
      try {
        for (var _b = __values(this.delegates), _c = _b.next(); !_c.done; _c = _b.next()) {
          var delegate = _c.value;
          delegate.removeEventListener(type, callback, options);
        }
      } catch (e_10_1) {
        e_10 = {
          error: e_10_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_10) throw e_10.error;
        }
      }
    }

    return _super.prototype.removeEventListener.call(this, type, callback, options);
  };

  CrankEventTarget.prototype.clearEventListeners = function () {
    var e_11, _a;

    if (this.listeners !== undefined) {
      try {
        // we slice this.listeners to create a shallow copy because
        // this.removeEventListener will mutate the listeners array
        for (var _b = __values(this.listeners.slice()), _c = _b.next(); !_c.done; _c = _b.next()) {
          var listener = _c.value;
          this.removeEventListener(listener.type, listener.callback, listener.options);
        }
      } catch (e_11_1) {
        e_11 = {
          error: e_11_1
        };
      } finally {
        try {
          if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        } finally {
          if (e_11) throw e_11.error;
        }
      }
    }
  }; // TODO: ev is any because event-target-shim has a weird dispatchEvent type


  CrankEventTarget.prototype.dispatchEvent = function (ev) {
    var continued = _super.prototype.dispatchEvent.call(this, ev);

    if (continued && ev.bubbles && this.parent !== undefined) {
      // TODO: implement event capturing
      continued = this.parent.dispatchEvent(ev);
    }

    return continued;
  };

  return CrankEventTarget;
}(EventTarget);

function isPromiseLike(value) {
  return value != null && typeof value.then === "function";
}

function upgradePromiseLike(value) {
  if (!(value instanceof Promise)) {
    return Promise.resolve(value);
  }

  return value;
}

function isIterable(value) {
  return value != null && typeof value[Symbol.iterator] === "function";
}

function isNonStringIterable(value) {
  return typeof value !== "string" && isIterable(value);
}

function isIteratorOrAsyncIterator(value) {
  return value != null && typeof value.next === "function";
}

var _a;

var ElementSigil = Symbol.for("crank.ElementSigil"); // Special Intrinsic Tags
// TODO: We assert symbol tags as any because typescript support for symbol
// tags in JSX does not exist yet.
// https://github.com/microsoft/TypeScript/issues/38367

var Fragment = Symbol.for("crank.Fragment");
exports.F = Fragment;
var Copy = Symbol.for("crank.Copy");
exports.C = Copy;
var Portal = Symbol.for("crank.Portal");
exports.P = Portal;
var Raw = Symbol.for("crank.Raw");
exports.R = Raw;

function isElement(value) {
  return value != null && value.__sigil__ === ElementSigil;
}

function createElement(tag, props, children) {
  var key = props != null && props["crank-key"] != null ? props["crank-key"] : undefined;
  var props1 = {};

  for (var key_1 in props) {
    if (key_1 !== "crank-key") {
      props1[key_1] = props[key_1];
    }
  }

  var length = arguments.length;

  if (length > 3) {
    var children1 = [];

    while (length-- > 2) {
      children1[length - 2] = arguments[length];
    }

    props1.children = children1;
  } else if (length > 2) {
    props1.children = children;
  }

  return {
    __sigil__: ElementSigil,
    tag: tag,
    props: props1,
    key: key
  };
}

function normalize(child) {
  if (child == null || typeof child === "boolean") {
    return undefined;
  } else if (typeof child === "string" || isElement(child)) {
    return child;
  } else {
    return child.toString();
  }
}

function flatten(children) {
  var children_1, children_1_1, child, e_1_1;

  var e_1, _a;

  return __generator(this, function (_b) {
    switch (_b.label) {
      case 0:
        if (!(children == null)) return [3
        /*break*/
        , 1];
        return [2
        /*return*/
        ];

      case 1:
        if (!isNonStringIterable(children)) return [3
        /*break*/
        , 12];
        _b.label = 2;

      case 2:
        _b.trys.push([2, 9, 10, 11]);

        children_1 = __values(children), children_1_1 = children_1.next();
        _b.label = 3;

      case 3:
        if (!!children_1_1.done) return [3
        /*break*/
        , 8];
        child = children_1_1.value;
        if (!isNonStringIterable(child)) return [3
        /*break*/
        , 5];
        return [4
        /*yield*/
        , createElement(Fragment, null, child)];

      case 4:
        _b.sent();

        return [3
        /*break*/
        , 7];

      case 5:
        return [4
        /*yield*/
        , normalize(child)];

      case 6:
        _b.sent();

        _b.label = 7;

      case 7:
        children_1_1 = children_1.next();
        return [3
        /*break*/
        , 3];

      case 8:
        return [3
        /*break*/
        , 11];

      case 9:
        e_1_1 = _b.sent();
        e_1 = {
          error: e_1_1
        };
        return [3
        /*break*/
        , 11];

      case 10:
        try {
          if (children_1_1 && !children_1_1.done && (_a = children_1.return)) _a.call(children_1);
        } finally {
          if (e_1) throw e_1.error;
        }

        return [7
        /*endfinally*/
        ];

      case 11:
        return [2
        /*return*/
        ];

      case 12:
        return [4
        /*yield*/
        , normalize(children)];

      case 13:
        _b.sent();

        return [2
        /*return*/
        ];
    }
  });
}

var LeafNode =
/** @class */
function () {
  function LeafNode() {
    // flags
    this.dirty = true;
    this.internal = false;
    this.tag = undefined;
    this.key = undefined;
    this.value = undefined;
    this.previousSibling = undefined;
    this.nextSibling = undefined;
  }

  return LeafNode;
}();

var ParentNode =
/** @class */
function () {
  function ParentNode() {
    // flags
    this.dirty = true;
    this.moved = true;
    this.copied = false; // A flag which means that the parent has updated the current node. It is set
    // to false once the node has committed, and if this.updating is not true
    // when the node is refreshing or committing, this means that the work was
    // initiated by the current node or its descendants.
    // TODO: with the addition of passing a requester to parents when we want them to commit, maybe we shouldn’t have this flag at all

    this.updating = false; // A flag which means the current node is unmounted.

    this.unmounted = false;
    this.internal = true;
    this.key = undefined;
    this.value = undefined;
    this.dirtyStart = undefined; // TODO: implement dirtyEnd

    this.keyedChildren = undefined;
    this.firstChild = undefined;
    this.lastChild = undefined;
    this.previousSibling = undefined;
    this.nextSibling = undefined;
    this.alternate = undefined; // When children update asynchronously, we race their result against the next
    // update of children. The onNewResult property is set to the resolve
    // function of the promise which the current update is raced against.

    this.onNewResult = undefined;
    this.ctx = undefined;
    this.scope = undefined;
    this.childScope = undefined;
  }

  ParentNode.prototype.appendChild = function (child) {
    if (this.lastChild === undefined) {
      this.firstChild = child;
      this.lastChild = child;
      child.previousSibling = undefined;
      child.nextSibling = undefined;
    } else {
      child.previousSibling = this.lastChild;
      child.nextSibling = undefined;
      this.lastChild.nextSibling = child;
      this.lastChild = child;
    }
  };

  ParentNode.prototype.insertBefore = function (child, reference) {
    if (reference == null) {
      this.appendChild(child);
      return;
    } else if (child === reference) {
      return;
    }

    child.nextSibling = reference;

    if (reference.previousSibling === undefined) {
      child.previousSibling = undefined;
      this.firstChild = child;
    } else {
      child.previousSibling = reference.previousSibling;
      reference.previousSibling.nextSibling = child;
    }

    reference.previousSibling = child;
  };

  ParentNode.prototype.removeChild = function (child) {
    if (child.previousSibling === undefined) {
      this.firstChild = child.nextSibling;
    } else {
      child.previousSibling.nextSibling = child.nextSibling;
    }

    if (child.nextSibling === undefined) {
      this.lastChild = child.previousSibling;
    } else {
      child.nextSibling.previousSibling = child.previousSibling;
    }

    child.previousSibling = undefined;
    child.nextSibling = undefined;
  };

  ParentNode.prototype.replaceChild = function (child, reference) {
    this.insertBefore(child, reference);
    this.removeChild(reference);
  };

  ParentNode.prototype.update = function (props) {
    this.props = props;
    this.updating = true;
    return this.updateChildren(this.props && this.props.children);
  }; // TODO: reduce duplication and complexity of this method :P


  ParentNode.prototype.updateChildren = function (children) {
    var e_2, _a, e_3, _b;

    var _this = this;

    var result;
    var keyedChildren;
    var node = this.firstChild;

    var _loop_1 = function (child) {
      // Alignment
      var tag = typeof child === "object" ? child.tag : undefined;
      var key = typeof child === "object" ? child.key : undefined;

      if (key !== undefined && keyedChildren !== undefined && keyedChildren.has(key)) {
        // TODO: warn about a key collision
        key = undefined;
      }

      if (node === undefined) {
        if (key === undefined) {
          if (tag === Copy) {
            return "continue";
          }

          node = createNode(this_1, this_1.renderer, child);
          this_1.appendChild(node);
        } else {
          node = this_1.keyedChildren && this_1.keyedChildren.get(key);

          if (node === undefined) {
            if (tag === Copy) {
              return "continue";
            }

            node = createNode(this_1, this_1.renderer, child);
          } else {
            this_1.keyedChildren.delete(key);
            node.moved = true;
            this_1.removeChild(node);
          }

          this_1.appendChild(node);
        }
      } else if (key !== undefined) {
        var keyedNode = this_1.keyedChildren && this_1.keyedChildren.get(key);

        if (keyedNode === undefined) {
          if (tag === Copy) {
            return "continue";
          }

          keyedNode = createNode(this_1, this_1.renderer, child);
          this_1.insertBefore(keyedNode, node);
        } else {
          this_1.keyedChildren.delete(key);

          if (node !== keyedNode) {
            keyedNode.moved = true;
            this_1.removeChild(keyedNode);
            this_1.insertBefore(keyedNode, node);
          }
        }

        node = keyedNode;
      } else if (node.key !== undefined) {
        while (node !== undefined && node.key !== undefined) {
          node = node.nextSibling;
        }

        if (node === undefined) {
          if (tag === Copy) {
            return "continue";
          }

          node = createNode(this_1, this_1.renderer, child);
          this_1.appendChild(node);
        }
      } // Updating


      if (tag === Copy) {
        if (node.internal) {
          node.copied = true;
        }
      } else if (node.tag === tag) {
        if (node.internal) {
          var result1_1 = node.update(child.props);

          if (result1_1 !== undefined) {
            result = result === undefined ? result1_1 : result.then(function () {
              return result1_1;
            });
          }
        } else if (typeof child === "string") {
          var text = this_1.renderer.text(child);
          node.dirty = node.value !== text;
          node.value = text;
        } else {
          node.dirty = node.value !== undefined;
          node.value = undefined;
        }
      } else {
        // replace current node
        var newNode_1 = createNode(this_1, this_1.renderer, child);
        var result1_2;

        if (newNode_1.internal) {
          result1_2 = newNode_1.update(child.props);
        } else if (typeof child === "string") {
          newNode_1.value = this_1.renderer.text(child);
        } else {
          newNode_1.value = undefined;
        }

        if (result1_2 === undefined) {
          if (node.internal) {
            node.unmount();
          }
        } else {
          newNode_1.alternate = node;
          result1_2 = result1_2.then(function () {
            // TODO: do we need to unmount all alternates along the chain?
            for (var node_1 = newNode_1.alternate; node_1 !== undefined; node_1 = node_1.alternate) {
              if (node_1.internal) {
                node_1.unmount();
              }
            }

            newNode_1.alternate = undefined;
            return undefined; // void :(
          });
          result = result === undefined ? result1_2 : result.then(function () {
            return result1_2;
          });
        }

        this_1.replaceChild(newNode_1, node);
        node = newNode_1;
      }

      if (key !== undefined) {
        if (keyedChildren === undefined) {
          keyedChildren = new Map();
        }

        keyedChildren.set(key, node);
      }

      node = node.nextSibling;
    };

    var this_1 = this;

    try {
      // TODO: split this algorithm into two stages.
      // Stage 1: Alignment
      // Stage 2: Updating
      for (var _c = __values(flatten(children)), _d = _c.next(); !_d.done; _d = _c.next()) {
        var child = _d.value;

        _loop_1(child);
      }
    } catch (e_2_1) {
      e_2 = {
        error: e_2_1
      };
    } finally {
      try {
        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
      } finally {
        if (e_2) throw e_2.error;
      }
    }

    for (var nextSibling = node && node.nextSibling; node !== undefined; node = nextSibling, nextSibling = node && node.nextSibling) {
      if (node.key === undefined) {
        if (node.internal) {
          node.unmount();
        }

        this.removeChild(node);
      }
    } // unmount excess keyed children
    // TODO: this is likely where the logic for asynchronous unmounting would go


    if (this.keyedChildren !== undefined) {
      try {
        for (var _e = __values(this.keyedChildren.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
          var node_2 = _f.value;
          node_2.unmount();
          this.removeChild(node_2);
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        } finally {
          if (e_3) throw e_3.error;
        }
      }
    }

    this.keyedChildren = keyedChildren;

    if (this.onNewResult !== undefined) {
      this.onNewResult(result);
      this.onNewResult = undefined;
    }

    if (result !== undefined) {
      var newResult = new Promise(function (resolve) {
        return _this.onNewResult = resolve;
      });
      return Promise.race([result, newResult]);
    }
  };

  ParentNode.prototype.commitChildren = function (requester) {
    var buffer;
    var childValues = [];
    var oldLength = 0;

    for (var child = this.firstChild; child !== undefined; child = child.nextSibling) {
      var child1 = void 0;

      if (child.alternate !== undefined) {
        child1 = child;

        while (child.alternate !== undefined) {
          child = child.alternate;
        }
      } // TODO: come up with a better algorithm if a requester is passed in


      if (requester === undefined && child.internal && !child.copied) {
        child.commit();
      }

      if (typeof child.value === "string") {
        buffer = buffer === undefined ? child.value : buffer + child.value;
      } else if (child.tag !== Portal) {
        if (buffer !== undefined) {
          childValues.push(buffer);
          buffer = undefined;
        }

        if (Array.isArray(child.value)) {
          childValues = childValues.concat(child.value);
        } else if (child.value !== undefined) {
          childValues.push(child.value);
        }
      }

      if (child.dirty || child.internal && child.moved) {
        if (!this.dirty) {
          if (child.internal && !child.moved && child.dirtyStart !== undefined) {
            this.dirtyStart = oldLength + child.dirtyStart;
          } else {
            for (var dirtyStart = oldLength - 1; dirtyStart >= 0; dirtyStart--) {
              if (typeof childValues[dirtyStart] !== "string") {
                this.dirtyStart = dirtyStart;
                break;
              }
            }
          }

          this.dirty = true;
        }
      }

      child.dirty = false;

      if (child.internal) {
        child.copied = false;
        child.moved = false;
        child.dirtyStart = undefined;
      }

      oldLength = childValues.length;

      if (child1 !== undefined) {
        child = child1;
      }
    }

    if (buffer !== undefined) {
      childValues.push(buffer);
    }

    return childValues;
  };

  ParentNode.prototype.unmountChildren = function (dirty) {
    for (var node = this.firstChild; node !== undefined; node = node.nextSibling) {
      if (node.internal) {
        node.unmount(dirty);
      }
    }
  };

  ParentNode.prototype.catch = function (reason) {
    if (this.parent === undefined) {
      throw reason;
    }

    return this.parent.catch(reason);
  };

  return ParentNode;
}();

var FragmentNode =
/** @class */
function (_super) {
  __extends(FragmentNode, _super);

  function FragmentNode(parent, renderer, key) {
    var _this = _super.call(this) || this;

    _this.tag = Fragment;
    _this.key = key;
    _this.parent = parent;
    _this.renderer = renderer;
    _this.ctx = parent.ctx;
    _this.scope = parent.childScope;
    return _this;
  }

  FragmentNode.prototype.commit = function (requester) {
    var childValues = this.commitChildren(requester);
    this.value = childValues.length > 1 ? childValues : childValues[0];

    if (requester !== undefined) {
      this.parent.commit(requester);
    }

    this.updating = false;
    return; // void :(
  };

  FragmentNode.prototype.unmount = function (dirty) {
    if (dirty === void 0) {
      dirty = true;
    }

    if (this.unmounted) {
      return;
    }

    this.unmounted = true;
    this.unmountChildren(dirty);
  };

  return FragmentNode;
}(ParentNode);

var HostNode =
/** @class */
function (_super) {
  __extends(HostNode, _super);

  function HostNode(parent, renderer, tag, key, props) {
    var _this = _super.call(this) || this; // flags


    _this.dirtyProps = true;
    _this.dirtyChildren = true;
    _this.dirtyRemoval = true; // A flag to make sure the HostContext isn’t iterated multiple times without a yield.

    _this.iterating = false; // A flag which indicates that this node’s iterator has returned, as in, it
    // produced an iteration whose done property is set to true.

    _this.finished = false;
    _this.value = undefined;
    _this.iterator = undefined;
    _this.childValues = [];
    _this.tag = tag;
    _this.key = key;
    _this.parent = parent;
    _this.renderer = renderer;
    _this.intrinsic = renderer.intrinsic(tag);
    _this.ctx = parent && parent.ctx;
    _this.scope = parent && parent.childScope;
    _this.childScope = renderer.scope(tag, props);
    return _this;
  }

  HostNode.prototype.commit = function (requester) {
    this.childValues = this.commitChildren(requester);
    this.dirtyProps = requester === undefined;
    this.dirtyChildren = this.dirty;
    this.updating = false;

    try {
      this.commitSelf();
    } catch (err) {
      if (this.parent === undefined) {
        throw err;
      }

      return this.parent.catch(err);
    }

    if (this.dirty && requester !== undefined && this.parent !== undefined) {
      this.parent.commit(this);
    }
  };

  HostNode.prototype.commitSelf = function () {
    if (this.iterator === undefined) {
      var value = this.intrinsic.call(this, __assign(__assign({}, this.props), {
        children: this.childValues
      }));

      if (isIteratorOrAsyncIterator(value)) {
        this.iterator = value;
      } else {
        this.dirty = this.value !== value;
        this.value = value;
        return;
      }
    }

    var iteration = this.iterator.next();
    this.dirty = this.value !== iteration.value;
    this.value = iteration.value;
    this.iterating = false;

    if (iteration.done) {
      this.finished = true;
    }
  };

  HostNode.prototype.unmount = function (dirty) {
    if (dirty === void 0) {
      dirty = true;
    }

    if (this.unmounted) {
      return;
    } else if (!this.finished) {
      this.dirtyRemoval = dirty;

      if (this.iterator !== undefined && this.iterator.return) {
        try {
          this.iterator.return();
        } catch (err) {
          if (this.parent === undefined) {
            throw err;
          }

          return this.parent.catch(err);
        }
      }

      this.finished = true;
    }

    this.unmounted = true;
    this.unmountChildren(this.tag === Portal);
  };

  HostNode.prototype[Symbol.iterator] = function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!!this.unmounted) return [3
          /*break*/
          , 2];

          if (this.iterating) {
            throw new Error("You must yield for each iteration of this.");
          }

          this.iterating = true;
          return [4
          /*yield*/
          , __assign(__assign({}, this.props), {
            children: this.childValues
          })];

        case 1:
          _a.sent();

          return [3
          /*break*/
          , 0];

        case 2:
          return [2
          /*return*/
          ];
      }
    });
  };

  return HostNode;
}(ParentNode);

var SyncFn = 0;
var AsyncFn = 1;
var SyncGen = 2;
var AsyncGen = 3;

var ComponentNode =
/** @class */
function (_super) {
  __extends(ComponentNode, _super);

  function ComponentNode(parent, renderer, tag, key, props) {
    var _this = _super.call(this) || this; // A flag to make sure the Context isn’t iterated multiple times without a yield.


    _this.iterating = false; // A flag which indicates that this node’s iterator has returned, as in, it
    // produced an iteration whose done property is set to true.

    _this.finished = false; // A flag to make sure we aren’t stepping through generators multiple times
    // synchronously. This can happen if a generator component yields some
    // children, those children dispatch an event, and the currently yielding
    // node listens to the event and dispatches another event. We simply fail
    // silently when this occurs, though we may in the future log a warning.

    _this.stepping = false; // A flag used by the [Symbol.asyncIterator] method of component nodes to
    // indicate when props are available. this.onProps is the resolve function of
    // the promise which resolves when props are made available.
    // TODO: maybe we can use the existence/absence of this.onProps instead of
    // boolean flag.

    _this.available = false;
    _this.iterator = undefined;
    _this.oldResult = undefined;
    _this.componentType = undefined; // TODO: explain these properties

    _this.inflightPending = undefined;
    _this.enqueuedPending = undefined;
    _this.inflightResult = undefined;
    _this.enqueuedResult = undefined;
    _this.onProps = undefined;
    _this.provisions = undefined;
    _this.parent = parent;
    _this.renderer = renderer;
    _this.tag = tag;
    _this.key = key;
    _this.props = props;
    _this.ctx = new Context(_this, parent.ctx);
    _this.scope = parent.childScope;
    return _this;
  }

  ComponentNode.prototype.refresh = function () {
    var _this = this;

    if (this.stepping || this.unmounted) {
      // TODO: we may want to log warnings when stuff like this happens
      return;
    }

    if (this.onProps === undefined) {
      this.available = true;
    } else {
      this.onProps(this.props);
      this.onProps = undefined;
    }

    var result = this.run();

    if (result === undefined) {
      this.commit();
      return;
    }

    return result.then(function () {
      return _this.commit();
    });
  };

  ComponentNode.prototype.update = function (props) {
    this.props = props;
    this.updating = true;

    if (this.onProps === undefined) {
      this.available = true;
    } else {
      this.onProps(this.props);
      this.onProps = undefined;
    }

    return this.run();
  };

  ComponentNode.prototype.updateChildren = function (children) {
    if (isNonStringIterable(children)) {
      children = createElement(Fragment, null, children);
    }

    return _super.prototype.updateChildren.call(this, children);
  };

  ComponentNode.prototype.run = function () {
    var _this = this;

    if (this.inflightPending === undefined) {
      var _a = __read(this.step(), 2),
          pending_1 = _a[0],
          result = _a[1];

      if (isPromiseLike(pending_1)) {
        this.inflightPending = pending_1.finally(function () {
          return _this.advance();
        });
      }

      this.inflightResult = result;
      return this.inflightResult;
    } else if (this.componentType === AsyncGen) {
      return this.inflightResult;
    } else if (this.enqueuedPending === undefined) {
      var resolve_1;
      this.enqueuedPending = this.inflightPending.then(function () {
        var _a = __read(_this.step(), 2),
            pending = _a[0],
            result = _a[1];

        resolve_1(result);
        return pending;
      }).finally(function () {
        return _this.advance();
      });
      this.enqueuedResult = new Promise(function (resolve1) {
        return resolve_1 = resolve1;
      });
    }

    return this.enqueuedResult;
  };

  ComponentNode.prototype.step = function () {
    var _this = this;

    if (this.finished) {
      return [undefined, undefined];
    }

    this.stepping = true;

    if (this.iterator === undefined) {
      this.ctx.clearEventListeners();
      var value = void 0;

      try {
        value = this.tag.call(this.ctx, this.props);
      } catch (err) {
        var caught = this.parent.catch(err);
        return [undefined, caught];
      }

      if (isIteratorOrAsyncIterator(value)) {
        this.iterator = value;
      } else if (isPromiseLike(value)) {
        var value1 = upgradePromiseLike(value);
        this.componentType = AsyncFn;
        var pending_2 = value1.then(function () {
          return undefined;
        }, function () {
          return undefined;
        }); // void :(

        var result_1 = value1.then(function (child) {
          return _this.updateChildren(child);
        }, function (err) {
          return _this.parent.catch(err);
        });
        this.stepping = false;
        return [pending_2, result_1];
      } else {
        this.componentType = SyncFn;
        var result_2 = this.updateChildren(value);
        this.stepping = false;
        return [undefined, result_2];
      }
    }

    var oldValue = this.oldResult === undefined ? this.value : this.oldResult.then(function () {
      return _this.value;
    });
    this.oldResult = undefined;
    var iteration;

    try {
      iteration = this.iterator.next(oldValue);
    } catch (err) {
      var caught = this.parent.catch(err);
      return [caught, caught];
    }

    this.stepping = false;

    if (isPromiseLike(iteration)) {
      this.componentType = AsyncGen;
      iteration = iteration.catch(function (err) {
        var p = _this.parent.catch(err);

        if (p === undefined) {
          return {
            value: undefined,
            done: true
          };
        }

        return p.then(function () {
          return {
            value: undefined,
            done: true
          };
        });
      });
      var pending_3 = iteration.then(function () {
        return undefined;
      }, function () {
        return undefined;
      }); // void :(

      var result_3 = iteration.then(function (iteration) {
        _this.iterating = false;

        if (iteration.done) {
          _this.finished = true;
        }

        var result = _this.updateChildren(iteration.value); // TODO: we commit async generator components because there’s a race
        // condition with advance when we don’t commit for some reason.


        if (result === undefined) {
          _this.commit();
        } else {
          result = result.then(function () {
            return _this.commit();
          });
        }

        if (isPromiseLike(result)) {
          _this.oldResult = result.catch(function () {
            return undefined;
          }); // void :(
        }

        return result;
      });
      return [pending_3, result_3];
    }

    this.iterating = false;
    this.componentType = SyncGen;

    if (iteration.done) {
      this.finished = true;
    }

    var result = this.updateChildren(iteration.value);
    return [result, result];
  };

  ComponentNode.prototype.advance = function () {
    var _this = this;

    this.inflightPending = this.enqueuedPending;
    this.inflightResult = this.enqueuedResult;
    this.enqueuedPending = undefined;
    this.enqueuedResult = undefined;

    if (this.componentType === AsyncGen && !this.finished) {
      this.run().catch(function (err) {
        // We catch and rethrow the error to trigger an unhandled promise
        // rejection.
        if (!_this.updating) {
          throw err;
        }
      });
    }
  };

  ComponentNode.prototype.commit = function (requester) {
    var childValues = this.commitChildren(requester);
    this.value = childValues.length > 1 ? childValues : childValues[0];

    if (isEventTarget(this.value)) {
      this.ctx.setDelegate(this.value);
    } else if (childValues.length > 1) {
      this.ctx.setDelegates(childValues);
    }

    if (!this.updating && this.dirty) {
      this.parent.commit(this);
    }

    this.updating = false;
    return; // void :(
  };

  ComponentNode.prototype.unmount = function (dirty) {
    var _this = this;

    if (dirty === void 0) {
      dirty = true;
    }

    if (this.unmounted) {
      return;
    }

    this.updating = false;
    this.unmounted = true;
    this.ctx.clearEventListeners();

    if (!this.finished) {
      this.finished = true; // helps avoid deadlocks

      if (this.onProps !== undefined) {
        this.onProps(this.props);
        this.onProps = undefined;
      }

      if (this.iterator !== undefined && this.iterator.return) {
        var iteration = void 0;

        try {
          iteration = this.iterator.return();
        } catch (err) {
          return this.parent.catch(err);
        }

        if (isPromiseLike(iteration)) {
          return iteration.then(function () {
            return void _this.unmountChildren(dirty);
          }, // void :(
          function (err) {
            return _this.parent.catch(err);
          });
        }
      }

      this.unmountChildren(dirty);
    }
  };

  ComponentNode.prototype.catch = function (reason) {
    var _this = this;

    if (this.iterator === undefined || this.iterator.throw === undefined || this.finished) {
      return _super.prototype.catch.call(this, reason);
    } // helps avoid deadlocks


    if (this.onProps !== undefined) {
      this.onProps(this.props);
      this.onProps = undefined;
    }

    var iteration;

    try {
      iteration = this.iterator.throw(reason);
    } catch (err) {
      return this.parent.catch(err);
    }

    if (isPromiseLike(iteration)) {
      var result = iteration.then(function (iteration) {
        if (iteration.done) {
          _this.finished = true;
        }

        return _this.updateChildren(iteration.value);
      }, function (err) {
        return _this.parent.catch(err);
      });
      return result;
    }

    if (iteration.done) {
      this.finished = true;
    }

    return this.updateChildren(iteration.value);
  };

  ComponentNode.prototype.get = function (name) {
    for (var parent_1 = this.parent; parent_1 !== undefined; parent_1 = parent_1.parent) {
      if ( // TODO: get rid of this instanceof
      parent_1 instanceof ComponentNode && parent_1.provisions !== undefined && parent_1.provisions.has(name)) {
        return parent_1.provisions.get(name);
      }
    }
  };

  ComponentNode.prototype.set = function (name, value) {
    if (this.provisions === undefined) {
      this.provisions = new Map();
    }

    this.provisions.set(name, value);
  };

  ComponentNode.prototype[Symbol.iterator] = function () {
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (!!this.unmounted) return [3
          /*break*/
          , 2];

          if (this.iterating) {
            throw new Error("You must yield for each iteration of this.");
          } else if (this.componentType === AsyncGen) {
            throw new Error("Use for await...of in async generator components.");
          }

          this.iterating = true;
          return [4
          /*yield*/
          , this.props];

        case 1:
          _a.sent();

          return [3
          /*break*/
          , 0];

        case 2:
          return [2
          /*return*/
          ];
      }
    });
  };

  ComponentNode.prototype[Symbol.asyncIterator] = function () {
    return __asyncGenerator(this, arguments, function _a() {
      var props;

      var _this = this;

      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (this.iterating) {
              throw new Error("You must yield for each iteration of this.");
            } else if (this.componentType === SyncGen) {
              throw new Error("Use for...of in sync generator components.");
            }

            this.iterating = true;
            if (!this.available) return [3
            /*break*/
            , 3];
            this.available = false;
            return [4
            /*yield*/
            , __await(this.props)];

          case 1:
            return [4
            /*yield*/
            , _b.sent()];

          case 2:
            _b.sent();

            return [3
            /*break*/
            , 7];

          case 3:
            return [4
            /*yield*/
            , __await(new Promise(function (resolve) {
              return _this.onProps = resolve;
            }))];

          case 4:
            props = _b.sent();
            if (!!this.unmounted) return [3
            /*break*/
            , 7];
            return [4
            /*yield*/
            , __await(props)];

          case 5:
            return [4
            /*yield*/
            , _b.sent()];

          case 6:
            _b.sent();

            _b.label = 7;

          case 7:
            if (!this.unmounted) return [3
            /*break*/
            , 0];
            _b.label = 8;

          case 8:
            return [2
            /*return*/
            ];
        }
      });
    });
  };

  return ComponentNode;
}(ParentNode);

function createNode(parent, renderer, child) {
  if (child === undefined || typeof child === "string") {
    return new LeafNode();
  } else if (child.tag === Fragment) {
    return new FragmentNode(parent, renderer, child.key);
  } else if (typeof child.tag === "function") {
    return new ComponentNode(parent, renderer, child.tag, child.key, child.props);
  } else {
    return new HostNode(parent, renderer, child.tag, child.key, child.props);
  }
}

var componentNodes = new WeakMap();

var Context =
/** @class */
function (_super) {
  __extends(Context, _super);

  function Context(host, parent) {
    var _this = _super.call(this, parent) || this;

    componentNodes.set(_this, host);
    return _this;
  }

  Context.prototype.get = function (name) {
    return componentNodes.get(this).get(name);
  };

  Context.prototype.set = function (name, value) {
    componentNodes.get(this).set(name, value);
  };
  /* eslint-enable no-dupe-class-members */


  Context.prototype[Symbol.iterator] = function () {
    return componentNodes.get(this)[Symbol.iterator]();
  };

  Context.prototype[Symbol.asyncIterator] = function () {
    return componentNodes.get(this)[Symbol.asyncIterator]();
  };

  Context.prototype.refresh = function () {
    return componentNodes.get(this).refresh();
  };

  return Context;
}(CrankEventTarget);

exports.a = Context;
var Default = Symbol.for("crank.Default");
exports.D = Default;
var Text = Symbol.for("crank.Text");
exports.T = Text;
var Scopes = Symbol.for("crank.Scopes");
exports.S = Scopes;
var defaultEnv = (_a = {}, _a[Default] = function (tag) {
  throw new Error("Environment did not provide an intrinsic for tag: " + tag);
}, _a[Portal] = function () {
  throw new Error("Environment did not provide an intrinsic for Portal");
}, _a[Raw] = function (_a) {
  var value = _a.value;
  return value;
}, _a);

var Renderer =
/** @class */
function () {
  function Renderer(env) {
    this.cache = new WeakMap();
    this.defaultIntrinsics = {};
    this.env = __assign({}, defaultEnv);
    this.scoper = {};
    this.extend(env);
  }

  Renderer.prototype.extend = function (env) {
    var e_4, _a, e_5, _b, e_6, _c, e_7, _d;

    if (env == null) {
      return;
    }

    try {
      for (var _e = __values(Object.keys(env)), _f = _e.next(); !_f.done; _f = _e.next()) {
        var tag = _f.value;

        if (env[tag] != null) {
          this.env[tag] = env[tag];
        }
      }
    } catch (e_4_1) {
      e_4 = {
        error: e_4_1
      };
    } finally {
      try {
        if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
      } finally {
        if (e_4) throw e_4.error;
      }
    }

    try {
      for (var _g = __values(Object.getOwnPropertySymbols(env)), _h = _g.next(); !_h.done; _h = _g.next()) {
        var tag = _h.value;

        if (env[tag] != null && tag !== Scopes) {
          this.env[tag] = env[tag];
        }
      }
    } catch (e_5_1) {
      e_5 = {
        error: e_5_1
      };
    } finally {
      try {
        if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
      } finally {
        if (e_5) throw e_5.error;
      }
    }

    if (env[Scopes] != null) {
      var scoper = env[Scopes];

      try {
        for (var _j = __values(Object.keys(scoper)), _k = _j.next(); !_k.done; _k = _j.next()) {
          var tag = _k.value;

          if (scoper[tag] != null) {
            this.scoper[tag] = scoper[tag];
          }
        }
      } catch (e_6_1) {
        e_6 = {
          error: e_6_1
        };
      } finally {
        try {
          if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
        } finally {
          if (e_6) throw e_6.error;
        }
      }

      try {
        for (var _l = __values(Object.getOwnPropertySymbols(env)), _m = _l.next(); !_m.done; _m = _l.next()) {
          var tag = _m.value;

          if (scoper[tag] != null) {
            this.scoper[tag] = scoper[tag];
          }
        }
      } catch (e_7_1) {
        e_7 = {
          error: e_7_1
        };
      } finally {
        try {
          if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
        } finally {
          if (e_7) throw e_7.error;
        }
      }
    }
  };

  Renderer.prototype.render = function (children, root) {
    var child = isNonStringIterable(children) ? createElement(Fragment, null, children) : children;
    var portal = isElement(child) && child.tag === Portal ? child : createElement(Portal, {
      root: root
    }, child);
    var rootNode = root != null ? this.cache.get(root) : undefined;

    if (rootNode === undefined) {
      rootNode = new HostNode(undefined, this, portal.tag, undefined, portal.props);

      if (root !== undefined && child != null) {
        this.cache.set(root, rootNode);
      }
    } else if (root != null && child == null) {
      this.cache.delete(root);
    }

    var result = rootNode.update(portal.props);

    if (isPromiseLike(result)) {
      return result.then(function () {
        rootNode.commit();

        if (portal.props.root == null) {
          rootNode.unmount();
        }

        return rootNode.value;
      });
    }

    rootNode.commit();

    if (portal.props.root == null) {
      rootNode.unmount();
    }

    return rootNode.value;
  }; // TODO: Ideally, the following methods should not be exposed outside this module


  Renderer.prototype.intrinsic = function (tag) {
    if (this.env[tag]) {
      return this.env[tag];
    } else if (this.defaultIntrinsics[tag] !== undefined) {
      return this.defaultIntrinsics[tag];
    }

    var intrinsic = this.env[Default](tag);
    this.defaultIntrinsics[tag] = intrinsic;
    return intrinsic;
  };

  Renderer.prototype.scope = function (tag, props) {
    if (tag in this.scoper) {
      if (typeof this.scoper[tag] === "function") {
        return this.scoper[tag](props);
      }

      return this.scoper[tag];
    } else if (typeof this.scoper[Default] === "function") {
      return this.scoper[Default](tag, props);
    }
  };

  Renderer.prototype.text = function (text) {
    if (this.env[Text] !== undefined) {
      return this.env[Text](text);
    }

    return text;
  };

  return Renderer;
}();

exports.b = Renderer;
},{}],"../node_modules/@bikeshaving/crank/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Context", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.a;
  }
});
Object.defineProperty(exports, "Copy", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.C;
  }
});
Object.defineProperty(exports, "Default", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.D;
  }
});
Object.defineProperty(exports, "Fragment", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.F;
  }
});
Object.defineProperty(exports, "Portal", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.P;
  }
});
Object.defineProperty(exports, "Raw", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.R;
  }
});
Object.defineProperty(exports, "Renderer", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.b;
  }
});
Object.defineProperty(exports, "Scopes", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.S;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.T;
  }
});
Object.defineProperty(exports, "createElement", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.c;
  }
});
Object.defineProperty(exports, "isElement", {
  enumerable: true,
  get: function () {
    return _indexE98190bc.i;
  }
});

var _indexE98190bc = require("./index-e98190bc.js");
},{"./index-e98190bc.js":"../node_modules/@bikeshaving/crank/esm/index-e98190bc.js"}],"../node_modules/@bikeshaving/crank/esm/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderer = exports.env = exports.DOMRenderer = void 0;

var _indexE98190bc = require("./index-e98190bc.js");

var _a;

var SVG_NAMESPACE = "http://www.w3.org/2000/svg"; // TODO: create an allowlist/blocklist of props

function updateProps(el, props, newProps, namespace) {
  for (var name_1 in (0, _indexE98190bc.f)((0, _indexE98190bc.f)({}, props), newProps)) {
    var value = props[name_1];
    var newValue = newProps[name_1];

    switch (name_1) {
      case "children":
        break;

      case "class":
      case "className":
        {
          if (namespace === SVG_NAMESPACE) {
            el.setAttribute("class", newValue);
          } else {
            el.className = newValue;
          }

          break;
        }

      case "style":
        {
          var style = el.style;

          if (style != null) {
            if (newValue == null) {
              el.removeAttribute("style");
            } else if (typeof newValue === "string") {
              style.cssText = newValue;
            } else {
              for (var styleName in (0, _indexE98190bc.f)((0, _indexE98190bc.f)({}, value), newValue)) {
                var styleValue = value && value[styleName];
                var newStyleValue = newValue && newValue[styleName];

                if (newStyleValue == null) {
                  style.removeProperty(styleName);
                } else if (styleValue !== newStyleValue) {
                  style.setProperty(styleName, newStyleValue);
                }
              }
            }
          }

          break;
        }

      default:
        {
          if (name_1 in el) {
            el[name_1] = newValue;
            break;
          } else if (newValue === true) {
            el.setAttribute(name_1, "");
          } else if (newValue === false || newValue == null) {
            el.removeAttribute(name_1);
          } else {
            el.setAttribute(name_1, newValue);
          }

          break;
        }
    }
  }
}

function updateChildren(el, newChildren, dirtyStart) {
  if (newChildren.length === 0) {
    el.textContent = "";
    return;
  }

  var oldChild = newChildren[dirtyStart] === undefined ? el.firstChild : newChildren[dirtyStart];
  var ni = dirtyStart || 0;

  while (oldChild !== null && ni < newChildren.length) {
    var newChild = newChildren[ni];

    if (oldChild === newChild) {
      oldChild = oldChild.nextSibling;
      ni++;
    } else if (typeof newChild === "string") {
      if (oldChild.splitText !== undefined) {
        oldChild.nodeValue = newChild;
        oldChild = oldChild.nextSibling;
      } else {
        el.insertBefore(document.createTextNode(newChild), oldChild);
      }

      ni++;
    } else if (oldChild.splitText !== undefined) {
      var nextSibling = oldChild.nextSibling;
      el.removeChild(oldChild);
      oldChild = nextSibling;
    } else {
      el.insertBefore(newChild, oldChild);
      ni++; // TODO: this is an optimization for the js frameworks benchmark
      // swap rows, but we need to think a little more about other
      // pathological cases.

      if (oldChild !== newChildren[ni]) {
        var nextSibling = oldChild.nextSibling;
        el.removeChild(oldChild);
        oldChild = nextSibling;
      }
    }
  }

  while (oldChild !== null) {
    var nextSibling = oldChild.nextSibling;
    el.removeChild(oldChild);
    oldChild = nextSibling;
  }

  for (; ni < newChildren.length; ni++) {
    var newChild = newChildren[ni];
    el.appendChild(typeof newChild === "string" ? document.createTextNode(newChild) : newChild);
  }
}

function createDocumentFragmentFromHTML(html) {
  if (typeof document.createRange === "function") {
    return document.createRange().createContextualFragment(html);
  } else {
    var fragment = document.createDocumentFragment();
    var childNodes = new DOMParser().parseFromString(html, "text/html").body.childNodes;

    for (var i = 0; i < childNodes.length; i++) {
      fragment.appendChild(childNodes[i]);
    }

    return fragment;
  }
} // TODO: Environment type should probably be Element | DocumentFragment


var env = (_a = {}, _a[_indexE98190bc.D] = function (tag) {
  if (typeof tag !== "string") {
    throw new Error("Unknown tag: " + tag.toString());
  }

  var cachedEl;
  return function defaultDOM() {
    var ns, el, props, oldLength, _a, _b, nextProps, e_1_1;

    var e_1, _c;

    return (0, _indexE98190bc._)(this, function (_d) {
      switch (_d.label) {
        case 0:
          ns = tag === "svg" ? SVG_NAMESPACE : this.scope;

          if (cachedEl === undefined) {
            if (ns == null) {
              cachedEl = document.createElement(tag);
            } else {
              cachedEl = document.createElementNS(ns, tag);
            }
          }

          el = cachedEl.cloneNode();
          props = {};
          oldLength = 0;
          _d.label = 1;

        case 1:
          _d.trys.push([1,, 10, 11]);

          _d.label = 2;

        case 2:
          _d.trys.push([2, 7, 8, 9]);

          _a = (0, _indexE98190bc.e)(this), _b = _a.next();
          _d.label = 3;

        case 3:
          if (!!_b.done) return [3
          /*break*/
          , 6];
          nextProps = _b.value; // We can’t use referential identity of props because we don’t have any
          // restrictions like elements have to be immutable.

          if (this.dirtyProps) {
            updateProps(el, props, nextProps, ns);
          }

          if (this.dirtyChildren && nextProps.innerHTML === undefined && (oldLength > 0 || nextProps.children.length > 0)) {
            updateChildren(el, nextProps.children, this.dirtyStart);
          }

          props = nextProps;
          oldLength = nextProps.children.length;
          return [4
          /*yield*/
          , el];

        case 4:
          _d.sent();

          _d.label = 5;

        case 5:
          _b = _a.next();
          return [3
          /*break*/
          , 3];

        case 6:
          return [3
          /*break*/
          , 9];

        case 7:
          e_1_1 = _d.sent();
          e_1 = {
            error: e_1_1
          };
          return [3
          /*break*/
          , 9];

        case 8:
          try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
          } finally {
            if (e_1) throw e_1.error;
          }

          return [7
          /*endfinally*/
          ];

        case 9:
          return [3
          /*break*/
          , 11];

        case 10:
          if (this.dirtyRemoval && el.parentNode !== null) {
            el.parentNode.removeChild(el);
          }

          return [7
          /*endfinally*/
          ];

        case 11:
          return [2
          /*return*/
          ];
      }
    });
  };
}, _a[_indexE98190bc.R] = function (_a) {
  var fragment, _b, _c, newValue, e_2_1;

  var e_2, _d;

  var value = _a.value;
  return (0, _indexE98190bc._)(this, function (_e) {
    switch (_e.label) {
      case 0:
        _e.trys.push([0, 7, 8, 9]);

        _b = (0, _indexE98190bc.e)(this), _c = _b.next();
        _e.label = 1;

      case 1:
        if (!!_c.done) return [3
        /*break*/
        , 6];
        newValue = _c.value.value;
        if (!(typeof value === "string")) return [3
        /*break*/
        , 3];

        if (fragment === undefined || value !== newValue) {
          fragment = createDocumentFragmentFromHTML(value);
          value = newValue;
        } // TODO: figure out what the type of this Environment actually is


        return [4
        /*yield*/
        , fragment];

      case 2:
        // TODO: figure out what the type of this Environment actually is
        _e.sent();

        return [3
        /*break*/
        , 5];

      case 3:
        fragment = undefined;
        return [4
        /*yield*/
        , value];

      case 4:
        _e.sent();

        _e.label = 5;

      case 5:
        _c = _b.next();
        return [3
        /*break*/
        , 1];

      case 6:
        return [3
        /*break*/
        , 9];

      case 7:
        e_2_1 = _e.sent();
        e_2 = {
          error: e_2_1
        };
        return [3
        /*break*/
        , 9];

      case 8:
        try {
          if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
        } finally {
          if (e_2) throw e_2.error;
        }

        return [7
        /*endfinally*/
        ];

      case 9:
        return [2
        /*return*/
        ];
    }
  });
}, _a[_indexE98190bc.P] = function (_a) {
  var _b, _c, _d, newRoot, children, e_3_1;

  var e_3, _e;

  var root = _a.root;
  return (0, _indexE98190bc._)(this, function (_f) {
    switch (_f.label) {
      case 0:
        if (root == null) {
          throw new TypeError("Portal element is missing root node");
        }

        _f.label = 1;

      case 1:
        _f.trys.push([1,, 10, 11]);

        _f.label = 2;

      case 2:
        _f.trys.push([2, 7, 8, 9]);

        _b = (0, _indexE98190bc.e)(this), _c = _b.next();
        _f.label = 3;

      case 3:
        if (!!_c.done) return [3
        /*break*/
        , 6];
        _d = _c.value, newRoot = _d.root, children = _d.children;

        if (newRoot == null) {
          throw new TypeError("Portal element is missing root node");
        }

        if (root !== newRoot) {
          updateChildren(root, []);
          root = newRoot;
          updateChildren(root, children);
        } else if (this.dirtyChildren) {
          updateChildren(root, children);
        }

        return [4
        /*yield*/
        , root];

      case 4:
        _f.sent();

        _f.label = 5;

      case 5:
        _c = _b.next();
        return [3
        /*break*/
        , 3];

      case 6:
        return [3
        /*break*/
        , 9];

      case 7:
        e_3_1 = _f.sent();
        e_3 = {
          error: e_3_1
        };
        return [3
        /*break*/
        , 9];

      case 8:
        try {
          if (_c && !_c.done && (_e = _b.return)) _e.call(_b);
        } finally {
          if (e_3) throw e_3.error;
        }

        return [7
        /*endfinally*/
        ];

      case 9:
        return [3
        /*break*/
        , 11];

      case 10:
        updateChildren(root, []);
        return [7
        /*endfinally*/
        ];

      case 11:
        return [2
        /*return*/
        ];
    }
  });
}, _a[_indexE98190bc.S] = {
  svg: SVG_NAMESPACE,
  foreignObject: undefined
}, _a);
exports.env = env;

var DOMRenderer =
/** @class */
function (_super) {
  (0, _indexE98190bc.d)(DOMRenderer, _super);

  function DOMRenderer() {
    return _super.call(this, env) || this;
  }

  return DOMRenderer;
}(_indexE98190bc.b);

exports.DOMRenderer = DOMRenderer;
var renderer = new DOMRenderer();
exports.renderer = renderer;
},{"./index-e98190bc.js":"../node_modules/@bikeshaving/crank/esm/index-e98190bc.js"}],"../node_modules/@bikeshaving/crank/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dom = require("./esm/dom.js");

Object.keys(_dom).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _dom[key];
    }
  });
});
},{"./esm/dom.js":"../node_modules/@bikeshaving/crank/esm/dom.js"}],"../node_modules/cssesc/cssesc.js":[function(require,module,exports) {
/*! https://mths.be/cssesc v1.0.1 by @mathias */
'use strict';

var object = {};
var hasOwnProperty = object.hasOwnProperty;

var merge = function merge(options, defaults) {
  if (!options) {
    return defaults;
  }

  var result = {};

  for (var key in defaults) {
    // `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
    // only recognized option names are used.
    result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
  }

  return result;
};

var regexAnySingleEscape = /[ -,\.\/;-@\[-\^`\{-~]/;
var regexSingleEscape = /[ -,\.\/;-@\[\]\^`\{-~]/;
var regexAlwaysEscape = /['"\\]/;
var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g; // https://mathiasbynens.be/notes/css-escapes#css

var cssesc = function cssesc(string, options) {
  options = merge(options, cssesc.options);

  if (options.quotes != 'single' && options.quotes != 'double') {
    options.quotes = 'single';
  }

  var quote = options.quotes == 'double' ? '"' : '\'';
  var isIdentifier = options.isIdentifier;
  var firstChar = string.charAt(0);
  var output = '';
  var counter = 0;
  var length = string.length;

  while (counter < length) {
    var character = string.charAt(counter++);
    var codePoint = character.charCodeAt();
    var value = void 0; // If it’s not a printable ASCII character…

    if (codePoint < 0x20 || codePoint > 0x7E) {
      if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
        // It’s a high surrogate, and there is a next character.
        var extra = string.charCodeAt(counter++);

        if ((extra & 0xFC00) == 0xDC00) {
          // next character is low surrogate
          codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
        } else {
          // It’s an unmatched surrogate; only append this code unit, in case
          // the next code unit is the high surrogate of a surrogate pair.
          counter--;
        }
      }

      value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
    } else {
      if (options.escapeEverything) {
        if (regexAnySingleEscape.test(character)) {
          value = '\\' + character;
        } else {
          value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
        } // Note: `:` could be escaped as `\:`, but that fails in IE < 8.

      } else if (/[\t\n\f\r\x0B:]/.test(character)) {
        if (!isIdentifier && character == ':') {
          value = character;
        } else {
          value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
        }
      } else if (character == '\\' || !isIdentifier && (character == '"' && quote == character || character == '\'' && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
        value = '\\' + character;
      } else {
        value = character;
      }
    }

    output += value;
  }

  if (isIdentifier) {
    if (/^_/.test(output)) {
      // Prevent IE6 from ignoring the rule altogether (in case this is for an
      // identifier used as a selector)
      output = '\\_' + output.slice(1);
    } else if (/^-[-\d]/.test(output)) {
      output = '\\-' + output.slice(1);
    } else if (/\d/.test(firstChar)) {
      output = '\\3' + firstChar + ' ' + output.slice(1);
    }
  } // Remove spaces after `\HEX` escapes that are not followed by a hex digit,
  // since they’re redundant. Note that this is only possible if the escape
  // sequence isn’t preceded by an odd number of backslashes.


  output = output.replace(regexExcessiveSpaces, function ($0, $1, $2) {
    if ($1 && $1.length % 2) {
      // It’s not safe to remove the space, so don’t.
      return $0;
    } // Strip the space.


    return ($1 || '') + $2;
  });

  if (!isIdentifier && options.wrap) {
    return quote + output + quote;
  }

  return output;
}; // Expose default options (so they can be overridden globally).


cssesc.options = {
  'escapeEverything': false,
  'isIdentifier': false,
  'quotes': 'single',
  'wrap': false
};
cssesc.version = '1.0.1';
module.exports = cssesc;
},{}],"../node_modules/@medv/finder/dist/index.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cssesc = require("cssesc");
var Limit;
(function (Limit) {
    Limit[Limit["All"] = 0] = "All";
    Limit[Limit["Two"] = 1] = "Two";
    Limit[Limit["One"] = 2] = "One";
})(Limit || (Limit = {}));
var config;
var rootDocument;
function default_1(input, options) {
    if (input.nodeType !== Node.ELEMENT_NODE) {
        throw new Error("Can't generate CSS selector for non-element node type.");
    }
    if ('html' === input.tagName.toLowerCase()) {
        return 'html';
    }
    var defaults = {
        root: document.body,
        idName: function (name) { return true; },
        className: function (name) { return true; },
        tagName: function (name) { return true; },
        attr: function (name, value) { return false; },
        seedMinLength: 1,
        optimizedMinLength: 2,
        threshold: 1000,
        maxNumberOfTries: 10000,
    };
    config = __assign({}, defaults, options);
    rootDocument = findRootDocument(config.root, defaults);
    var path = bottomUpSearch(input, Limit.All, function () {
        return bottomUpSearch(input, Limit.Two, function () {
            return bottomUpSearch(input, Limit.One);
        });
    });
    if (path) {
        var optimized = sort(optimize(path, input));
        if (optimized.length > 0) {
            path = optimized[0];
        }
        return selector(path);
    }
    else {
        throw new Error("Selector was not found.");
    }
}
exports.default = default_1;
function findRootDocument(rootNode, defaults) {
    if (rootNode.nodeType === Node.DOCUMENT_NODE) {
        return rootNode;
    }
    if (rootNode === defaults.root) {
        return rootNode.ownerDocument;
    }
    return rootNode;
}
function bottomUpSearch(input, limit, fallback) {
    var path = null;
    var stack = [];
    var current = input;
    var i = 0;
    var _loop_1 = function () {
        var level = maybe(id(current)) || maybe.apply(void 0, attr(current)) || maybe.apply(void 0, classNames(current)) || maybe(tagName(current)) || [any()];
        var nth = index(current);
        if (limit === Limit.All) {
            if (nth) {
                level = level.concat(level.filter(dispensableNth).map(function (node) { return nthChild(node, nth); }));
            }
        }
        else if (limit === Limit.Two) {
            level = level.slice(0, 1);
            if (nth) {
                level = level.concat(level.filter(dispensableNth).map(function (node) { return nthChild(node, nth); }));
            }
        }
        else if (limit === Limit.One) {
            var node = (level = level.slice(0, 1))[0];
            if (nth && dispensableNth(node)) {
                level = [nthChild(node, nth)];
            }
        }
        for (var _i = 0, level_1 = level; _i < level_1.length; _i++) {
            var node = level_1[_i];
            node.level = i;
        }
        stack.push(level);
        if (stack.length >= config.seedMinLength) {
            path = findUniquePath(stack, fallback);
            if (path) {
                return "break";
            }
        }
        current = current.parentElement;
        i++;
    };
    while (current && current !== config.root.parentElement) {
        var state_1 = _loop_1();
        if (state_1 === "break")
            break;
    }
    if (!path) {
        path = findUniquePath(stack, fallback);
    }
    return path;
}
function findUniquePath(stack, fallback) {
    var paths = sort(combinations(stack));
    if (paths.length > config.threshold) {
        return fallback ? fallback() : null;
    }
    for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
        var candidate = paths_1[_i];
        if (unique(candidate)) {
            return candidate;
        }
    }
    return null;
}
function selector(path) {
    var node = path[0];
    var query = node.name;
    for (var i = 1; i < path.length; i++) {
        var level = path[i].level || 0;
        if (node.level === level - 1) {
            query = path[i].name + " > " + query;
        }
        else {
            query = path[i].name + " " + query;
        }
        node = path[i];
    }
    return query;
}
function penalty(path) {
    return path.map(function (node) { return node.penalty; }).reduce(function (acc, i) { return acc + i; }, 0);
}
function unique(path) {
    switch (rootDocument.querySelectorAll(selector(path)).length) {
        case 0:
            throw new Error("Can't select any node with this selector: " + selector(path));
        case 1:
            return true;
        default:
            return false;
    }
}
function id(input) {
    var elementId = input.getAttribute('id');
    if (elementId && config.idName(elementId)) {
        return {
            name: '#' + cssesc(elementId, { isIdentifier: true }),
            penalty: 0,
        };
    }
    return null;
}
function attr(input) {
    var attrs = Array.from(input.attributes).filter(function (attr) { return config.attr(attr.name, attr.value); });
    return attrs.map(function (attr) { return ({
        name: '[' + cssesc(attr.name, { isIdentifier: true }) + '="' + cssesc(attr.value) + '"]',
        penalty: 0.5
    }); });
}
function classNames(input) {
    var names = Array.from(input.classList)
        .filter(config.className);
    return names.map(function (name) { return ({
        name: '.' + cssesc(name, { isIdentifier: true }),
        penalty: 1
    }); });
}
function tagName(input) {
    var name = input.tagName.toLowerCase();
    if (config.tagName(name)) {
        return {
            name: name,
            penalty: 2
        };
    }
    return null;
}
function any() {
    return {
        name: '*',
        penalty: 3
    };
}
function index(input) {
    var parent = input.parentNode;
    if (!parent) {
        return null;
    }
    var child = parent.firstChild;
    if (!child) {
        return null;
    }
    var i = 0;
    while (child) {
        if (child.nodeType === Node.ELEMENT_NODE) {
            i++;
        }
        if (child === input) {
            break;
        }
        child = child.nextSibling;
    }
    return i;
}
function nthChild(node, i) {
    return {
        name: node.name + (":nth-child(" + i + ")"),
        penalty: node.penalty + 1
    };
}
function dispensableNth(node) {
    return node.name !== 'html' && !node.name.startsWith('#');
}
function maybe() {
    var level = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        level[_i] = arguments[_i];
    }
    var list = level.filter(notEmpty);
    if (list.length > 0) {
        return list;
    }
    return null;
}
function notEmpty(value) {
    return value !== null && value !== undefined;
}
function combinations(stack, path) {
    var _i, _a, node;
    if (path === void 0) { path = []; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!(stack.length > 0)) return [3 /*break*/, 5];
                _i = 0, _a = stack[0];
                _b.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                node = _a[_i];
                return [5 /*yield**/, __values(combinations(stack.slice(1, stack.length), path.concat(node)))];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, path];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}
function sort(paths) {
    return Array.from(paths).sort(function (a, b) { return penalty(a) - penalty(b); });
}
function optimize(path, input, scope) {
    var i, newPath, newPathKey;
    if (scope === void 0) { scope = { counter: 0, visited: new Map() }; }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(path.length > 2 && path.length > config.optimizedMinLength)) return [3 /*break*/, 5];
                i = 1;
                _a.label = 1;
            case 1:
                if (!(i < path.length - 1)) return [3 /*break*/, 5];
                if (scope.counter > config.maxNumberOfTries) {
                    return [2 /*return*/]; // Okay At least I tried!
                }
                scope.counter += 1;
                newPath = path.slice();
                newPath.splice(i, 1);
                newPathKey = selector(newPath);
                if (scope.visited.has(newPathKey)) {
                    return [2 /*return*/];
                }
                if (!(unique(newPath) && same(newPath, input))) return [3 /*break*/, 4];
                return [4 /*yield*/, newPath];
            case 2:
                _a.sent();
                scope.visited.set(newPathKey, true);
                return [5 /*yield**/, __values(optimize(newPath, input, scope))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}
function same(path, input) {
    return rootDocument.querySelector(selector(path)) === input;
}

},{"cssesc":"../node_modules/cssesc/cssesc.js"}],"components/Frame.tsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _crank = require("@bikeshaving/crank");

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};
/** @jsx createElement */


/**
 * This file is a fairly similar copy, just using crankjs, of chrome-sidebar
 * from segmentio https://github.com/segmentio/chrome-sidebar and making use of
 * inline styles to prevent issues with firefox and CSP, as per
 * https://bugzilla.mozilla.org/show_bug.cgi?id=1267027 and friends
 */
var maskClass = "\n  position: fixed;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  cursor: pointer;\n  z-index: 9999;\n  background-color: rgba(0, 0, 0, 0.39);\n  transform: translateY(100%);\n  transition: transform 0.3s cubic-bezier(0, 0, 0.3, 1);\n";
var maskVisibleClass = "\n  transform: translateY(0%);\n";
var containerClass = "\n  position: fixed;\n  bottom: 0px;\n  right: 0px;\n  width: 100%;\n  height: 65%;\n  max-height: 350px;\n  padding: 8px;\n  box-sizing: border-box;\n  transform: translateY(100%);\n  transition: transform .30s cubic-bezier(0, 0, 0.3, 1);\n  z-index: 10000;\n";
var containerVisibleClass = "\n  transform: translate3d(0,0,0);\n";
var containerMinimizedClass = "\n  cursor: pointer;\n  background-color: rgba(0, 0, 0, 0.39);\n  transform: translateY(98%);\n"; //   ":hover": {
//     transform: "translateY(94%)",
//   },
//   "& > iframe": {
//     pointerEvents: "none",
//   },
// })

var iframeClass = "\n  border: none;\n  width: 100%;\n  height: 100%;\n  background: white;\n  border-radius: 8px;\n  box-shadow: -1px 1px 8px rgba(0,0,0,.15);\n  overflow: scroll;\n";

function Frame(_a) {
  var isMinimized, toggle;

  var _this = this;

  var children = _a.children,
      _b = _a.initializeOpen,
      initializeOpen = _b === void 0 ? false : _b;
  return __generator(this, function (_c) {
    switch (_c.label) {
      case 0:
        isMinimized = !initializeOpen;

        toggle = function toggle(minimized) {
          if (minimized !== undefined) isMinimized = minimized;else isMinimized = !isMinimized;

          _this.refresh();
        }; // Is this the recommended way to handle things like opening and closing from
        // an external context, in crank?


        this.addEventListener("frame.toggle", function (ev) {
          ev.preventDefault();
          ev.stopPropagation();
          toggle();
        });
        _c.label = 1;

      case 1:
        if (!true) return [3
        /*break*/
        , 3];
        return [4
        /*yield*/
        , (0, _crank.createElement)(_crank.Fragment, null, (0, _crank.createElement)("div", {
          style: [maskClass, isMinimized ? "" : maskVisibleClass].join(" "),
          onclick: function onclick() {
            return toggle(true);
          }
        }), (0, _crank.createElement)("div", {
          style: [containerClass, isMinimized ? containerMinimizedClass : containerVisibleClass].join(" "),
          onclick: function onclick() {
            return toggle(false);
          }
        }, (0, _crank.createElement)("div", {
          style: iframeClass
        }, children)))];

      case 2:
        _c.sent();

        return [3
        /*break*/
        , 1];

      case 3:
        return [2
        /*return*/
        ];
    }
  });
}

var _default = Frame;
exports.default = _default;
},{"@bikeshaving/crank":"../node_modules/@bikeshaving/crank/esm/index.js"}],"../node_modules/webextension-polyfill/dist/browser-polyfill.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define("webextension-polyfill", ["module"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod);
    global.browser = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (module) {
  /* webextension-polyfill - v0.6.0 - Mon Dec 23 2019 12:32:53 */

  /* -*- Mode: indent-tabs-mode: nil; js-indent-level: 2 -*- */

  /* vim: set sts=2 sw=2 et tw=80: */

  /* This Source Code Form is subject to the terms of the Mozilla Public
   * License, v. 2.0. If a copy of the MPL was not distributed with this
   * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
  "use strict";

  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
    // optimization for Firefox. Since Spidermonkey does not fully parse the
    // contents of a function until the first time it's called, and since it will
    // never actually need to be called, this allows the polyfill to be included
    // in Firefox nearly for free.

    const wrapAPIs = extensionAPIs => {
      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
      // at build time by replacing the following "include" with the content of the
      // JSON file.
      const apiMetadata = {
        "alarms": {
          "clear": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "clearAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "get": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "bookmarks": {
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getChildren": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getRecent": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getSubTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTree": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeTree": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "browserAction": {
          "disable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "enable": {
            "minArgs": 0,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "getBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getBadgeText": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "openPopup": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setBadgeBackgroundColor": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setBadgeText": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "browsingData": {
          "remove": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "removeCache": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCookies": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeDownloads": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFormData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeHistory": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeLocalStorage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePasswords": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removePluginData": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "settings": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "commands": {
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "contextMenus": {
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "cookies": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAllCookieStores": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "set": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "devtools": {
          "inspectedWindow": {
            "eval": {
              "minArgs": 1,
              "maxArgs": 2,
              "singleCallbackArg": false
            }
          },
          "panels": {
            "create": {
              "minArgs": 3,
              "maxArgs": 3,
              "singleCallbackArg": true
            }
          }
        },
        "downloads": {
          "cancel": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "download": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "erase": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFileIcon": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "open": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "pause": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeFile": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "resume": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "extension": {
          "isAllowedFileSchemeAccess": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "isAllowedIncognitoAccess": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "history": {
          "addUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "deleteRange": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "deleteUrl": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getVisits": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "search": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "i18n": {
          "detectLanguage": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAcceptLanguages": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "identity": {
          "launchWebAuthFlow": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "idle": {
          "queryState": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "management": {
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getSelf": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "setEnabled": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "uninstallSelf": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "notifications": {
          "clear": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPermissionLevel": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        },
        "pageAction": {
          "getPopup": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getTitle": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "hide": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setIcon": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "setPopup": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "setTitle": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          },
          "show": {
            "minArgs": 1,
            "maxArgs": 1,
            "fallbackToNoCallback": true
          }
        },
        "permissions": {
          "contains": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "request": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "runtime": {
          "getBackgroundPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getPlatformInfo": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "openOptionsPage": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "requestUpdateCheck": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "sendMessage": {
            "minArgs": 1,
            "maxArgs": 3
          },
          "sendNativeMessage": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "setUninstallURL": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "sessions": {
          "getDevices": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getRecentlyClosed": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "restore": {
            "minArgs": 0,
            "maxArgs": 1
          }
        },
        "storage": {
          "local": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          },
          "managed": {
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            }
          },
          "sync": {
            "clear": {
              "minArgs": 0,
              "maxArgs": 0
            },
            "get": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "getBytesInUse": {
              "minArgs": 0,
              "maxArgs": 1
            },
            "remove": {
              "minArgs": 1,
              "maxArgs": 1
            },
            "set": {
              "minArgs": 1,
              "maxArgs": 1
            }
          }
        },
        "tabs": {
          "captureVisibleTab": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "create": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "detectLanguage": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "discard": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "duplicate": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "executeScript": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 0
          },
          "getZoom": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getZoomSettings": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "highlight": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "insertCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "move": {
            "minArgs": 2,
            "maxArgs": 2
          },
          "query": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "reload": {
            "minArgs": 0,
            "maxArgs": 2
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "removeCSS": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "sendMessage": {
            "minArgs": 2,
            "maxArgs": 3
          },
          "setZoom": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "setZoomSettings": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "update": {
            "minArgs": 1,
            "maxArgs": 2
          }
        },
        "topSites": {
          "get": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "webNavigation": {
          "getAllFrames": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "getFrame": {
            "minArgs": 1,
            "maxArgs": 1
          }
        },
        "webRequest": {
          "handlerBehaviorChanged": {
            "minArgs": 0,
            "maxArgs": 0
          }
        },
        "windows": {
          "create": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "get": {
            "minArgs": 1,
            "maxArgs": 2
          },
          "getAll": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getCurrent": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "getLastFocused": {
            "minArgs": 0,
            "maxArgs": 1
          },
          "remove": {
            "minArgs": 1,
            "maxArgs": 1
          },
          "update": {
            "minArgs": 2,
            "maxArgs": 2
          }
        }
      };

      if (Object.keys(apiMetadata).length === 0) {
        throw new Error("api-metadata.json has not been included in browser-polyfill");
      }
      /**
       * A WeakMap subclass which creates and stores a value for any key which does
       * not exist when accessed, but behaves exactly as an ordinary WeakMap
       * otherwise.
       *
       * @param {function} createItem
       *        A function which will be called in order to create the value for any
       *        key which does not exist, the first time it is accessed. The
       *        function receives, as its only argument, the key being created.
       */


      class DefaultWeakMap extends WeakMap {
        constructor(createItem, items = undefined) {
          super(items);
          this.createItem = createItem;
        }

        get(key) {
          if (!this.has(key)) {
            this.set(key, this.createItem(key));
          }

          return super.get(key);
        }

      }
      /**
       * Returns true if the given object is an object with a `then` method, and can
       * therefore be assumed to behave as a Promise.
       *
       * @param {*} value The value to test.
       * @returns {boolean} True if the value is thenable.
       */


      const isThenable = value => {
        return value && typeof value === "object" && typeof value.then === "function";
      };
      /**
       * Creates and returns a function which, when called, will resolve or reject
       * the given promise based on how it is called:
       *
       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
       *   the promise is rejected with that value.
       * - If the function is called with exactly one argument, the promise is
       *   resolved to that value.
       * - Otherwise, the promise is resolved to an array containing all of the
       *   function's arguments.
       *
       * @param {object} promise
       *        An object containing the resolution and rejection functions of a
       *        promise.
       * @param {function} promise.resolve
       *        The promise's resolution function.
       * @param {function} promise.rejection
       *        The promise's rejection function.
       * @param {object} metadata
       *        Metadata about the wrapped method which has created the callback.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function}
       *        The generated callback function.
       */


      const makeCallback = (promise, metadata) => {
        return (...callbackArgs) => {
          if (extensionAPIs.runtime.lastError) {
            promise.reject(extensionAPIs.runtime.lastError);
          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
            promise.resolve(callbackArgs[0]);
          } else {
            promise.resolve(callbackArgs);
          }
        };
      };

      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
      /**
       * Creates a wrapper function for a method with the given name and metadata.
       *
       * @param {string} name
       *        The name of the method which is being wrapped.
       * @param {object} metadata
       *        Metadata about the method being wrapped.
       * @param {integer} metadata.minArgs
       *        The minimum number of arguments which must be passed to the
       *        function. If called with fewer than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxArgs
       *        The maximum number of arguments which may be passed to the
       *        function. If called with more than this number of arguments, the
       *        wrapper will raise an exception.
       * @param {integer} metadata.maxResolvedArgs
       *        The maximum number of arguments which may be passed to the
       *        callback created by the wrapped async function.
       *
       * @returns {function(object, ...*)}
       *       The generated wrapper function.
       */


      const wrapAsyncFunction = (name, metadata) => {
        return function asyncFunctionWrapper(target, ...args) {
          if (args.length < metadata.minArgs) {
            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
          }

          if (args.length > metadata.maxArgs) {
            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
          }

          return new Promise((resolve, reject) => {
            if (metadata.fallbackToNoCallback) {
              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
              // and so the polyfill will try to call it with a callback first, and it will fallback
              // to not passing the callback if the first call fails.
              try {
                target[name](...args, makeCallback({
                  resolve,
                  reject
                }, metadata));
              } catch (cbError) {
                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
                // use the unsupported callback anymore.

                metadata.fallbackToNoCallback = false;
                metadata.noCallback = true;
                resolve();
              }
            } else if (metadata.noCallback) {
              target[name](...args);
              resolve();
            } else {
              target[name](...args, makeCallback({
                resolve,
                reject
              }, metadata));
            }
          });
        };
      };
      /**
       * Wraps an existing method of the target object, so that calls to it are
       * intercepted by the given wrapper function. The wrapper function receives,
       * as its first argument, the original `target` object, followed by each of
       * the arguments passed to the original method.
       *
       * @param {object} target
       *        The original target object that the wrapped method belongs to.
       * @param {function} method
       *        The method being wrapped. This is used as the target of the Proxy
       *        object which is created to wrap the method.
       * @param {function} wrapper
       *        The wrapper function which is called in place of a direct invocation
       *        of the wrapped method.
       *
       * @returns {Proxy<function>}
       *        A Proxy object for the given method, which invokes the given wrapper
       *        method in its place.
       */


      const wrapMethod = (target, method, wrapper) => {
        return new Proxy(method, {
          apply(targetMethod, thisObj, args) {
            return wrapper.call(thisObj, target, ...args);
          }

        });
      };

      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
      /**
       * Wraps an object in a Proxy which intercepts and wraps certain methods
       * based on the given `wrappers` and `metadata` objects.
       *
       * @param {object} target
       *        The target object to wrap.
       *
       * @param {object} [wrappers = {}]
       *        An object tree containing wrapper functions for special cases. Any
       *        function present in this object tree is called in place of the
       *        method in the same location in the `target` object tree. These
       *        wrapper methods are invoked as described in {@see wrapMethod}.
       *
       * @param {object} [metadata = {}]
       *        An object tree containing metadata used to automatically generate
       *        Promise-based wrapper functions for asynchronous. Any function in
       *        the `target` object tree which has a corresponding metadata object
       *        in the same location in the `metadata` tree is replaced with an
       *        automatically-generated wrapper function, as described in
       *        {@see wrapAsyncFunction}
       *
       * @returns {Proxy<object>}
       */

      const wrapObject = (target, wrappers = {}, metadata = {}) => {
        let cache = Object.create(null);
        let handlers = {
          has(proxyTarget, prop) {
            return prop in target || prop in cache;
          },

          get(proxyTarget, prop, receiver) {
            if (prop in cache) {
              return cache[prop];
            }

            if (!(prop in target)) {
              return undefined;
            }

            let value = target[prop];

            if (typeof value === "function") {
              // This is a method on the underlying object. Check if we need to do
              // any wrapping.
              if (typeof wrappers[prop] === "function") {
                // We have a special-case wrapper for this method.
                value = wrapMethod(target, target[prop], wrappers[prop]);
              } else if (hasOwnProperty(metadata, prop)) {
                // This is an async method that we have metadata for. Create a
                // Promise wrapper for it.
                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
                value = wrapMethod(target, target[prop], wrapper);
              } else {
                // This is a method that we don't know or care about. Return the
                // original method, bound to the underlying object.
                value = value.bind(target);
              }
            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
              // This is an object that we need to do some wrapping for the children
              // of. Create a sub-object wrapper for it with the appropriate child
              // metadata.
              value = wrapObject(value, wrappers[prop], metadata[prop]);
            } else if (hasOwnProperty(metadata, "*")) {
              // Wrap all properties in * namespace.
              value = wrapObject(value, wrappers[prop], metadata["*"]);
            } else {
              // We don't need to do any wrapping for this property,
              // so just forward all access to the underlying object.
              Object.defineProperty(cache, prop, {
                configurable: true,
                enumerable: true,

                get() {
                  return target[prop];
                },

                set(value) {
                  target[prop] = value;
                }

              });
              return value;
            }

            cache[prop] = value;
            return value;
          },

          set(proxyTarget, prop, value, receiver) {
            if (prop in cache) {
              cache[prop] = value;
            } else {
              target[prop] = value;
            }

            return true;
          },

          defineProperty(proxyTarget, prop, desc) {
            return Reflect.defineProperty(cache, prop, desc);
          },

          deleteProperty(proxyTarget, prop) {
            return Reflect.deleteProperty(cache, prop);
          }

        }; // Per contract of the Proxy API, the "get" proxy handler must return the
        // original value of the target if that value is declared read-only and
        // non-configurable. For this reason, we create an object with the
        // prototype set to `target` instead of using `target` directly.
        // Otherwise we cannot return a custom object for APIs that
        // are declared read-only and non-configurable, such as `chrome.devtools`.
        //
        // The proxy handlers themselves will still use the original `target`
        // instead of the `proxyTarget`, so that the methods and properties are
        // dereferenced via the original targets.

        let proxyTarget = Object.create(target);
        return new Proxy(proxyTarget, handlers);
      };
      /**
       * Creates a set of wrapper functions for an event object, which handles
       * wrapping of listener functions that those messages are passed.
       *
       * A single wrapper is created for each listener function, and stored in a
       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
       * retrieve the original wrapper, so that  attempts to remove a
       * previously-added listener work as expected.
       *
       * @param {DefaultWeakMap<function, function>} wrapperMap
       *        A DefaultWeakMap object which will create the appropriate wrapper
       *        for a given listener function when one does not exist, and retrieve
       *        an existing one when it does.
       *
       * @returns {object}
       */


      const wrapEvent = wrapperMap => ({
        addListener(target, listener, ...args) {
          target.addListener(wrapperMap.get(listener), ...args);
        },

        hasListener(target, listener) {
          return target.hasListener(wrapperMap.get(listener));
        },

        removeListener(target, listener) {
          target.removeListener(wrapperMap.get(listener));
        }

      }); // Keep track if the deprecation warning has been logged at least once.


      let loggedSendResponseDeprecationWarning = false;
      const onMessageWrappers = new DefaultWeakMap(listener => {
        if (typeof listener !== "function") {
          return listener;
        }
        /**
         * Wraps a message listener function so that it may send responses based on
         * its return value, rather than by returning a sentinel value and calling a
         * callback. If the listener function returns a Promise, the response is
         * sent when the promise either resolves or rejects.
         *
         * @param {*} message
         *        The message sent by the other end of the channel.
         * @param {object} sender
         *        Details about the sender of the message.
         * @param {function(*)} sendResponse
         *        A callback which, when called with an arbitrary argument, sends
         *        that value as a response.
         * @returns {boolean}
         *        True if the wrapped listener returned a Promise, which will later
         *        yield a response. False otherwise.
         */


        return function onMessage(message, sender, sendResponse) {
          let didCallSendResponse = false;
          let wrappedSendResponse;
          let sendResponsePromise = new Promise(resolve => {
            wrappedSendResponse = function (response) {
              if (!loggedSendResponseDeprecationWarning) {
                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
                loggedSendResponseDeprecationWarning = true;
              }

              didCallSendResponse = true;
              resolve(response);
            };
          });
          let result;

          try {
            result = listener(message, sender, wrappedSendResponse);
          } catch (err) {
            result = Promise.reject(err);
          }

          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
          // wrappedSendResponse synchronously, we can exit earlier
          // because there will be no response sent from this listener.

          if (result !== true && !isResultThenable && !didCallSendResponse) {
            return false;
          } // A small helper to send the message if the promise resolves
          // and an error if the promise rejects (a wrapped sendMessage has
          // to translate the message into a resolved promise or a rejected
          // promise).


          const sendPromisedResult = promise => {
            promise.then(msg => {
              // send the message value.
              sendResponse(msg);
            }, error => {
              // Send a JSON representation of the error if the rejected value
              // is an instance of error, or the object itself otherwise.
              let message;

              if (error && (error instanceof Error || typeof error.message === "string")) {
                message = error.message;
              } else {
                message = "An unexpected error occurred";
              }

              sendResponse({
                __mozWebExtensionPolyfillReject__: true,
                message
              });
            }).catch(err => {
              // Print an error on the console if unable to send the response.
              console.error("Failed to send onMessage rejected reply", err);
            });
          }; // If the listener returned a Promise, send the resolved value as a
          // result, otherwise wait the promise related to the wrappedSendResponse
          // callback to resolve and send it as a response.


          if (isResultThenable) {
            sendPromisedResult(result);
          } else {
            sendPromisedResult(sendResponsePromise);
          } // Let Chrome know that the listener is replying.


          return true;
        };
      });

      const wrappedSendMessageCallback = ({
        reject,
        resolve
      }, reply) => {
        if (extensionAPIs.runtime.lastError) {
          // Detect when none of the listeners replied to the sendMessage call and resolve
          // the promise to undefined as in Firefox.
          // See https://github.com/mozilla/webextension-polyfill/issues/130
          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
            resolve();
          } else {
            reject(extensionAPIs.runtime.lastError);
          }
        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
          // Convert back the JSON representation of the error into
          // an Error instance.
          reject(new Error(reply.message));
        } else {
          resolve(reply);
        }
      };

      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
        if (args.length < metadata.minArgs) {
          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
        }

        if (args.length > metadata.maxArgs) {
          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
        }

        return new Promise((resolve, reject) => {
          const wrappedCb = wrappedSendMessageCallback.bind(null, {
            resolve,
            reject
          });
          args.push(wrappedCb);
          apiNamespaceObj.sendMessage(...args);
        });
      };

      const staticWrappers = {
        runtime: {
          onMessage: wrapEvent(onMessageWrappers),
          onMessageExternal: wrapEvent(onMessageWrappers),
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 1,
            maxArgs: 3
          })
        },
        tabs: {
          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
            minArgs: 2,
            maxArgs: 3
          })
        }
      };
      const settingMetadata = {
        clear: {
          minArgs: 1,
          maxArgs: 1
        },
        get: {
          minArgs: 1,
          maxArgs: 1
        },
        set: {
          minArgs: 1,
          maxArgs: 1
        }
      };
      apiMetadata.privacy = {
        network: {
          "*": settingMetadata
        },
        services: {
          "*": settingMetadata
        },
        websites: {
          "*": settingMetadata
        }
      };
      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
    };

    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
      throw new Error("This script should only be loaded in a browser extension.");
    } // The build process adds a UMD wrapper around this file, which makes the
    // `module` variable available.


    module.exports = wrapAPIs(chrome);
  } else {
    module.exports = browser;
  }
});


},{}],"contentScripts/sidebarEntry.tsx":[function(require,module,exports) {
"use strict";

var _crank = require("@bikeshaving/crank");

var _dom = require("@bikeshaving/crank/dom");

var _finder = _interopRequireDefault(require("@medv/finder"));

var _Frame = _interopRequireDefault(require("../components/Frame"));

var _webextensionPolyfill = _interopRequireDefault(require("webextension-polyfill"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};
/** @jsx createElement */


var selectorsForHover = function selectorsForHover() {
  var hovered = Array.from(document.querySelectorAll(":hover")).filter(function (node) {
    return !frame.contains(node);
  }).reverse();
  return hovered.reduce(function (memo, node) {
    var _a;

    return __assign(__assign({}, memo), (_a = {}, _a[(0, _finder.default)(node)] = node, _a));
  }, {});
};

var setSelectors = function setSelectors(ev) {
  if (frame === null || frame === void 0 ? void 0 : frame.contains(ev.target)) return;
  ev.preventDefault();
  ev.stopPropagation();
  document.removeEventListener("click", setSelectors);
  var selectors = selectorsForHover();
  console.log(selectors);
};

var root = document.createElement("div");
var frame;

var toggleFrame = function toggleFrame() {
  if (document.contains(root)) {
    frame.dispatchEvent(new CustomEvent("frame.toggle", {
      bubbles: true
    }));
    return;
  }

  document.body.appendChild(root);
  Promise.resolve(_dom.renderer.render((0, _crank.createElement)(_Frame.default, {
    initializeOpen: true
  }, (0, _crank.createElement)("iframe", {
    src: _webextensionPolyfill.default.extension.getURL("sidebar/index.html")
  })), root)).then(function (f) {
    return frame = f.firstElementChild;
  }).then(console.log);
};

_webextensionPolyfill.default.runtime.onMessage.addListener(function (message, sender) {
  var msg = JSON.parse(message);
  console.debug("Got message " + msg.action, {
    payload: msg.payload,
    sender: sender
  });

  switch (msg.action) {
    case "open":
      toggleFrame();
      break;

    case "select":
      document.addEventListener("click", setSelectors);
      break;
  }
});
},{"@bikeshaving/crank":"../node_modules/@bikeshaving/crank/esm/index.js","@bikeshaving/crank/dom":"../node_modules/@bikeshaving/crank/dom.js","@medv/finder":"../node_modules/@medv/finder/dist/index.js","../components/Frame":"components/Frame.tsx","webextension-polyfill":"../node_modules/webextension-polyfill/dist/browser-polyfill.js"}]},{},["contentScripts/sidebarEntry.tsx"], null)
//# sourceMappingURL=/contentScripts/sidebarEntry.js.map