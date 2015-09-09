import 'es6-promise';
import React from 'react';
import Suggestions from './Suggestions';

const KEY_CODES = {
  up: 38,
  down: 40
};

const SearchBar = React.createClass({
  propTypes: {
    autoFocus: React.PropTypes.bool,
    autosuggestDelay: React.PropTypes.number,
    inputName: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      autoFocus: true,
      autosuggestDelay: 250,
      inputName: 'query'
    };
  },
  getInitialState() {
    return {
      highlightedItem: -1,
      searchTerm: '',
      suggestions: [],
      value: ''
    };
  },
  componentWillMount() {
    React.initializeTouchEvents(true);
  },
  componentDidMount() {
    if (this.props.autoFocus) {
      this._input.focus();
    }
  },
  handleChange(e) {
    clearTimeout(this._timerId);
    let input = e.target.value;
    if (!input) return this.setState(this.getInitialState());
    this.setState({value: input});

    this._timerId = setTimeout(() => {
      new Promise((resolve) => {
        this.props.onChange(input, resolve);
      }).then((suggestions) => {
        if (!this.state.value) return;
        this.setState({
          searchTerm: input,
          suggestions: suggestions,
          highlightedItem: -1
        });
      });
    }, this.props.autosuggestDelay);
  },
  handleKeyDown(e) {
    let {highlightedItem: item, suggestions} = this.state;
    let validKeys = e.which == KEY_CODES.up || e.which == KEY_CODES.down;
    if (!validKeys || suggestions.length == 0) return;
    e.preventDefault();
    let lastItem = suggestions.length - 1;

    if (e.which == KEY_CODES.up) {
      item = (item <= 0) ? lastItem : item - 1;
    } else if (e.which == KEY_CODES.down) {
      item = (item == lastItem) ? 0 : item + 1;
    }

    this.setState({
      highlightedItem: item,
      value: suggestions[item]
    });
  },
  selectSuggestion(suggestion) {
    this.setState({value: suggestion});
    this._input.blur();
    this.search(suggestion);
  },
  submit(e) {
    e.preventDefault();
    if (!this.state.value) return;
    this.search(this.state.value.trim());
  },
  search(value) {
    clearTimeout(this._timerId);
    let {suggestions, highlightedItem} = this.getInitialState();
    this.setState({
      suggestions: suggestions,
      highlightedItem: highlightedItem
    });
    this.props.onSubmit(value);
  },
  render() {
    return (
      <div className="search-bar-wrapper">
        <div className="search-bar-field">
          <input
            className="search-bar-input"
            name={this.props.inputName}
            type="text"
            maxLength="100"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            ref={(c) => this._input = React.findDOMNode(c)}
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown} />
          <input
            className="search-bar-submit"
            type="submit"
            onClick={this.props.onSubmit && this.submit} />
        </div>
        {!!this.state.suggestions.length &&
          <Suggestions
            searchTerm={this.state.searchTerm}
            suggestions={this.state.suggestions}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.selectSuggestion} />}
      </div>
    );
  }
});

export default SearchBar;
