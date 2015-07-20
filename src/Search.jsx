import React from 'react/addons';

const keyCodes = {
  UP: 38,
  DOWN: 40
};

var Search = React.createClass({
  getDefaultProps() {
    return {
      autoFocus: true,
      autocompleteDelay: 250
    }
  },
  getInitialState() {
    return {
      matches: [],
      highlightedItem: -1
    }
  },
  propTypes: {
    autoFocus: React.PropTypes.bool,
    autocompleteDelay: React.PropTypes.number
  },
  componentDidMount() {
    this._searchInput = React.findDOMNode(this.refs.searchInput);
    if (this.props.autoFocus) {
      this._searchInput.focus();
    }
  },
  getSearchInput() {
    return this._searchInput.value;
  },
  handleKeyDown(e) {
    var highlightedItem = this.state.highlightedItem;

    if ((e.which == keyCodes.UP || e.which == keyCodes.DOWN) &&
        this.state.matches.length) {
      e.preventDefault();

      if (e.which == keyCodes.UP) {
        if (highlightedItem <= 0) return;
        --highlightedItem;
      }
      if (e.which == keyCodes.DOWN) {
        if (highlightedItem == this.state.matches.length - 1) return;
        ++highlightedItem;
      }

      this._searchInput.value = this.state.matches[highlightedItem];
      this.setState({highlightedItem: highlightedItem});
    }
  },
  handleChange() {
    clearTimeout(this._timerId);
    this._timerId = setTimeout(() => {
      this.setState({
        matches: this.props.onChange(this.getSearchInput()),
        highlightedItem: -1
      });
    }, this.props.autocompleteDelay);
  },
  search(e) {
    if (!this.props.onSearch) return;
    e.preventDefault();
    clearTimeout(this._timerId);
    this.setState({matches: []});
    this.props.onSearch(this.getSearchInput(), e);
  },
  fillInSuggestion(value) {
    this.setState({matches: []});
    this._searchInput.value = value;
  },
  render() {
    return (
      <div className="search-wrapper">
        <div className="search-bar">
          <form action={this.props.formAction}>
            <input
              className="search-input"
              name="search"
              type="text"
              maxLength="100"
              autoComplete="off"
              ref="searchInput"
              placeholder={this.props.placeholder}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown} />
            <input
              className="search-submit"
              type="submit"
              onClick={this.search} />
          </form>
        </div>
        {!!this.state.matches.length &&
          <Search.Suggestions
            matches={this.state.matches}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.fillInSuggestion} />}
      </div>
    );
  }
});

Search.Suggestions = React.createClass({
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
    var matches = this.props.matches.map((match, index) =>
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

export default Search;
