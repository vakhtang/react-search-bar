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
    let {highlightedItem, searchTerm, suggestions} = this.props;
    let {hoveredItem} = this.state;
    suggestions = suggestions.map((match, index) =>
      <li
        className={classNames({
          highlighted: highlightedItem == index || hoveredItem == index
        })}
        key={index}
        onClick={() => this.props.onSelection(match)}
        onMouseEnter={() => this.setState({hoveredItem: index})}
        onMouseDown={(e) => e.preventDefault()}
        onTouchMove={() => this._touchMoved = true}
        onTouchEnd={(e) => this.onTouchEnd(match, e)}>
        <strong>{searchTerm}</strong>{match.substr(searchTerm.length)}
      </li>
    );
    return (
      <ol
        className="search-bar-suggestions"
        onMouseLeave={() => this.setState(this.getInitialState())}>
        {suggestions}
      </ol>
    );
  }
});

export default Suggestions;
