import React from "react";
import { mount, shallow } from "enzyme";
import SearchBar from "components/SearchBar";
import ItemList from "components/ItemList";

const noop = () => {};

describe("<SearchBar />", () => {
  describe("should throw exceptions when missing required props", () => {
    beforeAll(() => {
      jest.spyOn(console, "error").mockImplementation(noop);
    });

    it("onChange", () => {
      expect(() => shallow(<SearchBar />)).toThrow();
    });

    it("onClear", () => {
      expect(() => shallow(<SearchBar onChange={noop} />)).toThrow();
    });

    it("items", () => {
      expect(() => shallow(<SearchBar onChange={noop} onClear={noop} />)).toThrow();
    });
  });

  it("should render items", () => {
    let wrapper = mount(<SearchBar onChange={noop} onClear={noop} items={["foo", "bar", "baz"]} />);

    wrapper.setState({
      inputValue: "ba"
    });

    wrapper.setProps({
      items: ["bar", "baz"]
    });

    let node = wrapper.find(ItemList);

    expect(node.prop("items")).toEqual(["bar", "baz"]);
    expect(node.find("Item")).toHaveLength(2);
  });

  it("should get the next focused item index", () => {
    let items = ["foo", "bar", "baz"];
    let lastItemIndex = items.length - 1;

    let wrapper = mount(<SearchBar onChange={noop} onClear={noop} items={items} />);
    let instance = wrapper.instance();

    expect(instance.getNextItemIndex("ArrowDown", null)).toEqual(0);
    expect(instance.getNextItemIndex("ArrowDown", 0)).toEqual(1);
    expect(instance.getNextItemIndex("ArrowUp", 2)).toEqual(1);
    expect(instance.getNextItemIndex("ArrowDown", lastItemIndex)).toEqual(null);
    expect(instance.getNextItemIndex("ArrowUp", null)).toEqual(lastItemIndex);
  });
});
