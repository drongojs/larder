'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var compositionApi = require('@vue/composition-api');
var getStyles = require('@drongo/styles');
var getStyles__default = _interopDefault(getStyles);
var theme = require('@drongo/ux/theme');
var panel = require('@drongo/ux/panel');
var icon = require('@drongo/ux/icon');

var stylesheet = {
  default: {
    root: {
      display: 'flex'
    },
    content: {
      flexGrow: 1
    },
    caret: {}
  }
};
var script = compositionApi.defineComponent({
  props: {
    expanded: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Icon: icon.Icon
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var styles = compositionApi.computed(function () {
      return getStyles__default(stylesheet);
    });
    var icon = compositionApi.computed(function () {
      return props.expanded ? 'caret-down' : 'caret-up';
    });

    var handleClick = function handleClick() {
      return emit('click');
    };

    return {
      styles: styles,
      css: getStyles.css,
      icon: icon,
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
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.css(_vm.styles.root),on:{"click":_vm.handleClick}},[_c('div',{class:_vm.css(_vm.styles.content)},[_vm._t("default")],2),_vm._v(" "),_c('Icon',{class:_vm.css(_vm.styles.caret),attrs:{"icon":_vm.icon}})],1)};
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

var stylesheet$1 = {
  default: {
    root: {
      marginTop: '2rem',
      height: 'auto',
      overflow: 'hidden',
      transition: 'all 2s'
    }
  }
};
var script$1 = compositionApi.defineComponent({
  props: {
    expanded: {
      type: Boolean,
      required: true
    }
  },
  setup: function setup() {
    var styles = compositionApi.computed(function () {
      return getStyles__default(stylesheet$1);
    });
    return {
      styles: styles,
      css: getStyles.css
    };
  }
});

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.expanded),expression:"expanded"}],class:_vm.css(_vm.styles.root)},[_vm._t("default")],2)};
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

var stylesheet$2 = {
  default: {
    root: {},
    panel: {
      borderWidth: 0,
      borderBottomWidth: 1,
      borderRadius: 0,
      cursor: 'pointer'
    }
  }
};
var Accordion = compositionApi.defineComponent({
  props: {
    value: {
      type: Number,
      default: -1
    },
    kind: {
      type: Symbol
    },
    invert: {
      type: Boolean
    }
  },
  setup: function setup(props, _ref) {
    var emit = _ref.emit;
    var theme$1 = theme.useTheme();
    var styles = getStyles__default(stylesheet$2);

    var handleClick = function handleClick(i) {
      return emit('input', i);
    };

    return {
      theme: theme$1,
      styles: styles,
      css: getStyles.css,
      handleClick: handleClick
    };
  },
  render: function render(h) {
    var css = this.css,
        $slots = this.$slots,
        styles = this.styles,
        value = this.value,
        handleClick = this.handleClick,
        kind = this.kind,
        invert = this.invert;
    var slots = $slots.default.filter(function (slot) {
      return slot.tag;
    }).map(function (slot, i, slots) {
      var isHead = i % 2 === 0;
      var expanded = value === i / 2;

      if (!isHead) {
        return;
      }

      var head = h(__vue_component__, {
        props: {
          expanded: expanded
        } // on: {
        //   click: () => handleClick(i / 2),
        // },

      }, [slot]);
      var body = h(__vue_component__$1, {
        props: {
          expanded: expanded
        }
      }, [slots[i + 1]]);
      return h(panel.Panel, {
        props: {
          kind: kind,
          invert: invert
        },
        attrs: {
          styles: styles.panel
        },
        on: {
          click: function click() {
            return handleClick(i / 2);
          }
        }
      }, [head, body]);
    });
    return h('div', {
      class: css(styles.root)
    }, [slots]);
  }
});

var script$2 = compositionApi.defineComponent({
  props: {
    kind: {
      type: Symbol
    },
    invert: {
      type: Boolean
    }
  },
  components: {
    Accordion: Accordion
  },
  setup: function setup() {
    var value = compositionApi.ref(-1);

    var changeValue = function changeValue(i) {
      if (i === value.value) {
        i = -1;
      }

      value.value = i;
    };

    return {
      value: value,
      changeValue: changeValue
    };
  }
});

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Accordion',_vm._b({attrs:{"value":_vm.value},on:{"input":_vm.changeValue}},'Accordion',_vm.$props,false),[_vm._t("default")],2)};
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

exports.Accordion = __vue_component__$2;
