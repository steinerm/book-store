'use strict';

import {createFactory, Component, DOM} from 'react';
import {Link as LinkClass} from 'react-router-dom';

const Link = createFactory(LinkClass);

class NotFound extends Component {

    constructor() {
        super();
        this.displayName = 'NotFound';
    }

    render() {
        return DOM.div({
            style: {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                backgroundColor: 'lightgrey'
            }
        }, this.renderContainer());
    }

    renderContainer() {
        return DOM.div({
            style: {
                width: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        }, this.renderText(), this.renderButton());
    }

    renderText() {
        return DOM.h1(null, 'Not Found!');
    }

    renderButton() {
        return Link({
            to: '/'
        }, DOM.div({
            className: 'btn btn-primary'
        }, 'Home'));
    }
}

export default NotFound;
