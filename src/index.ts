import { createElement } from 'react';
import { render } from 'react-dom';
import App from 'presentation/root/App';

const node = document.getElementById('root');
render(createElement(App), node);
