import configureMockStore from 'redux-mock-store';
import React from 'react';
import { connect } from 'react-redux';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
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

    it('has a working state', () =>{
        const expectedState = {chosenCounty: ""};
        const mapStateToProps = (state) => ({
            state,
        });
        const ConnectedComponent = connect(mapStateToProps)(CountySelect);
        const component = shallowWithStore(<ConnectedComponent />, createMockStore(expectedState));
        expect(component.props().state).toBe(expectedState);
    });

    it('can dispatch an action', () => {
        const expectedState = {chosenCounty: ""};
        const action = {
            type: 'CHOOSE_COUNTY',
            payload: "Adams"
        };
        const mapDispatchToProps = (dispatch) => ({
            dispatchProp() {
                dispatch(action);
            },
        });
        const store = createMockStore(expectedState);

        const ConnectedComponent = connect(undefined, mapDispatchToProps)(CountySelect);
        const component = shallowWithStore(<ConnectedComponent />, store);
        component.props().dispatchProp();
        expect(store.isActionDispatched(action)).toBe(true);
    });
});