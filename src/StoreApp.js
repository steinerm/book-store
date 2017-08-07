'use strict';

import {createFactory, createElement, Component, DOM} from 'react';
import {Route as RouteClass, Switch as SwitchClass} from 'react-router-dom';
import NavBarClass from 'navbar/NavBar';
import CartClass from 'cart/Cart';
import HomeClass from 'home/Home';
import SearchClass from 'search/Search';
import DetailedSearchItem from 'search/DetailedSearchItem';
import DetailedCartItemClass from 'cart/DetailedCartItem';
import NotFoundClass from 'not-found/NotFound';

const Route = createFactory(RouteClass);
const Switch = createFactory(SwitchClass);
const NavBar = createFactory(NavBarClass);

class StoreApp extends Component {

    constructor() {
        super();
        this.displayName = 'StoreApp';
    }

    render() {
        return DOM.div({
            style: {
                height: '100%'
            }
        }, NavBar(), this.renderSwitch());
    }

    renderSwitch() {
        return Switch(null, this.renderHome(),
            this.renderDetailedSearchItem(), this.renderDetailedCartItem(), this.renderList(), this.renderCart(), this.renderNotfound());
    }

    renderHome() {
        return Route({
            exact: true,
            path: '/',
            component: HomeClass
        });
    }

    renderList() {
        return Route({
            path: '/list',
            component: SearchClass
        });
    }

    renderCart() {
        return Route({
            path: '/cart',
            component: CartClass
        });
    }

    renderDetailedSearchItem() {
        return Route({
            path: '/list/:id',
            component: DetailedSearchItem
        });
    }

    renderDetailedCartItem() {
        return Route({
            path: '/cart/:id',
            component: DetailedCartItemClass
        });
    }

    renderNotfound() {
        return Route({
            component: NotFoundClass
        });
    }
}

export default createElement(StoreApp);
