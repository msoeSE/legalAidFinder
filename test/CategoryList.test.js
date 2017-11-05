import jsdom from 'jsdom';
import React from 'react';
import {shallow, mount} from 'enzyme';
import expect from 'expect';

var CategoryList = require('../client/modules/Category/components/CategoryList.js').default;

const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView; // This is needed for using mount rather than shallow.
                                 // Keeping it here for future use. -bw

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

  it('renders a list view', function(){
    const wrapper = shallow(<CategoryList {...minProps} />);

    expect(
      wrapper.find('.listView').exists()
    ).toEqual(true);
  });

});
