import React from 'react';
import classNames from 'classnames';

class Suggestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: -1
    };
  }
  onTouchStart(index) {
    this.timer = setTimeout(() => {
      this.setState({activeItem: index});
    }, 200);
  }
  onTouchMove() {
    clearTimeout(this.timer);
    this.touchedMoved = true;
    this.setState({activeItem: -1});
  }
  onTouchEnd(suggestion) {
    if (!this.touchedMoved) {
      setTimeout(() => {
        this.props.onSelection(suggestion);
      }, 220);
    }
    this.touchedMoved = false;
  }
  render() {
    const {highlightedItem, searchTerm, suggestions} = this.props;
    const {activeItem} = this.state;
    return (
      <ul
        className="search-bar-suggestions"
        onMouseLeave={() => this.setState({activeItem: -1})}>
        {suggestions.map((suggestion, index) => {
            if (typeof suggestion === 'object') {
              index = suggestion.id;
              suggestion = suggestion.name;
            }

            return (
              <li
              className={classNames({
                highlighted: highlightedItem === index || activeItem === index
              })}
              key={index}
              onClick={() => this.props.onSelection(suggestion, index)}
              onMouseEnter={() => this.setState({activeItem: index})}
              onMouseDown={(e) => e.preventDefault()}
              onTouchStart={() => this.onTouchStart(index)}
              onTouchMove={() => this.onTouchMove()}
              onTouchEnd={() => this.onTouchEnd(suggestion, index)}>
              <span>
                {searchTerm}
                <strong>{suggestion.substr(searchTerm.length)}</strong>
              </span>
              </li>
            )
          }
        )}
      </ul>
    );
  }
}

Suggestions.propTypes = {
  highlightedItem: React.PropTypes.number,
  searchTerm: React.PropTypes.string.isRequired,
  suggestions: React.PropTypes.array.isRequired
};

export default Suggestions;
