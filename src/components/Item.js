import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Item extends Component {
  static propTypes = {
    className: PropTypes.string,
    index: PropTypes.number.isRequired,
    item: PropTypes.string.isRequired,
    itemRenderer: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onMouseMove: PropTypes.func.isRequired,
    searchTerm: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.itemRef = React.createRef();
  }

  onClick = () => {
    this.props.onClick(this.props.item);
  };

  onMouseMove = event => {
    this.props.onMouseMove(event, this.props.index);
  };

  render() {
    let { props } = this;

    return (
      <li
        className={props.className}
        key={props.item}
        ref={this.itemRef}
        onClick={this.onClick}
        onMouseMove={this.onMouseMove}
      >
        {props.itemRenderer(props.item, props.searchTerm)}
      </li>
    );
  }
}

export default Item;
