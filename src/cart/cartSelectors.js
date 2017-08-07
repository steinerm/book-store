'use strict';

import {createSelector} from 'reselect';
import * as searchSelectors from 'search/searchSelectors';

const selectedIdSelector = state => state.cart.selectedId;
const itemsSelector = state => state.cart.items;
const countSelector = state => state.cart.count;

const getSelectedItem = createSelector(
    itemsSelector,
    selectedIdSelector,
    (items, selectedId) =>items.find(item => item.id === selectedId)
);

export const getSelectedItemTitle = createSelector(
    getSelectedItem,
    selectedItem => selectedItem.title
);

export const getSelectedItemAuthors = createSelector(
    getSelectedItem,
    selectedItem => selectedItem.authors
);

export const getSelectedItemDescription = createSelector(
    getSelectedItem,
    selectedItem => selectedItem.description
);

export const getSelectedItemThumbnail = createSelector(
    getSelectedItem,
    selectedItem => selectedItem.thumbnail
);

export const getItems = createSelector(
    itemsSelector,
    items => items
);

export const getCount = createSelector(
    countSelector,
    count => count
);

export const contains = createSelector(
    itemsSelector,
    searchSelectors.getSelectedItem,
    (items, selectedItem) => items.findIndex(item => item.id === selectedItem.id) >= 0
);

export const getContainedIds = createSelector(
    itemsSelector,
    searchSelectors.getItems,
    (items, searchItems) => searchItems.filter(searchItem => items.findIndex(
        item => item.id === searchItem.id) >= 0).map(item => item.id)
);
