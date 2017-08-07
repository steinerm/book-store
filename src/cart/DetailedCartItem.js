'use strict';

import {createFactory, Component, PropTypes, DOM} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as cartSelectors from 'cart/cartSelectors';
import * as cartActionCreators from 'cart/cartActionCreators';
import DetailedItemClass from 'detailed-item/DetailedItem';

const DetailedItem = createFactory(DetailedItemClass);

class DetailedCartItem extends Component {

    constructor() {
        super();
        this.displayName = 'DetailedCartItem';
    }

    render() {
        const {match, history, remove, ...props} = this.props;
        return DOM.div({
            style: {
                height: '100%'
            }
        }, DetailedItem({
            id: match.params.id,
            isCartContains: true,
            goBack: history.goBack,
            ...props,
            remove: id => {
                history.goBack();
                remove(id);
            }
        }));
    }
}

DetailedCartItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    remove: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    imageUrl: cartSelectors.getSelectedItemThumbnail(state),
    title: cartSelectors.getSelectedItemTitle(state),
    authors: cartSelectors.getSelectedItemAuthors(state),
    description: cartSelectors.getSelectedItemDescription(state)
});

const mapDispatchToProps = dispatch => ({
    remove: bindActionCreators(cartActionCreators.remove, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DetailedCartItem));
