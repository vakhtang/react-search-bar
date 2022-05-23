import PropTypes from "prop-types";
import React, { useLayoutEffect, useState } from "react";
import classNames from "classnames";
import Item from "./Item";
import styles from "./styles";

const ItemList = props => {
  const listRef = React.createRef();
  const [listHeight, setListHeight] = useState();
  let focusedItemRef;

  useLayoutEffect(() => {
    let childNodes = listRef.current.childNodes;
    let lastNode = childNodes[Math.min(childNodes.length, props.maxVisibleItems) - 1];
    setListHeight(lastNode.offsetTop + lastNode.offsetHeight);

    if (focusedItemRef) {
      adjustPartiallyVisibleItem();
    }
  });

  const adjustPartiallyVisibleItem = () => {
    let focusedItem = focusedItemRef.current;
    let list = listRef.current;
    let itemListRect = list.getBoundingClientRect();
    let focusedItemRect = focusedItem.getBoundingClientRect();

    if (focusedItemRect.bottom > itemListRect.bottom) {
      list.scrollTop += focusedItemRect.bottom - itemListRect.bottom;
    } else if (focusedItemRect.top < itemListRect.top) {
      list.scrollTop -= itemListRect.top - focusedItemRect.top;
    }
  };

  const onMouseMove = (event, index) => {
    let { movementX, movementY } = event.nativeEvent;

    if (movementX || movementY) {
      props.onItemHover(index);
    }
  };

  const onTouchStart = index => props.onItemHover(index);

  const onMouseLeave = () => props.onItemHover(null);

  const renderItem = (item, index) => {
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
        onMouseMove={onMouseMove}
        onTouchStart={onTouchStart.bind(null, index)}
        ref={isFocused ? (focusedItemRef = React.createRef()) : null}
        searchTerm={props.searchTerm}
      />
    );
  };

  return (
    <ul
      className={props.styles.items}
      ref={listRef}
      onMouseLeave={onMouseLeave}
      style={{ height: listHeight }}
    >
      {props.items.map(renderItem)}
    </ul>
  );
};

ItemList.propTypes = {
  focusedItemIndex: PropTypes.number,
  items: PropTypes.array.isRequired,
  itemRenderer: PropTypes.func,
  maxVisibleItems: PropTypes.number,
  onItemHover: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  styles: PropTypes.object
};

ItemList.defaultProps = {
  styles: styles.itemList
};

export default ItemList;
