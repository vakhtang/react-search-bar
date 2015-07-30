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
      autosuggestDelay: 250,
      inputName: 'query'
    }
  },
  getInitialState() {
    return {
      value: '',
      suggestions: [],
      highlightedItem: -1
    }
  },
  propTypes: {
    autoFocus: React.PropTypes.bool,
    autosuggestDelay: React.PropTypes.number
  },
  componentDidMount() {
    if (this.props.autoFocus) {
      React.findDOMNode(this.refs.value).focus();
    }
  },
  handleKeyDown(e) {
    let highlightedItem = this.state.highlightedItem;

    if ((e.which == keyCodes.UP || e.which == keyCodes.DOWN) &&
        this.state.suggestions.length) {
      e.preventDefault();

      if (e.which == keyCodes.UP) {
        if (highlightedItem <= 0) return;
        --highlightedItem;
      }
      if (e.which == keyCodes.DOWN) {
        if (highlightedItem == this.state.suggestions.length - 1) return;
        ++highlightedItem;
      }

      this.setState({
        highlightedItem: highlightedItem, 
        value: this.state.suggestions[highlightedItem]
      });
    }
  },
  displaySuggestions(suggestions) {
    this.setState({
      suggestions: suggestions,
      highlightedItem: -1
    });
  },
  fillInSuggestion(suggestion) {
    this.setState({value: suggestion});
    this.search(suggestion);
  },
  handleChange(e) {
    clearTimeout(this._timerId);
    let input = e.target.value;
    if (!input) return this.setState(this.getInitialState());
    this.setState({value: input});
    this._timerId = setTimeout(() => {
      new Promise((resolve, reject) => {
        this.props.onChange(input, resolve);
      }).then((suggestions) => {
        if (!this.state.value) return;
        this.displaySuggestions(suggestions);
      });
    }, this.props.autosuggestDelay);
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
            autoComplete="off"
            ref="value"
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
            suggestions={this.state.suggestions}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.fillInSuggestion} />}
      </div>
    );
  }
});
