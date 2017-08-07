'use strict';

import * as types from 'cart/cartActionTypes';
import * as searchSelectors from 'search/searchSelectors';

export const load = (sessionStorage = window.sessionStorage) => {
    const storedItems = JSON.parse(sessionStorage.getItem('cart'));
    return {
        type: types.LOAD,
        items: storedItems ? storedItems : []
    };
};

export const select = selectedId => {
    return {
        type: types.SELECT,
        selectedId
    };
};

export const add = (sessionStorage = window.sessionStorage) => {
    const {getSelectedItem} = searchSelectors;
    return (dispatch, getState) => {
        const item = getSelectedItem(getState());
        const storedItems = JSON.parse(sessionStorage.getItem('cart'));
        if(storedItems) {
            storedItems.push(item);
            sessionStorage.setItem('cart', JSON.stringify(storedItems));
        } else {
            sessionStorage.setItem('cart', JSON.stringify([item]));
        }
        dispatch({
            type: types.ADD,
            item
        });
    };
};

export const remove = selectedId => {
    const storedItems = JSON.parse(sessionStorage.getItem('cart'));
    sessionStorage.setItem('cart', JSON.stringify(storedItems.filter(item => item.id !== selectedId)));
    return {
        type: types.REMOVE,
        selectedId
    };
};
