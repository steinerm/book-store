'use strict';

import {createStore, applyMiddleware} from 'redux';
import rootReducer from 'store/rootReducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

export default function configureStore(initialState) {
    return createStore(
        rootReducer,
        initialState,
        getMiddleware()
    );
}

const getMiddleware = () => {
    if(process.env.NODE_ENV === 'development') {
        return composeWithDevTools(applyMiddleware(thunk));
    } else {
        return applyMiddleware(thunk);
    }
};
