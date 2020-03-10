import { RouterLink } from 'vue-component-router';
const list = [
  'apples',
  'bannanas',
  'pears',
];

export default () => (
  <div>
    <div>Larder</div>
    <input type="text" placeholder="Add..."/><RouterLink to="/larder/add?name=example">Add</RouterLink>
    {list.map((x) => (
      <div>
        <RouterLink to={`/larder/view/${x}`}>
          {x} - {Math.floor(Math.random() * 20)}
        </RouterLink>
      </div>
    ))}
  </div>
)
