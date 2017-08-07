'use strict';

import {createFactory, Component, PropTypes, DOM} from 'react';
import cartIcon from 'resources/cart.svg';
import {Link as LinkClass, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchActionCreators from 'search/searchActionCreators';
import * as cartActionCreators from 'cart/cartActionCreators';
import * as searchSelectors from 'search/searchSelectors';
import * as cartSelectors from 'cart/cartSelectors';

const Link = createFactory(LinkClass);

class NavBar extends Component {

    constructor(props) {
        super(props);
        this.displayName = 'NavBar';
        this.state = {
            searchValue: ''
        };
    }

    componentDidMount() {
        const {load} = this.props;
        load();
    }

    render() {
        return DOM.div({
            className: 'navbar navbar-default',
            style: {
                marginBottom: '0px'
            }
        }, this.renderHeader(), this.renderLeft(), this.renderRight());
    }

    renderHeader() {
        return DOM.div({
            className: 'navbar-header'
        }, this.renderHome());
    }

    renderHome() {
        return Link({
            to: '/',
            onClick: () => this.setState({
                searchValue: ''
            })
        }, DOM.span({
            className: 'navbar-brand'
        }, 'Google Books'));
    }

    renderLeft() {
        const {location, listCount} = this.props;
        const hasList = location.pathname === '/list' && listCount > 0;
        return DOM.div({
            className: 'navbar-form navbar-left'
        }, this.renderInput(), this.renderButton(), hasList ?
            [this.renderListCount(), this.renderPager()] : null);
    }

    renderInput() {
        return DOM.input({
            className: 'form-control',
            placeholder: 'Search',
            value: this.state.searchValue,
            onChange: event => this.setState({
                searchValue: event.target.value
            })
        });
    }

    renderButton() {
        const {search, history} = this.props;
        return DOM.div({
            className: 'btn btn-primary',
            style: {
                marginLeft: '10px'
            },
            onClick: () => {
                history.push('/list');
                search(this.state.searchValue);
            }
        }, 'Search');
    }

    renderPager() {
        const {next, prev, search, hasNext, hasPrev} = this.props;
        return DOM.ul({
            key: 'pager',
            className: 'pager',
            style: {
                display: 'inline-block',
                margin: '0px',
                float: 'right'
            }
        }, DOM.li({
            className: `previous ${hasPrev ? null : 'disabled'}`
        }, DOM.a({
            style: {
                margin: '0 15px',
                cursor: 'pointer'
            },
            onClick: () => {
                if(hasPrev) {
                    prev();
                    search(this.state.searchValue);
                }
            }
        }, 'Previous')), DOM.li({
            className: `next ${hasNext ? null : 'disabled'}`
        }, DOM.a({
            style: {
                margin: '0 15px',
                cursor: 'pointer'
            },
            onClick: () => {
                if(hasNext) {
                    next();
                    search(this.state.searchValue);
                }
            }
        }, 'Next')));
    }

    renderListCount() {
        const {listCount} = this.props;
        return DOM.p({
            key: 'count',
            className: 'navbar-text',
            style: {
                float: 'right',
                margin: '7px'
            }
        }, `${listCount} items`);
    }

    renderRight() {
        return DOM.div({
            className: 'navbar-right',
            style: {
                marginRight: '10px'
            }
        }, this.renderCart());
    }

    renderCart() {
        return Link({
            to: '/cart',
            style: {
                textDecoration: 'none'
            },
            onClick: () => this.setState({
                searchValue: ''
            })
        }, DOM.div({
            className: 'btn btn-default navbar-btn',
            style: {
                display: 'flex'
            }
        }, this.renderCartIcon(), this.renderCartCount()));
    }

    renderCartIcon() {
        return DOM.div({
            style: {
                height: '20px',
                width: '20px',
                backgroundImage: `url(${cartIcon})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }
        });
    }

    renderCartCount() {
        const {cartCount} = this.props;
        return DOM.div({
            style: {
                marginLeft: '10px',
                marginRight: '10px'
            }
        }, cartCount);
    }
}

NavBar.propTypes = {
    search: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    prev: PropTypes.func.isRequired,
    listCount: PropTypes.number.isRequired,
    cartCount: PropTypes.number.isRequired,
    hasNext: PropTypes.bool.isRequired,
    hasPrev: PropTypes.bool.isRequired,
    load: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    listCount: searchSelectors.getCount(state),
    hasNext: searchSelectors.hasNext(state),
    hasPrev: searchSelectors.hasPrev(state),
    cartCount: cartSelectors.getCount(state)
});

const mapDispatchToProps = dispatch => ({
    search: bindActionCreators(searchActionCreators.search, dispatch),
    next: bindActionCreators(searchActionCreators.next, dispatch),
    prev: bindActionCreators(searchActionCreators.prev, dispatch),
    load: bindActionCreators(cartActionCreators.load, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
