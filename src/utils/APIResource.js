'use strict';

const ROOT_URL = 'https://content.googleapis.com/books/v1';
const VOLUMES_URL = `${ROOT_URL}/volumes`;

const getContent = response => response.text().then(text => {
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
});

const handleResponse = response => {
    const isSuccessful = response.status >= 200 && response.status < 300;
    if (isSuccessful) {
        return getContent(response);
    } else {
        return getContent(response).then(function(text) {
            throw text;
        });
    }
};

export const getVolumes = (query, startIndex = 0) => fetch(`${VOLUMES_URL}?q=intitle:${encodeURI(query)}&` +
    `startIndex=${encodeURI(startIndex)}&maxResults=40&key=${API_KEY}`, {
    method: 'get'
}).then(handleResponse);
