import { provide, isRef, ref, defineComponent, computed, inject } from '@vue/composition-api';
import Color from 'color';
import useStyles from '@drongo/styles';
import { unwrap } from '@drongo/ux/hooks';

var ThemeProvideKey = Symbol('theme');
var KindKey = Symbol();
var InvertKey = Symbol();
var WHITE = Color('#FFFFFF');
var BLACK = Color('#383838');

var NONE = function () {
  var result = {
    string: function string() {
      return 'inherit';
    }
  };

  var returnSelf = function returnSelf() {
    return result;
  };

  for (var k in WHITE) {
    // @ts-ignore
    if (k !== 'string' && typeof WHITE[k] === 'function') {
      // @ts-ignore
      result[k] = returnSelf;
    }
  }

  return result;
}();

var DEFAULT_THEME = {
  palette: {
    primary: {
      color: Color('#00A6FF'),
      contrast: WHITE
    },
    secondary: {
      color: Color('#1C81C7'),
      contrast: WHITE
    },
    tertiary: {
      color: Color('#A0DB9C'),
      contrast: WHITE
    },
    success: {
      color: Color('#A0DB9C'),
      contrast: WHITE
    },
    warning: {
      color: Color('#FDC518'),
      contrast: WHITE
    },
    danger: {
      color: Color('#E76363'),
      contrast: WHITE
    },
    default: {
      color: BLACK,
      contrast: WHITE
    },
    grey: {
      color: Color('#CCCCCC'),
      contrast: BLACK
    },
    black: {
      color: BLACK,
      contrast: WHITE
    },
    folder: {
      color: Color('#DFD580'),
      contrast: WHITE
    },
    none: {
      color: NONE,
      contrast: NONE
    }
  },
  spacing: 2,
  curvature: 2,
  font: {
    size: 16,
    family: 'Arial'
  }
};
var Kind = {
  PRIMARY: Symbol('primary'),
  SECONDARY: Symbol('secondary'),
  TERTIARY: Symbol('tertiary'),
  SUCCESS: Symbol('success'),
  WARNING: Symbol('warning'),
  DANGER: Symbol('danger'),
  DEFAULT: Symbol('default'),
  NONE: Symbol('none')
};

var provideTheme = (function () {
  var theme = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_THEME;
  provide(ThemeProvideKey, isRef(theme) ? theme : ref(theme));
});

var script = defineComponent({
  props: {
    theme: {
      type: Object,
      default: function _default() {
        return DEFAULT_THEME;
      }
    }
  },
  setup: function setup(props) {
    var theme = computed(function () {
      return props.theme;
    });
    provideTheme(theme);
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
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

var useTheme = (function () {
  var theme = inject(ThemeProvideKey, null);

  if (theme == null) {
    throw new Error('could not find theme provider');
  }

  return theme;
});

var stylesheet = function stylesheet(theme) {
  return {
    default: {
      root: {
        fontSize: theme.font.size,
        fontFamily: theme.font.family,
        color: theme.palette.black.color.string(),
        position: 'relative',
        width: '100vw',
        height: '100vh',
        boxSizing: 'border-box'
      }
    }
  };
};

var script$1 = defineComponent({
  setup: function setup() {
    var theme = useTheme();
    var styles = computed(function () {
      return useStyles(stylesheet, theme.value);
    });
    return {
      styles: styles
    };
  }
});

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.$css(_vm.styles.root)},[_vm._t("default")],2)};
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

var getBorderColor = (function (color) {
  return color.isLight() ? color.darken(0.2) : color.lighten(0.5);
});

var getFocusColor = (function (color) {
  return color.darken(0.2);
});

var getHighlightColor = (function (color) {
  return color.isLight() ? color.darken(0.1) : color.lighten(0.1);
});

var getKindKey = (function (kind) {
  switch (kind) {
    case Kind.PRIMARY:
      return 'primary';

    case Kind.SECONDARY:
      return 'secondary';

    case Kind.TERTIARY:
      return 'tertiary';

    case Kind.SUCCESS:
      return 'success';

    case Kind.WARNING:
      return 'warning';

    case Kind.DANGER:
      return 'danger';

    case Kind.DEFAULT:
      return 'default';

    default:
      return 'none';
  }
});

var getKindByKey = (function (kind) {
  switch (kind) {
    case 'primary':
      return Kind.PRIMARY;

    case 'secondary':
      return Kind.SECONDARY;

    case 'tertiary':
      return Kind.TERTIARY;

    case 'success':
      return Kind.SUCCESS;

    case 'warning':
      return Kind.WARNING;

    case 'danger':
      return Kind.DANGER;

    default:
      return Kind.NONE;
  }
});

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

var getKindKeys = (function () {
  var initial = {};
  return Object.keys(Kind).reduce(function (acc, key) {
    var symbol = Kind[key];
    var value = getKindKey(symbol);
    return _objectSpread2({}, acc, _defineProperty({}, key, value));
  }, initial);
});

var getBaseFontSize = function getBaseFontSize(theme) {
  return theme.font.size;
};

var getSpacing = function getSpacing(theme) {
  return theme.spacing;
};

var getFontSize = function getFontSize(gu, theme) {
  return getBaseFontSize(theme) * gu;
};

var gu2px = function gu2px(gu, theme) {
  return getFontSize(gu, theme) * getSpacing(theme);
};

var perc = (function (n) {
  return "".concat(n, "%");
});

var useKind = (function (theme, _kind, _invert) {
  var inheritedKind = inject(KindKey, null);
  var inheritedInvert = inject(InvertKey, null);
  var kind = computed(function () {
    var kind = unwrap(_kind);

    if (kind == null) {
      kind = Kind.NONE;
    }

    if (kind === Kind.NONE) {
      if (inheritedKind != null) {
        kind = inheritedKind.value;
      }
    }

    return kind;
  });
  var invert = computed(function () {
    var invert = unwrap(_invert);

    if (invert == null) {
      if (inheritedInvert == null) {
        invert = false;
      } else {
        invert = inheritedInvert.value;
      }
    }

    return invert;
  });
  provide(KindKey, kind);
  provide(InvertKey, invert);
  var background = computed(function () {
    var kindKey = getKindKey(kind.value);
    var t = isRef(theme) ? theme.value : theme;
    var palette = t.palette[kindKey];
    return invert.value ? palette.color : palette.contrast;
  });
  var foreground = computed(function () {
    var kindKey = getKindKey(kind.value);
    var t = isRef(theme) ? theme.value : theme;
    var palette = t.palette[kindKey];
    return invert.value ? palette.contrast : palette.color;
  });
  var border = computed(function () {
    return getBorderColor(foreground.value);
  });
  return {
    kind: kind,
    invert: invert,
    background: background,
    foreground: foreground,
    border: border
  };
});

export { DEFAULT_THEME, Kind, __vue_component__ as Provider, __vue_component__$1 as StyleRoot, getBorderColor, getFocusColor, getHighlightColor, getKindByKey, getKindKey, getKindKeys, gu2px, perc, provideTheme, useKind, useTheme };
