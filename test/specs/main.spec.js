import React from 'react';
import { mount, shallow } from 'enzyme';

import SearchBar from 'components/search-bar';
import ItemList from 'components/item-list';

const noop = () => {};

describe('<SearchBar />', () => {
  describe('should throw exceptions when missing required props', () => {
    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation(noop);
    });

    it('onChange', () => {
      expect(() => shallow(<SearchBar />)).toThrow();
    });

    it('onClear', () => {
      expect(() => shallow(<SearchBar onChange={noop} />)).toThrow();
    });

    it('items', () => {
      expect(() => shallow(<SearchBar onChange={noop} onClear={noop} />)).toThrow();
    });
  });

  it('should render items', () => {
    const items = ['foo', 'bar', 'baz'];

    const wrapper = mount(<SearchBar onChange={noop} onClear={noop} items={items} />);

    wrapper.setState({
      inputValue: 'ba'
    });

    wrapper.setProps({
      items: ['bar', 'baz']
    });

    const node = wrapper.find(ItemList);

    expect(node.prop('items')).toEqual(['bar', 'baz']);
    expect(node.find('Item')).toHaveLength(2);
  });

  it('should get the next focused item index', () => {
    const items = ['foo', 'bar', 'baz'];
    const lastItemIndex = items.length - 1;

    const wrapper = mount(<SearchBar onChange={noop} onClear={noop} items={items} />);

    const instance = wrapper.instance();

    expect(instance.getNextItemIndex('ArrowDown', null)).toEqual(0);
    expect(instance.getNextItemIndex('ArrowDown', 0)).toEqual(1);
    expect(instance.getNextItemIndex('ArrowUp', 2)).toEqual(1);
    expect(instance.getNextItemIndex('ArrowDown', lastItemIndex)).toEqual(null);
    expect(instance.getNextItemIndex('ArrowUp', null)).toEqual(lastItemIndex);
  });
});
