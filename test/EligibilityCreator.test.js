import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { addEligibilityRequest } from "../client/modules/Eligibility/EligibilityActions";

let EligibilityCreator = require('../client/modules/Eligibility/components/EligibilityCreator/EligibilityCreator.js').default;

const minProps = {
  addEligibility: (category, agency, key, comparator, value) => {
    this.props.dispatch(addEligibilityRequest({category, agency, key, comparator, value}));
  },
  eligibility: {
    category: '123',
    agency: 'abc',
  },
};

describe('<EligibilityCreator/>', function () {
  it('renders without exploding', () =>{
    expect(
      shallow(
        <EligibilityCreator {...minProps} />
      ).length).toEqual(1);
  });

  it('has a category', () => {
    expect(
      shallow(
        <EligibilityCreator {...minProps} />
      ).instance().props.eligibility.category).toBe(minProps.eligibility.category);
  });

  it('has a agency', () => {
    expect(
      shallow(
        <EligibilityCreator {...minProps} />
      ).instance().props.eligibility.agency).toBe(minProps.eligibility.agency);
  });

  it('has a button', () => {
    const wrapper = shallow(<EligibilityCreator {...minProps} />);
    expect(wrapper.find('#submitButton'));
  });
});
