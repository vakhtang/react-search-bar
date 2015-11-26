import 'es6-promise';
import classNames from 'classnames';
import React from 'react';
import Suggestions from './Suggestions';

const keyCodes = {
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    if (!props.onChange) {
      throw Error('You must supply a callback to `onChange`.');
    }
    this.state = this.initialState = {
      highlightedItem: -1,
      searchTerm: '',
      suggestions: [],
      value: ''
    };
  }
  componentDidMount() {
    if (this.props.autoFocus) {
      this.refs.input.focus();
    }
  }
  autosuggest() {
    const searchTerm = this.normalizeInput();
    if (!searchTerm) return;
    new Promise((resolve) => {
      this.props.onChange(searchTerm, resolve);
    }).then((suggestions) => {
      if (!this.state.value) return;
      this.setState({
        highlightedItem: -1,
        searchTerm,
        suggestions
      });
    });
  }
  hasSuggestions() {
    return this.state.suggestions.length > 0;
  }
  normalizeInput() {
    return this.state.value.toLowerCase().trim();
  }
  search() {
    const value = this.normalizeInput();
    if (!value) return;
    clearTimeout(this.timer);
    this.refs.input.blur();
    const {highlightedItem, suggestions} = this.initialState;
    this.setState({highlightedItem, suggestions});
    if (this.props.onSubmit) {
      this.props.onSubmit(value);
    }
  }
  scroll(key) {
    const {highlightedItem: item, suggestions} = this.state;
    const lastItem = suggestions.length - 1;

    if (key == keyCodes.UP) {
      var nextItem = (item <= 0) ? lastItem : item - 1;
    } else {
      var nextItem = (item == lastItem) ? 0 : item + 1;
    }

    this.setState({
      highlightedItem: nextItem,
      value: suggestions[nextItem]
    });
  }
  onChange(e) {
    clearTimeout(this.timer);
    const input = e.target.value;
    if (!input) return this.setState(this.initialState);
    this.setState({value: input});
    this.timer = setTimeout(() => {
      this.autosuggest();
    }, this.props.debounceDelay);
  }
  onKeyDown(e) {
    switch (e.keyCode || e.which) {
      case keyCodes.UP:
      case keyCodes.DOWN:
        e.preventDefault();
        if (!this.hasSuggestions()) break;
        this.scroll(e.which);
        break;

      case keyCodes.ENTER:
        this.search();
        break;

      case keyCodes.ESCAPE:
        this.refs.input.blur();
        break;
    }
  }
  onSelection(suggestion) {
    this.setState({value: suggestion});
    this.search(suggestion);
  }
  onSubmit(e) {
    e.preventDefault();
    this.search();
  }
  render() {
    return (
      <div className="search-bar-wrapper">
        <div className={classNames(
          "search-bar-field",
          {"is-focused": this.state.isFocused},
          {"has-suggestions": this.hasSuggestions()}
        )}>
          <input
            className="search-bar-input"
            name={this.props.inputName}
            type="text"
            maxLength="100"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            ref="input"
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChange={this.onChange.bind(this)}
            onBlur={() => this.setState({isFocused: false, suggestions: []})}
            onKeyDown={this.onKeyDown.bind(this)}
            onFocus={() => this.setState({isFocused: true})} />
            { this.state.value &&
              <span
                className="icon search-bar-clear"
                onClick={() => this.setState(this.initialState)}>
              </span> }
          <input
            className="icon search-bar-submit"
            type="submit"
            onClick={this.onSubmit.bind(this)} />
        </div>
        { this.hasSuggestions() &&
          <Suggestions
            searchTerm={this.state.searchTerm}
            suggestions={this.state.suggestions}
            highlightedItem={this.state.highlightedItem}
            onSelection={this.onSelection.bind(this)} /> }
      </div>
    );
  }
}

SearchBar.propTypes = {
  autoFocus: React.PropTypes.bool,
  debounceDelay: React.PropTypes.number,
  inputName: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  onSubmit: React.PropTypes.func,
  placeholder: React.PropTypes.string
};

SearchBar.defaultProps = {
  autoFocus: true,
  debounceDelay: 100,
  inputName: 'query'
};

export default SearchBar;
