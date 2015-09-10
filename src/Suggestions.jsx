import React from 'react';
import classNames from 'classnames';

const Suggestions = React.createClass({
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
  getInitialState() {
    return {
      hoveredItem: -1
    };
  },
  onTouchEnd(match, e) {
    if (!this._touchMoved) {
      this.props.onSelection(match);
    }
    this._touchMoved = false;
  },
  render() {
    let suggestions = this.props.suggestions.map((match, index) =>
      <li
        className={classNames({
          highlighted: this.props.highlightedItem == index || this.state.hoveredItem == index
        })}
        key={index}
        onClick={() => this.props.onSelection(match)}
        onMouseEnter={() => this.setState({hoveredItem: index})}
        onTouchMove={() => this._touchMoved = true}
        onTouchEnd={(e) => this.onTouchEnd(match, e)}>
        <strong>{this.props.searchTerm}</strong>{match.substr(this.props.searchTerm.length)}
      </li>
    );
    return (
      <ul
        className="search-bar-suggestions"
        onMouseLeave={() => this.setState(this.getInitialState())}>
        {suggestions}
      </ul>
    );
  }
});

export default Suggestions;
