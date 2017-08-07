'use strict';
import * as types from 'search/searchActionTypes';
import * as APIResource from 'utils/APIResource.js';
import * as searchSelectors from 'search/searchSelectors';

export const clear = () => {
    return {
        type: types.CLEAR
    };
};

export const search = (query, getVolumes = APIResource.getVolumes) => {
    const {parseItems, parseCount, getStartIndex} = searchSelectors;
    return (dispatch, getState) => {
        dispatch({
            type: types.SEARCH,
            query
        });
        const startIndex = getStartIndex(getState());
        getVolumes(query, startIndex).then(response => {
            dispatch({
                type: types.SEARCH_SUCCESS,
                items: parseItems(response),
                count: parseCount(response)
            });
        });
    };
};

export const select = selectedId => {
    return {
        type: types.SELECT,
        selectedId
    };
};

export const next = () => {
    return {
        type: types.NEXT
    };
};

export const prev = () => {
    return {
        type: types.PREV
    };
};
