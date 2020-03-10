'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var compositionApi = require('@vue/composition-api');
var breakpoints = require('@drongo/ux/breakpoints');
var theme = require('@drongo/ux/theme');
var getStyles = require('@drongo/styles');
var getStyles__default = _interopDefault(getStyles);
var Vue = _interopDefault(require('vue'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var defaultProps = {
  flex: true,
  block: false,
  grow: false,
  shrink: false,
  wrap: false,
  direction: 'row',
  align: 'initial',
  justify: 'initial',
  basis: void 0
};

var stylesheet = function stylesheet(props) {
  return {
    flex: {
      root: {
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: props.direction,
        alignItems: props.align,
        justifyContent: props.justify
      }
    },
    block: {
      root: {
        width: theme.perc(100)
      }
    },
    grow: {
      root: {
        flexGrow: 1
      }
    },
    shrink: {
      root: {
        flexShrink: 1
      }
    },
    wrap: {
      root: {
        flexWrap: 'wrap'
      }
    },
    basis: {
      root: {
        flexBasis: props.basis
      }
    }
  };
};

var useFlex = (function (_props) {
  var props = compositionApi.reactive(_objectSpread2({}, defaultProps, {}, compositionApi.toRefs(_props)));
  return compositionApi.computed(function () {
    return getStyles__default(stylesheet, props).root;
  });
});

var script = compositionApi.defineComponent({
  name: 'DrongoUxColumn',
  props: {
    xs: [Number, String],
    sm: [Number, String],
    md: [Number, String],
    lg: [Number, String],
    xl: [Number, String]
  },
  setup: function setup(props) {
    var breakpoints$1 = breakpoints.useBreakpoints();
    var breakpoint = compositionApi.computed(function () {
      if (breakpoints$1.isMinXl && props.xl) {
        return props.xl;
      }

      if (breakpoints$1.isMinLg && props.lg) {
        return props.lg;
      }

      if (breakpoints$1.isMinMd && props.md) {
        return props.md;
      }

      if (breakpoints$1.isMinSm && props.sm) {
        return props.sm;
      }

      if (props.xs) {
        return props.xs;
      }

      return 'fill';
    });
    var grow = compositionApi.computed(function () {
      return breakpoint.value === 'fill';
    });
    var basis = compositionApi.computed(function () {
      var v = breakpoint.value;

      if (Number.isNaN(v)) {
        return 'content';
      }

      return theme.perc(Number(v) * 100 / 12);
    });
    var flexStyles = useFlex(compositionApi.reactive({
      grow: grow,
      basis: basis,
      direction: 'column'
    }));
    return {
      flexStyles: flexStyles,
      css: getStyles.css
    };
  }
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.css(_vm.flexStyles, _vm.$attrs.styles)},[_vm._t("default")],2)};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

var script$1 = compositionApi.defineComponent({
  props: {
    grow: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    var flexProps = compositionApi.reactive(_objectSpread2({
      direction: 'column'
    }, compositionApi.toRefs(props), {}, compositionApi.toRefs(attrs)));
    var flexStyles = useFlex(flexProps);
    return {
      flexStyles: flexStyles,
      css: getStyles.css
    };
  }
});

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.css(_vm.flexStyles, _vm.$attrs.styles)},[_vm._t("default")],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

var script$2 = compositionApi.defineComponent({
  props: {
    wrap: {
      type: Boolean,
      default: true
    }
  },
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    var flexStyles = useFlex(compositionApi.reactive(_objectSpread2({
      direction: 'row',
      block: true
    }, compositionApi.toRefs(props), {}, compositionApi.toRefs(attrs))));
    return {
      flexStyles: flexStyles,
      css: getStyles.css
    };
  }
});

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.css(_vm.flexStyles, _vm.$attrs.styles)},[_vm._t("default")],2)};
var __vue_staticRenderFns__$2 = [];

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

var path = function path(props) {
  return function (x) {
    return props.reduce(function (acc, key) {
      return acc && acc[key];
    }, x);
  };
};

var getSlotName = path(['componentOptions', 'Ctor', 'options', 'name']);
var Grid = Vue.extend({
  props: {
    xs: [Number, String],
    sm: [Number, String],
    md: [Number, String],
    lg: [Number, String],
    xl: [Number, String]
  },
  functional: true,
  render: function render(h, context) {
    var props = context.props,
        attrs = context.data.attrs,
        children = context.children;
    var slots = children.filter(function (vnode) {
      return vnode.tag;
    });
    var columns = slots.map(function (vnode) {
      var name = getSlotName(vnode);

      if (name === 'DrongoUxColumn') {
        return vnode;
      }

      return h(__vue_component__, {
        props: props,
        attrs: attrs
      }, [vnode]);
    });
    var row = h(__vue_component__$2, columns);
    var container = h(__vue_component__$1, [row]);
    return container;
  }
});

exports.Column = __vue_component__;
exports.Container = __vue_component__$1;
exports.Grid = Grid;
exports.Row = __vue_component__$2;
exports.useFlex = useFlex;
