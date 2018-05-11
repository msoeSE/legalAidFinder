import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MagnifyLoader from '../../Helpers/MagnifyLoader';
import {fetchTitleAndDescription} from "../../Actions/homePageActions";

function mapStateToProps(state) {
    return { data: state.categories };
}

class HomePageTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
        };
    }

    componentWillMount() {
        this.props.dispatch(fetchTitleAndDescription()); // TODO: Fetch home page content
    }

    render() {
        if (!this.props.data.dropdown) {
            return (<MagnifyLoader label='Loading categories...' />);
        }

        if (this.state.id) {
            return (
                <div style={{ marginTop: '8px' }}>
                    <Dropdown
                        placeholder='Select a Category to edit'
                        fluid
                        className='padding'
                        search selection
                        options={this.props.data.dropdown}
                        onChange={this.handleID}
                    />
                    <hr />
                </div>
            );
        }

        return (
            <div>
                <Dropdown
                    placeholder='Select a Category to edit'
                    fluid
                    className='padding'
                    search selection
                    options={this.props.data.dropdown}
                    onChange={this.handleID}
                />
            </div>
        );
    }

}

export default withRouter(connect(mapStateToProps)(HomePageTab));
