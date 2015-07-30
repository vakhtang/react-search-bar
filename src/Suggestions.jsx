import React from 'react/addons';

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
  render() {
    let suggestions = this.props.suggestions.map((match, index) =>
      <li
        className={React.addons.classSet({
          highlighted: this.props.highlightedItem == index
        })}
        key={index}
        onClick={this.props.onSelection.bind(null, match)}>
        {match}
      </li>
    );
    return <ul className="search-bar-suggestions">{suggestions}</ul>;
  }
});
