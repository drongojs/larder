import { createElement } from 'react';
import { render } from 'react-dom';
import App from 'ui/root/App';
// import './mocks';

const node = document.getElementById('root');
render(createElement(App), node);

// TODO: remove <Flex>
// TODO: remove <PaddingBox>
// ^ I think we can find a way of just using classes or something to style these things
