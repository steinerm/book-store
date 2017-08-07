'use strict';

import {combineReducers} from 'redux';
import search from 'search/searchReducer';
import cart from 'cart/cartReducer';

const rootReducer = combineReducers({
    search,
    cart
});

export default rootReducer;
