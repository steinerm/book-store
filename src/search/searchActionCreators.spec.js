'use strict';

import * as actionCreators from 'search/searchActionCreators';
import initialState from 'search/searchInitialState';
import * as types from 'search/searchActionTypes';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search action creator', () => {

    describe('search action', () => {

        it(`should handle ${types.SEARCH} action`, done  => {
            const store = mockStore({
                search: {
                    ...initialState,
                    startIndex: 10
                }
            });
            const expectedQuery = 'query';
            const stubGetVolumesFunc = (query, startIndex) => {
                expect(query).toEqual(expectedQuery);
                expect(startIndex).toEqual(10);
                return Promise.resolve({
                    items: [{
                        volumeInfo: {
                            title: 'title',
                            authors: ['author1', 'author2'],
                            description: 'description',
                            imageLinks: {
                                thumbnail: 'imageLink'
                            }
                        },
                        id: 'id'
                    }],
                    totalItems: 1
                });
            };
            Promise.all([store.dispatch(actionCreators.search(expectedQuery, stubGetVolumesFunc))]).then(() => {
                expect(store.getActions()).toEqual([{
                    type: types.SEARCH,
                    query: expectedQuery
                }, {
                    type: types.SEARCH_SUCCESS,
                    items: [{
                        id: 'id',
                        title: 'title',
                        authors: ['author1', 'author2'],
                        description: 'description',
                        thumbnail: 'imageLink'
                    }],
                    count: 1

                }]);
                done();
            });
        });
    });
});
