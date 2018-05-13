import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Form, Input, TextArea} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {fetchTitleAndDescription, updateTitleAndDescription} from "../../Actions/homePageActions";
import MagnifyLoader from "../../Helpers/MagnifyLoader";
import {fetchHeader, updateHeader} from "../../Actions/headerActions";


function mapStateToProps(state) {
    return { homeData: state.homePage, headerData: state.header };
}

class HomePageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            header: '',
            msg: '',
        };

        this.submitHomePageChanges = this.submitHomePageChanges.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchTitleAndDescription());
        this.props.dispatch(fetchHeader());
        this.setState({header: this.props.headerData.header, title: this.props.homeData.title, description: this.props.homeData.description});
    }

    headerChange(event) {
        this.setState({ header: event.target.value });
    }

    titleChange(event) {
        this.setState({ title: event.target.value });
    }

    descriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    submitHomePageChanges(event){
        event.preventDefault();
        this.state.msg = '';

        this.props.dispatch(updateHeader(this.state.header));
        this.props.dispatch(updateTitleAndDescription(this.state.title, this.state.description));
        this.props.dispatch(fetchTitleAndDescription());
        this.props.dispatch(fetchHeader());
        this.setState({msg: 'Successfully edited header and home page info.'});

    }

    render() {

        if (!(this.props.homeData.title && this.props.homeData.description && this.props.headerData.header)) {
            return (<MagnifyLoader label='Loading home page information...' />);
        }

        return (
            <div>
                <Form onSubmit={this.submitHomePageChanges}>
                    <Form.Field style={{width: 100 + "%"}}>
                        <label>Header</label>
                        <Input defaultValue={this.props.headerData.header} name='header' onChange={this.headerChange.bind(this)}/>
                    </Form.Field>
                    <Form.Field style={{width: 100 + "%"}}>
                        <label>Title</label>
                        <Input defaultValue={this.props.homeData.title} name='title' onChange={this.titleChange.bind(this)}/>
                    </Form.Field>
                    <Form.Field style={{width: 100 + "%"}}>
                        <label>Description</label>
                        <TextArea autoHeight='true' defaultValue={this.props.homeData.description} name='description' onChange={this.descriptionChange.bind(this)}/>
                    </Form.Field>
                    <Form.Field>
                        <Button type='submit'>Submit</Button>
                    </Form.Field>
                </Form>
                <h2>{this.state.msg}</h2>
            </div>);
    }
}

export default withRouter(connect(mapStateToProps)(HomePageForm));
