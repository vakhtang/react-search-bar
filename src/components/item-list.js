import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import Item from './item';
import styles from './styles';

class ItemList extends Component {
  static propTypes = {
    focusedItemIndex: PropTypes.number,
    items: PropTypes.array.isRequired,
    itemRenderer: PropTypes.func,
    onItemHover: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    styles: PropTypes.object
  };

  static defaultProps = {
    styles: styles.itemList
  };

  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.focusedItemIndex !== null) {
      this.scrollToItem();
    }
  }

  scrollToItem() {
    const focusedItem = this.focusedItemRef.current;
    const list = this.listRef.current;
    const itemListRect = list.getBoundingClientRect();
    const focusedItemRect = focusedItem.getBoundingClientRect();

    if (focusedItemRect.bottom > itemListRect.bottom) {
      list.scrollTop = focusedItem.offsetTop - (list.offsetHeight - focusedItem.offsetHeight);
    } else if (focusedItemRect.top < itemListRect.top) {
      list.scrollTop = focusedItem.offsetTop;
    }
  }

  setFocusedItem = ref => {
    this.focusedItemRef = ref && ref.itemRef;
  };

  onMouseMove = (event, index) => {
    const { movementX, movementY } = event.nativeEvent;

    if (movementX || movementY) {
      this.props.onItemHover(index);
    }
  };

  onMouseLeave = () => {
    this.props.onItemHover(null);
  };

  renderItem = (item, index) => {
    const { props } = this;
    const isFocused = props.focusedItemIndex === index;

    return (
      <Item
        className={classNames({
          [props.styles.item]: true,
          [props.styles.itemFocused]: isFocused
        })}
        index={index}
        item={item}
        itemRenderer={props.itemRenderer}
        key={item}
        onClick={props.onSelect}
        onMouseMove={this.onMouseMove}
        ref={isFocused && this.setFocusedItem}
        searchTerm={props.searchTerm}
      />
    );
  };

  render() {
    return (
      <ul className={this.props.styles.items} ref={this.listRef} onMouseLeave={this.onMouseLeave}>
        {this.props.items.map(this.renderItem)}
      </ul>
    );
  }
}

export default ItemList;
