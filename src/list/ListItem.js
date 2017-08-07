'use strict';

import {createFactory, Component, PropTypes, DOM} from 'react';
import {Link as LinkClass} from 'react-router-dom';

const Link = createFactory(LinkClass);

class ListItem extends Component {

    constructor() {
        super();
        this.displayName = 'ListItem';
    }

    render() {
        return DOM.div({
            className: 'thumbnail',
            style: {
                margin: '10px'
            }
        }, this.renderThumbnail(), this.renderDetails());
    }

    renderThumbnail() {
        const {imageUrl} = this.props;
        return DOM.div({
            style: {
                width: '200px',
                height: '200px',
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }
        });
    }

    renderDetails() {
        return DOM.div({
            className: 'caption',
            style: {
                width: '200px',
                textAlign: 'center'
            }
        }, this.renderTitle(), this.renderButton());
    }

    renderTitle() {
        const {title, id, select, toUrl} = this.props;
        return Link({
            to: `${toUrl}/${id}`
        }, DOM.p({
            style: {
                height: '50px',
                wordWrap: 'break-word',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            },
            onClick: () => select(id)
        }, title));
    }

    renderButton() {
        const {buttonText, buttonAction, id} = this.props;
        return DOM.div({
            className: 'btn btn-primary',
            onClick: () => buttonAction(id)
        }, buttonText);
    }
}

ListItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
    toUrl: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    buttonAction: PropTypes.func.isRequired
};

export default ListItem;
