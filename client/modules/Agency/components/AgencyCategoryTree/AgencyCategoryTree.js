import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import PropTypes, { func } from 'prop-types';

// Import Style
import './AgencyCategoryTree.css';

const nodes = [{
    value: 'mars',
    label: 'Mars',
    children: [
        { value: 'phobos', label: 'Phobos', children: [
            { value: 'box1', label: 'box1'},
            { value: 'box2', label: 'box2'}
        ] },
        { value: 'deimos', label: 'Deimos' },
    ],
}];

class AgencyCategoryTree extends React.Component {
    constructor() {
        super();

        this.state = {
            checked: [],
            expanded: [],
        };
    }

    getNodes() {
        this.props.categories.map(category => {
            if(category.agencies.length > 1) {
                for(var i = 0; i < category.agencies.length; i++) {
                    if(category.agencies[i]._id === this.props.agencyid)
                        console.log(category.agencies[i].name)
                }
            }
        })
    }

    render() {
        this.getNodes()
        return (
            <div>
                <CheckboxTree
                    nodes={nodes}
                    checked={this.state.checked}
                    expanded={this.state.expanded}
                    onCheck={checked => this.setState({ checked })}
                    onExpand={expanded => this.setState({ expanded })}
                />
            </div>
        );
    }
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