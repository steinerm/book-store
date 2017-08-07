'use strict';

import * as types from 'cart/cartActionTypes';
import initialState from 'cart/cartInitialState';

export default (state = initialState, action) => {
    const {type, selectedId, item, items} = action;
    switch(type) {
    case types.ADD:
        return {...state, items: [...state.items, {...item}], count: ++state.count};
    case types.REMOVE:
        return {...state, items: state.items.filter(currentItem => currentItem.id !== selectedId),
            count: --state.count};
    case types.SELECT:
        return {...state, selectedId};
    case types.LOAD:
        return {...state, items, count: items.length};
    default:
        return state;
    }
};
