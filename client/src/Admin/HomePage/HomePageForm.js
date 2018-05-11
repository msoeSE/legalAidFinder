import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Button, Form, Input, TextArea} from 'semantic-ui-react';
import { connect } from 'react-redux';
import {fetchTitleAndDescription, updateTitleAndDescription} from "../../Actions/homePageActions";
import MagnifyLoader from "../../Helpers/MagnifyLoader";


function mapStateToProps(state) {
    return { data: state.homePage };
}

class HomePageForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            msg: '',
        };

        this.submitHomePageChanges = this.submitHomePageChanges.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(fetchTitleAndDescription());
        this.setState({title: this.props.data.title, description: this.props.data.description});
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

        this.props.dispatch(updateTitleAndDescription(this.state.title, this.state.description));
        this.props.dispatch(fetchTitleAndDescription());
        this.setState({msg: 'Successfully edited home page info.'});

    }

    render() {

        if (!(this.props.data.title && this.props.data.description)) {
            return (<MagnifyLoader label='Loading home page information...' />);
        }

        return (
            <div>
                <Form onSubmit={this.submitHomePageChanges}>
                    <Form.Field style={{width: 100 + "%"}}>
                        <label>Title</label>
                        <Input defaultValue={this.props.data.title} name='title' onChange={this.titleChange.bind(this)}/>
                    </Form.Field>
                    <Form.Field style={{width: 100 + "%"}}>
                        <label>Description</label>
                        <TextArea autoHeight='true' defaultValue={this.props.data.description} name='description' onChange={this.descriptionChange.bind(this)}/>
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
