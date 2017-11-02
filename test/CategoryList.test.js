import jsdom from 'jsdom';
import React from 'react';
import {shallow, mount} from 'enzyme';
import expect from 'expect';

var CategoryList = require('../client/modules/Category/components/CategoryList.js').default;

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const minProps = {
  categories: [{
    name: "Category1",
    parent: {category: {}},
    subcategories: ["004", "005", "006"],
    _id: "001"
  },
    {
      name: "Category2",
      parent: {category: {}},
      subcategories: ["007", "008", "009"],
      _id: "002"
    },
    {
      name: "Category3",
      parent: {category: {}},
      subcategories: ["010", "011", "012"],
      _id: "003"
    }
  ]
};

describe('<CategoryList/>', function () {
  it('renders without exploding', () =>{
    expect(
      shallow(
        <CategoryList {...minProps} />
      ).length).toEqual(1);
  });

  it('should have a list of categories', function () {
    expect(
      shallow(
        <CategoryList {...minProps} />
      ).instance().props.categories).toBe(minProps.categories);
  });

  /*it('renders multiple <CategoryListItem/>s', function(){
    const wrapper = mount(<CategoryList {...minProps} />);

  console.log(wrapper);
    expect(
      wrapper.find('CategoryListItem').exists()
    ).toEqual(true);
  });*/

});
