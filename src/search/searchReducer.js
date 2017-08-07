'use strict';

import * as types from 'search/searchActionTypes';
import initialState from 'search/searchInitialState';

export default (state = initialState, action) => {
    const {type, count, items, query, selectedId} = action;
    switch(type) {
    case types.CLEAR:
        return {...initialState};
    case types.SEARCH:
        return {...state, progress: true, query};
    case types.SEARCH_SUCCESS:
        return {...state, progress: false, count, items};
    case types.NEXT:
        return {...state, startIndex: state.startIndex + 40};
    case types.PREV:
        return {...state, startIndex: state.startIndex - 40};
    case types.SELECT:
        return {...state, selectedId};
    default:
        return state;
    }
};
