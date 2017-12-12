import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import PropTypes, { func } from 'prop-types';
import Checkbox from './Checkbox'


// Import Style
import './AgencyCategoryTree.css';

/*const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos', children: [
            { value: 'box1', label: 'box1'},
            { value: 'box2', label: 'box2'}
        ] },
        { value: 'deimos', label: 'Deimos' },
    ],
}];*/

var items = [];

class AgencyCategoryTree extends React.Component {
    getNodes() {
        this.props.categories.map(category => {
            // If child node
            if(category.subcategories.length === 0) {
                for(var i = 0; i < category.agencies.length; i++) {
                    // If matches agency, check the box
                    if(category.agencies[i]._id === this.props.agencyid) {
                        items.push({category: category, child: true, checked: true})
                    } else {
                        items.push({category: category, child: true, checked: false})
                    }
                }
            } else {
                // Parent node
                items.push({category: category, child: false, checked: false})
            }
        })
    }

    render() {
        this.getNodes()
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    {this.createCheckboxes()}
                    <button className="btn btn-default" type="submit">Save</button>
                </form>
            </div>
        );
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
    }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
            this.selectedCheckboxes.delete(label);
        } else {
            this.selectedCheckboxes.add(label);
        }
    }

    handleFormSubmit = formSubmitEvent => {
        formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            console.log(checkbox, 'is selected.');
        }
    }

    createCheckbox = box => {
        console.log(box.child)
        if (box.child) {
            return (
                <Checkbox
                    label={box.category.name}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={box.category._id}
                    checked={box.checked}
                />
            )
        } else {
            return (
                <label>{box.category.name}</label>
            )
        }
    }

    createCheckboxes = () => (
        items.map(this.createCheckbox)
    )
}

AgencyCategoryTree.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        parent: PropTypes.string,
        subcategories: PropTypes.array,
        _id: PropTypes.string.isRequired,
        agencies: PropTypes.array,
    })).isRequired,
    agencyid: PropTypes.string,
};

export default AgencyCategoryTree;