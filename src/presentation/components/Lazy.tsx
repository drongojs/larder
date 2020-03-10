import Vue from 'vue';

const Lazy = Vue.extend({
  props: {
    render: {
      type: Function as () => any,
      required: true,
    },
  },
  render() {
    const { render: Render, $attrs } = this;
    return (
      <Render attrs={$attrs}/>
    );
  },
});

export default Lazy;
