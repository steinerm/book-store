'use strict';

import StoreApp from 'StoreApp';
import {createElement} from 'react';
import {render} from 'react-dom';
// import configureStore from 'store/configureStore';
import {Provider} from 'react-redux';

const rootElement = document.getElementById('root');
// const store = configureStore();
const StoreAppElement = createElement(StoreApp);

// render(createElement(Provider, {store}, StoreAppElement), rootElement);
render(StoreAppElement, rootElement);
