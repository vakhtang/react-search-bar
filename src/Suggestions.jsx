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
    this._timerId = setTimeout(() => {
      this.setState({activeItem: index});
    }, 200);
  }
  onTouchMove(e) {
    clearTimeout(this._timerId);
    this._touchMoved = true;
    this.setState({activeItem: -1});
  }
  onTouchEnd(suggestion, e) {
    if (!this._touchMoved) {
      setTimeout(() => {
        this.props.onSelection(suggestion);
      }, 220);
    }
    this._touchMoved = false;
  }
  render() {
    let {highlightedItem, searchTerm, suggestions} = this.props;
    let {activeItem} = this.state;
    return (
      <ul
        className="search-bar-suggestions"
        onMouseLeave={() => this.setState({activeItem: -1})}>
        {suggestions.map((suggestion, index) =>
          <li
            className={classNames({
              highlighted: highlightedItem == index || activeItem == index
            })}
            key={index}
            onClick={() => this.props.onSelection(suggestion)}
            onMouseEnter={() => this.setState({activeItem: index})}
            onMouseDown={(e) => e.preventDefault()}
            onTouchStart={() => this.onTouchStart(index)}
            onTouchMove={this.onTouchMove.bind(this)}
            onTouchEnd={(e) => this.onTouchEnd(suggestion, e)}>
            <span>
              {searchTerm}
              <strong>{suggestion.substr(searchTerm.length)}</strong>
            </span>
          </li>
        )}
      </ul>
    );
  }
}

Suggestions.propTypes = {
  highlightedItem: React.PropTypes.number.isRequired,
  searchTerm: React.PropTypes.string.isRequired,
  suggestions: React.PropTypes.array.isRequired
};

Suggestions.defaultProps = {
  highlightedItem: -1,
  searchTerm: '',
  suggestions: []
};

export default Suggestions;
