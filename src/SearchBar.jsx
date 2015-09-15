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
  onChange(e) {
    clearTimeout(this._timerId);
    let input = e.target.value;
    if (!input) return this.setState(this.getInitialState());
    this.setState({value: input});
    
    this._timerId = setTimeout(() => {
      this.autosuggest(input);
    }, this.props.autosuggestDelay);
  },
  onKeyDown(e) {
    let {highlightedItem: item, suggestions} = this.state;
    let key = e.which;
    if (suggestions.length == 0) return;

    if (key == KEY_CODES.up || key == KEY_CODES.down) {
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
    }
  },
  autosuggest(input) {
    new Promise((resolve) => {
      this.props.onChange(input, resolve);
    }).then((suggestions) => {
      if (!this.state.value) return;
      this.setState({
        highlightedItem: -1,
        searchTerm: input,
        suggestions: suggestions
      });
    });
  },
  selectSuggestion(suggestion) {
    this.setState({value: suggestion});
    this.search(suggestion);
  },
  submit(e) {
    e.preventDefault();
    if (!this.state.value) return;
    this.search(this.state.value.trim());
  },
  search(value) {
    clearTimeout(this._timerId);
    this._input.blur();
    let {highlightedItem, suggestions} = this.getInitialState();
    this.setState({highlightedItem, suggestions});
    this.props.onSubmit(value);
  },
  toggleFocusState() {
    this.setState({focused: !this.state.focused});
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
            onBlur={this.toggleFocusState}
            onFocus={this.toggleFocusState} />
          <input
            className="search-bar-submit"
            type="submit"
            onClick={this.props.onSubmit && this.submit} />
        </div>
        { this.state.suggestions.length > 0 &&
          this.state.focused &&
          <Suggestions
            searchTerm={this.state.searchTerm}
            suggestions={this.state.suggestions}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.selectSuggestion} /> }
      </div>
    );
  }
});

export default SearchBar;
