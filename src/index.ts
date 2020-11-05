import { createElement } from 'react';
import { render } from 'react-dom';
import App from 'presentation/root/App';
import './mocks';

const node = document.getElementById('root');
render(createElement(App), node);
