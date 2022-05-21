import PropTypes from "prop-types";
import React from "react";

const Item = React.forwardRef((props, ref) => {
  const onClick = () => {
    props.onClick(props.item);
  };

  const onMouseMove = event => {
    props.onMouseMove(event, props.index);
  };

  return (
    <li
      className={props.className}
      key={props.item}
      ref={ref}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onTouchStart={props.onTouchStart}
    >
      {props.itemRenderer(props.item, props.searchTerm)}
    </li>
  );
});

Item.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  itemRenderer: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onTouchStart: PropTypes.func.isRequired,
  searchTerm: PropTypes.string
};

Item.displayName = "Item";

export default Item;
