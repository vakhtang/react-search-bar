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
  _onTouchMove() {
    this._touchMoved = true;
  },
  _onTouchEnd(match, e) {
    if (this._touchMoved) {
      this._touchMoved = false;
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
        onTouchMove={this._onTouchMove}
        onTouchEnd={(e) => this._onTouchEnd(match, e)}>
        {match}
      </li>
    );
    return <ul className="search-bar-suggestions">{suggestions}</ul>;
  }
});
