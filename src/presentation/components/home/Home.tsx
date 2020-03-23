import { RouterLink } from 'vue-component-router';
// import { MdButton } from 'vue-material/dist/vue-material.js';
// import Button from 'vue-material/dist/components/MdButton/index.js';
// import Icon from 'vue-material/dist/components/MdIcon/index.js';

const Link = ({ props }: {
  to: string,
  icon: string,
  text: string,
}) => {
  const {
    to,
    icon,
    text,
  } = props;

  return (
    <div class="md-layout-item md-size-33 md-medium-size-100" style="margin-top: 2rem;">
      <RouterLink to={to} class="md-layout md-alignment-center-center">
        <md-button style="height:auto;">
          <md-icon class="md-size-4x">{icon}</md-icon>
        </md-button>
      </RouterLink>
    </div>
  );
};

export default () => (
  <md-app>
    <md-app-content>
      <div class="md-layout">
        <Link
          icon="receipt"
          text="Larder"
          to="/larder"
        />
        <Link
          icon="shopping_cart"
          text="Shopping"
          to="/shopping"
        />
        <Link
          icon="bookmark"
          text="Recipes"
          to="/recipes"
        />
      </div>
    </md-app-content>
  </md-app>
);
