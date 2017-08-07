'use strict';

import {Component, PropTypes, DOM} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchActionCreators from 'search/searchActionCreators';

class Home extends Component {

    constructor(props) {
        super();
        this.displayName = 'Home';
        props.clear();
    }

    render() {
        return DOM.div({
            style: {
                height: '100%',
                backgroundColor: 'lightgrey',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        }, this.renderContainer());
    }

    renderContainer() {
        return DOM.div({
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        }, this.renderHeaderText(), this.renderSubText());
    }

    renderHeaderText() {
        return DOM.h1(null, 'Google Books Store');
    }

    renderSubText() {
        return DOM.h2(null, 'Use the search in the navigation bar!');
    }
}

Home.propTypes = {
    clear: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    clear: bindActionCreators(searchActionCreators.clear, dispatch)
});

export default (connect(null, mapDispatchToProps)(Home));
