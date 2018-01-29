import configureMockStore from 'redux-mock-store';
import React from 'react';
import CountySelector from '../../../src/County/CountySelector';
import CountySelect from '../../../src/County/CountySelect';
import {shallow, mount} from 'enzyme';

const mockStore = configureMockStore();

describe('CountySelect', () => {

    it('# has a page wrapper', () => {
        const store = mockStore({chosenCounty: ""});
        const wrapper = shallow(<CountySelect store={store}/>);
        expect(wrapper).toMatchSnapshot();
    });

    it('# renders a page', () => {

        const component = (
            <CountySelect

            />
        );

        // test rendering
        const wrapper = shallow(component);
        expect(wrapper).toMatchSnapshot();
    });
});