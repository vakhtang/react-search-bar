import React from 'react'

var Search = React.createClass({
  getDefaultProps() {
    return {
      autoFocus: true,
      autocompleteDelay: 250
    }
  },
  getInitialState() {
    return {
      matches: []
    }
  },
  propTypes: {
    autoFocus: React.PropTypes.bool,
    autocompleteDelay: React.PropTypes.number
  },
  componentDidMount() {
    if (this.props.autoFocus) {
      React.findDOMNode(this.refs.searchInput).focus();
    }
    this._searchInput = React.findDOMNode(this.refs.searchInput);
  },
  getSearchInput() {
    return this._searchInput.value;
  },
  handleChange() {
    clearTimeout(this._timerId);
    this._timerId = setTimeout(() => {
      this.setState({
        matches: this.props.onChange(this.getSearchInput())
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
              onChange={this.handleChange} />
            <input
              className="search-submit"
              type="submit"
              onClick={this.search} />
          </form>
        </div>
        {this.state.matches.length
           ? <Search.Suggestions 
               matches={this.state.matches}
               onSelection={this.fillInSuggestion} />
           : null}
      </div>
    );
  }
});

Search.Suggestions = React.createClass({
  getDefaultProps() {
    return {
      matches: []
    }
  },
  propTypes: {
    matches: React.PropTypes.array
  },
  render() {
    var matches = this.props.matches.map((match, index) =>
      <li key={index} onClick={this.props.onSelection.bind(null, match)}>
        {match}
      </li>
    );
    return <ul className="search-suggestions">{matches}</ul>;
  }
});

export default Search;
