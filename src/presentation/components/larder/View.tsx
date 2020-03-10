import Vue from 'vue';

const list = [
  [ 40, 'g', '2020-03-04' ],
  [ 1, 'kg', '2020-05-03' ],
  [ 500, 'g', '2020-01-01' ],
];

export default Vue.extend({
  props: {
    id: String,
  },
  render() {
    return (
      <div>
        <div>View: {this.id}</div>
        <ul>
          {list.map(([ q, u, d]) => (
            <li>
              {`${q}${u} expires ${d}`}
            </li>
          ))}
        </ul>
        <button>Add</button>
      </div>
    );
  },
});
