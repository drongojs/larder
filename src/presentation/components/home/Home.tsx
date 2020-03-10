import { RouterLink } from 'vue-component-router';
import { Kind } from '@drongo/ux/theme/index.js';
import { Grid } from '@drongo/ux/grid/index.js';
import { Icon } from '@drongo/ux/icon/index.js';
import { Button } from '@drongo/ux/button/index.js';

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
    <div>
      <Button
        kind={Kind.PRIMARY}
        invert={true}
        component={RouterLink}
        block={true}
        to={to}
        style="border-width: 0 !important;"
      >
        <div style="display: flex; align-items: center; justify-content: center;">
          <Icon
            icon={icon}
            size="xxl"
            invert={false}
          />
          <span>{text}</span>
        </div>
      </Button>
    </div>
  );
};

export default () => (
  <div>
    <Grid
      xs="12"
      sm="10"
      md="6"
      lg="4"
      xl="1"
      align="center"
      justify="center"
    >
      <Link
        icon="archive"
        text="Larder"
        to="/larder"
      />
      <Link
        icon="shopping-cart"
        text="shopping"
        to="/shopping"
      />
      <Link
        icon="bookmark"
        text="Recipes"
        to="/recipes"
      />
    </Grid>
  </div>
);
