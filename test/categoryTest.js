var react = require('react');
var shallow = require('enzyme');
var expect = require('chai');

var CategoryList = require('../client/modules/Category/components/CategoryList');

describe('<CategoryList/>', function () {
  it('should have an image to display the gravatar', function () {
    const wrapper = shallow(<CategoryList/>);
    expect(wrapper.props().categories.to.be.defined);
  });
}
