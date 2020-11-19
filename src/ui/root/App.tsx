import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as JpexProvier } from 'react-jpex';
import Routes from 'ui/routes/Routes';
import ports from 'ports';

const App = () => (
  <JpexProvier
    onMount={ports}
  >
    <Router>
      <Routes/>
    </Router>
  </JpexProvier>
);

export default App;
