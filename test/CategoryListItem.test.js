import React from 'react';
import {shallow} from 'enzyme';
import expect from 'expect';

var CategoryListItem = require('../client/modules/Category/components/CategoryListItem/CategoryListItem.js').default;

const minProps = {
  category: {
    name: "Category1",
    parent: "Category0",
    subcategories: [{category: {
      name: "Category2",
      parent: "Category1",
      subcategories: [],
      _id: "002"
    }}],
    _id: "001",
  }
};

describe('<CategoryListItem/>', function () {
  it('renders without exploding', () =>{
    expect(
      shallow(
        <CategoryListItem {...minProps} />
      ).length).toEqual(1);
  });

  /*it('should have a category', function () {
    const wrapper = shallow(<CategoryListItem {...minProps} />);

    expect(wrapper.prop('category')).toBeDefined();
  });*/

  it('links to its category', function(){
    const wrapper = shallow(<CategoryListItem {...minProps} />);

    expect(
      wrapper.find('Link').prop('to')
    ).toEqual('/categories/' + minProps.category._id);
  });

});
