import React from 'react';
import { mount, shallow } from 'enzyme';
import { noop } from 'lodash';

import SearchBar from 'components/search-bar';
import Suggestions from 'components/suggestions';

describe('<SearchBar />', () => {
  describe('should throw exceptions when missing required props', () => {
    // Suppress propType warnings
    beforeAll(() => {
      console.error = jest.fn();
    });

    afterAll(() => {
      console.error.mockRestore();
    });

    it('onChange', () => {
      const component = <SearchBar />;
      expect(() => shallow(component)).toThrow();
    });

    it('onClear', () => {
      const component = <SearchBar onChange={noop} />;
      expect(() => shallow(component)).toThrow();
    });

    it('suggestions', () => {
      const component = <SearchBar onChange={noop} onClear={noop} />;
      expect(() => shallow(component)).toThrow();
    });

    it('onSearch when renderSearchButton is true', () => {
      const component = (
        <SearchBar
          renderSearchButton
          onChange={noop}
          onClear={noop}
          suggestions={[]}
        />
      );

      expect(() => shallow(component)).toThrow();
    });
  });

  it('should render suggestions', () => {
    const suggestions = ['macbook air', 'macbook pro'];

    const wrapper = mount(
      <SearchBar onChange={noop} onClear={noop} suggestions={suggestions} />
    );

    wrapper.setState({
      value: 'mac'
    });

    const node = wrapper.find(Suggestions);

    expect(node.prop('suggestions')).toEqual(suggestions);
    expect(node.find('Suggestion')).toHaveLength(2);
  });

  it('should get the next focused suggestion index', () => {
    const suggestions = ['aaaa', 'aaab', 'aac', 'aad'];
    const last = suggestions.length - 1;
    const isScrollingDown = true;

    const wrapper = mount(
      <SearchBar onChange={noop} onClear={noop} suggestions={suggestions} />
    );

    expect(wrapper.instance().getNextIndex(null, last, isScrollingDown)).toEqual(0);
    expect(wrapper.instance().getNextIndex(0, last, isScrollingDown)).toEqual(1);
    expect(wrapper.instance().getNextIndex(2, last, isScrollingDown)).toEqual(3);
    expect(wrapper.instance().getNextIndex(2, last, !isScrollingDown)).toEqual(1);
    expect(wrapper.instance().getNextIndex(last, last, isScrollingDown)).toEqual(null);
    expect(wrapper.instance().getNextIndex(null, last, !isScrollingDown)).toEqual(last);
  });
});
