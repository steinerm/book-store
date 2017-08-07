'use strict';

import {createFactory, Component, PropTypes, DOM} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchSelectors from 'search/searchSelectors';
import * as cartSelectors from 'cart/cartSelectors';
import * as cartActionCreators from 'cart/cartActionCreators';
import DetailedItemClass from 'detailed-item/DetailedItem';

const DetailedItem = createFactory(DetailedItemClass);

class DetailedSearchItem extends Component {

    constructor() {
        super();
        this.displayName = 'DetailedSearchItem';
    }

    render() {
        const {match, history, ...props} = this.props;
        return DOM.div({
            style: {
                height: '100%'
            }
        }, DetailedItem({
            id: match.params.id,
            goBack: history.goBack,
            ...props
        }));
    }
}

DetailedSearchItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    isCartContains: PropTypes.bool.isRequired,
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    imageUrl: searchSelectors.getSelectedItemThumbnail(state),
    title: searchSelectors.getSelectedItemTitle(state),
    authors: searchSelectors.getSelectedItemAuthors(state),
    description: searchSelectors.getSelectedItemDescription(state),
    isCartContains: cartSelectors.contains(state)
});

const mapDispatchToProps = dispatch => ({
    remove: bindActionCreators(cartActionCreators.remove, dispatch),
    add: bindActionCreators(cartActionCreators.add, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedSearchItem));
