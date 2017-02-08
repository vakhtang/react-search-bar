import React from 'react';
import { shallow } from 'enzyme';
import SearchBar from '../../src';
import Suggestions from '../../src/components/suggestions';

describe('<SearchBar />', () => {
  describe('should throw exceptions when missing required props', () => {
    // Suppress propType warnings
    before(() => {
      sinon.stub(console, 'error');
    });

    after(() => {
      console.error.restore();
    });

    it('onChange', () => {
      expect(() => shallow(<SearchBar />)).to.throw();
    });

    it('suggestions', () => {
      expect(() => shallow(<SearchBar onChange={noop} />)).to.throw();
    });
  });

  it('should render suggestions', () => {
    const suggestions = ['macbook air', 'macbook pro'];

    const wrapper = shallow(
      <SearchBar
        onChange={noop}
        suggestions={suggestions}
      />
    );

    wrapper.setState({
      value: 'mac'
    });

    expect(wrapper.find(Suggestions).prop('suggestions')).to.equal(suggestions);
  });
});
