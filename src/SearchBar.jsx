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
    debounceDelay: React.PropTypes.number,
    inputName: React.PropTypes.string
  },
  getDefaultProps() {
    return {
      autoFocus: true,
      debounceDelay: 100,
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
  onChange(e) {
    clearTimeout(this._timerId);
    let input = e.target.value;
    if (!input) return this.setState(this.getInitialState());
    this.setState({value: input});

    this._timerId = setTimeout(() => {
      input = input.toLowerCase().trim();
      if (!input) return;
      new Promise((resolve) => {
        this.props.onChange(input, resolve);
      }).then((suggestions) => {
        if (!this.state.value) return;
        this.setState({
          highlightedItem: -1,
          searchTerm: input,
          suggestions
        });
      });
    }, this.props.debounceDelay);
  },
  onKeyDown(e) {
    let {highlightedItem: item, suggestions} = this.state;
    if (suggestions.length == 0) return;
    let key = e.which;
    if (key != KEY_CODES.up && key != KEY_CODES.down) return;
    e.preventDefault();
    let lastItem = suggestions.length - 1;

    if (key == KEY_CODES.up) {
      item = (item <= 0) ? lastItem : item - 1;
    } else {
      item = (item == lastItem) ? 0 : item + 1;
    }

    this.setState({
      highlightedItem: item,
      value: suggestions[item]
    });
  },
  onSelection(suggestion) {
    this.setState({value: suggestion});
    this.search(suggestion);
  },
  onSubmit(e) {
    e.preventDefault();
    let input = this.state.value.toLowerCase().trim();
    if (input) return;
    this.search(input);
  },
  search(value) {
    clearTimeout(this._timerId);
    this._input.blur();
    let {highlightedItem, suggestions} = this.getInitialState();
    this.setState({highlightedItem, suggestions});
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
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            onBlur={() => this.setState({focused: false})}
            onFocus={() => this.setState({focused: true})} />
          <input
            className="search-bar-submit"
            type="submit"
            onClick={this.props.onSubmit && this.onSubmit} />
        </div>
        { this.state.suggestions.length > 0 &&
          this.state.focused &&
          <Suggestions
            searchTerm={this.state.searchTerm}
            suggestions={this.state.suggestions}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.onSelection} /> }
      </div>
    );
  }
});

export default SearchBar;
