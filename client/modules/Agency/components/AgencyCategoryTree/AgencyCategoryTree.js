import React from 'react';
import PropTypes, { func } from 'prop-types';
import Checkbox from './Checkbox'


// Import Style
import './AgencyCategoryTree.css';

let items = [];
let depth = 0;

class AgencyCategoryTree extends React.Component {
    getNodes() {
        this.props.categories.map(category => {
            // If child node
            if(category.subcategories.length === 0) {
                if(category.agencies.length === 0){
                  items.push({category: category, child: true, checked: false})
                } else {
                    for (let i = 0; i < category.agencies.length; i++) {
                        // If matches agency, check the box
                        if (category.agencies[i]._id === this.props.agencyid) {
                          items.push({category: category, child: true, checked: true})
                        } else {
                          items.push({category: category, child: true, checked: false})
                        }
                    }
                }
            } else {
                // Parent node
                items.push({category: category, child: false, checked: false})
            }
        })
    }

    // //called with every property and its value
    // addToList(key, value) {
    //   console.log(key + " : "+value);
    // }

    traverse = (category) => {
      if (category.agencies && category.agencies.length > 0) {
        let contains = false;
        category.agencies.forEach((element) => {
          if(element._id === this.props.agencyid){
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
        // this.getNodes();
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
    }

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
                <div style={{marginLeft: 10*depth + 'px'}}><label>{category.name}</label></div>
            )
        }
    };

    createCheckboxes = () => (
        items.map(this.createCheckbox)
    )
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
