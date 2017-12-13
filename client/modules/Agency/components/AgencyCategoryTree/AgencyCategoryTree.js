import React from 'react';
import PropTypes, { func } from 'prop-types';
import Checkbox from './Checkbox'


// Import Style
import './AgencyCategoryTree.css';

let items = [];
let depth = 0;

class AgencyCategoryTree extends React.Component {
    // Recursive function that generates the checkboxes
    traverse = (category) => {
        // Check if the agency exists in a leaf node
        if (category.agencies && category.agencies.length > 0) {
            let contains = false;
            category.agencies.forEach((element) => {
            if (element._id === this.props.agencyid){
                contains = true;
            }
        });

            // Determine to check the checkbox if agency exists in leaf node
            if (contains){
                items.push(this.createCheckbox(category, depth, true));
            } else {
                items.push(this.createCheckbox(category, depth, false));
            }

        } else {
            // Create branch node (label)
            items.push(this.createCheckbox(category, depth, false));
        }

        // Iterate though all keys in the category object
        for (let key in category) {
            if (!category.hasOwnProperty(key))
            continue;

            // Recursive call if category has subcategories
            if(key === 'subcategories'){
                if (category[key] !== null && typeof(category[key]) === "object") {
                    // Going one step down in the object tree!!
                    ++depth;
                    category[key].forEach((element) => {
                        this.traverse(element);
                    });
                    --depth;
                }
            }
        }
    };


    makeTree() {
      this.props.categories.map(category => {
        if(category.parent === null){
          depth = 0;
          this.traverse(category)
        }
      });
    };


    render() {
        this.makeTree();
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    {items.map(stuff => {
                      return stuff
                    })
                    }
                    <button className="btn btn-default" type="submit">Save</button>
                </form>
            </div>
        );
    };

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    };

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    };

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
    };

    createCheckbox = (category, depth, checked) => {
        if (category.subcategories && category.subcategories.length === 0) {
            return (
              <div style={{marginLeft: 15*depth + 'px'}}>
                <Checkbox
                    label={category.name}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={category._id}
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

    createCheckboxes = () => (
        items.map(this.createCheckbox)
    );
}

AgencyCategoryTree.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        parent: PropTypes.object,
        subcategories: PropTypes.array,
        _id: PropTypes.string.isRequired,
        agencies: PropTypes.array,
    })).isRequired,
    agencyid: PropTypes.string,
};

export default AgencyCategoryTree;
