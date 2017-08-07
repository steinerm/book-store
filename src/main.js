'use strict';

import 'bootstrap.css';
import StoreApp from 'StoreApp';
import {createElement, createFactory} from 'react';
import {render} from 'react-dom';
import configureStore from 'store/configureStore';
import {Provider} from 'react-redux';
import {BrowserRouter as BrowserRouterClass} from 'react-router-dom';

const rootElement = document.getElementById('root');
const store = configureStore();
const BrowserRouter = createFactory(BrowserRouterClass);

render(BrowserRouter(null, createElement(Provider, {store}, StoreApp)), rootElement);
