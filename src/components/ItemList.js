import PropTypes from "prop-types";
import React, { Component } from "react";
import classNames from "classnames";
import Item from "./Item";
import styles from "./styles";

class ItemList extends Component {
  static propTypes = {
    focusedItemIndex: PropTypes.number,
    items: PropTypes.array.isRequired,
    itemRenderer: PropTypes.func,
    maxVisibleItems: PropTypes.number,
    onItemHover: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    searchTerm: PropTypes.string.isRequired,
    styles: PropTypes.object
  };

  static defaultProps = {
    maxVisibleItems: 10,
    styles: styles.itemList
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.listRef = React.createRef();
  }

  componentDidMount() {
    this.setItemListHeight();
  }

  componentDidUpdate() {
    if (this.props.focusedItemIndex !== null) {
      this.scrollToItem();
    }

    this.setItemListHeight();
  }

  setItemListHeight() {
    let childNodes = this.listRef.current.childNodes;
    let lastVisibleNode = childNodes[Math.min(childNodes.length, this.props.maxVisibleItems) - 1];
    let listHeight = lastVisibleNode.offsetTop + lastVisibleNode.offsetHeight;

    if (listHeight != this.state.listHeight) {
      this.setState({
        listHeight
      });
    }
  }

  scrollToItem() {
    let focusedItem = this.focusedItemRef.current;
    let list = this.listRef.current;
    let itemListRect = list.getBoundingClientRect();
    let focusedItemRect = focusedItem.getBoundingClientRect();

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
    let { movementX, movementY } = event.nativeEvent;

    if (movementX || movementY) {
      this.props.onItemHover(index);
    }
  };

  onMouseLeave = () => {
    this.props.onItemHover(null);
  };

  renderItem = (item, index) => {
    let { props } = this;
    let isFocused = props.focusedItemIndex === index;

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
      <ul
        className={this.props.styles.items}
        ref={this.listRef}
        onMouseLeave={this.onMouseLeave}
        style={{ height: this.state.listHeight }}
      >
        {this.props.items.map(this.renderItem)}
      </ul>
    );
  }
}

export default ItemList;
