import React, { Component, PropTypes } from 'react';
import autoBind from 'react-autobind';

class Suggestion extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  handleClick() {
    this.props.onClick(this.props.suggestion);
  }

  handleMouseMove(event) {
    this.props.onMouseMove(event, this.props.index);
  }

  render() {
    const { props } = this;

    return (
      <li
        className={props.className}
        key={props.suggestion}
        onClick={this.handleClick}
        onMouseMove={this.handleMouseMove}
      >
        {props.suggestionRenderer(props.suggestion, props.searchTerm)}
      </li>
    );
  }
}

Suggestion.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  onMouseMove: PropTypes.func,
  onSelection: PropTypes.func,
  suggestion: PropTypes.string,
  suggestionRenderer: PropTypes.func
};

export default Suggestion;
