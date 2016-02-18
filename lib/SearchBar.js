'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('es6-promise');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Suggestions = require('./Suggestions');

var _Suggestions2 = _interopRequireDefault(_Suggestions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//eslint-disable-line no-unused-vars

var keyCodes = {
  ENTER: 13,
  ESCAPE: 27,
  UP: 38,
  DOWN: 40
};

var SearchBar = function (_React$Component) {
  _inherits(SearchBar, _React$Component);

  function SearchBar(props) {
    _classCallCheck(this, SearchBar);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SearchBar).call(this, props));

    if (!props.onChange) {
      throw new Error('You must supply a callback to `onChange`.');
    }
    _this.state = _this.initialState = {
      highlightedItem: -1,
      searchTerm: '',
      suggestions: [],
      value: ''
    };
    return _this;
  }

  _createClass(SearchBar, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.autoFocus) {
        this.refs.input.focus();
      }
    }
  }, {
    key: 'normalizeInput',
    value: function normalizeInput() {
      return this.state.value.toLowerCase().trim();
    }
  }, {
    key: 'autosuggest',
    value: function autosuggest() {
      var _this2 = this;

      var searchTerm = this.normalizeInput();
      if (!searchTerm) return;
      new Promise(function (resolve) {
        _this2.props.onChange(searchTerm, resolve);
      }).then(function (suggestions) {
        if (!_this2.state.value) return;
        _this2.setState({
          highlightedItem: -1,
          searchTerm: searchTerm,
          suggestions: suggestions
        });
      });
    }
  }, {
    key: 'scroll',
    value: function scroll(key) {
      var _state = this.state;
      var item = _state.highlightedItem;
      var suggestions = _state.suggestions;

      var lastItem = suggestions.length - 1;
      var nextItem = undefined;

      if (key === keyCodes.UP) {
        nextItem = item <= 0 ? lastItem : item - 1;
      } else {
        nextItem = item === lastItem ? 0 : item + 1;
      }

      this.setState({
        highlightedItem: nextItem,
        value: suggestions[nextItem]
      });
    }
  }, {
    key: 'search',
    value: function search() {
      if (!this.state.value) return;
      var value = this.normalizeInput();
      clearTimeout(this.timer);
      this.refs.input.blur();
      var _initialState = this.initialState;
      var highlightedItem = _initialState.highlightedItem;
      var suggestions = _initialState.suggestions;

      this.setState({ highlightedItem: highlightedItem, suggestions: suggestions });
      if (this.props.onSearch) {
        this.props.onSearch(value);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      var _this3 = this;

      clearTimeout(this.timer);
      var input = e.target.value;
      if (!input) return this.setState(this.initialState);
      this.setState({ value: input });
      this.timer = setTimeout(function () {
        return _this3.autosuggest();
      }, this.props.delay);
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      var key = e.which || e.keyCode;
      switch (key) {
        case keyCodes.UP:
        case keyCodes.DOWN:
          e.preventDefault();
          this.scroll(key);
          break;

        case keyCodes.ENTER:
          this.search();
          break;

        case keyCodes.ESCAPE:
          this.refs.input.blur();
          break;
      }
    }
  }, {
    key: 'onSelection',
    value: function onSelection(suggestion) {
      var _this4 = this;

      this.setState({ value: suggestion }, function () {
        return _this4.search();
      });
    }
  }, {
    key: 'onSearch',
    value: function onSearch(e) {
      e.preventDefault();
      this.search();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      /*eslint-disable quotes*/
      return _react2.default.createElement(
        'div',
        { className: 'search-bar-wrapper' },
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('search-bar-field', { 'is-focused': this.state.isFocused }, { 'has-suggestions': this.state.suggestions.length > 0 }) },
          _react2.default.createElement('input', {
            className: 'search-bar-input',
            name: this.props.inputName,
            type: 'text',
            maxLength: '100',
            autoCapitalize: 'none',
            autoComplete: 'off',
            autoCorrect: 'off',
            ref: 'input',
            value: this.state.value,
            placeholder: this.props.placeholder,
            onChange: this.onChange.bind(this),
            onBlur: function onBlur() {
              return _this5.setState({ isFocused: false, suggestions: [] });
            },
            onKeyDown: this.state.suggestions && this.onKeyDown.bind(this),
            onFocus: function onFocus() {
              return _this5.setState({ isFocused: true });
            } }),
          this.state.value && _react2.default.createElement('span', {
            className: 'icon search-bar-clear',
            onClick: function onClick() {
              return _this5.setState(_this5.initialState);
            } }),
          _react2.default.createElement('input', {
            className: 'icon search-bar-submit',
            type: 'submit',
            onClick: this.onSearch.bind(this) })
        ),
        this.state.suggestions.length > 0 && _react2.default.createElement(_Suggestions2.default, {
          searchTerm: this.state.searchTerm,
          suggestions: this.state.suggestions,
          highlightedItem: this.state.highlightedItem,
          onSelection: this.onSelection.bind(this) })
      );
    }
    /*eslint-enable quotes*/

  }]);

  return SearchBar;
}(_react2.default.Component);

SearchBar.propTypes = {
  autoFocus: _react2.default.PropTypes.bool,
  delay: _react2.default.PropTypes.number,
  inputName: _react2.default.PropTypes.string,
  onChange: _react2.default.PropTypes.func.isRequired,
  onSearch: _react2.default.PropTypes.func,
  placeholder: _react2.default.PropTypes.string
};

SearchBar.defaultProps = {
  autoFocus: true,
  delay: 200
};

exports.default = SearchBar;