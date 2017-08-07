'use strict';

import {createFactory, Component, PropTypes, DOM} from 'react';
import progressIcon from 'resources/progress.gif';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchSelectors from 'search/searchSelectors';
import * as cartSelectors from 'cart/cartSelectors';
import ListClass from 'list/List';
import * as searchActionCreators from 'search/searchActionCreators';
import * as cartActionCreators from 'cart/cartActionCreators';

const List = createFactory(ListClass);

class Search extends Component {

    constructor() {
        super();
        this.displayName = 'Search';
    }

    render() {
        const {isInProgress, select, containedIds, add, remove, ...props} = this.props;
        return DOM.div({
            style: {
                height: 'calc(100% - 52px)',
                backgroundColor: 'lightgrey',
                overflow: 'auto'
            }
        }, isInProgress ? this.renderProgressContainer() : List({
            ...props,
            select,
            toUrl: '/list',
            getButtonText: id => containedIds.includes(id) ? 'Remove from cart' : 'Add to cart',
            getButtonAction: id => containedIds.includes(id) ? itemId => remove(itemId) : itemId => {
                select(itemId);
                add();
            }
        }));
    }

    renderProgressContainer() {
        return DOM.div({
            style: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }, this.renderProgressIcon(), this.renderProgressText());
    }

    renderProgressIcon() {
        return DOM.div({
            style: {
                height: '200px',
                width: '200px',
                backgroundImage: `url(${progressIcon})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }
        });
    }

    renderProgressText() {
        return DOM.h3(null, 'Searching...');
    }
}

Search.propTypes = {
    isInProgress: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    containedIds: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    isInProgress: searchSelectors.isInProgress(state),
    items: searchSelectors.getItems(state),
    containedIds: cartSelectors.getContainedIds(state)
});

const mapDispatchToProps = dispatch => ({
    select: bindActionCreators(searchActionCreators.select, dispatch),
    add: bindActionCreators(cartActionCreators.add, dispatch),
    remove: bindActionCreators(cartActionCreators.remove, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
