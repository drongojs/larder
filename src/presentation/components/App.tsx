import {
  HistoryRouter,
  MatchFirst,
  Route,
} from 'vue-component-router';
import {
  Provider as ThemeProvider,
  StyleRoot,
} from '@drongo/ux/theme/index.js';
import {
  Provider as BreakpointsProvider,
} from '@drongo/ux/breakpoints/index.js';
import withScope from './withScope';
import Home from './home/Home';
import Larder from './larder/Larder';

export default () => (
  <HistoryRouter>
    <ThemeProvider>
      <BreakpointsProvider>
        <StyleRoot>
          <div>
            <MatchFirst>
              <Route
                path="/"
                exact={true}
                {...withScope((scope) => (
                  <Home attrs={scope}/>
                ))}
              />
              <Route
                path="/larder"
                {...withScope((scope) => (
                  <Larder attrs={scope}/>
                ))}
              />
            </MatchFirst>
          </div>
        </StyleRoot>
      </BreakpointsProvider>
    </ThemeProvider>
  </HistoryRouter>
);
