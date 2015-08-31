import React from 'react';
import classNames from 'classnames';

export default React.createClass({
  displayName: 'Suggestions',
  propTypes: {
    suggestions: React.PropTypes.array.required,
    highlightedItem: React.PropTypes.number.required,
    searchTerm: React.PropTypes.string.required
  },
  getDefaultProps() {
    return {
      highlightedItem: -1,
      searchTerm: '',
      suggestions: []
    };
  },
  handleTouchMove() {
    this._touchMoved = true;
  },
  handleTouchEnd(match, e) {
    if (!this._touchMoved) {
      this.props.onSelection(match);
    }
    this._touchMoved = false;
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
