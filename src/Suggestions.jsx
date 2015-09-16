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
      activeItem: -1
    };
  },
  onTouchEnd(match, e) {
    if (!this._touchMoved) {
      this.props.onSelection(match);
    }
    this._touchMoved = false;
    this.setState({activeItem: -1});
  },
  setActiveItem(index) {
    this.setState({activeItem: index});
  },
  render() {
    let {highlightedItem, searchTerm, suggestions} = this.props;
    let {activeItem} = this.state;
    suggestions = suggestions.map((match, index) =>
      <li
        className={classNames({
          highlighted: highlightedItem == index || activeItem == index
        })}
        key={index}
        onClick={() => this.props.onSelection(match)}
        onMouseEnter={() => this.setActiveItem(index)}
        onMouseDown={(e) => e.preventDefault()}
        onTouchMove={() => this._touchMoved = true}
        onTouchEnd={(e) => this.onTouchEnd(match, e)}
        onTouchStart={() => this.setActiveItem(index)}>
        <strong>{searchTerm}</strong>{match.substr(searchTerm.length)}
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
