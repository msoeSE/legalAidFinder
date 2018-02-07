import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import CategoryModify from '../../../../src/Admin/Category/CategoryModify.js';
import configureMockStore from "redux-mock-store";
import {shallow, mount} from 'enzyme';

const mockStore = configureMockStore();

describe('AdminPage', () =>{

    it('renders without exploding', () => {
        const store = mockStore({});
        expect(
            shallow(
                <CategoryModify store={store} />
            ).length).toEqual(1);
    });

    it('has a working state', () =>{
        const expectedState = {};
        const mapStateToProps = (state) => ({
            state,
        });
        const ConnectedComponent = connect(mapStateToProps)(CategoryModify);
        const component = shallowWithStore(<ConnectedComponent />, createMockStore(expectedState));
        expect(component.props().state).toBe(expectedState);
    });
});