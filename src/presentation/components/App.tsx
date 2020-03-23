import {
  HistoryRouter,
  MatchFirst,
  Route,
} from 'vue-component-router';
import withScope from './withScope';
import Home from './home/Home';
import Larder from './larder/Larder';

export default () => (
  <HistoryRouter>
    <div class="page-container">
      <MatchFirst>
        <Route
          path="/larder"
          {...withScope((scope) => (
            <Larder attrs={scope}/>
          ))}
        />
        <Route
          path="/"
          {...withScope((scope) => (
            <Home attrs={scope}/>
          ))}
        />
      </MatchFirst>
    </div>
  </HistoryRouter>
);
