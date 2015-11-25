import 'es6-promise';
import classNames from 'classnames';
import React from 'react';
import Suggestions from './Suggestions';

const KEY_CODES = {
  escape: 27,
  up: 38,
  down: 40
};

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    if (!props.onChange) {
      throw Error('You must supply a callback to `onChange`.');
    }
    this.state = this._initialState = {
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
  normalizeInput() {
    return this.state.value.toLowerCase().trim();
  }
  autosuggest() {
    let searchTerm = this.normalizeInput();
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
  search(value) {
    clearTimeout(this._timerId);
    this.refs.input.blur();
    let {highlightedItem, suggestions} = this._initialState;
    this.setState({highlightedItem, suggestions});
    this.props.onSubmit && this.props.onSubmit(value);
  }
  onChange(e) {
    clearTimeout(this._timerId);
    let input = e.target.value;
    if (!input) return this.setState(this._initialState);
    this.setState({value: input});
    this._timerId = setTimeout(() => {
      this.autosuggest();
    }, this.props.debounceDelay);
  }
  scroll(key) {
    let {highlightedItem: item, suggestions} = this.state;
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
  onKeyDown(e) {
    if (e.which === KEY_CODES.escape) {
      return this.refs.input.blur();
    } else if (e.which === KEY_CODES.up || e.which === KEY_CODES.down) {
      e.preventDefault();
      return this.state.suggestions.length > 0 && this.scroll(e.which);
    }
  }
  onSelection(suggestion) {
    this.setState({value: suggestion});
    this.search(suggestion);
  }
  onSubmit(e) {
    e.preventDefault();
    let input = this.normalizeInput();
    if (!input) return;
    this.search(input);
  }
  render() {
    return (
      <div className="search-bar-wrapper">
        <div className={classNames(
          "search-bar-field",
          {"is-focused": this.state.isFocused},
          {"has-suggestions": this.state.suggestions.length > 0}
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
                onClick={() => this.setState(this._initialState)}>
              </span> }
          <input
            className="icon search-bar-submit"
            type="submit"
            onClick={this.onSubmit.bind(this)} />
        </div>
        { this.state.suggestions.length > 0 &&
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
