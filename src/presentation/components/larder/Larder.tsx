import {
  MatchFirst,
  Route,
} from 'vue-component-router';
import Lazy from '../Lazy';
import withScope from '../withScope';
import PageTemplate from '../common/PageTemplate';

const Larder = ({ props: { path } }) => (
  <PageTemplate>
    <MatchFirst>
      <Route
        path={`${path}/add`}
        exact={true}
        {...withScope((scope) => (
          <Lazy
            render={() => import('./Add')}
            attrs={scope}
          />
        ))}
      />
      <Route
        path={`${path}/view/:id`}
        exact={true}
        {...withScope((scope) => (
          <Lazy
            render={() => import('./View')}
            attrs={scope}
          />
        ))}
      />
      <Route
        path={path}
        exact={true}
        {...withScope((scope) => (
          <Lazy
            render={() => import('./List')}
            attrs={scope}
          />
        ))}
      />
    </MatchFirst>
  </PageTemplate>
);

export default Larder;
