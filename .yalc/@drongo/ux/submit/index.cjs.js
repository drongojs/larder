'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var compositionApi = require('@vue/composition-api');
var vueCompose = require('vue-compose');
var __vue_normalize__ = _interopDefault(require('vue-runtime-helpers/dist/normalize-component.js'));
var icon = require('@drongo/ux/icon');
var theme = require('@drongo/ux/theme');
var button = require('@drongo/ux/button');

var FormProvideKey = Symbol('form');
var FieldProvideKey = Symbol('field');

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

var getForm = function getForm() {
  var state = compositionApi.inject(FormProvideKey, null);

  if (state == null) {
    throw new Error('Form provider not found');
  }

  return state;
};
var getRawFields = function getRawFields() {
  var form = getForm();
  return compositionApi.computed(function () {
    return form.fields;
  });
};
var getFields = function getFields() {
  var fields = getRawFields();
  var initial = {};
  return compositionApi.computed(function () {
    return fields.value.reduce(function (acc, x) {
      var key = x.key,
          field = x.field;
      return Object.assign({}, acc, _defineProperty({}, key, field));
    }, initial);
  });
};
var createField = function createField() {
  return {
    touched: false,
    changed: false,
    initialValue: void 0,
    value: void 0,
    error: null
  };
};

var registerField = function registerField() {
  var _rawFields = getRawFields();

  var _fields = getFields();

  return function (name) {
    var field = createField();
    var fields = _fields.value;

    if (fields[name] == null) {
      var rawFields = _rawFields.value;
      rawFields.push({
        key: name,
        field: field
      });
    }

    return field;
  };
};

var blur = function blur() {
  return function (field) {};
}; // eslint-disable-next-line

var focus = function focus() {
  return function (field) {};
};
var change = function change() {
  var form = getForm();

  var _fields = getFields();

  return function (name, value) {
    var field = _fields.value[name];

    if (field == null) {
      return;
    }

    field.value = value;
    field.touched = true;
    field.changed = true;
    field.error = null;
    form.submitted = false;
    form.submitSucceeded = false;
    form.submitFailed = false;
  };
};

var useField = function useField(props) {
  var fields = getFields();
  var field = compositionApi.computed(function () {
    return fields.value[props.name];
  });
  var change$1 = change();
  var blur$1 = blur();
  var focus$1 = focus();
  var registerField$1 = registerField();
  compositionApi.provide(FieldProvideKey, field);
  compositionApi.onCreated(function () {
    if (field.value == null) {
      registerField$1(props.name || '');
    }
  });

  var onChange = function onChange(evt) {
    var value = evt && evt.target && evt.target.value !== void 0 ? evt.target.value : evt;

    if (props.parse) {
      value = props.parse(value);
    }

    change$1(props.name || '', value);
  };

  var onBlur = function onBlur() {
    blur$1(props.name || '');
  };

  var onFocus = function onFocus() {
    focus$1(props.name || '');
  };

  var value = compositionApi.computed(function () {
    var x = field.value;
    var value = x.value;

    if (!x.changed) {
      value = x.initialValue;
    }

    if (props.format) {
      value = props.format(value);
    }

    return value;
  });
  return {
    value: value,
    onChange: onChange,
    onBlur: onBlur,
    onFocus: onFocus
  };
};

var InnerField = vueCompose.componentFromSlot();

var script = compositionApi.createComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    parse: Function,
    format: Function
  },
  // @ts-ignore
  components: {
    InnerField: InnerField
  },
  setup: function setup(props) {
    var _useField = useField(props),
        value = _useField.value,
        onChange = _useField.onChange,
        onBlur = _useField.onBlur,
        onFocus = _useField.onFocus;

    return {
      value: value,
      onChange: onChange,
      onBlur: onBlur,
      onFocus: onFocus
    };
  }
});

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('InnerField',{attrs:{"value":_vm.value},on:{"input":_vm.onChange,"blur":_vm.onBlur,"focus":_vm.onFocus}},[_vm._t("default")],2)};
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
  

  
  var Field = __vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var script$1 = compositionApi.defineComponent({
  props: {
    disabled: {
      type: Boolean
    },
    kind: {
      type: Symbol,
      default: function _default() {
        return theme.Kind.PRIMARY;
      }
    },
    invert: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Button: button.Button,
    Icon: icon.Icon
  },
  setup: function setup(props) {
    var form = getForm();
    var disabled = compositionApi.computed(function () {
      return form.submitting || props.disabled;
    });
    var kind = compositionApi.computed(function () {
      if (form.submitSucceeded) {
        return theme.Kind.SUCCESS;
      }

      if (form.submitFailed) {
        return theme.Kind.DANGER;
      }

      return props.kind;
    });
    var hasIcon = compositionApi.computed(function () {
      return form.submitting || form.submitted;
    });
    var iconProps = compositionApi.computed(function () {
      if (form.submitting) {
        return {
          icon: 'spinner',
          pulse: true
        };
      }

      if (form.submitSucceeded) {
        return {
          icon: 'check'
        };
      }

      if (form.submitFailed) {
        return {
          icon: 'times'
        };
      }
    });
    return {
      computedDisabled: disabled,
      computedKind: kind,
      hasIcon: hasIcon,
      iconProps: iconProps
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
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Button',_vm._g(_vm._b({attrs:{"type":"submit","disabled":_vm.computedDisabled,"kind":_vm.computedKind,"invert":_vm.invert}},'Button',_vm.$attrs,false),_vm.$listeners),[(_vm.hasIcon)?_c('Icon',_vm._b({attrs:{"kind":_vm.computedKind,"invert":!_vm.invert}},'Icon',_vm.iconProps,false)):_vm._t("default")],2)};
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
  

  
  const __vue_component__ = normalizeComponent(
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

exports.Submit = __vue_component__;
