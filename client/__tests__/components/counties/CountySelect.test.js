import configureMockStore from 'redux-mock-store';
import React from 'react';
import CountySelect from '../../../src/County/CountySelect';
import {shallow, mount} from 'enzyme';

const mockStore = configureMockStore();

describe('<CountySelect />', function () {
    it('renders without exploding', () => {
        const store = mockStore({chosenCounty: ""});
        expect(
            shallow(
                <CountySelect store={store} />
            ).length).toEqual(1);
    });
});