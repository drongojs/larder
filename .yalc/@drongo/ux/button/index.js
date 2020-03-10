import { computed, defineComponent, toRefs, reactive } from '@vue/composition-api';
import getStyles, { css } from '@drongo/styles';
import { perc, gu2px, getHighlightColor, getFocusColor, useTheme, useKind } from '@drongo/ux/theme';

var stylesheet = function stylesheet(props) {
  var background = props.background,
      border = props.border,
      foreground = props.foreground,
      theme = props.theme;
  var _theme$font = theme.font,
      fontSize = _theme$font.size,
      fontFamily = _theme$font.family,
      grey = theme.palette.grey.color,
      curvature = theme.curvature;
  return {
    default: {
      root: {
        fontSize: fontSize,
        fontFamily: fontFamily,
        fontWeight: 400,
        alignItems: 'flex-start',
        flexBasis: perc(100),
        wordSpacing: 'normal',
        backgroundColor: background.string(),
        color: foreground.string(),
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: border.string(),
        paddingTop: gu2px(0.5, theme),
        paddingRight: gu2px(1, theme),
        paddingBottom: gu2px(0.5, theme),
        paddingLeft: gu2px(1, theme),
        '-webkit-appearance': 'none',
        outline: 'none',
        textDecoration: 'none',
        textTransform: 'none',
        boxSizing: 'border-box',
        display: 'inline-block',
        borderRadius: curvature * 2,
        textAlign: 'center',
        cursor: 'pointer'
      }
    },
    disabled: {
      root: {
        cursor: 'not-allowed',
        backgroundColor: background.mix(grey, 0.5).string(),
        color: foreground.mix(grey, 0.5).string(),
        borderColor: border.mix(grey, 0.5).string()
      }
    },
    enabled: {
      root: {
        ':hover': {
          backgroundColor: getHighlightColor(background).string(),
          color: getHighlightColor(foreground).string()
        },
        ':active': {
          borderStyle: 'inset',
          backgroundColor: getFocusColor(background).string(),
          color: getFocusColor(foreground).string()
        }
      }
    },
    block: {
      root: {
        display: 'block',
        width: perc(100)
      }
    }
  };
};

var stylesheet$1 = (function (props) {
  return computed(function () {
    return getStyles(stylesheet, props);
  });
});

var script = defineComponent({
  props: {
    component: {
      type: [Object, String],
      default: function _default() {
        return 'button';
      }
    },
    block: {
      type: Boolean,
      default: false
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
    },
    type: {
      type: String,
      default: 'button'
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;

    var _toRefs = toRefs(props),
        kind = _toRefs.kind,
        disabled = _toRefs.disabled,
        block = _toRefs.block;

    var invert = computed(function () {
      return !props.invert;
    });
    var theme = useTheme();

    var _useKind = useKind(theme, kind, invert),
        background = _useKind.background,
        foreground = _useKind.foreground,
        border = _useKind.border;

    var enabled = computed(function () {
      return !disabled.value;
    });
    var modifiers = reactive({
      background: background,
      foreground: foreground,
      border: border,
      theme: theme,
      disabled: disabled,
      block: block,
      enabled: enabled
    });
    var styles = stylesheet$1(modifiers);

    var handleClick = function handleClick(evt) {
      if (props.disabled) {
        evt.preventDefault();
        return;
      }

      emit('click', evt);
    };

    return {
      styles: styles,
      css: css,
      handleClick: handleClick
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.component,_vm._b({tag:"Component",class:_vm.css(_vm.styles.root, _vm.$attrs.styles),attrs:{"type":_vm.type},on:{"click":_vm.handleClick}},'Component',_vm.$attrs,false),[_vm._t("default")],2)};
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

export { __vue_component__ as Button };
