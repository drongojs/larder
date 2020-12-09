import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as JpexProvier } from 'react-jpex';
import { Provider as Respite } from '@drongo/respite';
import Routes from 'ui/root/routes/Routes';
import ports from 'ports';

const App = () => (
  <JpexProvier
    onMount={ports}
  >
    <Respite>
      <Router>
        <Routes/>
      </Router>
    </Respite>
  </JpexProvier>
);

export default App;
