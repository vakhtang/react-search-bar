import React from 'react';
import classNames from 'classnames';

export default React.createClass({
  displayName: 'Suggestions',
  getDefaultProps() {
    return {
      suggestions: [],
      highlightedItem: -1
    }
  },
  propTypes: {
    suggestions: React.PropTypes.array,
    highlightedItem: React.PropTypes.number
  },
  handleTouchEnd(match, e) {
    if (this._touchHasChanged) {
      this._touchHasChanged = false;
      e.preventDefault();
    } else {
      this.props.onSelection(match);
    }
  },
  render() {
    let suggestions = this.props.suggestions.map((match, index) =>
      <li
        className={classNames({
          highlighted: this.props.highlightedItem == index
        })}
        key={index}
        onClick={() => this.props.onSelection(match)}
        onTouchMove={() => this._touchHasChanged = true}
        onTouchEnd={() => this.handleTouchEnd(match)}>
        {match}
      </li>
    );
    return <ul className="search-bar-suggestions">{suggestions}</ul>;
  }
});
