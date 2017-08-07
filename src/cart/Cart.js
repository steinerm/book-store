'use strict';

import {createFactory, Component, PropTypes, DOM} from 'react';
import ListClass from 'list/List';
import * as cartSelectors from 'cart/cartSelectors';
import * as cartActionCreators from 'cart/cartActionCreators';
import * as searchActionCreators from 'search/searchActionCreators';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const List = createFactory(ListClass);

class Cart extends Component {

    constructor(props) {
        super();
        this.displayName = 'Cart';
        props.clear();
    }

    render() {
        const {items, remove, ...props} = this.props;
        return DOM.div({
            style: {
                height: 'calc(100% - 52px)',
                backgroundColor: 'lightgrey',
                overflow: 'auto'
            }
        }, items.length === 0 ? this.renderPlaceHolder() : List({
            ...props,
            items,
            toUrl: '/cart',
            getButtonText: () => 'Remove from cart',
            getButtonAction: id => () => remove(id)
        }));
    }

    renderPlaceHolder() {
        return DOM.h2({
            style: {
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }
        }, 'The cart is empty');
    }
}

Cart.propTypes = {
    items: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    items: cartSelectors.getItems(state)
});

const mapDispatchToProps = dispatch => ({
    select: bindActionCreators(cartActionCreators.select, dispatch),
    remove: bindActionCreators(cartActionCreators.remove, dispatch),
    clear: bindActionCreators(searchActionCreators.clear, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));

