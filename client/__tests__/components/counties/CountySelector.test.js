import configureMockStore from 'redux-mock-store';
import React from 'react';
import CountySelector from '../../../src/County/CountySelector';
import {shallow, mount} from 'enzyme';

const mockStore = configureMockStore();

describe('<CountySelector />', function () {
    it('renders without exploding', () => {
        const store = mockStore({chosenCounty: ""});
        expect(
            shallow(
                <CountySelector store={store} />
            ).length).toEqual(1);
    });
});