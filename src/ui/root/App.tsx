import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as JpexProvier } from 'react-jpex';
import { Provider as Respite } from '@respite/query';
import Routes from 'ui/root/routes/Routes';

const App = () => (
  <JpexProvier>
    <Respite>
      <Router>
        <Routes/>
      </Router>
    </Respite>
  </JpexProvier>
);

export default App;
