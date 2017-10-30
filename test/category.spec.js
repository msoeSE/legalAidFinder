import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

var CategoryList = require('../client/modules/Category/components/CategoryList.js').default;

describe('<CategoryList/>', function () {
  it('should have a list of categories', function () {
    const wrapper = mount(<CategoryList/>);
    const list = wrapper.find('CategoryListItem');

    expect(list.props().name.to.be.defined);
  });
});
