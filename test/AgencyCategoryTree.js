import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

let AgencyCategoryTree = require('../client/modules/Agency/components/AgencyCategoryTree/AgencyCategoryTree.js').default;

const minProps = {
    categories: [{ "_id": "5a04f8d1f9c010051c0426cb",
                  "name": "Business & Work",
                  "agencies":[],
                  "subcategories":
                    ["5a04f8d1f9c010051c0426cc",
                     "5a04f8d1f9c010051c0426d1",
                     "5a04f8d1f9c010051c0426f0",
                     "5a04f8d1f9c010051c0426e3"],
                  "parent":null}],
    agencyid: '5a04f8d1f9c010051c0426cb'
};

describe('<AgencyCategoryTree/>', function () {
  it('renders without exploding', () =>{
    expect(
      shallow(
        <AgencyCategoryTree {...minProps} />
      ).length).toEqual(1);
  });

  it('has a category', () => {
    expect(
      shallow(
        <AgencyCategoryTree {...minProps} />
      ).instance().props.categories.category).toBe(minProps.categories.category);
  });

  it('has a agency', () => {
    expect(
      shallow(
        <AgencyCategoryTree {...minProps} />
      ).instance().props.categories.agency).toBe(minProps.categories.agency);
  });
});