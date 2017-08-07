'use strict';

import {createSelector} from 'reselect';
import noImageIcon from 'assets/no-image.png';

const progressSelector = state => state.search.progress;
const selectedIdSelector = state => state.search.selectedId;
const itemsSelector = state => state.search.items;
const countSelector = state => state.search.count;
const startIndexSelector = state => state.search.startIndex;
const itemsResponseSelector = response => response.items;
const totalItemsResponseSelector = response => response.totalItems;

export const isInProgress = createSelector(
    progressSelector,
    progress => progress
);

export const parseItems = createSelector(
    itemsResponseSelector,
    (items = []) => items.map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : noImageIcon
    }))
);

export const parseCount = createSelector(
    totalItemsResponseSelector,
    (count = 0) => count
);

export const getSelectedItem = createSelector(
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

export const getStartIndex = createSelector(
    startIndexSelector,
    startIndex => startIndex
);

export const hasNext = createSelector(
    countSelector,
    startIndexSelector,
    (count, startIndex) => startIndex + 40 < count
);

export const hasPrev = createSelector(
    countSelector,
    startIndexSelector,
    (count, startIndex) => startIndex - 40 >= 0
);
