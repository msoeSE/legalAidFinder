import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { Item } from 'semantic-ui-react';
import fetchCategories from './actions/categoriesActions';


function mapStateToProps(state) {
  return { data: state.categories };
}

class CategoryDetail extends Component {
  componentWillMount() {
    this.props.dispatch(fetchCategories());
  }

  render() {
    if (this.props.params) {
      return (
        <div className='card-holder'>
          <h2>Select a category that corresponds with your legal issue:</h2>
          <Item.Group divided>
            {
              this.props.data.categories.map((subcat) =>
                <Item>
                  <Item.Content>
                    <Item.Header as='a'>{subcat.name}</Item.Header>
                    <Item.Meta>
                      <span className='cinema'>Union Square 14</span>
                    </Item.Meta>
                    <Item.Description>{subcat.subcategories}</Item.Description>
                  </Item.Content>
                </Item>)
            }
          </Item.Group>
        </div>);
    } else {
      return 'HI';
    }
  }
}

export default withRouter(connect(mapStateToProps)(CategoryDetail));
