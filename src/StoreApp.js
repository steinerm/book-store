'use strict';

import {createFactory, createElement, Component, PropTypes, DOM} from 'react';

class StoreApp extends Component {

    constructor() {
        super();
        this.displayName = 'StoreApp';
    }

    render() {
        return DOM.div(null, 'Hello world!!');
    }
}

export default StoreApp;
