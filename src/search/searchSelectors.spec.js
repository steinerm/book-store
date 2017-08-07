'use strict';

import * as selectors from 'search/searchSelectors';
import noImageIcon from 'resources/no-image.png';

describe('search selector', () => {

    describe('parseItems selector', () => {

        it('should return the parsed items', () => {
            const stubResponse = {
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
                }]
            };
            const actualResponse = selectors.parseItems(stubResponse);
            expect(actualResponse).toEqual([{
                id: 'id',
                title: 'title',
                authors: ['author1', 'author2'],
                description: 'description',
                thumbnail: 'imageLink'
            }]);
        });

        it('should return the parsed items without image link', () => {
            const stubResponse = {
                items: [{
                    volumeInfo: {
                        title: 'title',
                        authors: ['author1', 'author2'],
                        description: 'description'
                    },
                    id: 'id'
                }]
            };
            const actualResponse = selectors.parseItems(stubResponse);
            expect(actualResponse).toEqual([{
                id: 'id',
                title: 'title',
                authors: ['author1', 'author2'],
                description: 'description',
                thumbnail: noImageIcon
            }]);
        });
    });
});
