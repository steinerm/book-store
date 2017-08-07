'use strict';

import {createFactory, Component, PropTypes, DOM} from 'react';
import TextClass from 'detailed-item/Text';

const Text = createFactory(TextClass);

class DetailedItem extends Component {

    constructor() {
        super();
        this.displayName = 'DetailedItem';
    }

    render() {
        return DOM.div({
            style: {
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                backgroundColor: 'lightgrey'
            }
        }, this.renderContainer(), this.renderButtonBar());
    }

    renderContainer() {
        return DOM.div({
            style: {
                display: 'flex',
                alignItems: 'center'
            }
        }, this.renderThumbnail(), this.renderContentContainer());
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

    renderContentContainer() {
        return DOM.div({
            style: {
                width: '400px',
                padding: '10px'
            }
        }, this.renderTitle(), this.renderAuthors(), this.renderDescription());
    }

    renderTitle() {
        const {title} = this.props;
        return DOM.h3({
            style: {
                wordWrap: 'break-word',
                paddingBottom: '10px',
                textAlign: 'center',
                fontWeight: 'bold'
            }
        }, title);
    }

    renderAuthors() {
        const {authors} = this.props;
        return Text({
            title: 'Authors:',
            text: authors.map((author, index) => index === 0 ? author : `, ${author}`)
        });
    }

    renderDescription() {
        const {description} = this.props;
        return Text({
            title: 'Description:',
            text: description
        });
    }

    renderButtonBar() {
        const {isCartContains} = this.props;
        return DOM.div(null, this.renderBack(), isCartContains ?
            this.renderRemoveFromCart() : this.renderAddToCart());
    }

    renderBack() {
        const {goBack} = this.props;
        return DOM.div({
            className: 'btn btn-primary',
            style: {
                margin: '10px'
            },
            onClick: () => goBack()
        }, 'Back');
    }

    renderAddToCart() {
        const {add} = this.props;
        return DOM.div({
            className: 'btn btn-primary',
            style: {
                margin: '10px'
            },
            onClick: () => add()
        }, 'Add to cart');
    }

    renderRemoveFromCart() {
        const {id, remove} = this.props;
        return DOM.div({
            className: 'btn btn-primary',
            style: {
                margin: '10px'
            },
            onClick: () => remove(id)
        }, 'Remove from cart');
    }
}

DetailedItem.propTypes = {
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    isCartContains: PropTypes.bool.isRequired,
    add: PropTypes.func,
    remove: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
};

export default DetailedItem;
