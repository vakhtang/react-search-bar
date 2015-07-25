import 'babel/polyfill';
import React from 'react';
import Suggestions from './Suggestions.jsx'

const keyCodes = {
  UP: 38,
  DOWN: 40
};

export default React.createClass({
  displayName: 'SearchBar',
  getDefaultProps() {
    return {
      autoFocus: true,
      autosuggestDelay: 250
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
    autosuggestDelay: React.PropTypes.number
  },
  componentDidMount() {
    this._searchInput = React.findDOMNode(this.refs.searchInput);
    if (this.props.autoFocus) {
      this._searchInput.focus();
    }
  },
  getSearchInput() {
    return this._searchInput.value.trim();
  },
  handleKeyDown(e) {
    let highlightedItem = this.state.highlightedItem;

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
    }, this.props.autosuggestDelay);
  },
  search(e) {
    if (!this.props.onSearch) return;
    e.preventDefault();
    clearTimeout(this._timerId);
    this.setState({matches: []});
    this.props.onSearch(this.getSearchInput());
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
          <Suggestions
            matches={this.state.matches}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.fillInSuggestion} />}
      </div>
    );
  }
});
