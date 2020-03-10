'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var compositionApi = require('@vue/composition-api');
var getStyles = require('@drongo/styles');
var getStyles__default = _interopDefault(getStyles);
var theme = require('@drongo/ux/theme');
var icon = require('@drongo/ux/icon');

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

var stylesheet = function stylesheet(props) {
  var background = props.background,
      foreground = props.foreground,
      border = props.border,
      theme$1 = props.theme;
  var _theme$font = theme$1.font,
      fontFamily = _theme$font.family,
      fontSize = _theme$font.size,
      curvature = theme$1.curvature,
      _theme$palette = theme$1.palette,
      grey = _theme$palette.grey.color,
      primary = _theme$palette.primary.color;
  return {
    default: {
      container: {
        display: 'block',
        position: 'relative',
        width: theme.perc(100)
      },
      input: {
        fontFamily: fontFamily,
        fontSize: fontSize,
        backgroundColor: background.string(),
        color: foreground.string(),
        outline: 'none',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: border.string(),
        borderRadius: curvature * 2,
        paddingTop: theme.gu2px(0.25, theme$1),
        paddingRight: theme.gu2px(0.5, theme$1),
        paddingBottom: theme.gu2px(0.25, theme$1),
        paddingLeft: theme.gu2px(0.5, theme$1),
        boxSizing: 'border-box',
        width: theme.perc(100),
        cursor: 'text',
        ':focus': {
          borderColor: primary.string()
        }
      },
      icon: {
        position: 'absolute',
        right: theme.gu2px(0.25, theme$1),
        top: theme.gu2px(0.25, theme$1)
      }
    },
    disabled: {
      input: {
        cursor: 'not-allowed',
        borderColor: grey.string()
      }
    }
  };
};

var stylesheet$1 = (function (props) {
  var _toRefs = compositionApi.toRefs(props),
      disabled = _toRefs.disabled,
      kind = _toRefs.kind,
      invert = _toRefs.invert;

  var theme$1 = theme.useTheme();

  var _useKind = theme.useKind(theme$1, kind, invert),
      background = _useKind.background,
      foreground = _useKind.foreground,
      border = _useKind.border;

  var modifiers = compositionApi.reactive({
    disabled: disabled,
    theme: theme$1,
    background: background,
    foreground: foreground,
    border: border
  });
  return compositionApi.computed(function () {
    return getStyles__default(stylesheet, modifiers);
  });
});

var omit = function omit(keys, obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (keys.indexOf(key) >= 0) {
      return acc;
    }

    return _objectSpread2({}, acc, _defineProperty({}, key, obj[key]));
  }, {});
};

var script = compositionApi.defineComponent({
  props: {
    kind: {
      type: Symbol
    },
    invert: {
      type: Boolean
    },
    value: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: [Boolean, String]
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon: icon.Icon
  },
  inheritAttrs: false,
  // @ts-ignore
  setup: function setup(props, _ref) {
    var emit = _ref.emit,
        _ref$listeners = _ref.listeners,
        listeners = _ref$listeners === void 0 ? {} : _ref$listeners;
    var styles = stylesheet$1(props);
    var inputIcon = compositionApi.computed(function () {
      if (typeof props.icon === 'string') {
        return props.icon;
      }

      switch (props.kind) {
        case theme.Kind.SUCCESS:
          return 'check';

        case theme.Kind.WARNING:
          return 'exclamation-triangle';

        case theme.Kind.DANGER:
          return 'exclamation';

        default:
          return '';
      }
    });

    var handleChange = function handleChange(evt) {
      emit('change', evt.target.value);
    };

    var handleInput = function handleInput(evt) {
      emit('input', evt.target.value);
    };

    var handleOthers = omit(['change', 'input'], listeners);
    return {
      styles: styles,
      css: getStyles.css,
      inputIcon: inputIcon,
      handleChange: handleChange,
      handleInput: handleInput,
      handleOthers: handleOthers
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.css(_vm.styles.container)},[_c('input',_vm._g(_vm._b({class:_vm.css(_vm.styles.input, _vm.$attrs.styles),attrs:{"type":_vm.type,"disabled":_vm.disabled},domProps:{"value":_vm.value},on:{"input":_vm.handleInput,"change":_vm.handleChange}},'input',_vm.$attrs,false),_vm.handleOthers)),_vm._v(" "),(_vm.icon)?_c('Icon',{attrs:{"kind":_vm.kind,"invert":_vm.invert,"styles":_vm.styles.icon,"icon":_vm.inputIcon}}):_vm._e()],1)};
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

exports.Input = __vue_component__;
