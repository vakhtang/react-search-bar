'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('babel/polyfill');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SuggestionsJsx = require('./Suggestions.jsx');

var _SuggestionsJsx2 = _interopRequireDefault(_SuggestionsJsx);

var keyCodes = {
  UP: 38,
  DOWN: 40
};

exports['default'] = _react2['default'].createClass({
  displayName: 'SearchBar',
  getDefaultProps: function getDefaultProps() {
    return {
      autoFocus: true,
      autosuggestDelay: 250
    };
  },
  getInitialState: function getInitialState() {
    return {
      value: '',
      suggestions: [],
      highlightedItem: -1
    };
  },
  propTypes: {
    autoFocus: _react2['default'].PropTypes.bool,
    autosuggestDelay: _react2['default'].PropTypes.number
  },
  componentDidMount: function componentDidMount() {
    if (this.props.autoFocus) {
      _react2['default'].findDOMNode(this.refs.value).focus();
    }
  },
  handleKeyDown: function handleKeyDown(e) {
    var highlightedItem = this.state.highlightedItem;

    if ((e.which == keyCodes.UP || e.which == keyCodes.DOWN) && this.state.suggestions.length) {
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
  displaySuggestions: function displaySuggestions(suggestions) {
    this.setState({
      suggestions: suggestions,
      highlightedItem: -1
    });
  },
  fillInSuggestion: function fillInSuggestion(suggestion) {
    this.setState({ value: suggestion });
    this.search(suggestion);
  },
  handleChange: function handleChange(e) {
    var _this = this;

    clearTimeout(this._timerId);
    var input = e.target.value;
    if (!input) return this.setState(this.getInitialState());
    this.setState({ value: input });
    this._timerId = setTimeout(function () {
      new Promise(function (resolve, reject) {
        _this.props.onChange(input, resolve);
      }).then(function (suggestions) {
        if (!_this.state.value) return;
        _this.displaySuggestions(suggestions);
      });
    }, this.props.autosuggestDelay);
  },
  submit: function submit(e) {
    e.preventDefault();
    if (!this.state.value) return;
    this.search(this.state.value);
  },
  search: function search(value) {
    clearTimeout(this._timerId);

    var _getInitialState = this.getInitialState();

    var suggestions = _getInitialState.suggestions;
    var highlightedItem = _getInitialState.highlightedItem;

    this.setState({
      suggestions: suggestions,
      highlightedItem: highlightedItem
    });
    this.props.onSubmit(value);
  },
  render: function render() {
    return _react2['default'].createElement(
      'div',
      { className: "search-wrapper" },
      _react2['default'].createElement(
        'div',
        { className: "search-bar" },
        _react2['default'].createElement('input', {
          className: "search-input",
          name: "search",
          type: "text",
          maxLength: "100",
          autoComplete: "off",
          ref: "value",
          value: this.state.value,
          placeholder: this.props.placeholder,
          onChange: this.handleChange,
          onKeyDown: this.handleKeyDown }),
        _react2['default'].createElement('input', {
          className: "search-submit",
          type: "submit",
          onClick: this.props.onSubmit && this.submit })
      ),
      !!this.state.suggestions.length && _react2['default'].createElement(_SuggestionsJsx2['default'], {
        suggestions: this.state.suggestions,
        highlightedItem: this.state.highlightedItem,
        onSelection: this.fillInSuggestion })
    );
  }
});
module.exports = exports['default'];