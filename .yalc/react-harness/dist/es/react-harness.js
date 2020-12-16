import React, { createContext, useContext, cloneElement, useRef, useMemo } from 'react';

var Context = /*#__PURE__*/createContext(null);

const DefaultStub = () => null;

var withHarness = (Component => {
  const Harnessed = props => {
    var _ctx$stubs;

    const ctx = useContext(Context);

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
      return /*#__PURE__*/cloneElement(element);
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
} = React;

const createElement = (...[type, ...args]) => {
  // we don't currently stub primitive elements or object components
  if (typeof type === 'function') {
    type = withHarness(type);
  }

  return h(type, ...args);
};

React.createElement = createElement;

function Harness({
  Component,
  Stub,
  stub: stubElement,
  children,
  ...props
}) {
  var _context$stubs;

  const context = useContext(Context);
  const stubsRef = useRef((_context$stubs = context == null ? void 0 : context.stubs) != null ? _context$stubs : []);
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

  const value = useMemo(() => ({
    stubs: stubsRef.current
  }), []);
  return h(Context.Provider, {
    value,
    children
  });
}

export default Harness;
