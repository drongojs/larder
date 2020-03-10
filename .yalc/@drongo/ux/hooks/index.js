import { isRef } from '@vue/composition-api';

var unwrap = function unwrap(x) {
  return isRef(x) ? x.value : x;
};

export { unwrap };
