'use strict';

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Context = /*#__PURE__*/React.createContext(null);

const DefaultStub = () => null;

var withHarness = (Component => {
  const Harnessed = props => {
    var _ctx$stubs;

    const ctx = React.useContext(Context);

    if (!(ctx == null ? void 0 : (_ctx$stubs = ctx.stubs) == null ? void 0 : _ctx$stubs.length)) {
      return h(Component, props);
    }

    const stub = ctx.stubs.find(({
      Component: C
    }) => {
      if (C === Component || C === Harnessed || C === Component.displayName) {
        return true;
      }
    });

    if (stub == null) {
      return h(Component, props);
    }

    const {
      Stub,
      stub: element,
      props: staticProps
    } = stub;

    if (element) {
      return /*#__PURE__*/React.cloneElement(element);
    }

    if (Stub) {
      return h(Stub, { ...props,
        ...staticProps
      });
    }

    return h(DefaultStub);
  };

  Harnessed.displayName = "Harnessed" + (Component.displayName || Component.name || '');
  return Harnessed;
});

const {
  createElement: h
} = React__default['default'];

const createElement = (...[type, ...args]) => {
  // we don't currently stub primitive elements or object components
  if (typeof type === 'function') {
    type = withHarness(type);
  }

  return h(type, ...args);
};

React__default['default'].createElement = createElement;

function Harness({
  Component,
  Stub,
  stub: stubElement,
  children,
  ...props
}) {
  var _context$stubs;

  const context = React.useContext(Context);
  const stubsRef = React.useRef((_context$stubs = context == null ? void 0 : context.stubs) != null ? _context$stubs : []);
  const stub = stubsRef.current.find(({
    Component: C
  }) => C === Component); // lots of mutation going on here :eyes:

  if (stub) {
    Object.assign(stub, {
      Stub,
      stub: stubElement,
      props
    });
  } else {
    stubsRef.current.push({
      Component,
      Stub,
      stub: stubElement,
      props
    });
  } // if we already have context we don't need to create a new provider


  if (context) {
    return children;
  }

  const value = React.useMemo(() => ({
    stubs: stubsRef.current
  }), []);
  return h(Context.Provider, {
    value,
    children
  });
}

module.exports = Harness;
