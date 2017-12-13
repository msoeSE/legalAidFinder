import React from 'react';
import PropTypes, { func } from 'prop-types';
import Checkbox from './Checkbox'

import { addOrRemoveAgencyFromCategoryRequest } from '../../../Category/CategoryActions';

// Import Style
import './AgencyCategoryTree.css';

let items = [];
let depth = 0;

class AgencyCategoryTree extends React.Component {
    traverse = (category) => {
      if (category.agencies && category.agencies.length > 0) {
        let contains = false;
        category.agencies.forEach((id) => {
          if(id === this.props.agencyId){
            contains = true;
          }
        });

        if(contains){
          items.push(this.createCheckbox(category, depth, true));
        }else{
          items.push(this.createCheckbox(category, depth, false));
        }
      } else {
        items.push(this.createCheckbox(category, depth, false));
      }

      for (let key in category) {
        if (!category.hasOwnProperty(key))
          continue;

        if(key === 'subcategories'){
          if (category[key] !== null && typeof(category[key]) === "object") {
            //going one step down in the object tree!!
            ++depth;
            category[key].forEach((element) => {
              this.traverse(element);
            });
            --depth;
          }
        }
      }
    };

    makeTree(){
      this.props.categories.map(category => {
        if(category.parent === null){
          depth = 0;
          this.traverse(category)
        }
      });
    }

    render() {
        this.makeTree();
        return (
            <div>
                    {items.map(stuff => {
                      return stuff
                    })}
            </div>
        );
    }

    toggleCheckbox = (agencyId, categoryId, pushAgency) => {
      this.props.dispatch(addOrRemoveAgencyFromCategoryRequest(agencyId, categoryId, pushAgency));
    };

    createCheckbox = (category, depth, checked) => {
        if (category.subcategories && category.subcategories.length === 0) {
            return (
              <div style={{marginLeft: 15*depth + 'px'}}>
                <Checkbox
                    label={category.name}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={category._id}
                    agencyId={this.props.agencyId}
                    categoryId={category._id}
                    checked={checked}
                />
              </div>
            )
        } else {
            return (
                <div style={{marginLeft: 15*depth + 'px'}}><label>{category.name}</label></div>
            )
        }
    };

    // createCheckboxes = () => (
    //     items.map(this.createCheckbox)
    // )
}

AgencyCategoryTree.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        parent: PropTypes.object,
        subcategories: PropTypes.array,
        _id: PropTypes.string.isRequired,
        agencies: PropTypes.array,
    })).isRequired,
    agencyId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
};

export default AgencyCategoryTree;
