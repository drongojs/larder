import { RouterLink } from 'vue-component-router';

const Add = ({ props }) => (
  <div>
    <div>Add</div>
    <div>
      Name:
      <input value="example"/>
    </div>
    <div>
      Quantity:
      <input type="number" value="1"/>
    </div>
    <div>
      Expiry:
      <input type="date"/>
    </div>
    <div>
      <RouterLink to="/larder">Done</RouterLink>
    </div>
  </div>
);

export default Add;
