import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import autoBind from 'react-autobind';
import Suggestion from './suggestion';

class Suggestions extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidUpdate() {
    if (this.focusedSuggestion) {
      const listNode = findDOMNode(this.list);
      const suggestionNode = findDOMNode(this.focusedSuggestion);

      const listRect = listNode.getBoundingClientRect();
      const suggestionRect = suggestionNode.getBoundingClientRect();

      if (suggestionRect.bottom > listRect.bottom) {
        listNode.scrollTop = (
          suggestionNode.offsetTop +
          suggestionNode.clientHeight -
          listNode.offsetHeight
        );
      } else if (suggestionRect.top < listRect.top) {
        listNode.scrollTop = suggestionNode.offsetTop;
      }
    }
  }

  onMouseMove(event, index) {
    const { movementX, movementY } = event.nativeEvent;

    if (movementX !== 0 || movementY !== 0) {
      this.props.onSuggestionHover(index);
    }
  }

  onMouseLeave() {
    this.props.onSuggestionHover(-1);
  }

  render() {
    const { props } = this;
    const { styles } = props;

    return (
      <ul
        className={styles.suggestions}
        ref={ref => this.list = ref}
        onMouseLeave={this.onMouseLeave}
      >
        {props.suggestions.map((suggestion, index) => (
          <Suggestion
            className={classNames({
              [styles.suggestion]: true,
              [styles.suggestionFocused]: props.focusedSuggestion === index
            })}
            index={index}
            key={suggestion}
            onClick={props.onSelection}
            onMouseMove={this.onMouseMove}
            ref={ref => props.focusedSuggestion === index && (this.focusedSuggestion = ref)}
            suggestion={suggestion}
            suggestionRenderer={props.suggestionRenderer}
          />
        ))}
      </ul>
    );
  }
}

Suggestions.defaultProps = {
  styles: {
    suggestions: 'react-search-bar__suggestions',
    suggestion: 'react-search-bar__suggestion',
    focusedSuggestion: 'react-search-bar__suggestion--focused'
  }
};

Suggestions.propTypes = {
  focusedSuggestion: PropTypes.number,
  onSelection: PropTypes.func.isRequired,
  onSuggestionHover: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  styles: PropTypes.object,
  suggestions: PropTypes.array.isRequired
};

export default Suggestions;
