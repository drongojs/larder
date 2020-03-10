import { ref, onMounted, onUnmounted, reactive, watch, defineComponent, provide, computed, inject } from '@vue/composition-api';

var BreakpointsKey = Symbol();
var Breakpoints;

(function (Breakpoints) {
  Breakpoints[Breakpoints["XS"] = 0] = "XS";
  Breakpoints[Breakpoints["SM"] = 480] = "SM";
  Breakpoints[Breakpoints["MD"] = 760] = "MD";
  Breakpoints[Breakpoints["LG"] = 1024] = "LG";
  Breakpoints[Breakpoints["XL"] = 1200] = "XL";
})(Breakpoints || (Breakpoints = {}));

var useWindowWidth = function useWindowWidth() {
  var width = ref(window.innerWidth);

  var handleResize = function handleResize() {
    width.value = window.innerWidth;
  };

  onMounted(function () {
    window.addEventListener('resize', handleResize);
  });
  onUnmounted(function () {
    window.removeEventListener('resize', handleResize);
  });
  return width;
};
var getBreakpoints = function getBreakpoints(width) {
  var bp = reactive({
    isMinXs: false,
    isMinSm: false,
    isMinMd: false,
    isMinLg: false,
    isMinXl: false,
    isMaxXs: false,
    isMaxSm: false,
    isMaxMd: false,
    isMaxLg: false,
    isMaxXl: false
  });
  watch(function () {
    return width.value;
  }, function (width) {
    if (width >= Breakpoints.XL) {
      bp.isMinXs = bp.isMinSm = bp.isMinMd = bp.isMinLg = bp.isMinXl = true;
      bp.isMaxXs = bp.isMaxSm = bp.isMaxMd = bp.isMaxLg = false;
      bp.isMaxXl = true;
    } else if (width >= Breakpoints.LG) {
      bp.isMinXs = bp.isMinSm = bp.isMinMd = bp.isMinLg = true;
      bp.isMinXl = false;
      bp.isMaxXs = bp.isMaxSm = bp.isMaxMd = false;
      bp.isMaxLg = true;
      bp.isMaxXl = false;
    } else if (width >= Breakpoints.MD) {
      bp.isMinXs = bp.isMinSm = bp.isMinMd = true;
      bp.isMinLg = bp.isMinXl = false;
      bp.isMaxXs = bp.isMaxSm = false;
      bp.isMaxMd = true;
      bp.isMaxLg = bp.isMaxXl = false;
    } else if (width >= Breakpoints.SM) {
      bp.isMinXs = bp.isMinSm = true;
      bp.isMinMd = bp.isMinLg = bp.isMinXl = false;
      bp.isMaxXs = false;
      bp.isMaxSm = true;
      bp.isMaxMd = bp.isMaxLg = bp.isMaxXl = false;
    } else {
      bp.isMinXs = true;
      bp.isMinSm = bp.isMinMd = bp.isMinLg = bp.isMinXl = false;
      bp.isMaxXs = true;
      bp.isMaxSm = bp.isMaxMd = bp.isMaxLg = bp.isMaxXl = false;
    }
  });
  return bp;
};

var script = defineComponent({
  setup: function setup() {
    var width = useWindowWidth();
    var breakpoints = getBreakpoints(width);
    provide(BreakpointsKey, breakpoints);
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

var script$1 = defineComponent({
  props: {
    size: {
      type: String,
      required: true
    }
  },
  // @ts-ignore
  setup: function setup(props) {
    var width = computed(function () {
      switch (props.size) {
        case 'xl':
          return Breakpoints.XL;

        case 'lg':
          return Breakpoints.LG;

        case 'md':
          return Breakpoints.MD;

        case 'sm':
          return Breakpoints.SM;

        default:
          return Breakpoints.XS;
      }
    });
    var breakpoints = getBreakpoints(width);
    provide(BreakpointsKey, breakpoints);
  }
});

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_vm._t("default")],2)};
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

var useBreakpoints = function useBreakpoints() {
  var bp = inject(BreakpointsKey, null);

  if (bp == null) {
    throw new Error('Could not find breakpoints, have you rendered the breakpoints provider?');
  }

  return bp;
};

export { BreakpointsKey, __vue_component__ as Provider, __vue_component__$1 as StubProvider, useBreakpoints };
