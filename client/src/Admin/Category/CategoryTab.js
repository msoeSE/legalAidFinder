import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Loader, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchCategoriesAndDropdown } from '../../actions/categoriesActions';
import CategoryTree from './CategoryTree';

function mapStateToProps(state) {
  return { data: state.categories };
}

class CategoryTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null
    };
    this.handleID = this.handleID.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(fetchCategoriesAndDropdown());
  }

  handleID(event, data) {
      this.setState({ id: data.value });
  }

  render() {
    if (!this.props.data.categories || this.props.data.categories.length === 0) {
      return (<Loader active inline='centered' size='massive'>Loading...</Loader>);
    }

    if (this.state.id) {
        return (
            <div>
                <Dropdown placeholder='Select a Category to edit'
                    fluid
                    className='padding'
                    search selection
                    options={this.props.data.dropdown}
                    onChange={this.handleID}
                />
                <hr/>
                <CategoryTree categoryID={this.state.id} />
            </div>
    )};

    return (    
        <div>
            <Dropdown placeholder='Select an Category to edit'
                fluid
                className='padding'
                search selection
                options={this.props.data.dropdown}
                onChange={this.handleID}
            />
        </div>
    )};
    
}

export default withRouter(connect(mapStateToProps)(CategoryTab));