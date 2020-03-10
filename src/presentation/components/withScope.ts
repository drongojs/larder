const withScope = (fn) => ({
  scopedSlots: {
    default: fn,
  },
});

export default withScope;
