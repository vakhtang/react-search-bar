import React from 'react/addons';

export default React.createClass({
  displayName: 'Suggestions',
  getDefaultProps() {
    return {
      matches: [],
      highlightedItem: -1
    }
  },
  propTypes: {
    matches: React.PropTypes.array,
    highlightedItem: React.PropTypes.number
  },
  render() {
    let matches = this.props.matches.map((match, index) =>
      <li
        className={React.addons.classSet({
          highlighted: this.props.highlightedItem == index
        })}
        key={index}
        onClick={this.props.onSelection.bind(null, match)}>
        {match}
      </li>
    );
    return <ul className="search-suggestions">{matches}</ul>;
  }
});
