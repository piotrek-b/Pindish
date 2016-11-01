// -- 'require' function utilites.

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

// -- FAST MEMOIZE MODULE AND SERVICE
// -- MODULE
angular.module('fastMemoizeModule', [])
    .factory('fastMemoizeService', function() {

        // -- SERVICE

        var fastMemoizeServiceInstance = {};

        // Memoize function.
        fastMemoizeServiceInstance.memoize = require('fast-memoize');

        // -- SERVICE end

        return fastMemoizeServiceInstance;
    })
},

// -- fast-memoize utilities

{"fast-memoize":5}],2:[function(require,module,exports){
'use strict'

var mapCache = require('./map')
var objectCache = require('./object')

function create () {
  var cache

  if (mapCache.hasSupport()) {
    cache = mapCache.create()
  } else {
    cache = objectCache.create()
  }

  return cache
}

module.exports = {
  create: create
}

},{"./map":3,"./object":4}],3:[function(require,module,exports){
'use strict'

function hasSupport () {
  var hasSupport = true

  try {
    var map = new Map()
    map.set(null)
  } catch (error) {
    hasSupport = false
  } finally {
    return hasSupport
  }
}

function create () {
  var cache = new Map()
  cache._name = 'Map'
  return cache
}

module.exports = {
  create: create,
  hasSupport: hasSupport
}

},{}],4:[function(require,module,exports){
'use strict'

function ObjectCache () {
  this._cache = {}
  // Removing prototype makes key lookup faster.
  this._cache.prototype = null
  this._name = 'Object'
}

ObjectCache.prototype.has = function (key) {
  return (key in this._cache)
}

ObjectCache.prototype.get = function (key) {
  return this._cache[key]
}

ObjectCache.prototype.set = function (key, value) {
  this._cache[key] = value
}

// IE8 crashes if we use a method called `delete` with dot-notation.
ObjectCache.prototype['delete'] = function (key) {
  delete this._cache[key]
}

module.exports = {
  create: function () {
    return new ObjectCache()
  }
}

},{}],5:[function(require,module,exports){
'use strict'

var cacheDefault = require('./cache')
var serializerDefault = require('./serializer')

function memoize (fn, options) {
  var cache
  var serializer

  if (options && options.cache) {
    cache = options.cache
  } else {
    cache = cacheDefault
  }

  if (options && options.serializer) {
    serializer = options.serializer
  } else {
    serializer = serializerDefault
  }

  function memoized () {
    var cacheKey

    if (arguments.length === 1) {
      cacheKey = arguments[0]
    } else {
      cacheKey = serializer(arguments)
    }

    if (!memoized._cache.has(cacheKey)) {
      memoized._cache.set(cacheKey, fn.apply(this, arguments))
    }

    return memoized._cache.get(cacheKey)
  }

  memoized._cache = cache.create()

  return memoized
}

module.exports = memoize

},{"./cache":2,"./serializer":6}],6:[function(require,module,exports){
'use strict'

function jsonStringify () {
  return JSON.stringify(arguments)
}

jsonStringify._name = 'jsonStringify'
module.exports = jsonStringify

},{}]},{},[1]);

