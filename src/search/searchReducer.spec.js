'use strict';

import reducer from 'search/searchReducer';
import initialState from 'search/searchInitialState';
import * as types from 'search/searchActionTypes';

describe('search reducer', () => {

    it('should handle the initial state', () => {
        const actualState = reducer(undefined, {});
        expect(actualState).toEqual(initialState);
    });

    it('should handle an irrelevant action', () => {
        const actualState = reducer({...initialState, count: 1}, {type: 'IRREVELANT'});
        expect(actualState).toEqual({...initialState, count: 1});
    });

    it(`should handle the ${types.SEARCH} action`, () => {
        const actualState = reducer(initialState, {
            type: types.SEARCH,
            query: 'query'
        });
        expect(actualState).toEqual({
            ...initialState,
            progress: true,
            query: 'query'
        });
    });
});
