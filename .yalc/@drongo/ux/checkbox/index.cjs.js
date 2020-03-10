'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var compositionApi = require('@vue/composition-api');
var getStyles = require('@drongo/styles');
var getStyles__default = _interopDefault(getStyles);
var theme = require('@drongo/ux/theme');
var icon = require('@drongo/ux/icon');

var stylesheet = function stylesheet(props) {
  var theme$1 = props.theme,
      background = props.background,
      foreground = props.foreground,
      border = props.border;
  var grey = theme$1.palette.grey.color;
  return {
    default: {
      root: {
        cursor: 'pointer',
        backgroundColor: background.string()
      },
      box: {
        display: 'inline-block',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: border.string(),
        padding: theme.gu2px(0.2, theme$1),
        marginRight: theme.gu2px(0.25, theme$1)
      },
      label: {
        color: foreground.string(),
        padding: theme.gu2px(0.2, theme$1),
        cursor: 'inherit'
      },
      icon: {}
    },
    disabled: {
      root: {
        cursor: 'not-alowed'
      },
      box: {
        borderColor: grey.darken(0.2).string()
      },
      icon: {
        color: grey.darken(0.5).string()
      },
      label: {
        color: grey.darken(0.5).string()
      }
    },
    unchecked: {
      icon: {
        visibility: 'hidden'
      }
    }
  };
};

var stylesheet$1 = (function (props) {
  return compositionApi.computed(function () {
    return getStyles__default(stylesheet, props);
  });
});

var script = compositionApi.defineComponent({
  props: {
    value: {
      type: Boolean,
      required: true
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    kind: {
      type: Symbol
    },
    invert: {
      type: Boolean
    }
  },
  components: {
    Icon: icon.Icon
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _toRefs = compositionApi.toRefs(props),
        kind = _toRefs.kind,
        invert = _toRefs.invert,
        disabled = _toRefs.disabled;

    var theme$1 = theme.useTheme();

    var _useKind = theme.useKind(theme$1, kind, invert),
        background = _useKind.background,
        foreground = _useKind.foreground,
        border = _useKind.border;

    var unchecked = compositionApi.computed(function () {
      return !props.value;
    });
    var modifiers = compositionApi.reactive({
      theme: theme$1,
      background: background,
      foreground: foreground,
      border: border,
      disabled: disabled,
      unchecked: unchecked
    });
    var styles = stylesheet$1(modifiers);

    var handleClick = function handleClick() {
      if (props.disabled) {
        return;
      }

      emit('input', !props.value);
    };

    return {
      styles: styles,
      css: getStyles.css,
      handleClick: handleClick,
      kind: kind,
      invert: invert
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.css(_vm.styles.root),on:{"click":_vm.handleClick}},[_c('div',{class:_vm.css(_vm.styles.box)},[_c('Icon',{attrs:{"styles":_vm.styles.icon,"kind":_vm.kind,"invert":_vm.invert,"icon":"check"}})],1),_vm._v(" "),_c('label',{class:_vm.css(_vm.styles.label)},[_vm._v("\n    "+_vm._s(_vm.label)+"\n  ")])])};
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

exports.Checkbox = __vue_component__;
