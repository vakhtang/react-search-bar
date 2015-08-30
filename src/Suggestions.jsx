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
    highlightedItem: React.PropTypes.number,
    searchTerm: React.PropTypes.string
  },
  handleTouchMove() {
    this._touchMoved = true;
  },
  handleTouchEnd(match, e) {
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
        onTouchMove={this.handleTouchMove}
        onTouchEnd={(e) => this.handleTouchEnd(match, e)}>
        <strong>{this.props.searchTerm}</strong>{match.substr(this.props.searchTerm.length)}
      </li>
    );
    return <ul className="search-bar-suggestions">{suggestions}</ul>;
  }
});
