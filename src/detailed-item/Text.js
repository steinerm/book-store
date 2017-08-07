'use strict';

import {Component, PropTypes, DOM} from 'react';

class Text extends Component {

    constructor() {
        super();
        this.displayName = 'Text';
    }

    render() {
        return DOM.div(null, this.renderTitle(), this.renderText());
    }

    renderTitle() {
        const {title} = this.props;
        return DOM.h6({
            style: {
                fontWeight: 'bold'
            }
        }, title);
    }

    renderText() {
        const {text} = this.props;
        return DOM.p(null, text);
    }
}

Text.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]).isRequired
};

export default Text;
