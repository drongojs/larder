'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compositionApi = require('@vue/composition-api');

var unwrap = function unwrap(x) {
  return compositionApi.isRef(x) ? x.value : x;
};

exports.unwrap = unwrap;
