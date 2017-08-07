'use strict';

import {createFactory, Component, PropTypes, DOM} from 'react';
import ListItemClass from 'list/ListItem';

const ListItem = createFactory(ListItemClass);

class List extends Component {

    constructor() {
        super();
        this.displayName = 'List';
    }

    render() {
        return DOM.div({
            style: {
                height: '100%',
                backgroundColor: 'lightgrey',
                overflow: 'auto'
            }
        }, this.renderList());
    }

    renderList() {
        const {items, select, toUrl, getButtonText, getButtonAction} = this.props;
        return DOM.div({
            style: {
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row'
            }
        }, items.map((item, index) => ListItem({
            key: index,
            imageUrl: item.thumbnail,
            title: item.title,
            id: item.id,
            select,
            toUrl,
            buttonText: getButtonText(item.id),
            buttonAction: getButtonAction(item.id)
        })));
    }
}

List.propTypes = {
    items: PropTypes.array.isRequired,
    select: PropTypes.func.isRequired,
    toUrl: PropTypes.string.isRequired,
    getButtonText: PropTypes.func.isRequired,
    getButtonAction: PropTypes.func.isRequired
};

export default List;
