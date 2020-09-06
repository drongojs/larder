import { createElement } from 'react';
import { render } from 'react-dom';
import App from './app/App';

const node = document.getElementById('root');
render(createElement(App), node);
